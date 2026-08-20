"use client";

import Image from "next/image";
import { useState } from "react";
import BookingModal from "./BookingModal";
import Reveal from "./Reveal";

type Highlight = {
  title: string;
  text: string;
  alt: string;
  src: string;
};

const highlights: Highlight[] = [
  {
    title: "3 to 6 Month AVG Course",
    text: "ADHD care may require consistent follow-up over time. The duration can vary depending on the child’s needs, symptoms and response to treatment.",
    alt: "Doctor discussing ADHD care duration with a parent and child",
    src: "/about-images-3.png",
  },
  {
    title: "98% Success Rate",
    text: "B Homeo highlights a 98% success rate across its treatment approach, reflecting its experience in providing personalised homeopathic care.",
    alt: "Smiling student writing beside an open book",
    src: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787227997/about-images-4.jpg",
  },
  {
    title: "No Hidden Charges",
    text: "The first online consultation fee is fixed. Medicine charges, if applicable, are communicated by the doctor after consultation.",
    alt: "Children in a classroom",
    src: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228003/about-images-2.avif",
  },
  {
    title: "Advanced Homeopathy Kit",
    text: "A structured homeopathic medicine approach designed to provide personalised support based on the child’s symptoms and overall assessment.",
    alt: "Prescribed homeopathic medicines delivered to a home",
    src: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228004/about-images-3.avif",
  },
];

function HighlightImage({ h }: { h: Highlight }) {
  return (
    <div className="relative h-[270px] w-full overflow-hidden rounded-[16px] bg-[#eef2ff]">
      <Image src={h.src} alt={h.alt} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" quality={100} className="object-cover" />
    </div>
  );
}

function HighlightCard({ h }: { h: Highlight }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[20px] bg-[#000d44]" />
      <div className="relative rounded-[20px] border border-black/5 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,.04)]">
        <HighlightImage h={h} />
        <h3 className="mt-5 text-[20px] leading-[1.35] font-extrabold text-[#000d44]">{h.title}</h3>
        <p className="mt-2 text-[14.5px] leading-7 text-black/60">{h.text}</p>
      </div>
    </div>
  );
}

export default function NewsArticles() {
  const [active, setActive] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  const goPrev = () => setActive((prev) => (prev === 0 ? highlights.length - 1 : prev - 1));
  const goNext = () => setActive((prev) => (prev === highlights.length - 1 ? 0 : prev + 1));

  return (
    <section className="bg-white max-sm:py-6 py-10 font-sans">
      <div className="mx-auto max-w-[1400px] px-6 max-sm:px-4">
        <Reveal direction="up" className="mx-auto max-w-[700px] text-center">
          <p className="text-[14px] font-bold tracking-[1px] text-[#1f5fff]">ABOUT THE ADHD CARE PROGRAMME</p>
          <h2 className="mt-3 text-[26px] leading-tight font-extrabold text-[#000d44] sm:text-[30px]">What You Can Expect from B Homeo ADHD Care</h2>
        </Reveal>

        {/* Tablet / desktop grid */}
        <div className="mt-14 hidden gap-10 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.title} direction="up" delay={i * 100}>
              <HighlightCard h={h} />
            </Reveal>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-5 sm:hidden">
          <HighlightCard h={highlights[active]} />

          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f5fff] text-white shadow-md transition-transform hover:scale-110 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-2">
              {highlights.map((h, i) => (
                <button
                  key={h.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-[#1f5fff]" : "w-2 bg-[#1f5fff]/30"}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f5fff] text-white shadow-md transition-transform hover:scale-110 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <Reveal direction="up" className="mt-14 max-sm:mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="group relative inline-flex rounded-[10px] bg-[#1f5fff] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-black/10 transition-opacity hover:opacity-90"
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{width:"calc(100% - 14px)",height:"calc(100% - 14px)"}}/></svg>
            <span className="relative z-10">Book a Consultation</span>
          </button>
        </Reveal>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
