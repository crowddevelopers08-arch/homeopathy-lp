import SiteFooter from "@/components/Sitefooter";
import SiteNavbar from "@/components/Sitenavbar";
import Link from "next/link";

const sections = [
  {
    title: "1. Overview",
    body: 'This Cancellation & Refund Policy explains the terms under which B-Homeo Wellness ("we", "our", "us") handles consultation cancellations, rescheduling, and refunds for our ADHD care services.',
  },
  {
    title: "2. Cancelling a Consultation",
    body: "You may cancel a booked consultation by contacting us at least 24 hours before the scheduled appointment time via WhatsApp, phone, or email. Cancellations requested with shorter notice may not be eligible for a full refund.",
  },
  {
    title: "3. Rescheduling",
    body: "If you are unable to attend a scheduled consultation, you may request to reschedule at least 12 hours in advance, subject to practitioner availability, at no additional charge.",
  },
  {
    title: "4. Refund Eligibility",
    body: "Consultation fees are refundable in full if a cancellation is made within the notice period stated above, or if we are unable to provide the scheduled consultation. Refunds are not applicable once a consultation has been conducted.",
  },
  {
    title: "5. Non-Refundable Items",
    body: "Once medicines have been prepared, dispatched, or delivered, they are non-refundable and non-returnable, as they are prepared specifically based on your consultation and prescription.",
  },
  {
    title: "6. Refund Process & Timeline",
    body: "Approved refunds are processed to the original payment method within 7-10 business days. Processing times may vary depending on your bank or payment provider.",
  },
  {
    title: "7. Cancellation by Us",
    body: "In rare cases where we need to cancel or reschedule a consultation due to practitioner unavailability or unforeseen circumstances, you will be notified promptly and offered a free rescheduling or a full refund.",
  },
  {
    title: "8. Delivery Issues & Damaged Products",
    body: "If you receive damaged, incorrect, or defective medicines, please contact us within 48 hours of delivery with photographic evidence so we can arrange a replacement or appropriate resolution.",
  },
  {
    title: "9. How to Request a Cancellation or Refund",
    body: "To request a cancellation, rescheduling, or refund, please reach out to us through the contact details available on our website, along with your booking details.",
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this Cancellation & Refund Policy from time to time. Any changes will be posted on this page with a revised effective date.",
  },
];

export default function CancellationAndRefundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#000d44] font-sans text-white">
      <SiteNavbar />

      <main className="mx-auto w-full max-w-[1260px] flex-1 px-6 py-12 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[14px] font-bold tracking-[1px] text-[#1f5fff]">
            LEGAL
          </p>
        </div>
        <h1 className="mt-3 text-[30px] font-extrabold leading-tight tracking-[.2px] sm:text-[38px]">
          Cancellation &amp; Refund Policy
        </h1>
        <span className="mt-5 block h-[4px] w-[90px] bg-[#1f5fff]" />

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-[18px] font-extrabold tracking-[.1px] text-white sm:text-[19px]">
                {section.title}
              </h2>
              <p className="mt-3 text-[15px] leading-7 font-medium text-white/85">
                {section.body}
              </p>
            </section>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-[#1f5fff] px-5 py-3 mt-8 text-[13px] font-semibold text-white shadow-lg shadow-black/10 transition-opacity hover:opacity-90 sm:px-7 sm:py-3.5 sm:text-[14px]"
          >
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <rect
                x="7"
                y="7"
                rx="8"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="10 7"
                className="button-running-dash"
                style={{
                  width: "calc(100% - 14px)",
                  height: "calc(100% - 14px)",
                }}
              />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="relative z-10 h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M11 18l-6-6 6-6" />
            </svg>
            <span className="relative z-10">Back to Home</span>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
