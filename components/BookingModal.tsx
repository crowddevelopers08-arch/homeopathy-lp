"use client";

import { useEffect, useState } from "react";

export default function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Homeo-Form-Leads",
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          pageUrl: window.location.href,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      window.location.href = "/thank-you";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="relative w-full max-w-[440px] rounded-2xl bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-[#000d44]/60 transition-transform duration-200 hover:rotate-90 hover:bg-black/5"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p className="text-[13px] font-bold tracking-[1px] text-[#1f5fff]">BOOK A CONSULTATION</p>
        <h3 className="mt-2 text-[22px] font-extrabold text-[#000d44]">Let’s Get Started</h3>
        <p className="mt-1 text-[14px] leading-6 text-black/60">Fill in your details and our team will reach out to schedule your consultation.</p>

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

          <button
            type="submit"
            disabled={submitting}
            className="group relative mt-2 flex w-full items-center justify-center rounded-[10px] bg-[#1f5fff] px-7 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-[#1f5fff]/20 transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{width:"calc(100% - 14px)",height:"calc(100% - 14px)"}}/></svg>
            <span className="relative z-10">{submitting ? "Submitting..." : "Submit"}</span>
          </button>
          {error && <p className="text-[13px] font-medium text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}