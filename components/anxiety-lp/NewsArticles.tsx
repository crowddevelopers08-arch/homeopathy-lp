"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import BookingModal from "./BookingModal";

type Highlight = {
  title: string;
  text: string;
  alt: string;
  src: string;
};

const highlights: Highlight[] = [
  {
    title: "Generalised Anxiety",
    text: "Persistent worry about everyday situations, often accompanied by restlessness, tension, and difficulty relaxing.",
    alt: "Person experiencing persistent everyday worry",
    src: "/service-9.avif",
  },
  {
    title: "Panic Disorder",
    text: "Sudden episodes of intense fear or panic that may feel overwhelming and difficult to control.",
    alt: "Person going through a sudden episode of intense fear",
    src: "/service-2.jpg",
  },
  {
    title: "Social Anxiety",
    text: "Excessive fear or discomfort during social interactions, conversations, or public situations.",
    alt: "Person feeling discomfort during a social interaction",
    src: "/service-8.jpg",
  },
  {
    title: "Specific Phobias",
    text: "Strong fear responses towards specific situations, objects, or experiences.",
    alt: "Person reacting to a specific phobia trigger",
    src: "/service-6.avif",
  },
  {
    title: "Anxiety Related Concerns",
    text: "Anxiety may also appear with overthinking, sleep difficulties, concentration issues, irritability, or constant uneasiness. ",
    alt: "Person reacting to a specific phobia trigger",
    src: "/service-7.avif",
  },
];

const concerns = ["Overthinking", "Sleep Difficulties", "Concentration Issues", "Irritability", "Constant Uneasiness"];

function ConcernChip({ text }: { text: string }) {
  return (
    <li className="flex h-[64px] w-[230px] shrink-0 items-center gap-3 rounded-2xl border border-[#1f5fff]/15 bg-[#1f5fff]/5 px-4 shadow-[0_2px_10px_rgba(0,0,0,.04)]">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#1f5fff] text-[13px] font-extrabold text-white">✓</span>
      <span className="text-[14px] font-semibold text-[#000d44]">{text}</span>
    </li>
  );
}

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
  const scrollerRef = useRef<HTMLUListElement>(null);

  const goPrev = () => setActive((prev) => (prev === 0 ? highlights.length - 1 : prev - 1));
  const goNext = () => setActive((prev) => (prev === highlights.length - 1 ? 0 : prev + 1));

  const scrollByCard = (direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = 300 + 32; // card width + gap
    el.scrollBy({ left: direction === "next" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  return (
    <section className="bg-white max-sm:py-6 py-10 font-sans">
      <div className="mx-auto max-w-[1482px] px-6 max-sm:px-4">
        <Reveal direction="up" className="mx-auto max-w-[700px] text-center">
          <p className="text-[14px] font-bold tracking-[1px] text-[#1f5fff]">TYPES OF ANXIETY</p>
          <h2 className="mt-3 text-[26px] leading-tight font-extrabold text-[#000d44] sm:text-[30px]">Understanding Different Forms of Anxiety</h2>
        </Reveal>

        {/* Desktop / tablet — manual arrow-controlled row, no auto motion */}
        <Reveal direction="up" className="mt-14 hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard("prev")}
            aria-label="Previous"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1f5fff] text-white shadow-md transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <ul
            ref={scrollerRef}
            className="flex flex-1 snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {highlights.map((h, i) => (
              <li key={i} className="w-[300px] shrink-0 snap-start">
                <HighlightCard h={h} />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => scrollByCard("next")}
            aria-label="Next"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1f5fff] text-white shadow-md transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </Reveal>

        {/* Mobile — card on top, arrows + dots together in one neat row below */}
        <Reveal direction="up" className="mt-10 max-sm:mt-5 sm:hidden">
          <HighlightCard h={highlights[active]} key={highlights[active].title} />

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f5fff] text-white shadow-md active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {highlights.map((h, i) => (
                <button
                  key={h.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to ${h.title}`}
                  className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-[#1f5fff]" : "w-2 bg-[#1f5fff]/25"}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f5fff] text-white shadow-md active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </Reveal>

        <Reveal direction="up" className="mt-6 -mx-6 overflow-hidden max-sm:-mx-4">
          <ul className="marquee-track flex w-max gap-4 px-6">
            {[...concerns, ...concerns].map((text, i) => (
              <ConcernChip key={i} text={text} />
            ))}
          </ul>
        </Reveal>

        <Reveal direction="up" className="mt-10 max-sm:mt-6 flex flex-col items-center gap-4 text-center">
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="group relative inline-flex rounded-[10px] bg-[#1f5fff] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-black/10 transition-opacity hover:opacity-90"
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{width:"calc(100% - 14px)",height:"calc(100% - 14px)"}}/></svg>
            <span className="relative z-10">Talk to Our Doctor</span>
          </button>
        </Reveal>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}