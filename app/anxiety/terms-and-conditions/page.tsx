import SiteFooter from "@/components/anxiety-lp/Sitefooter";
import SiteNavbar from "@/components/anxiety-lp/Sitenavbar";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: 'By accessing or using the B-Homeo Wellness website and booking a consultation, you ("user", "you") agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.',
  },
  {
    title: "2. Services Offered",
    body: "We provide online homeopathic consultations for anxiety care, along with personalised care plans, follow-up guidance, and home delivery of prescribed medicines. Services are offered on a paid, appointment basis.",
  },
  {
    title: "3. Consultation Process",
    body: "Upon booking, appointment details are shared via WhatsApp or the contact information you provide. Consultations are conducted by qualified homeopathic practitioners based on the symptoms and history you share with us.",
  },
  {
    title: "4. Accuracy of Information",
    body: "You confirm that all information provided, including your symptoms, triggers, and medical history, is accurate and complete. Incomplete or inaccurate information may affect the quality of consultation and care provided.",
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
    title: "7. No Guarantee of Outcome & Emergencies",
    body: "Homeopathic treatment outcomes vary from individual to individual. Our services are not intended for medical emergencies or crisis situations; if you are experiencing a mental health emergency, please seek immediate professional or emergency medical help.",
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

      <main className="mx-auto w-full max-w-[1000px] flex-1 px-6 py-12 sm:py-16">
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
      </main>

      <SiteFooter />
    </div>
  );
}
