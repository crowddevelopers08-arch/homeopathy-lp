"use client";

import Image from "next/image";
import { useState } from "react";
import BookingModal from "./BookingModal";
import ConsultationButton from "../ConsultationButton";
import Reveal from "./Reveal";

const faqs = [
  {
    number: "1",
    question: "What happens during an anxiety consultation at B Homeo Wellness?",
    answer:
      "The doctor understands your symptoms, emotional patterns, lifestyle, health history, and concerns before suggesting a personalised approach.",
  },
  {
    number: "2",
    question: "Is anxiety treatment personalised for every patient?",
    answer:
      "Yes. Each case is evaluated individually based on symptoms, triggers, and overall health condition.",
  },
  {
    number: "3",
    question: "How long does anxiety treatment take?",
    answer:
      "The duration varies from person to person depending on individual symptoms, response, and consistency with follow-ups.",
  },
  {
    number: "4",
    question: "Are consultations available online?",
    answer:
      "Yes, B Homeo Wellness provides both online and offline consultation options.",
  },
  {
    number: "5",
    question: "Do I need to continue regular follow-ups?",
    answer:
      "Regular follow-ups help track your progress and allow the doctor to guide your care journey effectively.",
  },
  {
    number: "6",
    question: "Can anxiety affect sleep and concentration?",
    answer:
      "Yes, anxiety may impact sleep, focus, daily activities, and emotional wellbeing. A detailed consultation helps understand these concerns better.",
  },
  {
    number: "7",
    question: "What are some common symptoms associated with anxiety?",
    answer:
      "Symptoms may include excessive worry, nervousness, restlessness, difficulty concentrating, sleep disturbances, and physical discomfort.",
  },
  {
    number: "8",
    question: "Can anxiety affect daily life and relationships?",
    answer:
      "Yes. Anxiety may influence work performance, social interactions, personal relationships, and overall quality of life if left unaddressed.",
  },
];

function FaqCard({ item }: { item: (typeof faqs)[number] }) {
  return (
    <details className="group rounded-2xl border border-[#1f5fff]/15 bg-white shadow-[0_10px_30px_rgba(0,13,68,.07)] open:border-[#1f5fff]/40">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 text-left [&::-webkit-details-marker]:hidden">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[14px] font-extrabold text-[#1f5fff] ring-1 ring-[#1f5fff]/20">{item.number}</span>
        <span className="flex-1 text-[14px] leading-5 font-bold text-[#000d44] sm:text-[15px]">{item.question}</span>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#1f5fff] text-[18px] leading-none text-white transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="border-t border-[#1f5fff]/10 px-5 py-4 text-[13px] leading-6 text-black/70">👉 {item.answer}</div>
    </details>
  );
}

export default function AdhdFaq() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section id="faq" className="bg-white px-4 py-0 font-sans sm:px-6 lg:pb-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal direction="up" className="mx-auto max-w-[850px] text-center">
          <p className="text-[13px] font-bold tracking-[1.1px] text-[#1f5fff] sm:text-[14px]">FREQUENTLY ASKED QUESTIONS</p>
          <h2 className="mt-4 text-[25px] leading-tight font-extrabold text-[#000d44] sm:text-[30px]">Questions Patients Commonly Asked About Anxiety</h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_330px_1fr] lg:gap-7 xl:grid-cols-[1fr_370px_1fr] xl:gap-10">
          <div className="grid gap-4">{faqs.slice(0,4).map((item,i)=><Reveal as="div" direction="left" delay={i*100} key={item.number}><FaqCard item={item}/></Reveal>)}</div>

          <Reveal direction="up" className="relative order-first mx-auto h-[430px] w-full max-w-[360px] lg:order-none lg:h-[540px]">
            <span className="absolute -inset-4 rounded-[45%_55%_48%_52%/52%_42%_58%_48%] bg-[#1f5fff]/12"/>
            <span className="absolute -left-7 top-12 h-16 w-16 rounded-full border-[10px] border-[#1f5fff]/55"/>
            <span className="absolute -right-5 bottom-16 h-12 w-12 rounded-full bg-[#000d44]/25"/>
            <div className="relative h-full overflow-hidden rounded-[46%_54%_44%_56%/38%_42%_58%_62%] border-[7px] border-white shadow-[0_24px_55px_rgba(31,95,255,.2)]">
              <Image src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228014/bg.png" alt="B Homeo doctor supporting a child during a consultation" fill sizes="(max-width: 1024px) 360px, 370px" quality={95} className="object-cover"/>
            </div>
          </Reveal>

          <div className="grid gap-4">{faqs.slice(4).map((item,i)=><Reveal as="div" direction="right" delay={i*100} key={item.number}><FaqCard item={item}/></Reveal>)}</div>
        </div>

        <Reveal direction="up" className="mt-12 flex justify-center">
          <ConsultationButton onClick={() => setBookingOpen(true)} />
        </Reveal>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
