import Reveal from "./Reveal";

export default function PatientReviews() {
  return (
    <section
      id="patient-reviews"
      aria-labelledby="patient-reviews-title"
      className="overflow-hidden px-4 py-8 font-sans sm:px-6 sm:py-10 lg:py-10"
    >
      <div className="mx-auto max-w-[1482px]">
        <Reveal direction="up" className="mx-auto max-w-[700px] text-center">
          <p className="text-[12px] font-bold tracking-[1px] text-[#1f5fff] sm:text-[12px]">
            PATIENT TESTIMONIALS
          </p>
          <h2
            id="patient-reviews-title"
            className="mt-3 text-[26px] leading-tight font-extrabold text-[#000d44] sm:text-[34px] lg:text-[38px]"
          >
            Patients <span className="text-[#1f5fff]">Reviews</span> 
          </h2>
        </Reveal>

        <Reveal direction="up" delay={120} className="mx-auto mt-7 max-w-[360px] sm:mt-6">
          <div className="rounded-[28px] border border-[#1f5fff]/10 bg-white p-2.5 sm:p-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[21px] bg-[#000d44]">
              <iframe
                src="https://www.youtube.com/embed/AlJcRFQw0oU?rel=0"
                title="B Homeo Wellness patient review"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
