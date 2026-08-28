import SiteFooter from "@/components/anxiety-lp/Sitefooter";
import SiteNavbar from "@/components/anxiety-lp/Sitenavbar";

const sections = [
  {
    title: "1. Overview",
    body: 'This Cancellation & Refund Policy explains the terms under which B-Homeo Wellness ("we", "our", "us") handles consultation cancellations, rescheduling, and refunds for our anxiety care services.',
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

      <main className="mx-auto w-full max-w-[1000px] flex-1 px-6 py-12 sm:py-16">
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
      </main>

      <SiteFooter />
    </div>
  );
}
