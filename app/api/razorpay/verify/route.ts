import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Razorpay signs `order_id|payment_id` with the key secret. Recomputing it here
// is what proves the browser success callback really came from Razorpay and was
// not faked.
function signatureMatches(orderId: string, paymentId: string, signature: string, secret: string) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

async function fetchPayment(paymentId: string, keyId: string, keySecret: string) {
  const auth = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
  const res = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: { Authorization: auth },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Razorpay HTTP ${res.status}`);
  return res.json();
}

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Payments are not configured." }, { status: 500 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderId = body.razorpay_order_id || "";
  const paymentId = body.razorpay_payment_id || "";
  const signature = body.razorpay_signature || "";

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json({ error: "Incomplete payment details." }, { status: 400 });
  }

  if (!signatureMatches(orderId, paymentId, signature, keySecret)) {
    console.error("[Razorpay verify] Signature mismatch for order", orderId);
    return NextResponse.json(
      { verified: false, error: "We could not verify this payment." },
      { status: 400 },
    );
  }

  // Signature is valid — confirm with Razorpay that the payment actually
  // succeeded before we let the client move on to the thank-you page.
  try {
    const payment = await fetchPayment(paymentId, keyId, keySecret);

    if (payment.status !== "captured" && payment.status !== "authorized") {
      return NextResponse.json(
        { verified: false, error: `Payment is ${payment.status}. Please try again.` },
        { status: 400 },
      );
    }
    if (payment.order_id !== orderId) {
      return NextResponse.json(
        { verified: false, error: "We could not verify this payment." },
        { status: 400 },
      );
    }
  } catch (err) {
    // The signature already proved the payment is genuine — don't block the
    // client on a transient lookup failure.
    console.error(
      "[Razorpay verify] Payment lookup failed:",
      err instanceof Error ? err.message : err,
    );
  }

  return NextResponse.json({ verified: true, paymentId, orderId });
}
