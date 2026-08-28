import GoogleConversionTracker from "@/components/anxiety-lp/googleConversionTracker";
import SiteFooter from "@/components/anxiety-lp/Sitefooter";
import SiteNavbar from "@/components/anxiety-lp/Sitenavbar";
import Link from "next/link";
import Script from "next/script";

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#000d44] font-sans text-white">
      <GoogleConversionTracker />
      <SiteNavbar />

      {/* Google Ads Conversion Tracking - Submit Lead */}
      <Script id="google-ads-conversion-thankyou" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-18360214394/6x1sCl3gqOkcEPrG6rJE'
          });
        `}
      </Script>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(31,95,255,.18)_0%,transparent_60%)]" />

        <div className="relative z-10 mx-auto w-full max-w-[620px] text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#1f5fff] shadow-lg shadow-[#1f5fff]/30">
            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 className="mt-8 text-[32px] font-extrabold leading-tight tracking-[.2px] sm:text-[40px]">
            Thank You for Booking with <span className="text-[#1f5fff]">B Homeo Wellness</span>
          </h1>

          <p className="mt-5 text-[16px] leading-7 font-medium text-white/85">
            Your consultation request has been received. We understand reaching out can feel like a big step, and we're glad you did. Your appointment details will be shared with you on WhatsApp shortly.
          </p>

          <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#1f5fff]/60 bg-[linear-gradient(105deg,rgba(31,95,255,.2),rgba(255,255,255,.06))] px-6 py-6 text-left shadow-[0_12px_35px_rgba(0,0,0,.18)]">
            <span className="absolute inset-y-0 left-0 w-1.5 bg-[#1f5fff]" />
            <p className="text-[14px] font-bold tracking-[.4px] text-[#1f5fff]">WHAT HAPPENS NEXT</p>
            <ul className="mt-4 space-y-3 text-[14.5px] leading-6 font-semibold text-white/90">
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1f5fff] text-[12px] font-extrabold">1</span>
                <span>You'll receive a confirmation message with your appointment time on WhatsApp.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1f5fff] text-[12px] font-extrabold">2</span>
                <span>A B Homeo doctor will call you at the scheduled time to understand what you've been experiencing — the worry, the triggers, the physical symptoms — at your own pace.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1f5fff] text-[12px] font-extrabold">3</span>
                <span>Based on your case, a personalised homeopathic plan is prepared, with medicines available for home delivery.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1f5fff] text-[12px] font-extrabold">4</span>
                <span>We follow up with you every 15 days to track how you're feeling and adjust care as needed.</span>
              </li>
            </ul>
          </div>

          <p className="mt-6 text-[13.5px] font-medium text-white/60">
            Didn't get a message within a few minutes? Check your WhatsApp requests, or reach out to us directly.
          </p>

          <Link
            href="/"
            className="group relative mt-8 inline-flex rounded-[10px] bg-[#1f5fff] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-[#1f5fff]/20 transition-opacity hover:opacity-90"
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{ width: "calc(100% - 14px)", height: "calc(100% - 14px)" }} />
            </svg>
            <span className="relative z-10">Return to Homepage</span>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}