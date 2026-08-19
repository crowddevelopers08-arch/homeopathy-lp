"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

const steps = [
  {
    title: ["3 to 6 Month AVG Course"],
    color: "#1f5fff",
    pinX: 140,
    roadY: 190,
    contentX: 100,
    text: [
      "ADHD care may require consistent",
      "follow-up over time. The duration",
      "can vary depending on the child's",
      "needs, symptoms and response to",
      "treatment.",
    ],
  },
  {
    title: ["98% Success Rate"],
    color: "#1f5fff",
    pinX: 420,
    roadY: 240,
    contentX: 380,
    text: [
      "B Homeo highlights a 98% success",
      "rate across its treatment approach,",
      "reflecting its experience in",
      "providing personalised",
      "homeopathic care.",
    ],
  },
  {
    title: ["No Hidden Charges"],
    color: "#1f5fff",
    pinX: 700,
    roadY: 290,
    contentX: 660,
    text: [
      "The first online consultation fee",
      "is fixed. Medicine charges, if",
      "applicable, are communicated by",
      "the doctor after consultation.",
    ],
  },
  {
    title: ["3 Layer Advance Homeopathy*", "Medicine Kit"],
    color: "#1f5fff",
    pinX: 980,
    roadY: 340,
    contentX: 940,
    text: [
      "A structured homeopathic medicine",
      "approach designed to provide",
      "personalised support based on",
      "the child's symptoms and overall",
      "assessment.",
    ],
  },
];

const roadPath = "M60,190 L340,190 L340,240 L620,240 L620,290 L900,290 L900,340 L1180,340";

function Pin({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0,42 C0,42 -25,4 -25,-16 A25,25 0 1 1 25,-16 C25,4 0,42 0,42 Z"
        fill="white"
        stroke={color}
        strokeWidth={6}
      />
      <circle cx={0} cy={-16} r={9} fill="white" stroke={color} strokeWidth={5} />
    </g>
  );
}

function StepContent({
  title,
  text,
  color,
  x,
  y,
}: {
  title: string[];
  text: string[];
  color: string;
  x: number;
  y: number;
}) {
  const textStartY = y + 34 + title.length * 22 + 10;
  return (
    <g>
      <rect x={x} y={y} width={92} height={8} fill={color} />
      <text x={x} y={y + 34} fontSize={17} fontWeight={800} fill={color}>
        {title.map((line, i) => (
          <tspan key={i} x={x} dy={i === 0 ? 0 : 22}>
            {line}
          </tspan>
        ))}
      </text>
      <text x={x} y={textStartY} fontSize={12.5} fill="#000000">
        {text.map((line, i) => (
          <tspan key={i} x={x} dy={i === 0 ? 0 : 16.5}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export default function RoadmapInfographic() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div id="programme" className="mx-auto w-full max-w-[1300px] bg-white">
      <svg viewBox="0 0 1300 640" className="block w-full" role="img" aria-label="What You Can Expect from B Homeo ADHD Care">
        <text x={650} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill="#1f5fff" letterSpacing={1}>
          ABOUT THE ADHD CARE PROGRAMME
        </text>
        <text x={650} y={70} textAnchor="middle" fontSize={30} fontWeight={800} fill="#000d44">
          What You Can Expect from B Homeo ADHD Care
        </text>

        <path d={roadPath} fill="none" stroke="#000d44" strokeOpacity={0.12} strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" />
        <path d={roadPath} fill="none" stroke="#000d44" strokeOpacity={0.45} strokeWidth={2} strokeDasharray="8 8" strokeLinecap="round" strokeLinejoin="round" />

        {steps.map((s) => (
          <StepContent key={s.title[0]} title={s.title} text={s.text} color={s.color} x={s.contentX} y={s.roadY + 55} />
        ))}
        {steps.map((s) => (
          <Pin key={s.title[0]} x={s.pinX} y={s.roadY} color={s.color} />
        ))}
      </svg>

      <div className="flex justify-center max-sm:pb-8 pb-2">
        <button
          type="button"
          onClick={() => setBookingOpen(true)}
          className="group relative inline-flex rounded-[10px] bg-[#1f5fff] px-8 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-black/10 transition-opacity hover:opacity-90"
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true"><rect x="7" y="7" rx="7" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 7" className="button-running-dash" style={{width:"calc(100% - 14px)",height:"calc(100% - 14px)"}}/></svg>
          <span className="relative z-10">Book a Consultation</span>
        </button>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
