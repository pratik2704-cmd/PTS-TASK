import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TESTIMONIALS = [
  {
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  },
];

function TestimonialCard({ testimonial, index, total, scrollYProgress }) {
  const segment = 1 / total;

  const start = index * segment;
  const end = start + segment;

  const direction = index % 2 === 0 ? -1 : 1;

  const x = useTransform(scrollYProgress, [start, end], [0, direction * 1400]);

  const rotate = useTransform(
    scrollYProgress,
    [start, end],
    [0, direction * 18],
  );

  const opacity = useTransform(scrollYProgress, [start, end * 0.98], [1, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        x,
        rotate,
        opacity,
        zIndex: total - index,
      }}
    >
      <div className="flex flex-col items-center">
        <img
          src={testimonial.image}
          alt=""
          className="
            w-[85vw]
            max-w-[750px]
            h-[260px]
            md:h-[420px]
            object-cover
            rounded-xl
            shadow-2xl
          "
        />
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-black text-white"
    >
      <div className="relative h-[650vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="w-full max-w-7xl px-6 mx-auto flex flex-col items-center justify-center h-full">
            <h2
              className="
              mt-10
        mb-12
        text-center
        font-nevada
        text-[clamp(2.2rem,3vw,4.5rem)]
        tracking-[0.08em]
        text-white
      "
            >
              WHAT THEY SAY'S
            </h2>

            <div className="relative h-[500px] md:h-[650px] w-full">
              {TESTIMONIALS.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                  total={TESTIMONIALS.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <div className="h-2 w-2 rounded-full bg-[#ad791f]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
