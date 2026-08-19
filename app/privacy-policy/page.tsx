import SiteFooter from "@/components/Sitefooter";
import SiteNavbar from "@/components/Sitenavbar";
import Link from "next/link";

const sections = [
  {
    title: "1. Introduction",
    body: 'B-Homeo Wellness ("we", "our", "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and consultation services.',
  },
  {
    title: "2. Information We Collect",
    body: "We may collect your name, phone number, WhatsApp contact, email address, child's age and health-related information, and payment details when you book a consultation. We may also collect basic usage data such as browser type and pages visited to improve our website.",
  },
  {
    title: "3. How We Use Your Information",
    body: "Your information is used to schedule and conduct consultations, share appointment details on WhatsApp, process payments, arrange home delivery of prescribed medicines, and respond to your queries. We do not use your health information for any purpose beyond providing your care.",
  },
  {
    title: "4. Sharing of Information",
    body: "We do not sell or rent your personal information. Information may be shared with our consulting doctors, delivery partners for medicine dispatch, and payment processors solely to fulfil your consultation and order. We may disclose information if required by law.",
  },
  {
    title: "5. Data Security",
    body: "We take reasonable technical and organisational measures to protect your personal and health information from unauthorised access, alteration, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "6. Cookies",
    body: "Our website may use cookies to improve your browsing experience and understand how visitors use our site. You can choose to disable cookies through your browser settings, though this may affect certain website features.",
  },
  {
    title: "7. Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by contacting us. You may also withdraw consent for future communication, subject to any ongoing consultation or legal requirements.",
  },
  {
    title: "8. Children's Information",
    body: "As our services relate to paediatric consultations, we collect a child's health information only with a parent or guardian's consent and use it solely for the purpose of providing consultation and treatment.",
  },
  {
    title: "9. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. Continued use of our services after changes indicates acceptance of the updated policy.",
  },
  {
    title: "10. Contact Us",
    body: "If you have any questions about this Privacy Policy or how your information is handled, please reach out to us through the contact details available on our website.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#000d44] font-sans text-white">
      <SiteNavbar />

      <main className="mx-auto w-full max-w-[1260px] flex-1 px-6 py-12 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[14px] font-bold tracking-[1px] text-[#1f5fff]">
            LEGAL
          </p>
          {/* <p className="text-[13px] font-medium text-white/60">Effective Date: January 1, 2026</p> */}
        </div>
        <h1 className="mt-3 text-[30px] font-extrabold leading-tight tracking-[.2px] sm:text-[38px]">
          Privacy Policy
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
