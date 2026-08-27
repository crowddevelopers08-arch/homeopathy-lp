"use client";

import Image from "next/image";
import { useState } from "react";
import BookingModal from "./BookingModal";
import ConsultationButton from "./ConsultationButton";
import Reveal from "./Reveal";

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
            Ready to Take the First Step Toward <span className="text-[#1f5fff]">Better Support for Your Child?</span>
          </h2>
          <ConsultationButton onClick={() => setBookingOpen(true)} className="mt-8" />
        </Reveal>

        <Reveal direction="right" className="relative hidden min-h-[360px] lg:block lg:min-h-full">
          <span className="absolute inset-y-8 left-0 z-10 hidden w-px bg-white/15 lg:block" />
          <div className="absolute inset-5 overflow-hidden rounded-[24px] sm:inset-7 lg:bottom-0 lg:left-8 lg:right-0 lg:top-0 lg:rounded-l-[45%] lg:rounded-r-none">
            <Image src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228019/final-cts.png" alt="B Homeo doctor supporting a child during a consultation" fill sizes="(max-width: 1024px) 100vw, 620px" quality={95} className="object-cover object-center" />
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
            <Image src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228017/final-cta.png" alt="B Homeo doctor supporting a child during a consultation" fill sizes="100vw" quality={95} className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000d44]/35 via-transparent to-transparent" />
          </Reveal>

          <Reveal direction="up" className="flex max-sm:justify-center">
            <ConsultationButton onClick={() => setBookingOpen(true)} className="mt-7" />
          </Reveal>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
