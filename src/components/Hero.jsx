import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  "HOME",
  "MENU",
  "RESERVATION",
  "GALLERY",
  "CAREER",
  "CONTACT",
];

const menuListVariants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function useIsLg() {
  const [isLg, setIsLg] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const onChange = (event) => setIsLg(event.matches);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLg(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return isLg;
}

function MenuGridIcon({ isOpen, onClick, rotation }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="grid h-5 w-5 grid-cols-2 grid-rows-2 gap-[3px] text-white transition-opacity hover:opacity-80 md:h-6 md:w-6"
    >
      <motion.span
        className="col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-[3px]"
        animate={{ rotate: isOpen ? rotation : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="block bg-current" />
        ))}
      </motion.span>
    </button>
  );
}

function MenuOverlay({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          onClick={onClose}
        >
          <motion.ul
            className="flex flex-col items-center gap-8"
            variants={menuListVariants}
            initial="closed"
            animate="open"
            onClick={(event) => event.stopPropagation()}
          >
            {NAV_LINKS.map((item) => (
              <motion.li
                key={item}
                variants={menuItemVariants}
                initial={{ y: 48, opacity: 0 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="font-sans text-[13px] font-light tracking-[0.28em] text-white underline-offset-[6px] decoration-white decoration-2 hover:underline"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollBadge() {
  return (
    <a
      href="#menu"
      aria-label="Scroll to explore"
      className="group relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24"
    >
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full animate-[spin_24s_linear_infinite] text-white"
        aria-hidden
      >
        <defs>
          <path
            id="heroScrollCircle"
            d="M 60,60 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
            fill="none"
          />
        </defs>
        <text
          fill="currentColor"
          fontSize="9.5"
          fontFamily="Montserrat, sans-serif"
          letterSpacing="2.5"
        >
          <textPath href="#heroScrollCircle" startOffset="0%">
            EXPLORE • SCROLL • DISCOVER • SCROLL • EXPLORE •
          </textPath>
        </text>
      </svg>
      <span className="pointer-events-none absolute text-white transition-transform group-hover:translate-y-0.5">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path
            d="M12 5v14M6 13l6 6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLg = useIsLg();

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);
  const iconRotation = isLg ? 90 : 45;

  useEffect(() => {
    if (!isMenuOpen || !isLg) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, isLg]);

  return (
    <section className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/HeroImage.JPG"
      >
        <source src="/assets/hero_video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55"
        aria-hidden
      />

      <header className="absolute inset-x-0 top-0 z-20 px-5 pt-6 sm:px-8 sm:pt-8 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <a href="/" className="shrink-0" aria-label="BA BA REEBA home">
            <img
              src="/assets/logo.png"
              alt=""
              className="h-9 w-9 object-contain sm:h-10 sm:w-10 lg:h-11 lg:w-11"
            />
          </a>

          <nav
            className="hidden flex-1 justify-center lg:flex"
            aria-label="Primary"
          >
            <AnimatePresence>
              {isMenuOpen && (
                <motion.ul
                  className="flex items-center gap-8 xl:gap-10"
                  variants={menuListVariants}
                  initial="closed"
                  animate="open"
                >
                  {NAV_LINKS.map((item) => (
                    <motion.li
                      key={item}
                      variants={menuItemVariants}
                      initial={{ y: 48, opacity: 0 }}
                    >
                      <a
                        href={`#${item.toLowerCase()}`}
                        onClick={closeMenu}
                        className="font-sans text-[13px] font-light tracking-[0.28em] text-white underline-offset-[6px] decoration-white decoration-2 hover:underline"
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <nav
              className="hidden items-center gap-5 md:flex lg:hidden"
              aria-label="Primary tablet"
            >
              {NAV_LINKS.slice(0, 3).map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-sans text-[12px] font-light tracking-[0.22em] text-white underline-offset-[6px] decoration-white decoration-2 hover:underline"
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="relative z-[60]">
              <MenuGridIcon
                isOpen={isMenuOpen}
                onClick={toggleMenu}
                rotation={iconRotation}
              />
            </div>
          </div>
        </div>
      </header>

      <MenuOverlay isOpen={isMenuOpen && !isLg} onClose={closeMenu} />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-24 pt-24 text-center sm:px-8 sm:pb-28 md:pb-32">
        <div
          className="group relative mb-6 h-28 w-28 -translate-y-6 shrink-0 sm:mb-8 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:mb-10 lg:h-40 lg:w-40"
          aria-label="BA BA REEBA"
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
        </div>

        <h1 className="font-nevada text-[clamp(2.75rem,10vw,9.5rem)] font-light leading-[1.05] tracking-[0.18em] text-white sm:tracking-[0.22em] lg:tracking-[0.26em]">
          BABA REEBA
        </h1>

        <p className="mt-5 max-w-xl font-sans text-[10px] font-bold leading-relaxed tracking-[0.28em] text-white/90 sm:mt-6 sm:text-[11px] md:max-w-2xl md:text-xs md:tracking-[0.32em]">
          <span className="block">THIS IS FOOD THAT MOVES YOU</span>
          <span className="mt-1 block text-white/80">
            TO TASTE, TO TAP, TO TUNE IN
          </span>
        </p>
      </div>

      <a
        href="#tap"
        className="absolute bottom-8 left-5 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/55 font-serif text-sm tracking-[0.2em] text-gold backdrop-blur-sm transition-colors hover:border-gold/40 hover:bg-black/70 sm:bottom-10 sm:left-8 sm:h-16 sm:w-16 sm:text-base lg:bottom-12 lg:left-12"
        aria-label="Tap"
      >
        TAP
      </a>

      <div className="absolute bottom-6 right-5 z-20 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-12">
        <ScrollBadge />
      </div>
    </section>
  );
}
