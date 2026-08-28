import SiteFooter from "@/components/Sitefooter";
import SiteNavbar from "@/components/Sitenavbar";
import Link from "next/link";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: 'By accessing or using the B-Homeo Wellness website and booking a consultation, you ("user", "you") agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.',
  },
  {
    title: "2. Services Offered",
    body: "We provide online homeopathic consultations for ADHD care, along with personalised treatment plans, follow-up guidance, and home delivery of prescribed medicines. Services are offered on a paid, appointment basis.",
  },
  {
    title: "3. Consultation Process",
    body: "Upon booking, appointment details are shared via WhatsApp or the contact information you provide. Consultations are conducted by qualified homeopathic practitioners based on the information and history you share with us.",
  },
  {
    title: "4. Eligibility & Accuracy of Information",
    body: "You confirm that all information provided, including your child's age, symptoms, and medical history, is accurate and complete. Incomplete or inaccurate information may affect the quality of consultation and treatment provided.",
  },
  {
    title: "5. Payments",
    body: "Consultation fees and medicine charges must be paid in advance through the payment methods made available on our website. Prices are subject to change without prior notice, though confirmed bookings will honour the price quoted at the time of payment.",
  },
  {
    title: "6. Medicines & Delivery",
    body: "Prescribed medicines are dispatched to the address provided by you. Delivery timelines may vary based on location and courier availability. We are not responsible for delays caused by courier partners or incorrect address details.",
  },
  {
    title: "7. No Guarantee of Outcome",
    body: "Homeopathic treatment outcomes vary from individual to individual. While our practitioners provide care based on established homeopathic principles, we do not guarantee specific results and do not represent our services as a substitute for emergency medical care.",
  },
  {
    title: "8. User Conduct",
    body: "You agree to use our website and services only for lawful purposes and to interact respectfully with our staff and practitioners. We reserve the right to refuse or discontinue service in cases of misuse, abuse, or fraudulent activity.",
  },
  {
    title: "9. Intellectual Property",
    body: "All content on this website, including text, graphics, logos, and design, is the property of B-Homeo Wellness and may not be reproduced or used without our prior written consent.",
  },
  {
    title: "10. Limitation of Liability",
    body: "B-Homeo Wellness shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services, to the extent permitted by applicable law.",
  },
  {
    title: "11. Changes to These Terms",
    body: "We may update these Terms & Conditions from time to time. Any changes will be posted on this page with a revised effective date. Continued use of our services after changes indicates acceptance of the updated terms.",
  },
  {
    title: "12. Contact Us",
    body: "If you have any questions about these Terms & Conditions, please reach out to us through the contact details available on our website.",
  },
];

export default function TermsAndConditionsPage() {
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
          Terms &amp; Conditions
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
