import type { ButtonHTMLAttributes } from "react";

type ConsultationButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ConsultationButton({ className = "", ...props }: ConsultationButtonProps) {
  return (
    <button
      type="button"
      className={`group relative inline-flex flex-col items-center rounded-[10px] bg-[#1f5fff] max-sm:px-4 px-7 py-3.5 text-center text-white shadow-lg shadow-black/10 transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{ width: "calc(100% - 14px)", height: "calc(100% - 14px)" }} />
      </svg>
      <span className="relative z-10 text-[15px] font-bold leading-tight max-sm:text-[14px]">Get 1:1 Personalised Consultation</span>
      <span className="relative z-10 mt-1 text-[13px] font-medium opacity-90">Book Now at ₹199</span>
    </button>
  );
}
