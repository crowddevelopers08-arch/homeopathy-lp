"use client";

import Image from "next/image";
import { useState } from "react";
import BookingModal from "./BookingModal";
import ConsultationButton from "./ConsultationButton";
import Reveal from "./Reveal";

function FeatureImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1023px) 58vw, 395px"
      quality={90}
      className="object-cover object-center"
    />
  );
}

export default function LearningDiscovery() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section id="about" className="overflow-hidden bg-white px-4 py-8 font-sans text-black/70 sm:px-6 sm:py-10 lg:pb-15 lg:py-[10px]">
      <Reveal direction="up" className="mx-auto mb-8 max-w-[900px] text-center sm:mb-8">
        <p className="text-[12px] font-bold tracking-[1px] text-[#1f5fff] sm:text-[14px]">
          ABOUT THE CLINIC
        </p>
        <h2 className="mt-3 text-[24px] leading-[1.3] font-extrabold text-[#000d44] sm:mt-4 sm:text-[30px]">
          Why Choose B Homeo for Your Child’s Care?
        </h2>
      </Reveal>

      <div className="mx-auto grid max-w-[1490px] items-center gap-0 sm:gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <Reveal direction="left" className="relative mx-auto h-[205px] w-full max-w-[700px] sm:h-[350px] lg:h-[335px]">
          <div className="absolute left-0 top-0 aspect-[3/2] w-[58%] overflow-hidden lg:w-[395px]">
            <FeatureImage
              src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228004/adhd.jpg"
              alt="A child receiving attentive support"
            />
          </div>
          <div className="learning-image-float absolute left-[42%] top-[35px] aspect-[3/2] w-[58%] overflow-hidden rounded-[5px] sm:top-[50px] lg:left-[288px] lg:top-[60px] lg:w-[393px]">
            <FeatureImage
              src="https://res.cloudinary.com/x6ec5hqm/image/upload/v1787228027/adhds1.jpg"
              alt="A child learning with supportive guidance"
            />
          </div>
        </Reveal>

        <Reveal direction="right" className="mx-auto max-w-[630px] pb-1 sm:pb-3 lg:pl-1">
          <div className="space-y-4 text-[14px] leading-[1.8] sm:space-y-5 sm:text-[16px] sm:leading-[1.85]">
            <p className="max-sm:mb-1">
              B Homeo Wellness follows a patient-centred and personalised
              approach, where treatment decisions are based on the individual’s
              symptoms, health history and overall needs.
            </p>
            <p className="max-sm:mb-1">
              For children with attention, hyperactivity or behavioural
              concerns, the consultation focuses on understanding the child’s
              overall pattern before recommending an individualised homeopathic
              care plan.
            </p>
            <p className="max-sm:mb-1">
              Parents can access B Homeo care through its branch network as well
              as online consultations from home. The clinic also offers
              doctor-led consultations and personalised treatment plans designed
              around each patient.
            </p>
          </div>
          <div className="flex justify-left max-sm:justify-center pt-4 sm:pt-8 lg:pt-10 max-sm:pb-3">
            <ConsultationButton onClick={() => setBookingOpen(true)} />
          </div>
        </Reveal>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
