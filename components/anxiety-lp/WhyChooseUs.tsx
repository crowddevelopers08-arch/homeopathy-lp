"use client";

import Image from "next/image";
import { useState } from "react";
import BookingModal from "./BookingModal";

const reasons = [
  {
    title: "Detailed Case Understanding & Root Cause Assessment",
    image: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228024/images-1.png",
    alt: "Doctor listening carefully during a detailed case history session",
  },
  {
    title: "Personalised Homeopathic Approach",
    image: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228027/images-2.png",
    alt: "Homeopathic remedies prepared for a personalised treatment plan",
  },
  {
    title: "Emotional & Lifestyle Factors Considered",
    image: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228030/images-3.png",
    alt: "Calm, supportive conversation about emotional and lifestyle wellbeing",
  },
  {
    title: "Doctor-Led Consultation & Guidance",
    image: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228032/images-4.png",
    alt: "B Homeo doctor guiding a patient through their consultation",
  },
  {
    title: "Online & Offline Consultation Available",
    image: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228025/image-5.png",
    alt: "Patient joining a consultation from home on a video call",
  },
  {
    title: "Follow-Up Every 15 Days",
    image: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228032/images-6.png",
    alt: "Doctor reviewing progress notes for a scheduled follow-up",
  },
];

function CheckBadge() {
  return (
    <span className="absolute -bottom-4 left-5 z-10 grid h-9 w-9 place-items-center rounded-full bg-[#1f5fff] text-white shadow-lg shadow-[#1f5fff]/30 ring-4 ring-white">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function ReasonCard({ title, image, alt }: { title: string; image: string; alt: string }) {
  return (
    <article className="w-[270px] shrink-0 overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(0,13,68,.08)] sm:w-[300px]">
      <div className="relative aspect-[4/4] overflow-hidden">
        <Image src={image} alt={alt} fill sizes="300px" className="object-cover" />

      </div>
      <div className="px-5 pb-2 pt-3">
        <h3 className="text-[15px] leading-[22px] font-bold tracking-[.1px] text-[#000d44]">{title}</h3>
      </div>
    </article>
  );
}

export default function WhyChooseUs() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="overflow-hidden bg-[#f4f7ff] py-8 font-sans lg:py-10">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center px-6 text-center">
        <p className="text-[14px] font-bold tracking-[1.2px] text-[#1f5fff]">WHY CHOOSE US</p>
        <h2 className="mt-3 max-sm:mt-1 max-w-[720px] text-[28px] font-extrabold leading-tight tracking-[.1px] text-[#000d44] sm:text-[34px] lg:text-[38px]">
          Why Choose B Homeo Wellness For Your <span className="text-[#1f5fff]">Anxiety Care?</span>
        </h2>
        <span className="mt-5 max-sm:mt-2 h-[4px] w-[100px] bg-[#1f5fff]" />
      </div>

      <div className="group relative mt-12 max-sm:mt-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-why-marquee gap-6 px-6 group-hover:[animation-play-state:paused]">
          {[...reasons, ...reasons].map((reason, i) => (
            <ReasonCard key={`${reason.title}-${i}`} title={reason.title} image={reason.image} alt={reason.alt} />
          ))}
        </div>
      </div>

<div className="mt-12 max-sm:mt-6 flex justify-center px-6">
  <button
    type="button"
    onClick={() => setBookingOpen(true)}
    className="group relative inline-flex items-center justify-center rounded-[10px] bg-[#1f5fff] px-6 py-3.5 text-center text-[14px] font-semibold text-white shadow-lg shadow-[#1f5fff]/20 transition-opacity hover:opacity-90 sm:px-8"
  >
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <rect
        x="7"
        y="7"
        rx="7"
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

    <span className="relative z-10">
      <span className="hidden sm:inline">
        Take The First Step Towards Personalised Care
      </span>
      <span className="sm:hidden">
        Start Your Care Journey
      </span>
    </span>
  </button>
</div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      <style>{`
        @keyframes why-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-why-marquee {
          animation: why-marquee 34s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-why-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
