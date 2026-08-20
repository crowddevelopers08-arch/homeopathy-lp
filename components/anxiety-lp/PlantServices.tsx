"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
import BookingModal from "./BookingModal";

const services = [
  {
    title: "1. Book Appointment",
    description: "Click Book Now and complete the first consultation payment. Your appointment details will be shared on WhatsApp.",
    alt: "Parent booking a pediatric consultation on a smartphone",
    position: "left-0",
  },
  {
    title: "2. Connect With a B Homeo Doctor",
    description: "A B Homeo doctor will connect with you at the scheduled time to understand your concerns, symptoms, emotional patterns, lifestyle, and health history.",
    alt: "B Homeo doctor speaking with a parent by phone",
    position: "-left-full",
  },
  {
    title: "3. Receive Personalised Guidance",
    description: "Based on your consultation, the doctor will guide you with a personalised homeopathic care approach. Prescribed medicines can be delivered to your home within the available service area. Delivery charges extra. COD available.",
    alt: "Prescribed homeopathic medicines delivered to a home",
    position: "-left-[200%]",
  },
];

function ServiceImage({ alt, position }: { alt: string; position: string }) {
  return (
    <div className="relative h-[263px] overflow-hidden">
      <Image
        src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228045/treatment-process-strip.png"
        alt={alt}
        width={2560}
        height={1024}
        sizes="(max-width: 768px) 270vw, 1200px"
        quality={100}
        unoptimized
        className={`absolute top-0 h-full w-[300%] max-w-none object-cover ${position}`}
      />
    </div>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <article className="overflow-hidden bg-[#1f5fff] text-center shadow-[0_2px_10px_rgba(0,0,0,.04)]">
      <ServiceImage alt={service.alt} position={service.position} />
      <div className="flex min-h-[180px] flex-col items-center px-8 py-8 text-white">
        <h3 className="text-[17px] leading-[22px] font-extrabold tracking-[.2px]">{service.title}</h3>
        <p className="mt-4 text-[12.5px] leading-[16.5px] font-normal text-white/85">{service.description}</p>
      </div>
    </article>
  );
}

export default function PlantServices() {
  const [active, setActive] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  const goPrev = () => setActive((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  const goNext = () => setActive((prev) => (prev === services.length - 1 ? 0 : prev + 1));

  return (
    <section id="services" className="min-h-[835px] overflow-hidden bg-white font-sans">
      <Reveal direction="up" className="flex h-[150px] flex-col items-center justify-center px-6 pb-3 text-center">
        <p className="text-[14px] font-bold tracking-[1px] text-[#1f5fff]">HOW ONLINE TREATMENT WORKS</p>
        <h2 className="mt-2 text-[26px] leading-tight font-extrabold tracking-[.2px] text-[#000d44] sm:text-[30px]">A Simple 3-Step Treatment Process</h2>
        <span className="mt-3 h-[5px] w-[112px] bg-[#1f5fff]" />
      </Reveal>

      <div className="min-h-[550px] bg-[linear-gradient(to_bottom,#1f5fff_0px,#1f5fff_363px,#fff_363px,#fff_100%)] max-sm:px-0 px-6 pt-[100px]">
        {/* Desktop / tablet grid — unchanged */}
        <div className="mx-auto hidden max-w-[1320px] gap-[58px] md:grid md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} direction={i === 0 ? "left" : i === services.length - 1 ? "right" : "up"} delay={i * 120}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mx-auto max-w-[420px] md:hidden">
          <div className="relative flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous step"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f5fff] text-white shadow-md transition-transform hover:scale-110 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex-1 overflow-hidden">
              <ServiceCard service={services[active]} key={services[active].title} />
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next step"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f5fff] text-white shadow-md transition-transform hover:scale-110 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="mt-5 flex justify-center gap-2">
            {services.map((service, i) => (
              <button
                key={service.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-[#1f5fff]" : "w-2 bg-[#1f5fff]/30"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto flex max-w-[1320px] justify-center max-sm:pb-0 py-10">
          <button type="button" onClick={() => setBookingOpen(true)} className="group relative inline-flex rounded-[10px] bg-[#1f5fff] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-[#1f5fff]/20 transition-opacity hover:opacity-90">
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{width:"calc(100% - 14px)",height:"calc(100% - 14px)"}}/></svg>
            <span className="relative z-10">Get Started Today</span>
          </button>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
