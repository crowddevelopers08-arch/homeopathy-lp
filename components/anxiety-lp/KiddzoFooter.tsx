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
      <span className="text-[34px] font-extrabold tracking-[-1.5px] text-white">
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
    <footer className="relative overflow-hidden bg-[#000d44] font-sans text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(31,95,255,.18)_0%,transparent_55%)]" />

      <div className="relative z-10 mx-auto grid max-w-[1490px] grid-cols-2 gap-x-6 gap-y-10 px-6 pb-12 pt-14 sm:gap-8 sm:px-8 lg:grid-cols-[1.3fr_.8fr_1fr] lg:gap-16 lg:pt-16">
        <Reveal
          as="section"
          direction="left"
          className="col-span-2 sm:col-span-1"
        >
          <BHomeoLogo />
          <p className="mt-5 max-w-[300px] text-[15px] leading-[1.8] text-white/60">
            We are India&apos;s No. 1 online homeopathy wellness hub.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ type, label, href }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 shadow-sm transition-colors hover:border-[#1f5fff] hover:bg-[#1f5fff] hover:text-white"
                key={type}
              >
                <SocialIcon type={type} />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal as="nav" direction="up" delay={100} aria-label="Quick links">
          <h3 className="text-[14px] font-bold uppercase tracking-[1px] text-white">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <a className="text-white/60 transition-colors hover:text-[#1f5fff]" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="text-white/60 transition-colors hover:text-[#1f5fff]" href="#about">
                About Us
              </a>
            </li>
            <li>
              <a className="text-white/60 transition-colors hover:text-[#1f5fff]" href="#programme">
                Programme
              </a>
            </li>
            <li>
              <a className="text-white/60 transition-colors hover:text-[#1f5fff]" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="text-white/60 transition-colors hover:text-[#1f5fff]" href="#faq">
                FAQs
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal as="section" direction="up" delay={200} id="contact">
          <h3 className="text-[14px] font-bold uppercase tracking-[1px] text-white">
            Get In Touch
          </h3>
          <div className="mt-5 space-y-4 text-[15px] leading-6">
            <p>
              <span className="block font-semibold text-white">Email</span>
              <a className="text-white/60 transition-colors hover:text-[#1f5fff]" href="mailto:admin@bhomeo.in">
                admin@bhomeo.in
              </a>
            </p>
            <p>
              <span className="block font-semibold text-white">Phone</span>
              <a className="text-white/60 transition-colors hover:text-[#1f5fff]" href="tel:+917719996771">
                +91 7719996771
              </a>
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-[1490px] flex-col items-center justify-between gap-2 px-6 py-6 text-center sm:flex-row sm:px-38 sm:text-left">
          <p className="text-[13px] text-white/50">
            © 2026 <span className="font-semibold text-[#1f5fff]">B-Homeo.</span>{" "}
            All rights reserved
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
            <a
              href="/anxiety/privacy-policy"
              className="text-[13px] font-medium text-white/60 transition-colors hover:text-[#1f5fff]"
            >
              Privacy Policy
            </a>
            <a
              href="/anxiety/terms-and-conditions"
              className="text-[13px] font-medium text-white/60 transition-colors hover:text-[#1f5fff]"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="/anxiety/cancellation-and-refund"
              className="text-[13px] font-medium text-white/60 transition-colors hover:text-[#1f5fff]"
            >
              Cancellation &amp; Refund
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
