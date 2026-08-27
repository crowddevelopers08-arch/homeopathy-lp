"use client";

import Image from "next/image";
import { useState } from "react";
import BookingModal from "./BookingModal";
import ConsultationButton from "./ConsultationButton";
import Reveal from "./Reveal";

const faqs = [
  {
    number: "1",
    question: "What are common signs of ADHD in children?",
    answer: "Difficulty focusing, impulsive behaviour, restlessness, forgetfulness or trouble following routines may be associated with ADHD.",
  },
  {
    number: "2",
    question: "Does being very active mean my child has ADHD?",
    answer: "No. ADHD is assessed based on persistent symptoms and how they affect daily life at home, school and other settings.",
  },
  {
    number: "3",
    question: "How is ADHD assessed?",
    answer: "Assessment may include the child’s history, behaviour patterns, parent or teacher observations and professional evaluation.",
  },
  {
    number: "4",
    question: "What is B Homeo’s approach for ADHD-related concerns?",
    answer: "B Homeo follows a personalised homeopathic approach based on the child’s symptoms, overall health and individual needs.",
  },
  {
    number: "5",
    question: "How long does treatment take?",
    answer: "Duration varies from child to child depending on symptoms, needs and response to care.",
  },
  {
    number: "6",
    question: "Can ADHD care support concentration and academics?",
    answer: "Appropriate support may help with focus, organisation and daily functioning depending on the child’s needs.",
  },
  {
    number: "7",
    question: "Can other therapies continue alongside homeopathy?",
    answer: "Yes. Behavioural, developmental or educational support may continue as advised by the relevant healthcare professional.",
  },
  {
    number: "8",
    question: "Is online consultation available?",
    answer: "Yes. B Homeo offers online consultations as well as offline consultations through its branch network.",
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
          <h2 className="mt-4 text-[25px] leading-tight font-extrabold text-[#000d44] sm:text-[30px]">Questions Parents Commonly Ask About ADHD</h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_330px_1fr] lg:gap-7 xl:grid-cols-[1fr_370px_1fr] xl:gap-10">
          <div className="grid gap-4">{faqs.slice(0,4).map((item,i)=><Reveal as="div" direction="left" delay={i*100} key={item.number}><FaqCard item={item}/></Reveal>)}</div>

          <Reveal direction="up" className="relative order-first mx-auto aspect-[5/4] w-full max-w-[360px] lg:order-none">
            <span className="absolute -inset-4 rounded-[45%_55%_48%_52%/52%_42%_58%_48%] bg-[#1f5fff]/12"/>
            <span className="absolute -left-7 top-12 h-16 w-16 rounded-full border-[10px] border-[#1f5fff]/55"/>
            <span className="absolute -right-5 bottom-16 h-12 w-12 rounded-full bg-[#000d44]/25"/>
            <div className="relative h-full overflow-hidden rounded-[46%_54%_44%_56%/38%_42%_58%_62%] border-[7px] border-white shadow-[0_24px_55px_rgba(31,95,255,.2)]">
              <Image src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228016/faq.png" alt="B Homeo doctor supporting a child during a consultation" fill sizes="(max-width: 1024px) 360px, 370px" quality={95} className="object-cover object-center"/>
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
