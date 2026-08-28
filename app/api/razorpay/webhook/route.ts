import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Razorpay calls this endpoint server-to-server after a payment settles. It is
// the reliable half of the flow: the browser callback in BookingModal can be
// lost if the visitor closes the tab mid-payment, but this still fires — so a
// paid (or failed) consultation always reaches the sheet and TeleCRM.

interface RazorpayPayment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  method?: string;
  email?: string;
  contact?: string;
  notes?: Record<string, string>;
}

type Flow = "homeo" | "anxiety";

const PAYMENT_HEADERS = [
  "Timestamp",
  "Source",
  "Name",
  "Phone",
  "Email",
  "Amount",
  "Payment Status",
  "Payment ID",
  "Order ID",
  "Method",
  "URL",
];

function flowOf(payment: RazorpayPayment): Flow {
  return payment.notes?.flow === "anxiety" ? "anxiety" : "homeo";
}

function sheetNameFor(flow: Flow) {
  return flow === "anxiety" ? "anxiety-payments" : "homeo-payments";
}

function sourceFor(flow: Flow) {
  return flow === "anxiety" ? "Anxiety-Payment" : "Homeo-Payment";
}

function signatureMatches(rawBody: string, signature: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function rupees(paise: number) {
  return (paise / 100).toFixed(2);
}

function payerName(p: RazorpayPayment) {
  return p.notes?.name?.trim() || "Razorpay customer";
}

function payerPhone10(p: RazorpayPayment) {
  return (p.notes?.phone || p.contact || "").replace(/\D/g, "").slice(-10);
}

function payerPhoneIntl(p: RazorpayPayment) {
  const ten = payerPhone10(p);
  return ten.length === 10 ? `91${ten}` : (p.notes?.phone || p.contact || "").replace(/\D/g, "");
}

function payerEmail(p: RazorpayPayment) {
  return p.notes?.email?.trim() || p.email || "";
}

// ── Google Sheet (same generic contract as /api/submissions) ─────────────────
async function pushToSheet(payment: RazorpayPayment, event: string, flow: Flow) {
  const url = (process.env.GOOGLE_APPS_SCRIPT_URL || "").trim();
  if (!url) throw new Error("GOOGLE_APPS_SCRIPT_URL is not set");

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const status = event === "payment.captured" ? "Paid" : "Failed";
  const amount = `${payment.currency} ${rupees(payment.amount)}`;
  const source = payment.notes?.source || sourceFor(flow);

  const row = [
    timestamp,
    source,
    payerName(payment),
    payerPhone10(payment),
    payerEmail(payment),
    amount,
    status,
    payment.id,
    payment.order_id,
    payment.method || "",
    payment.notes?.source || "",
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      timestamp,
      source,
      name: payerName(payment),
      phone: payerPhone10(payment),
      email: payerEmail(payment),
      pageUrl: payment.notes?.source || "",
      url: payment.notes?.source || "",
      amount,
      paymentStatus: status,
      paymentId: payment.id,
      orderId: payment.order_id,
      method: payment.method || "",
      webhookSecret: process.env.GOOGLE_APPS_SCRIPT_SECRET || "",
      sheetName: sheetNameFor(flow),
      headers: PAYMENT_HEADERS,
      row,
    }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Google Apps Script failed with ${res.status}: ${text}`);
  return text;
}

// ── TeleCRM (same shape as /api/submissions) ─────────────────────────────────
async function pushToTeleCRM(payment: RazorpayPayment, event: string) {
  const url = process.env.TELECRM_API_URL;
  const key = process.env.TELECRM_API_KEY;
  if (!url || !key) return;

  const phone = payerPhoneIntl(payment);
  if (!phone) return;

  const paid = event === "payment.captured";
  const amount = `${payment.currency} ${rupees(payment.amount)}`;
  const product = payment.notes?.product || "Consultation";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const payload = {
    fields: { phone, name: payerName(payment), email: payerEmail(payment) },
    actions: [
      {
        type: "SYSTEM_NOTE",
        text: paid
          ? `Payment CAPTURED for ${product} — ${amount} (Payment ${payment.id})`
          : `Payment FAILED for ${product} — ${amount} (Payment ${payment.id})`,
      },
      { type: "SYSTEM_NOTE", text: `Amount: ${amount}` },
      { type: "SYSTEM_NOTE", text: `Payment Status: ${paid ? "Paid" : "Failed"}` },
      { type: "SYSTEM_NOTE", text: `Razorpay Payment ID: ${payment.id}` },
      { type: "SYSTEM_NOTE", text: `Razorpay Order ID: ${payment.order_id}` },
      { type: "SYSTEM_NOTE", text: `Method: ${payment.method || "Not specified"}` },
      { type: "SYSTEM_NOTE", text: `Source: ${payment.notes?.source || "Not specified"}` },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
        "X-Client-ID": "nextjs-website-integration",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok && res.status !== 204) {
      const text = await res.text();
      throw new Error(`TeleCRM HTTP ${res.status}: ${text.slice(0, 200)}`);
    }
  } catch (err) {
    clearTimeout(timeout);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[Razorpay webhook] RAZORPAY_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = req.headers.get("x-razorpay-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // The signature is computed over the exact bytes Razorpay sent, so the raw
  // text must be read before any JSON parsing.
  const rawBody = await req.text();

  if (!signatureMatches(rawBody, signature, secret)) {
    console.error("[Razorpay webhook] Signature mismatch — request rejected");
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let body: { event?: string; payload?: { payment?: { entity?: RazorpayPayment } } };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const event = body.event || "";
  const payment = body.payload?.payment?.entity;

  // Anything we don't act on is acknowledged with 200 so Razorpay stops retrying.
  if (event !== "payment.captured" && event !== "payment.failed") {
    return NextResponse.json({ received: true, ignored: event }, { status: 200 });
  }
  if (!payment?.id) {
    return NextResponse.json({ received: true, ignored: "no payment entity" }, { status: 200 });
  }

  const flow = flowOf(payment);

  const [sheetResult, crmResult] = await Promise.allSettled([
    pushToSheet(payment, event, flow),
    pushToTeleCRM(payment, event),
  ]);

  if (sheetResult.status === "rejected") {
    console.error("[Razorpay webhook Sheet] Error:", sheetResult.reason?.message);
  }
  if (crmResult.status === "rejected") {
    console.error("[Razorpay webhook TeleCRM] Error:", crmResult.reason?.message);
  }

  // Always 200 on a verified event — an error response would make Razorpay
  // retry and duplicate the row that did succeed.
  return NextResponse.json(
    {
      received: true,
      event,
      flow,
      paymentId: payment.id,
      sheet: sheetResult.status === "fulfilled" ? "ok" : "failed",
      crm: crmResult.status === "fulfilled" ? "ok" : "failed",
    },
    { status: 200 },
  );
}
