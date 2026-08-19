"use client";

import { useEffect, useState, type SVGProps } from "react";

function ArrowUp({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={['h-4 w-4', className].filter(Boolean).join(" ")}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
<button
  aria-label="Back to top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className={`group fixed bottom-4 right-4 z-50 grid h-9 w-9 place-items-center rounded-[10px] bg-[#1f5fff] text-white shadow-lg shadow-[#1f5fff]/20 transition-all duration-300 hover:opacity-90 ${
    visible ? "opacity-100" : "pointer-events-none opacity-0"
  }`}
>
  <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
    <rect
      x="3"
      y="3"
      rx="6"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeDasharray="6 4"
      className="button-running-dash"
      style={{ width: "calc(100% - 6px)", height: "calc(100% - 6px)" }}
    />
  </svg>
  <ArrowUp className="relative z-10 h-4 w-4" />
</button>
  );
}
