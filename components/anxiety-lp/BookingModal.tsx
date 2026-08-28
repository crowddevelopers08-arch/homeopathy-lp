"use client";

import { useEffect, useRef, useState } from "react";
import {
  loadRazorpayCheckout,
  type RazorpayFailureResponse,
  type RazorpaySuccessResponse,
} from "@/components/razorpay";

// idle       → form is editable
// submitting → saving the lead (the non-payment lead is captured here)
// paying     → Razorpay Checkout is opening / on screen
// verifying  → payment done, confirming with the server before redirect
// payFailed  → lead is saved but the payment was cancelled or failed
type Phase = "idle" | "submitting" | "paying" | "verifying" | "payFailed";

const FLOW = "anxiety" as const;
const SOURCE = "Anxiety-Form-Leads";
const THANK_YOU_URL = "/anxiety/thank-you";
const FEE_DISPLAY = "₹199";

export default function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");

  const leadSavedRef = useRef(false);
  const settledRef = useRef(false);
  const leadRef = useRef({ name: "", phone: "", email: "" });

  const busy = phase === "submitting" || phase === "paying" || phase === "verifying";

  // Close and clear everything so a fresh open starts from a clean form.
  function handleClose() {
    if (busy) return;
    leadSavedRef.current = false;
    settledRef.current = false;
    setError("");
    setPhase("idle");
    onClose();
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, busy]);

  if (!open) return null;

  async function startPayment() {
    setError("");
    settledRef.current = false;
    setPhase("paying");

    const { name, phone, email } = leadRef.current;

    try {
      await loadRazorpayCheckout();

      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flow: FLOW,
          name,
          phone,
          email,
          pageUrl: window.location.href,
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order?.error || "Could not start the payment.");
      if (!window.Razorpay) throw new Error("Could not load the payment window.");

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "B Homeo Wellness",
        description: "Anxiety Homeopathy Consultation",
        prefill: {
          name,
          email,
          contact: /^\d{10}$/.test(phone.replace(/\D/g, "")) ? `91${phone.replace(/\D/g, "")}` : phone,
        },
        theme: { color: "#1f5fff" },
        handler: async (response: RazorpaySuccessResponse) => {
          settledRef.current = true;
          setPhase("verifying");
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const result = await verifyRes.json();
            if (!verifyRes.ok || !result.verified) {
              throw new Error(result?.error || "We could not verify your payment.");
            }
            // Full document load (not client nav) so the thank-you page fires
            // its GTM / Google Ads / Meta Pixel conversion events fresh.
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            window.location.href = THANK_YOU_URL;
          } catch (err) {
            setPhase("payFailed");
            setError(
              err instanceof Error
                ? `${err.message} If you were charged, contact us and we'll confirm your booking.`
                : "Something went wrong confirming your payment. Please contact us.",
            );
          }
        },
        modal: {
          ondismiss: () => {
            if (settledRef.current) return;
            setPhase("payFailed");
            setError("");
          },
        },
      });

      checkout.on("payment.failed", (resp: RazorpayFailureResponse) => {
        settledRef.current = true;
        setPhase("payFailed");
        setError(resp?.error?.description || "The payment did not go through.");
      });

      checkout.open();
      setPhase("paying");
    } catch (err) {
      setPhase("payFailed");
      setError(err instanceof Error ? err.message : "Could not open the payment window.");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    setError("");

    if (!name || !phone || !email) {
      setError("Please fill in your name, phone, and email.");
      return;
    }

    leadRef.current = { name, phone, email };

    // Payment retry — the lead is already saved, go straight to Checkout.
    if (leadSavedRef.current) {
      await startPayment();
      return;
    }

    setPhase("submitting");
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: SOURCE,
          name,
          phone,
          email,
          pageUrl: window.location.href,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setPhase("idle");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      // Non-payment lead is captured. Move on to the payment step.
      leadSavedRef.current = true;
      await startPayment();
    } catch (err) {
      setPhase("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
      onClick={handleClose}
    >
      <div role="dialog" aria-modal="true" className="relative w-full max-w-[440px] rounded-2xl bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={handleClose}
          disabled={busy}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-[#000d44]/60 transition-transform duration-200 hover:rotate-90 hover:bg-black/5 disabled:opacity-40"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p className="text-[13px] font-bold tracking-[1px] text-[#1f5fff]">BOOK A CONSULTATION</p>
        <h3 className="mt-2 text-[22px] font-extrabold text-[#000d44]">Let’s Get Started</h3>
        <p className="mt-1 text-[14px] leading-6 text-black/60">
          Fill in your details, then complete the {FEE_DISPLAY} consultation payment to confirm your slot.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="booking-name" className="mb-1.5 block text-[13px] font-semibold text-[#000d44]">Name</label>
            <input id="booking-name" required type="text" name="name" placeholder="Your name" className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-[14px] text-[#000d44] outline-none focus:border-[#1f5fff]" />
          </div>
          <div>
            <label htmlFor="booking-email" className="mb-1.5 block text-[13px] font-semibold text-[#000d44]">Email</label>
            <input id="booking-email" required type="email" name="email" placeholder="you@example.com" className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-[14px] text-[#000d44] outline-none focus:border-[#1f5fff]" />
          </div>
          <div>
            <label htmlFor="booking-phone" className="mb-1.5 block text-[13px] font-semibold text-[#000d44]">Phone Number</label>
            <input id="booking-phone" required type="tel" name="phone" placeholder="Your phone number" className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-[14px] text-[#000d44] outline-none focus:border-[#1f5fff]" />
          </div>

          {phase === "payFailed" && (
            <div className="rounded-[10px] border border-amber-300 bg-amber-50 px-4 py-3 text-[13px] leading-5 text-amber-800">
              {error
                ? error
                : "Payment not completed. Your details are saved — our team will reach out to help you finish booking."}
              <span className="mt-1 block text-[12px] text-amber-700/80">
                You can retry the payment below, or wait for our call.
              </span>
            </div>
          )}

          {error && phase !== "payFailed" && (
            <p className="text-[13px] font-medium text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="group relative mt-2 flex w-full items-center justify-center rounded-[10px] bg-[#1f5fff] px-7 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-[#1f5fff]/20 transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{width:"calc(100% - 14px)",height:"calc(100% - 14px)"}}/></svg>
            <span className="relative z-10">
              {phase === "submitting"
                ? "Saving your details…"
                : phase === "paying"
                  ? "Opening secure payment…"
                  : phase === "verifying"
                    ? "Confirming payment…"
                    : phase === "payFailed"
                      ? `Retry Payment ${FEE_DISPLAY}`
                      : `Proceed to Pay ${FEE_DISPLAY}`}
            </span>
          </button>

          <p className="flex items-center justify-center gap-1.5 text-[11px] text-black/45">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
            Secure payment by Razorpay · UPI, Cards &amp; NetBanking
          </p>
        </form>
      </div>

      {phase === "verifying" && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-4 bg-white/95 px-6 text-center">
          <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#1f5fff]/25 border-t-[#1f5fff]" />
          <p className="text-[15px] font-semibold text-[#000d44]">Confirming your payment…</p>
          <p className="text-[13px] text-black/55">Please don’t close this window.</p>
        </div>
      )}
    </div>
  );
}
