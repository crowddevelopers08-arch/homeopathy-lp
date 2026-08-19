import Link from "next/link";

function BrandLogo() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2 text-white no-underline" aria-label="B-Homeo Wellness home">
      <span className="min-w-0">
        <strong className="block truncate text-[18px] leading-5 font-extrabold sm:text-[29px]">B-Homeo Wellness</strong>
        <small className="mt-1 hidden text-[12px] tracking-[.2px] sm:block sm:text-[14px]">Acceptance • Understanding • Love</small>
      </span>
    </Link>
  );
}

export default function SiteNavbar() {
  return (
    <header className="relative z-30 mx-auto flex w-full max-w-[1480px] flex-nowrap items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-0 sm:h-[80px] lg:px-16">
      <BrandLogo />

      <Link
        href="/"
        className="group relative inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1f5fff] px-3.5 py-3 text-[13px] font-semibold text-white shadow-lg shadow-black/10 transition-opacity hover:opacity-90 sm:px-7 sm:py-3.5 sm:text-[14px]"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <rect
            x="7"
            y="7"
            rx="8"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="10 7"
            className="button-running-dash"
            style={{ width: "calc(100% - 14px)", height: "calc(100% - 14px)" }}
          />
        </svg>
        <svg viewBox="0 0 24 24" className="relative z-10 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M11 18l-6-6 6-6" />
        </svg>
        <span className="relative z-10 hidden sm:inline">Back to Home</span>
      </Link>
    </header>
  );
}