import SiteFooter from "@/components/anxiety-lp/Sitefooter";
import SiteNavbar from "@/components/anxiety-lp/Sitenavbar";


const sections = [
  {
    title: "1. Introduction",
    body: "B-Homeo Wellness (\"we\", \"our\", \"us\") respects your privacy and is committed to protecting the personal and health information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and anxiety care consultation services.",
  },
  {
    title: "2. Information We Collect",
    body: "We may collect your name, phone number, WhatsApp contact, email address, and details you share about your symptoms, triggers, lifestyle, and mental or emotional wellbeing when you book or attend a consultation. We may also collect basic usage data such as browser type and pages visited to improve our website.",
  },
  {
    title: "3. How We Use Your Information",
    body: "Your information is used to schedule and conduct consultations, share appointment details on WhatsApp, prepare a personalised homeopathic care plan, process payments, arrange home delivery of prescribed medicines, and follow up on your progress. We do not use your health information for any purpose beyond providing your care.",
  },
  {
    title: "4. Sharing of Information",
    body: "We do not sell or rent your personal or health information. Information may be shared with our consulting doctors, delivery partners for medicine dispatch, and payment processors solely to fulfil your consultation and order. We may disclose information if required by law.",
  },
  {
    title: "5. Sensitive Health Information",
    body: "Details you share about anxiety, panic, phobias, or related emotional and physical symptoms are treated as sensitive health information. Access is limited to the doctors and staff directly involved in your care, and this information is never used for marketing purposes.",
  },
  {
    title: "6. Data Security",
    body: "We take reasonable technical and organisational measures to protect your personal and health information from unauthorised access, alteration, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "7. Cookies",
    body: "Our website may use cookies to improve your browsing experience and understand how visitors use our site. You can choose to disable cookies through your browser settings, though this may affect certain website features.",
  },
  {
    title: "8. Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by contacting us. You may also withdraw consent for future communication, subject to any ongoing consultation or legal requirements.",
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

      <main className="mx-auto w-full max-w-[1000px] flex-1 px-6 py-12 sm:py-16">

        <h1 className="mt-3 text-[30px] font-extrabold leading-tight tracking-[.2px] sm:text-[38px]">Privacy Policy</h1>
        <span className="mt-5 block h-[4px] w-[90px] bg-[#1f5fff]" />

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-[18px] font-extrabold tracking-[.1px] text-white sm:text-[19px]">{section.title}</h2>
              <p className="mt-3 text-[15px] leading-7 font-medium text-white/85">{section.body}</p>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}