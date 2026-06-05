import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const NAV_ROW_ONE = ["HOME", "MENU", "GALLERY", "CAREER"];
const NAV_ROW_TWO = ["CONTACT", "RESERVATION"];

const linkClass =
  "font-sans text-[10px] font-light uppercase tracking-[0.32em] text-white/90 underline-offset-[5px] transition-[opacity,text-decoration] duration-300 hover:text-white hover:underline sm:text-[11px]";

const legalClass =
  "font-sans text-[9px] font-light uppercase tracking-[0.28em] text-white/50 underline-offset-[4px] transition-[opacity,text-decoration] duration-300 hover:text-white/80 hover:underline sm:text-[10px]";

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Z" />
      <path d="M9.5 9.5c.4 2 2.6 3.6 4.5 3.1.5-.1.9-.5 1.1-.9l.4-.9c0-.2-.1-.4-.3-.5l-1.1-.5c-.2-.1-.4 0-.5.1l-.6.7c-.1.1-.3.1-.5 0-.8-.4-1.5-1.1-1.9-1.9-.1-.2 0-.4.1-.5l.7-.6c.1-.1.2-.3.1-.5l-.5-1.1c-.1-.2-.3-.3-.5-.3l-.9.4c-.4.2-.8.6-.9 1.1-.5 1.9 1.1 4.1 3.1 4.5Z" />
    </svg>
  );
}

function FooterLogo() {
  return (
    <a
      href="/"
      className="group relative mx-auto mb-8 block h-20 w-20 sm:h-24 sm:w-24"
      aria-label="BA BA REEBA home"
    >
      <img
        src="/assets/logo2.png"
        alt=""
        className="absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
      />
      <img
        src="/assets/logo.png"
        alt="BA BA REEBA"
        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
      />
    </a>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.15 });

  return (
    <motion.footer
      ref={footerRef}
      id="contact"
      className="bg-black px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
        <FooterLogo />

        <h2 className="font-nevada text-[clamp(2rem,6vw,3.75rem)] font-light leading-none tracking-[0.2em] text-white sm:tracking-[0.24em]">
          BA BA REEBA
        </h2>

        <nav
          className="mt-12 flex flex-col items-center gap-5 sm:mt-14 sm:gap-6"
          aria-label="Footer"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10 md:gap-x-12">
            {NAV_ROW_ONE.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className={linkClass}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14">
            {NAV_ROW_TWO.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className={linkClass}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex items-center gap-5 sm:mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 text-white transition-opacity duration-300 hover:opacity-70"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 text-white transition-opacity duration-300 hover:opacity-70"
          >
            <WhatsAppIcon />
          </a>
        </div>

        <div className="mt-14 w-full max-w-[720px] border-t border-white/20 sm:mt-16" />

        <p className="mt-8 font-sans text-[9px] font-light uppercase tracking-[0.24em] text-white/50 sm:text-[10px]">
          © 2025 BA BA REEBA. ALL RIGHTS RESERVED.
        </p>

        <p className="mt-4 flex items-center justify-center gap-2 font-sans text-[9px] font-light uppercase tracking-[0.2em] text-white/50 sm:text-[10px]">
          <span>Designed by</span>
          <span className="inline-flex items-center justify-center bg-white px-2 py-0.5 font-sans text-[8px] font-medium tracking-[0.12em] text-black sm:text-[9px]">
            PTS
          </span>
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 sm:gap-x-16">
          <a href="#privacy" className={legalClass}>
            Privacy &amp; Policy
          </a>
          <a href="#terms" className={legalClass}>
            Terms of Services
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
