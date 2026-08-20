"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
import BookingModal from "./BookingModal";

export default function FinalCta() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="overflow-hidden bg-white pt-8 font-sans lg:py-0">
      <div className="relative mx-auto w-full overflow-hidden bg-[#000d44] lg:grid lg:min-h-[430px] lg:grid-cols-[1.05fr_.95fr]">
        <span className="absolute -left-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <span className="absolute left-[38%] top-10 h-40 w-40 rounded-full bg-[#1f5fff]/10 blur-2xl" />

        {/* Desktop / tablet-lg layout — unchanged */}
        <Reveal direction="left" className="relative z-10 hidden flex-col items-start justify-center px-7 py-10 text-white sm:px-12 lg:flex lg:px-16 lg:py-0">
          <p className="text-[13px] font-bold tracking-[1.2px] text-[#1f5fff] sm:text-[14px]">FINAL CTA SECTION</p>
          <h2 className="mt-5 max-w-[650px] text-[30px] leading-[1.25] font-extrabold sm:text-[38px] lg:text-[44px]">
            Take The First Step Towards <span className="text-[#1f5fff]"> Better Emotional Wellbeing</span>
          </h2>
          <button type="button" onClick={() => setBookingOpen(true)} className="group relative mt-8 inline-flex rounded-[10px] bg-[#1f5fff] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-[#1f5fff]/20 transition-opacity hover:opacity-90">
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{ width: "calc(100% - 14px)", height: "calc(100% - 14px)" }} />
            </svg>
            <span className="relative z-10">Book Your Consultation Today </span>
          </button>
        </Reveal>

        <Reveal direction="right" className="relative hidden min-h-[360px] lg:block lg:min-h-full">
          <span className="absolute inset-y-8 left-0 z-10 hidden w-px bg-white/15 lg:block" />
          <div className="absolute inset-5 overflow-hidden rounded-[24px] sm:inset-7 lg:bottom-0 lg:left-8 lg:right-0 lg:top-0 lg:rounded-l-[45%] lg:rounded-r-none">
            <Image src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228025/image-5.png" alt="B Homeo doctor supporting a child during a consultation" fill sizes="(max-width: 1024px) 100vw, 620px" quality={95} className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000d44]/25 via-transparent to-transparent" />
          </div>
        </Reveal>

        {/* Mobile / tablet layout — label, heading, image, button */}
        <div className="relative z-10 px-7 py-12 text-white sm:px-12 lg:hidden">
          <Reveal direction="left">
            <p className="text-[13px] font-bold tracking-[1.2px] text-[#1f5fff] sm:text-[14px]">FINAL CTA SECTION</p>
            <h2 className="mt-5 max-w-[650px] text-[30px] leading-[1.25] font-extrabold sm:text-[38px]">
              Ready to Take the First Step Toward <span className="text-[#1f5fff]">Better Support for Your Child?</span>
            </h2>
          </Reveal>

          <Reveal direction="right" className="relative mt-7 aspect-[4/3] w-full overflow-hidden rounded-[24px] sm:aspect-[16/9]">
            <Image src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228025/image-5.png" alt="B Homeo doctor supporting a child during a consultation" fill sizes="100vw" quality={95} className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000d44]/35 via-transparent to-transparent" />
          </Reveal>

          <Reveal direction="up" className="flex max-sm:justify-center">
            <button type="button" onClick={() => setBookingOpen(true)} className="group relative mt-7 inline-flex rounded-[10px] bg-[#1f5fff] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-[#1f5fff]/20 transition-opacity hover:opacity-90">
              <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                <rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{ width: "calc(100% - 14px)", height: "calc(100% - 14px)" }} />
              </svg>
              <span className="relative z-10">Start with a Consultation</span>
            </button>
          </Reveal>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
