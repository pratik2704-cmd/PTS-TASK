import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const unsplash = (id, w, h) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

const PORTRAIT =
  "h-[11rem] w-[7.25rem] sm:h-[12.5rem] sm:w-[8.25rem] md:h-56 md:w-36 lg:h-[15rem] lg:w-[9.5rem]";

const GALLERY_IMAGES = [
  {
    src: unsplash("photo-1485872299829-c673f5194813", 220, 320),
    x: 460,
    y: -185,
    z: 6,
    rotate: -4,
  },
  {
    src: unsplash("photo-1544586784-b9ee32edb3ff", 220, 320),
    x: -260,
    y: 50,
    z: 1,
    rotate: -10,
  },
  {
    src: unsplash("photo-1414235077428-338989a2e8c0", 200, 300),
    x: -470,
    y: 55,
    z: 8,
    rotate: 3,
  },
  {
    src: unsplash("photo-1554118811-1e0d58224f24", 220, 320),
    x: 175,
    y: 105,
    z: 2,
    rotate: 15,
  },
  {
    src: unsplash("photo-1492684223066-81342ee5ff30", 500, 500),
    x: -500,
    y: -255,
    z: 20,
    rotate: -25,
  },
  {
    src: unsplash("photo-1516450137517-162bfbeb8dba", 220, 320),
    x: 190,
    y: -295,
    z: 7,
    rotate: 30,
  },
  {
    src: unsplash("photo-1571615112700-755bd763b63e", 220, 320),
    x: -320,
    y: -375,
    z: 9,
    rotate: 6,
  },
  {
    src: unsplash("photo-1504674900247-0877df9cc836", 200, 300),
    x: 440,
    y: 165,
    z: 3,
    rotate: -6,
  },
  {
    src: unsplash("photo-1584778671968-01ad04b90c39", 200, 300),
    x: 340,
    y: -365,
    z: 3,
    rotate: -6,
  },
  {
    src: unsplash("photo-1578474846511-04ba529f0b88", 200, 300),
    x: -640,
    y: -50,
    z: 3,
    rotate: -10,
  },
];

const ORBIT_RINGS = [70, 110, 150, 190, 220];

const ORBIT_DOTS = [
  { cx: 200, cy: 118, r: 2.5, dx: 26, dy: -5, duration: 9 },
  { cx: 132, cy: 102, r: 2.7, dx: -64, dy: 16, duration: 9 },
  { cx: 148, cy: 92, r: 1.5, dx: 5, dy: 4, duration: 13 },
  { cx: 300, cy: 168, r: 3, dx: -17, dy: 15, duration: 10 },
  { cx: 278, cy: 182, r: 2.5, dx: 74, dy: -6, duration: 12 },
  { cx: 286, cy: 198, r: 5.5, dx: -5, dy: -14, duration: 14 },
  { cx: 262, cy: 210, r: 2, dx: 10, dy: 3, duration: 8 },
  { cx: 188, cy: 288, r: 2.5, dx: -4, dy: 7, duration: 11.5 },
  { cx: 172, cy: 296, r: 2.5, dx: 15, dy: -85, duration: 9.5 },
  { cx: 156, cy: 302, r: 3.5, dx: -6, dy: 4, duration: 12.5 },
  { cx: 210, cy: 145, r: 2.5, dx: 33, dy: 65, duration: 15 },
  { cx: 95, cy: 210, r: 2, dx: -3, dy: -6, duration: 10.5 },
];

function clamp(value, max) {
  return Math.max(-max, Math.min(max, value));
}

function useSpreadBounds(containerRef) {
  const [bounds, setBounds] = useState({ maxX: 380, maxY: 270 });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const update = () => {
      const { width, height } = element.getBoundingClientRect();
      const imgW = width < 640 ? 116 : width < 1024 ? 132 : 152;
      const imgH = width < 640 ? 176 : width < 1024 ? 200 : 240;
      setBounds({
        maxX: Math.max((width - imgW) / 2 - 20, 380),
        maxY: Math.max((height - imgH) / 2 - 20, 550),
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [containerRef]);

  return bounds;
}

function usePositionScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setScale(0.54);
      else if (window.innerWidth < 1024) setScale(0.8);
      else setScale(1);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}

function GalleryImage({
  image,
  index,
  total,
  scrollYProgress,
  positionScale,
  bounds,
}) {
  const start = (index / total) * 0.82;
  const end = Math.min(start + 0.18, 1);

  const itemProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const x = useTransform(itemProgress, (p) =>
    clamp(p * image.x * positionScale, bounds.maxX),
  );
  const y = useTransform(itemProgress, (p) =>
    clamp(p * image.y * positionScale, bounds.maxY),
  );
  const scale = useTransform(itemProgress, [0, 1], [0.3, 1]);
  const opacity = useTransform(itemProgress, [0, 0.06, 1], [0, 0.82, 1]);
  const rotate = useTransform(itemProgress, [0, 1], [0, image.rotate]);

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        zIndex: image.z,
      }}
    >
      <img
        src={image.src}
        alt=""
        loading="lazy"
        decoding="async"
        className={`rounded-[10px] object-cover shadow-[0_8px_24px_rgba(0,0,0,0.45)] ${PORTRAIT}`}
      />
    </motion.div>
  );
}

function FloatingDot({ cx, cy, r, dx, dy, duration, delay }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="white"
      fillOpacity={0.85}
      animate={{
        cx: [cx, cx + dx, cx - dx * 0.6, cx + dx * 0.3, cx],
        cy: [cy, cy + dy, cy - dy * 0.7, cy + dy * 0.4, cy],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function OrbitalGraphic() {
  return (
    <svg
      viewBox="-40 -40 480 480"
      overflow="visible"
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(72vw,420px)] w-[min(72vw,420px)] -translate-x-1/2 -translate-y-1/2 text-white/20"
      aria-hidden
    >
      {ORBIT_RINGS.map((radius) => (
        <circle
          key={radius}
          cx="200"
          cy="200"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {ORBIT_DOTS.map((dot, index) => (
        <FloatingDot
          key={index}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          dx={dot.dx}
          dy={dot.dy}
          duration={dot.duration}
          delay={index * 0.35}
        />
      ))}
    </svg>
  );
}

export default function Gallery() {
  const containerRef = useRef(null);
  const galleryBoundsRef = useRef(null);
  const positionScale = usePositionScale();
  const bounds = useSpreadBounds(galleryBoundsRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="gallery" className="relative bg-black text-white">
      <div
        ref={containerRef}
        className="relative h-[600vh] sm:h-[360vh] lg:h-[400vh]"
      >
        <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
          <div className="relative h-full w-full max-w-[1600px] overflow-hidden">
            <OrbitalGraphic />

            <div
              ref={galleryBoundsRef}
              className="absolute inset-3 z-10 overflow-hidden sm:inset-5 md:inset-7"
            >
              {GALLERY_IMAGES.map((image, index) => (
                <GalleryImage
                  key={`gallery-${index}`}
                  image={image}
                  index={index}
                  total={GALLERY_IMAGES.length}
                  scrollYProgress={scrollYProgress}
                  positionScale={positionScale}
                  bounds={bounds}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
              <p className="font-serif text-[clamp(1.35rem,3.2vw,2.75rem)] font-light leading-[1.35] tracking-[0.02em] text-white">
                Good music. Great crowd. Perfect vibes.
              </p>
              <p className="mt-3 font-serif text-[clamp(0.95rem,2vw,1.35rem)] font-light italic leading-relaxed tracking-[0.02em] text-white/55">
                Just a glimpse of what awaits you inside
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
