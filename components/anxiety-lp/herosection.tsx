"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";


function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="ml-1 h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function HeartPulseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-[#1f5fff]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M3.5 12.5h4l1.5-3 2 5 1.5-3h8" />
    </svg>
  );
}

function CalmMindIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.5 3a3.5 3.5 0 0 0-3.5 3.5V7a3 3 0 0 0-1 5.8V14a3.5 3.5 0 0 0 3 3.45V19a2 2 0 0 0 4 0V6.5A3.5 3.5 0 0 0 9.5 3Z" />
      <path d="M14.5 3A3.5 3.5 0 0 1 18 6.5V7a3 3 0 0 1 1 5.8V14a3.5 3.5 0 0 1-3 3.45V19a2 2 0 0 1-4 0" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-[#1f5fff]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 21c8 0 14-6 14-14V4h-3C8 4 4 10 4 18v3Z" />
      <path d="M5 21c3-6 7-10 13-13" />
    </svg>
  );
}

type TypePhase = "typing" | "holding" | "erasing" | "empty";

/**
 * Tracks whether the viewport is at/above Tailwind's `lg` breakpoint.
 * Used so we only run ONE typewriter animation loop at a time (desktop
 * OR mobile), instead of both instances ticking in the background
 * simultaneously, which was causing jank/lag on mobile.
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)"); // matches Tailwind's lg breakpoint
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

function TypewriterQuestion({
  word,
  active,
}: {
  word: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState(active ? "" : word);
  const [phase, setPhase] = useState<TypePhase>(active ? "typing" : "holding");

  useEffect(() => {
    // This instance is hidden via CSS (the non-matching breakpoint) —
    // skip the animation loop entirely so it doesn't burn cycles in the background.
    if (!active) {
      setDisplay(word);
      setPhase("holding");
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(word);
      setPhase("holding");
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      timeout =
        display.length < word.length
          ? setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 90)
          : setTimeout(() => setPhase("holding"), 1400);
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("erasing"), 1400);
    } else if (phase === "erasing") {
      timeout =
        display.length > 0
          ? setTimeout(() => setDisplay(word.slice(0, display.length - 1)), 45)
          : setTimeout(() => setPhase("empty"), 300);
    } else {
      timeout = setTimeout(() => setPhase("typing"), 300);
    }

    return () => clearTimeout(timeout);
  }, [display, phase, word, active]);

  return (
    <>
      <span aria-hidden="true">{display}</span>
      {active && (
        <span
          aria-hidden="true"
          className={`ml-0.5 inline-block w-[3px] translate-y-[1px] bg-current align-middle ${phase === "holding" ? "opacity-0" : "animate-pulse"}`}
          style={{ height: "0.85em" }}
        />
      )}
      {active && phase === "holding" && (
        <span aria-hidden="true" className="ml-1 inline-block animate-bounce">
          ?
        </span>
      )}
      <span className="sr-only">{word}?</span>
    </>
  );
}

function BrandLogo() {
  return (
    <a
      href="#"
      className="flex items-center gap-2.5 text-white no-underline"
      aria-label="Autism home"
    >
      <span>
        <strong className="block text-[24px] font-extrabold leading-7 md:text-[28px]">
          B-Homeo Wellness
        </strong>
      </span>
    </a>
  );
}

const navLinks = [
  { label: "Home", href: "#", dropdown: false },
  { label: "About", href: "#about", dropdown: false },
  { label: "Programme", href: "#programme", dropdown: false },
  { label: "Services", href: "#services", dropdown: false },
  { label: "faq", href: "#faq", dropdown: false },
  { label: "Contact", href: "#contact", dropdown: false },
];

const slides = [
  {
    eyebrow: "FIRST CONSULTATION ₹499 ONLY",
    heading:
      "Is Acidity, Palpitation, Chest Discomfort & Fear of Illness Taking Over ",
    highlight: " Your Peace?",
    cta: "Book Your Consultation",
  },
];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const active = slides[slide % slides.length];

  return (
    <section className="relative bg-[#000d44] font-sans text-white">
      {/* faint decorative background photos, tinted with the brand navy */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[.08]">
        <Image
          src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228014/bg.png"
          alt=""
          fill
          quality={60}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(31,95,255,.18)_0%,transparent_55%)]" />

      {/* header */}
      <header className="relative z-30 mx-auto flex h-[100px] max-w-[1440px] items-center justify-between gap-4 px-6 lg:px-10">
        <BrandLogo />

        <nav className="hidden items-center gap-6 text-[15px] font-semibold xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center text-white/95 transition-colors hover:text-[#1f5fff]"
            >
              {link.label}
              {link.dropdown && <Chevron />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setAppointmentOpen(true);
            }}
            className="group relative hidden items-center justify-center rounded-[10px] bg-[#1f5fff] px-6 py-3 text-center text-[14px] font-bold text-white shadow-lg shadow-[#1f5fff]/20 sm:inline-flex"
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

            <span className="relative z-10">Appointment</span>
          </button>

          <a
            onClick={() => setMenuOpen(false)}
            href="tel:+917719996771"
            className="group relative hidden items-center justify-center rounded-[10px] bg-white px-6 py-3 text-center text-[14px] font-bold text-[#000d44] shadow-lg shadow-black/20 sm:inline-flex"
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
                stroke="#1f5fff"
                strokeWidth="2"
                strokeDasharray="10 7"
                className="button-running-dash"
                style={{
                  width: "calc(100% - 14px)",
                  height: "calc(100% - 14px)",
                }}
              />
            </svg>

            <span className="relative z-10">Call Now</span>
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-40 grid gap-1.5 transition-transform hover:scale-110 xl:hidden"
          >
            <span
              className={`h-0.5 w-7 bg-white transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-7 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-7 bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="absolute inset-x-0 top-[100px] z-30 border-t border-white/10 bg-[#000d44] px-6 py-6 xl:hidden">
          <nav className="grid grid-cols-3 gap-x-4 gap-y-5 text-center text-[15px] font-semibold">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                onClick={() => setMenuOpen(false)}
                href={link.href}
                className={index === 0 ? "text-[#1f5fff]" : "text-white/95"}
              >
                {link.label}
                {link.dropdown && <Chevron />}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setAppointmentOpen(true);
              }}
              className="group relative inline-flex items-center justify-center rounded-[10px] bg-[#1f5fff] px-6 py-3 text-center text-[14px] font-bold text-white shadow-lg shadow-[#1f5fff]/20"
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

              <span className="relative z-10">Appointment</span>
            </button>

            <a
              onClick={() => setMenuOpen(false)}
              href="tel:+917719996771"
              className="group relative inline-flex items-center justify-center rounded-[10px] bg-white px-6 py-3 text-center text-[14px] font-bold text-[#000d44] shadow-lg shadow-black/20"
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
                  stroke="#1f5fff"
                  strokeWidth="2"
                  strokeDasharray="10 7"
                  className="button-running-dash"
                  style={{
                    width: "calc(100% - 14px)",
                    height: "calc(100% - 14px)",
                  }}
                />
              </svg>

              <span className="relative z-10">Call Now</span>
            </a>
          </div>
        </div>
      )}

      {/* Decorative image, reused by both desktop and mobile layouts */}
      {(() => null)()}

      {/* Desktop / tablet — unchanged, side-by-side layout */}
      <div className="relative z-10 mx-auto hidden max-w-[1440px] grid-cols-1 items-center gap-10 px-6 pb-6 pt-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:px-10 lg:pb-8 lg:pt-4">
        <div className="max-w-[560px]">
          <p className="mb-3 flex items-center gap-2 text-[13px] font-bold tracking-[2px] text-white/90">
            {active.eyebrow}
          </p>

          <h1 className="text-[36px] font-extrabold leading-[1.2] sm:text-[44px] lg:text-[48px]">
            {active.heading}
            <span className="relative inline-block">
              <TypewriterQuestion
                word={active.highlight.replace(/\?+$/, "")}
                active={isDesktop}
              />
              <svg
                className="absolute -bottom-1 left-0 h-3 w-full text-[#1f5fff]"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8 C 60 2, 240 2, 298 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-[460px] text-[16px] leading-7 text-white/75">
            At{" "}
            <span className="font-bold text-[#1f5fff]">B Homeo Wellness</span>,
            our personalised approach helps you understand and manage the deeper
            triggers behind your anxiety.
          </p>

          <button
            type="button"
            onClick={() => setAppointmentOpen(true)}
            className="group relative mt-9 inline-flex items-center justify-center rounded-[10px] bg-[#1f5fff] px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-[#1f5fff]/20 transition-opacity hover:opacity-90"
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

            <span className="relative z-10">{active.cta}</span>
          </button>
        </div>

        <div
          className="relative mx-auto aspect-square w-full max-w-[620px]"
          role="img"
          aria-label="Photo of a person finding calm, surrounded by icons for heart rate, mind and natural relief"
        >
          <div
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(31,95,255,.4)_0%,transparent_70%)] blur-2xl"
            aria-hidden="true"
          />

          <div
            className="breathe-ring absolute inset-[2%] rounded-full border border-white/15"
            aria-hidden="true"
          />
          <div
            className="breathe-ring absolute inset-[7%] rounded-full border border-[#1f5fff]/30"
            style={{ animationDelay: "1.4s" }}
            aria-hidden="true"
          />

          <div className="absolute inset-[11%] overflow-hidden rounded-[63%_37%_54%_46%/43%_37%_63%_57%] bg-[linear-gradient(135deg,#000d44_0%,#1f5fff_100%)] shadow-[0_30px_60px_rgba(31,95,255,.35)]">
            <Image
              src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228018/hero-image2.png"
              alt="A person finding calm"
              fill
              priority
              sizes="(min-width: 1024px) 550px, 85vw"
              className="object-cover object-top"
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.15)_0%,transparent_55%)]"
              aria-hidden="true"
            />
          </div>

          <div
            className="learning-image-float absolute -left-2 top-6 grid h-16 w-16 place-items-center rounded-full bg-white/10 shadow-lg ring-1 ring-white/20 backdrop-blur-md"
            aria-hidden="true"
          >
            <HeartPulseIcon />
          </div>
          <div
            className="learning-image-float absolute -right-3 top-1/3 grid h-14 w-14 place-items-center rounded-full bg-white/10 shadow-lg ring-1 ring-white/20 backdrop-blur-md"
            style={{ animationDelay: "1.2s" }}
            aria-hidden="true"
          >
            <CalmMindIcon />
          </div>
        </div>
      </div>

      {/* Mobile — label, heading, image, paragraph, button (in that order) */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-8 pt-4 lg:hidden">
        <p className="mb-3 flex items-center gap-2 text-[13px] font-bold tracking-[2px] text-white/90">
          {active.eyebrow}
        </p>

        <h1
          className="text-[31.5px] font-extrabold leading-[1.25] sm:text-[36px]"
          style={{ contain: "layout" }}
        >
          {active.heading}
          <span className="relative inline-block">
            <TypewriterQuestion
              word={active.highlight.replace(/\?+$/, " ")}
              active={!isDesktop}
            />
            <svg
              className="absolute -bottom-1 left-0 h-3 w-full text-[#1f5fff]"
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 8 C 60 2, 240 2, 298 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <div
          className="relative mx-auto mt-7 aspect-square w-full max-w-[420px]"
          role="img"
          aria-label="Photo of a person finding calm, surrounded by icons for heart rate, mind and natural relief"
        >
          <div
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(31,95,255,.4)_0%,transparent_70%)] blur-2xl"
            aria-hidden="true"
          />

          <div
            className="breathe-ring absolute inset-[2%] rounded-full border border-white/15"
            aria-hidden="true"
          />
          <div
            className="breathe-ring absolute inset-[7%] rounded-full border border-[#1f5fff]/30"
            style={{ animationDelay: "1.4s" }}
            aria-hidden="true"
          />

          <div className="absolute inset-[11%] overflow-hidden rounded-[63%_37%_54%_46%/43%_37%_63%_57%] bg-[linear-gradient(135deg,#000d44_0%,#1f5fff_100%)] shadow-[0_30px_60px_rgba(31,95,255,.35)]">
            <Image
              src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228018/hero-image2.png"
              alt="A person finding calm"
              fill
              priority
              sizes="85vw"
              className="object-cover object-top"
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.15)_0%,transparent_55%)]"
              aria-hidden="true"
            />
          </div>

          <div
            className="learning-image-float absolute -left-2 top-6 grid h-14 w-14 place-items-center rounded-full bg-white/10 shadow-lg ring-1 ring-white/20 backdrop-blur-md"
            aria-hidden="true"
          >
            <HeartPulseIcon />
          </div>
          <div
            className="learning-image-float absolute -right-2 top-1/3 grid h-12 w-12 place-items-center rounded-full bg-white/10 shadow-lg ring-1 ring-white/20 backdrop-blur-md"
            style={{ animationDelay: "1.2s" }}
            aria-hidden="true"
          >
            <CalmMindIcon />
          </div>
        </div>

        <p className="mt-7 text-[16px] leading-7 text-white/75">
          At <span className="font-bold text-[#1f5fff]">B Homeo Wellness</span>,
          our personalised approach helps you understand and manage the deeper
          triggers behind your anxiety.
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setAppointmentOpen(true)}
            className="group relative mt-5 inline-flex items-center justify-center rounded-[10px] bg-[#1f5fff] px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-[#1f5fff]/20 transition-opacity hover:opacity-90"
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

            <span className="relative z-10">{active.cta}</span>
          </button>
        </div>
      </div>

      <BookingModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
    </section>
  );
}
