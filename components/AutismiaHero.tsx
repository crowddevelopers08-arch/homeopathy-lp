"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";
import Reveal from "./Reveal";

function AutismiaLogo() {
  return <a href="#" className="flex items-center gap-2 text-white no-underline" aria-label="Autismia home">
    <span><strong className="block text-[22px] leading-8 font-extrabold md:text-[29px] md:leading-5">B-Homeo Wellness</strong><small className="mt-1 block text-[14px] tracking-[.2px]">Acceptance • Understanding • Love</small></span>
  </a>;
}

const portraits = [
  { name: "A child covering his face", position: "left-0" },
  { name: "A child covering his ears", position: "-left-full" },
  { name: "A thoughtful child looking down", position: "-left-[200%]" },
  { name: "A playful child outdoors", position: "-left-[300%]" },
  { name: "A smiling child covering her eyes", position: "-left-[400%]" },
];

function Portrait({ index, className }: { index: number; className: string }) {
  const item = portraits[index];
  return <div className={`absolute overflow-hidden ${className}`}><Image src="/autismia-children-strip.png" alt={item.name} width={2560} height={1024} quality={90} sizes="850px" className={`absolute top-0 h-full w-[500%] max-w-none object-cover ${item.position}`}/></div>;
}

const features = [
  "Root Cause Analysis",
  "Holistic Assessment of Your Child’s Nature, Fears, Dreams & Behaviour",
  "Mother’s Pregnancy History Considered",
  "Detailed Review of Previous Reports & Investigations",
  "Follow-Up Every 15 Days",
];

function FeatureCard({ text }: { text: string }) {
  return <li className="relative flex h-[88px] w-[230px] shrink-0 items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 shadow-lg shadow-black/10 backdrop-blur-md"><span className="absolute inset-x-0 top-0 h-1 bg-[#1f5fff]"/><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#1f5fff] text-[14px] font-extrabold text-white shadow-md">✓</span><span>{text}</span></li>;
}

export default function AutismiaHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return <section className="relative min-h-[900px] overflow-hidden bg-[#000d44] font-sans text-white lg:min-h-screen">
    <div className="absolute inset-0 overflow-hidden"><Image src="/autismia-children-strip.png" alt="" width={2560} height={1024} priority quality={90} sizes="250vw" className="hero-background-zoom absolute left-0 top-0 h-full w-[250%] max-w-none object-cover object-center opacity-50"/><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,13,68,.9)_0%,rgba(0,13,68,.76)_52%,rgba(0,13,68,.86)_100%)]"/><div className="absolute inset-0 bg-[radial-gradient(circle_at_67%_48%,transparent_0%,rgba(0,13,68,.22)_72%)]"/></div>

    <header className="relative z-30 mx-auto flex h-[90px] max-w-[1380px] items-center justify-between px-6">
      <AutismiaLogo/>
      <nav className="hidden items-center gap-9 text-[14px] font-semibold md:flex"><a className="text-[#1f5fff]" href="#">Home</a><a href="#about">About ADHD</a><a href="#programme">Programme</a><a href="#services">Services</a><a href="#faq">Support</a><a href="#contact">Contact</a></nav>
      <button type="button" onClick={() => setBookingOpen(true)} className="group relative hidden rounded-xl bg-[#1f5fff] px-7 py-3.5 text-[14px] font-semibold shadow-lg shadow-black/10 md:block">
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><rect x="7" y="7" rx="8" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{width:"calc(100% - 14px)",height:"calc(100% - 14px)"}}/></svg>
        <span className="relative z-10">Contact Us</span>
      </button>
      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="relative z-40 grid gap-1.5 transition-transform hover:scale-110 md:hidden"
      >
        <span className={`h-0.5 w-7 bg-white transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}/>
        <span className={`h-0.5 w-7 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}/>
        <span className={`h-0.5 w-7 bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}/>
      </button>
    </header>

    {menuOpen && (
      <div className="absolute inset-x-0 top-[90px] z-30 border-t border-white/10 bg-[#000d44] px-6 py-6 md:hidden">
        <nav className="grid grid-cols-3 gap-x-4 gap-y-5 text-center text-[15px] font-semibold">
          <a onClick={() => setMenuOpen(false)} className="text-[#1f5fff]" href="#">Home</a>
          <a onClick={() => setMenuOpen(false)} href="#about">About Adhd</a>
          <a onClick={() => setMenuOpen(false)} href="#programme">Programme</a>
          <a onClick={() => setMenuOpen(false)} href="#services">Services</a>
          <a onClick={() => setMenuOpen(false)} href="#faq">Support</a>
          <a onClick={() => setMenuOpen(false)} href="#contact">Contact</a>
        </nav>
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            setBookingOpen(true);
          }}
          className="group relative mx-auto mt-6 flex items-center justify-center rounded-xl bg-[#1f5fff] px-7 py-3.5 text-[14px] font-semibold shadow-lg shadow-black/10"
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><rect x="7" y="7" rx="8" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{width:"calc(100% - 14px)",height:"calc(100% - 14px)"}}/></svg>
          <span className="relative z-10">Contact Us</span>
        </button>
      </div>
    )}

    <div className="relative z-10 mx-auto grid max-w-[1380px] grid-cols-1 items-start gap-0 px-6 pb-16 pt-2 md:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:pt-10">
      <div className="contents relative z-20 max-w-[660px] lg:block lg:pt-8">
        <Reveal direction="down" className="order-1 mb-5 text-[14px] font-bold tracking-[.4px] text-[#1f5fff]"> FIRST CONSULTATION ₹499 ONLY</Reveal>
        <Reveal direction="up" delay={100} className="order-2 text-[34px] leading-[1.24] font-medium tracking-[.1px] sm:text-[40px] lg:text-[42px]"><span className="block">Is Your Child Struggling with</span><span className="mt-1 block text-[#1f5fff]">Short Attention Span, Speech Delay,</span><span className="block text-white">Hyperactivity or Impulsive Behaviour?</span></Reveal>
        <Reveal direction="up" delay={200} className="order-3 mt-5 max-w-[620px] text-[16px] leading-7 font-medium text-white/90">Start with a Personalised ADHD Consultation for Your Child at <span className="font-bold text-[#1f5fff]">B Homeo Wellness</span></Reveal>
        <Reveal direction="left" delay={300} className="order-5 relative mt-5 overflow-hidden rounded-2xl border border-[#1f5fff]/60 bg-[linear-gradient(105deg,rgba(31,95,255,.2),rgba(255,255,255,.06))] px-5 py-4 shadow-[0_12px_35px_rgba(0,0,0,.18)]">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-[#1f5fff]"/>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1f5fff] text-[16px] text-white shadow-md">✦</span>
            <div className="space-y-1 text-[15px] leading-6 font-bold sm:text-[16px]">
              <p>Noticeable Changes May Begin Within <span className="text-[#1f5fff]">45 Days</span></p>
              <p>Complete Recovery May Be Possible Within <span className="text-[#1f5fff]">180 Days</span></p>
            </div>
          </div>
        </Reveal>
        <Reveal direction="up" delay={400} className="order-6 mt-6 max-sm:mt-3 justify-start max-sm:justify-center">
          <button type="button" onClick={() => setBookingOpen(true)} className="group relative inline-flex rounded-[10px] bg-[#1f5fff] px-7 py-3.5 text-[14px] font-semibold shadow-lg shadow-black/10 transition-opacity hover:opacity-90">
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{width:"calc(100% - 14px)",height:"calc(100% - 14px)"}}/></svg>
            <span className="relative z-10">Book a Consultation</span>
          </button>
        </Reveal>
      </div>

      <Reveal direction="right" className="hidden relative mx-auto mt-8 h-[560px] w-full max-w-[540px] lg:mt-0 lg:block"><div className="absolute -inset-20 rounded-[50%] border border-white/15"/><div className="absolute -inset-5 rounded-[45%] border border-white/10"/><Portrait index={0} className="left-2 top-5 h-[350px] w-[165px] rounded-[70px]"/><Portrait index={1} className="left-[195px] top-5 h-[165px] w-[165px] rounded-[60px]"/><Portrait index={2} className="left-[195px] top-[205px] h-[350px] w-[165px] rounded-[70px]"/><Portrait index={3} className="right-0 top-[100px] h-[345px] w-[165px] rounded-[70px]"/><Portrait index={4} className="left-2 top-[370px] h-[165px] w-[165px] rounded-[60px]"/><div className="absolute right-[-18px] top-6 text-[#1f5fff]">✦</div><div className="absolute right-[-50px] top-28 text-xl text-[#1f5fff]">•</div><div className="absolute right-[-55px] top-52 text-[#1f5fff]">★</div><div className="absolute right-[-45px] top-[300px] text-xl text-[#1f5fff]">•</div><div className="absolute right-[-55px] bottom-12 text-[#1f5fff]">×</div></Reveal>
      <div className="order-4 grid grid-cols-2 gap-3 mt-8 lg:hidden">
        {portraits.map((item, i) => (
          <Reveal key={item.name} direction="up" delay={i * 80} className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/10 ${i === 4 ? "col-span-2 aspect-[21/9]" : "aspect-square"}`}>
            <Image src="/autismia-children-strip.png" alt={item.name} width={2560} height={1024} quality={90} sizes="50vw" className={`absolute top-0 h-full w-[500%] max-w-none object-cover ${item.position}`}/>
          </Reveal>
        ))}
      </div>
      <Reveal direction="up" className="order-7 mt-8 -mx-6 overflow-hidden sm:hidden">
        <ul className="marquee-track flex w-max gap-3 px-6 text-[13px] leading-5 font-semibold text-white">
          {[...features, ...features].map((text, i) => <FeatureCard key={i} text={text}/>)}
        </ul>
      </Reveal>
      <ul className="order-7 mt-8 hidden gap-3 text-[13px] leading-5 font-semibold text-white sm:grid sm:grid-cols-2 lg:col-span-2 lg:grid-cols-5 lg:mt-0">
        <Reveal as="li" direction="up" delay={0} className="group relative flex min-h-[88px] items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 shadow-lg shadow-black/10 backdrop-blur-md transition-transform hover:-translate-y-1"><span className="absolute inset-x-0 top-0 h-1 bg-[#1f5fff]"/><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#1f5fff] text-[14px] font-extrabold text-white shadow-md">✓</span><span>Root Cause Analysis</span></Reveal>
        <Reveal as="li" direction="up" delay={80} className="group relative flex min-h-[88px] items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 shadow-lg shadow-black/10 backdrop-blur-md transition-transform hover:-translate-y-1"><span className="absolute inset-x-0 top-0 h-1 bg-[#1f5fff]"/><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#1f5fff] text-[14px] font-extrabold text-white shadow-md">✓</span><span>Holistic Assessment of Your Child’s Nature, Fears, Dreams &amp; Behaviour</span></Reveal>
        <Reveal as="li" direction="up" delay={160} className="group relative flex min-h-[88px] items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 shadow-lg shadow-black/10 backdrop-blur-md transition-transform hover:-translate-y-1"><span className="absolute inset-x-0 top-0 h-1 bg-[#1f5fff]"/><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#1f5fff] text-[14px] font-extrabold text-white shadow-md">✓</span><span>Mother’s Pregnancy History Considered</span></Reveal>
        <Reveal as="li" direction="up" delay={240} className="group relative flex min-h-[88px] items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 shadow-lg shadow-black/10 backdrop-blur-md transition-transform hover:-translate-y-1"><span className="absolute inset-x-0 top-0 h-1 bg-[#1f5fff]"/><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#1f5fff] text-[14px] font-extrabold text-white shadow-md">✓</span><span>Detailed Review of Previous Reports &amp; Investigations</span></Reveal>
        <Reveal as="li" direction="up" delay={320} className="group relative flex min-h-[88px] items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 shadow-lg shadow-black/10 backdrop-blur-md transition-transform hover:-translate-y-1"><span className="absolute inset-x-0 top-0 h-1 bg-[#1f5fff]"/><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#1f5fff] text-[14px] font-extrabold text-white shadow-md">✓</span><span>Follow-Up Every 15 Days</span></Reveal>
      </ul>
    </div>

    <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
  </section>;
}
