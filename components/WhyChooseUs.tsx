"use client";

import Image, { getImageProps } from "next/image";
import { useState } from "react";
import BookingModal from "./BookingModal";
import ConsultationButton from "./ConsultationButton";
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

const banners = [
  {
    src: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228001/about-banner-1.png",
    mobileSrc: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228004/about-mobil-1.png",
    alt: "A child showing signs of inattentiveness",
    title: "Predominantly Inattentive Presentation",
  },
  {
    src: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228002/about-banner-2.png",
    mobileSrc: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228010/about-mobil-2.png",
    alt: "A child showing hyperactive and impulsive behaviour",
    title: "Predominantly Hyperactive-Impulsive Presentation",
  },
  {
    src: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228003/about-banner-3.png",
    mobileSrc: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228008/about-mobil-3.png",
    alt: "A child showing combined ADHD behaviours",
    title: "Combined Presentation",
  },
];

function BannerArtwork({ banner, priority }: { banner: (typeof banners)[number]; priority: boolean }) {
  const { props: mobileImage } = getImageProps({
    src: banner.mobileSrc,
    alt: banner.alt,
    fill: true,
    sizes: "100vw",
    quality: 90,
  });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileImage.srcSet} />
      <Image src={banner.src} alt={banner.alt} fill sizes="100vw" quality={90} className="object-cover object-center" priority={priority} />
    </picture>
  );
}

export default function WhyChooseUs() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="relative min-h-[690px] overflow-hidden bg-[#000d44] font-sans">
      <span className="absolute left-0 top-0 z-20 h-[6px] w-[58%] bg-[#1f5fff]" />

      <div className="absolute inset-0 z-0" aria-live="off">
        {banners.map((banner, index) => (
          <div
            key={banner.src}
            className="why-banner-slide absolute inset-0"
            style={{ animationDelay: `${index * -10}s` }}
          >
            <BannerArtwork banner={banner} priority={index === 0} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 z-[1] bg-[#000d44]/80 md:[clip-path:polygon(0_0,68%_0,45%_100%,0%_100%)]" />

      <div className="pointer-events-none absolute right-5 top-16 z-[5] hidden w-[min(34vw,430px)] md:block lg:right-12">
        {banners.map((banner, index) => (
          <p
            key={banner.title}
            className="why-banner-title absolute right-0 top-0 rounded-xl px-5 py-3 text-right text-[15px] font-bold leading-6 text-white"
            style={{ animationDelay: `${index * -10}s` }}
          >

          </p>
        ))}
      </div>

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
            <ConsultationButton onClick={() => setBookingOpen(true)} className="mt-9" />
          </Reveal>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
