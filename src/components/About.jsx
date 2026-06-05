import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const MARQUEE_TEXT = "MUSIC MAKES MY HEART GO BA-BA-REEBA";

const bloomEase = [0.22, 1, 0.36, 1];

function useBloomMotionValues(scrollYProgress) {
  const progress = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
    [0, 0.05, 0.16, 0.3, 0.48, 0.66, 0.84, 1],
  );

  const centerScale = useTransform(progress, [0, 1], [0.45, 1]);
  const centerOpacity = useTransform(progress, [0, 0.32], [0, 1]);

  const leftScale = useTransform(progress, [0, 0.08, 1], [0.45, 0.45, 1]);
  const leftX = useTransform(progress, [0, 0.08, 1], [72, 72, 0]);
  const leftOpacity = useTransform(progress, [0, 0.14, 1], [0, 0, 1]);

  const rightScale = useTransform(progress, [0, 0.14, 1], [0.45, 0.45, 1]);
  const rightX = useTransform(progress, [0, 0.14, 1], [-72, -72, 0]);
  const rightOpacity = useTransform(progress, [0, 0.2, 1], [0, 0, 1]);

  return {
    centerScale,
    centerOpacity,
    leftScale,
    leftX,
    leftOpacity,
    rightScale,
    rightX,
    rightOpacity,
  };
}

function FloatingImage({ src, className, duration, delay, isFloating }) {
  return (
    <motion.img
      src={src}
      alt=""
      className={className}
      animate={isFloating ? { y: [0, -5, 0, 5, 0] } : { y: 0 }}
      transition={
        isFloating
          ? {
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : { duration: 0.35, ease: bloomEase }
      }
    />
  );
}

function ImageStack({ backSrc, frontSrc, side, isFloating }) {
  const isLeft = side === "left";
  const backFloat = isLeft
    ? { duration: 5, delay: 0 }
    : { duration: 5.4, delay: 0.35 };
  const frontFloat = isLeft
    ? { duration: 5.8, delay: 0.7 }
    : { duration: 6.2, delay: 1.1 };

  return (
    <div
      className={`relative mx-auto h-[280px] w-[200px] sm:h-[340px] sm:w-[240px] md:h-[400px] md:w-[280px] lg:h-[460px] lg:w-[300px] ${
        isLeft ? "lg:mr-auto lg:ml-0" : "lg:ml-auto lg:mr-0"
      }`}
    >
      <FloatingImage
        src={backSrc}
        isFloating={isFloating}
        duration={backFloat.duration}
        delay={backFloat.delay}
        className={`absolute top-0 z-0 h-[78%] w-[82%] object-cover ${
          isLeft ? "left-0" : "right-0"
        }`}
      />
      <FloatingImage
        src={frontSrc}
        isFloating={isFloating}
        duration={frontFloat.duration}
        delay={frontFloat.delay}
        className={`absolute bottom-0 z-10 h-[78%] w-[82%] object-cover ${
          isLeft ? "right-0" : "left-0"
        }`}
      />
    </div>
  );
}

function MusicMarquee() {
  return (
    <div className="overflow-hidden border-b border-white/10 bg-black py-7 md:py-9">
      <div className="animate-about-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className="mx-8 whitespace-nowrap font-sans text-[clamp(1.75rem,5vw,4.5rem)] font-medium uppercase tracking-[0.12em] text-transparent [-webkit-text-stroke:1px_#ffffff] md:mx-12"
              >
                {MARQUEE_TEXT}
                <span className="mx-8 text-white/30 md:mx-12">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const [canFloat, setCanFloat] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 1.05", "start -0.25"],
  });

  const bloom = useBloomMotionValues(scrollYProgress);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setCanFloat(value > 0.88);
  });

  return (
    <section id="about" className="overflow-visible bg-black text-white">
      <MusicMarquee />

      <div
        ref={sectionRef}
        className="mx-auto max-w-[1600px] overflow-visible px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,520px)_minmax(0,1fr)] lg:gap-5 xl:gap-8">
          <motion.div
            className="order-2 hidden lg:block lg:order-1"
            style={{
              scale: bloom.leftScale,
              x: bloom.leftX,
              opacity: bloom.leftOpacity,
            }}
          >
            <ImageStack
              side="left"
              isFloating={canFloat}
              backSrc="/assets/abouUsImg2.png"
              frontSrc="/assets/abouUsImg3.png"
            />
          </motion.div>

          <motion.div
            className="order-1 flex flex-col items-center overflow-visible px-2 pb-2 pt-1 text-center lg:order-2 lg:px-6"
            style={{
              scale: bloom.centerScale,
              opacity: bloom.centerOpacity,
            }}
          >
            <img
              src="/assets/logo2.png"
              alt="BA BA REEBA"
              className="mb-5 h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-24 md:w-24"
            />

            <h2 className="font-nevada text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.05] tracking-[0.14em] text-white sm:tracking-[0.18em]">
              BA BA REEBA
            </h2>

            <p className="mt-3 max-w-md font-sans text-sm font-light leading-relaxed tracking-[0.06em] text-white/90 sm:text-base md:max-w-lg">
              isn&apos;t just a bar, it&apos;s a vault for those who live with
              intention.
            </p>

            <p className="mt-5 max-w-lg font-sans text-[11px] font-light leading-[1.9] tracking-[0.04em] text-white/75 sm:text-xs md:max-w-xl md:text-[13px]">
              Every pour, every playlist, every piece of worn-in furniture is
              chosen with care. We&apos;re not about the noise or the rush
              we&apos;re about presence. The kind that lingers in a well-crafted
              drink, a meaningful pause, or a late-night conversation that stays
              with you.
            </p>

            <a
              href="#about"
              className="mt-8 inline-block border border-gold bg-transparent px-10 py-3.5 font-sans text-[10px] font-light uppercase tracking-[0.32em] text-gold transition-all duration-500 ease-in-out hover:bg-gold hover:text-white sm:text-[11px]"
            >
              CURIOUS ABOUT US?
            </a>
          </motion.div>

          <motion.div
            className="order-3 hidden lg:block"
            style={{
              scale: bloom.rightScale,
              x: bloom.rightX,
              opacity: bloom.rightOpacity,
            }}
          >
            <ImageStack
              side="right"
              isFloating={canFloat}
              backSrc="/assets/abouUsImg1.png"
              frontSrc="/assets/abouUsImg2.png"
            />
          </motion.div>
        </div>

        <div className="mt-7 flex flex-col items-center gap-6 lg:hidden">
          <motion.div
            className="w-full"
            style={{
              scale: bloom.leftScale,
              x: bloom.leftX,
              opacity: bloom.leftOpacity,
            }}
          >
            <ImageStack
              side="left"
              isFloating={canFloat}
              backSrc="/assets/abouUsImg2.png"
              frontSrc="/assets/abouUsImg3.png"
            />
          </motion.div>
          <motion.div
            className="w-full"
            style={{
              scale: bloom.rightScale,
              x: bloom.rightX,
              opacity: bloom.rightOpacity,
            }}
          >
            <ImageStack
              side="right"
              isFloating={canFloat}
              backSrc="/assets/abouUsImg1.png"
              frontSrc="/assets/abouUsImg2.png"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
