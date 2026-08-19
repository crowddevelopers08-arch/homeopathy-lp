import Image from "next/image";
import Reveal from "./Reveal";

function BHomeoLogo() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 no-underline"
      aria-label="B Homeo home"
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#1f5fff] text-[29px] font-extrabold text-white shadow-md shadow-[#1f5fff]/20">
        B
      </span>
      <span className="text-[34px] font-extrabold tracking-[-1.5px] text-[#000d44]">
        B-<span className="text-[#1f5fff]">Homeo</span>
      </span>
    </a>
  );
}

function SocialIcon({ type }: { type: "facebook" | "instagram" | "youtube" }) {
  if (type === "facebook")
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
        aria-hidden="true"
      >
        <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.2l.8-4h-4V9c0-.7.3-1 1-1Z" />
      </svg>
    );
  if (type === "instagram")
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-none stroke-current"
        strokeWidth="2"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M22 12c0-3.2-.4-5.2-.8-6.1-.3-.8-1-1.4-1.8-1.6C18 4 12 4 12 4s-6 0-7.4.3c-.8.2-1.5.8-1.8 1.6C2.4 6.8 2 8.8 2 12s.4 5.2.8 6.1c.3.8 1 1.4 1.8 1.6C6 20 12 20 12 20s6 0 7.4-.3c.8-.2 1.5-.8 1.8-1.6.4-.9.8-2.9.8-6.1Zm-12 4.5v-9l7 4.5-7 4.5Z" />
    </svg>
  );
}

const socials = [
  {
    type: "facebook" as const,
    label: "Facebook",
    href: "https://www.facebook.com/people/BHomeo-Wellness/61591248306950/?rdid=MLVTYq5utpM4IS2O&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F189vmw7qP9%2F",
  },
  {
    type: "instagram" as const,
    label: "Instagram",
    href: "https://www.instagram.com/bhomeowellness?igsh=ZDgxcXdtaW4wZWkz",
  },
  {
    type: "youtube" as const,
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCfn4k3Dpc5OuzrBASGyrbXA",
  },
];

export default function KiddzoFooter() {
  return (
    <footer className="relative min-h-[325px] overflow-hidden bg-white font-sans text-black">
      {/* Tablet & Desktop Background Image Only */}
      <Image
        src="/kiddzo-footer-landscape.png"
        alt="Cheerful illustrated wellness landscape"
        fill
        sizes="100vw"
        className="hidden object-cover object-bottom sm:block"
      />

      <div className="relative z-10 mx-auto grid max-w-[1490px] grid-cols-2 gap-x-3 gap-y-6 max-sm:gap-y-3 px-6 pb-0 pt-10 sm:gap-3 sm:px-8 lg:grid-cols-[1.1fr_.8fr_.9fr_1.35fr] lg:gap-12 lg:pt-[36px] sm:[text-shadow:0_1px_3px_rgba(255,255,255,0.9),0_0_10px_rgba(255,255,255,0.75)]">
        <Reveal
          as="section"
          direction="left"
          className="col-span-2 sm:col-span-1"
        >
          <BHomeoLogo />
          <p className="mt-5 max-w-[300px] text-[16px] leading-[1.8]">
            We are India&apos;s No. 1 online homeopathy wellness hub.
          </p>
          <div className="mt-6 max-sm:mt-2 flex gap-3">
            {socials.map(({ type, label, href }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1f5fff] shadow-sm transition-colors hover:bg-[#1f5fff] hover:text-white"
                key={type}
              >
                <SocialIcon type={type} />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal as="nav" direction="up" delay={100} aria-label="Quick links">
          <h3 className="text-[22px] max-sm:text-[20px] font-extrabold text-[#000d44]">
            Quick Links
          </h3>
          <ul className="mt-5 max-sm:mt-2 max-sm:space-y-1 space-y-3 text-[15px]">
            <li>
              <a className="hover:text-[#1f5fff] max-sm:mb-1" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-[#1f5fff]" href="#about">
                About Us
              </a>
            </li>
            <li>
              <a className="hover:text-[#1f5fff]" href="#programme">
                ADHD Care
              </a>
            </li>
            <li>
              <a className="hover:text-[#1f5fff]" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="hover:text-[#1f5fff]" href="#faq">
                FAQs
              </a>
            </li>
            <li>
              <a className="hover:text-[#1f5fff]" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal as="section" direction="up" delay={200} id="contact">
          <h3 className="text-[22px] max-sm:text-[20px] font-extrabold text-[#000d44]">
            Get In Touch
          </h3>
          <div className="mt-5 max-sm:mt-2 space-y-4 max-sm:space-y-1 text-[15px] leading-6">
            <p>
              <span className="block font-bold text-[#000d44]">Address</span>
              <span>
                Near Jalna Mahanagarpalika, Jalna, Maharashtra – 431203
              </span>
            </p>
            <p>
              <span className="block font-bold text-[#000d44]">Email</span>
              <a className="hover:text-[#1f5fff]" href="mailto:admin@bhomeo.in">
                admin@bhomeo.in
              </a>
            </p>
            <p>
              <span className="block font-bold text-[#000d44]">Phone</span>
              <a className="hover:text-[#1f5fff]" href="tel:+917719996771">
                +91 7719996771
              </a>
            </p>
          </div>
        </Reveal>
      </div>
      <div className="relative z-10 mt-8 mx-auto flex max-w-[1490px] flex-col items-center justify-between gap-2 px-10 pb-7 text-center sm:mt-2 sm:flex-row sm:px-38 sm:text-left sm:[text-shadow:0_1px_3px_rgba(255,255,255,0.9),0_0_10px_rgba(255,255,255,0.75)]">
        <p className="text-[14px] sm:text-[16px]">
          © 2026 <span className="font-semibold text-[#1f5fff]">B-Homeo.</span>{" "}
          All rights reserved
        </p>
        <a
          href="/privacy-policy"
          className="text-[14px] font-medium text-[#000d44] hover:text-[#000d44] sm:text-[16px]"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
