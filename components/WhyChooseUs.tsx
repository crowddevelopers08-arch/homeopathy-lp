"use client";

import Image from "next/image";
import { useState } from "react";
import BookingModal from "./BookingModal";
import Reveal from "./Reveal";

const reasons = [
  {
    number: "1",
    title: "Predominantly Inattentive Presentation",
    text: "A child may find it difficult to stay focused, follow instructions, organise tasks or remember everyday responsibilities.",
  },
  {
    number: "2",
    title: "Predominantly Hyperactive-Impulsive Presentation",
    text: "A child may frequently fidget, find sitting still difficult, interrupt conversations or act before thinking.",
  },
  {
    number: "3",
    title: "Combined Presentation",
    text: "The child may show a combination of both inattentive and hyperactive-impulsive behaviours.",
  },
];

export default function WhyChooseUs() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="relative min-h-[690px] overflow-hidden bg-[#000d44] font-sans">
      <span className="absolute left-0 top-0 z-20 h-[6px] w-[58%] bg-[#1f5fff]" />

      <Image src="/home_2_banner.png" alt="Caregiver helping an elderly woman" fill sizes="100vw" quality={90} className="absolute inset-0 z-0 object-cover object-center" priority />
      <div className="absolute inset-0 z-[1] bg-[#000d44]/80 md:[clip-path:polygon(0_0,68%_0,45%_100%,0%_100%)]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-16 md:px-14">
        <div className="max-w-[700px]">
          <Reveal direction="left">
            <p className="text-[15px] font-bold text-[#1f5fff]">Types of ADHD</p>
            <h2 className="mt-3 text-[26px] font-bold leading-tight text-white sm:text-[28px] lg:text-[30px]">Different Types of ADHD Parents Should Know About</h2>
            <span className="mt-6 block h-[3px] w-10 bg-white/90" />
          </Reveal>

          <ul className="mt-8 space-y-7">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.number} direction="left" delay={i * 120} className="flex gap-6">
                <span className="font-serif text-[46px] italic font-bold leading-none text-white/90">{r.number}</span>
                <div>
                  <p className="text-[18px] font-bold text-white">{r.title}</p>
                  <p className="mt-2 max-w-[420px] text-[15px] leading-7 text-white/90">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal direction="up" delay={reasons.length * 120} className="flex max-sm:justify-center">
            <button type="button" onClick={() => setBookingOpen(true)} className="group relative mt-9 inline-flex rounded-[10px] bg-[#1f5fff] px-7 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-black/10 transition-opacity hover:opacity-90">
              <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{width:"calc(100% - 14px)",height:"calc(100% - 14px)"}}/></svg>
              <span className="relative z-10">Discuss Your Child&rsquo;s Concerns</span>
            </button>
          </Reveal>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
