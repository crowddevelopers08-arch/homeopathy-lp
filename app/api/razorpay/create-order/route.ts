import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RAZORPAY_ORDERS_URL = "https://api.razorpay.com/v1/orders";

// The two landing pages share this endpoint. `flow` only changes the labels
// stored on the order — the webhook reads `notes.flow` to route its writes.
type Flow = "homeo" | "anxiety";

const FLOW_META: Record<Flow, { product: string; receiptPrefix: string; source: string }> = {
  homeo: {
    product: "Online Homeopathy Consultation",
    receiptPrefix: "homeo",
    source: "Homeo-Form-Leads",
  },
  anxiety: {
    product: "Anxiety Homeopathy Consultation",
    receiptPrefix: "anx",
    source: "Anxiety-Form-Leads",
  },
};

// The amount is decided here, on the server, never taken from the client —
// otherwise a user could edit the request and pay ₹1 for the consultation.
function consultationAmountInPaise() {
  const rupees = Number(process.env.RAZORPAY_CONSULTATION_AMOUNT);
  if (!Number.isFinite(rupees) || rupees <= 0) return null;
  return Math.round(rupees * 100);
}

function basicAuth(keyId: string, keySecret: string) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error("[Razorpay] RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set");
    return NextResponse.json(
      { error: "Payments are not configured yet. Please contact us to book." },
      { status: 500 },
    );
  }

  const amount = consultationAmountInPaise();
  if (amount === null) {
    console.error("[Razorpay] RAZORPAY_CONSULTATION_AMOUNT is missing or invalid");
    return NextResponse.json(
      { error: "Payments are not configured yet. Please contact us to book." },
      { status: 500 },
    );
  }

  let flow: Flow = "homeo";
  let name = "";
  let phone = "";
  let email = "";
  let pageUrl = "";
  try {
    const body = await req.json();
    if (body?.flow === "anxiety" || body?.flow === "homeo") flow = body.flow;
    name = clean(body?.name, 80);
    phone = clean(body?.phone, 20).replace(/\D/g, "").slice(0, 15);
    email = clean(body?.email, 120);
    pageUrl = clean(body?.pageUrl, 200);
  } catch {
    // No body is fine — nothing here is required for the order itself.
  }

  const meta = FLOW_META[flow];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(RAZORPAY_ORDERS_URL, {
      method: "POST",
      headers: {
        Authorization: basicAuth(keyId, keySecret),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `${meta.receiptPrefix}_${Date.now()}`.slice(0, 40),
        notes: {
          flow,
          product: meta.product,
          source: pageUrl || meta.source,
          ...(name ? { name } : {}),
          ...(phone ? { phone } : {}),
          ...(email ? { email } : {}),
        },
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    const order = await res.json();
    if (!res.ok) {
      throw new Error(order?.error?.description || `Razorpay HTTP ${res.status}`);
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId, // publishable key — safe to expose to the browser
    });
  } catch (err) {
    clearTimeout(timeout);
    console.error("[Razorpay create-order] Error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Could not start the payment. Please try again." },
      { status: 502 },
    );
  }
}
