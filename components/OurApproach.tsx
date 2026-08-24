"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const videos = [
  {
    id: "mzEDRaP1jdg",
    title: "B-Homeo Wellness approach to personalised homeopathic care",
  },
  {
    id: "s_RrnDvCFbc",
    title: "Learn more about the B-Homeo Wellness care journey",
  },
];

export default function OurApproach() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#f4f7ff] py-8 font-sans sm:py-10 lg:mb-10">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#1f5fff]/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#000d44]/8 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-14">
        <Reveal direction="up" className="mx-auto max-w-[720px] text-center">
          {/* <p className="text-[13px] font-bold tracking-[1.6px] text-[#1f5fff] sm:text-[14px]">
            HOW WE SUPPORT YOUR FAMILY
          </p> */}
          <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-[#000d44] sm:text-[34px]">
            Here are more information about adhd
          </h2>
        </Reveal>

        <div className="mt-3 grid grid-cols-1 gap-6 md:mt-7 md:grid-cols-2 md:gap-7 lg:gap-9">
          {videos.map((video, index) => (
            <Reveal key={video.id} direction="up" delay={index * 120}>
              <div className="group rounded-[20px] border border-[#000d44]/8 bg-white p-2.5 transition duration-300 hover:-translate-y-1 sm:p-3">
                <div className="relative aspect-video overflow-hidden rounded-[14px] bg-[#000d44]">
                  {activeVideo === video.id ? (
                    <iframe
                      key={video.id}
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(video.id)}
                      className="group/play absolute inset-0 h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,13,68,.12), rgba(0,13,68,.32)), url(https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg)`,
                      }}
                      aria-label={`Play ${video.title}`}
                    >
                      <span className="absolute inset-0 bg-[#000d44]/5 transition-colors group-hover/play:bg-transparent" />
                      <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/40 bg-[#1f5fff] text-white shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-transform duration-200 group-hover/play:scale-110 sm:h-[72px] sm:w-[72px]">
                        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
