import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cocktails = [
  {
    title: "MATCHA MIRAGE",
    image:
      "https://images.unsplash.com/photo-1634496064950-02f043806b09?w=600&q=80",
  },
  {
    title: "ROOTS & FIRE",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
  },
  {
    title: "MOONLIGHT BETEL",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
  },
  {
    title: "PICANTE",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
  },
  {
    title: "CHIKOO CHILLER",
    image:
      "https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=600&q=80",
  },
  {
    title: "FORBIDDEN TROPIC",
    image:
      "https://images.unsplash.com/photo-1563223771-375783ee91ad?w=600&q=80",
  },
  {
    title: "CLEAR LIBRE",
    image:
      "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=600&q=80",
  },
  {
    title: "COLD RITUAL",
    image:
      "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=600&q=80",
  },
];

function VinylCard({ item }) {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div className="relative flex h-[260px] w-[260px] items-center justify-center rounded-full bg-black shadow-[0_20px_60px_rgba(0,0,0,.5)]">
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background:
              "repeating-radial-gradient(circle,#333 0px,#333 2px,#000 4px,#000 8px)",
          }}
        />

        <div className="absolute h-[110px] w-[110px] overflow-hidden rounded-full border border-white/10">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <h3 className="mt-6 text-center text-[13px] tracking-[0.18em] text-white">
        {item.title}
      </h3>
    </div>
  );
}

export default function SignatureCrafts() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Move exactly 4 cards width
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={sectionRef} className="relative bg-[#2b0005] text-white">
      {/* Scroll distance */}
      <div className="relative h-[250vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          {/* Heading */}
          <div className="pt-20 text-center">
            <h2 className="text-6xl font-light uppercase tracking-wide">
              Signature Crafts
            </h2>

            <p className="mt-4 text-white/60">Discover handcrafted cocktails</p>
          </div>

          {/* Cards */}
          <div className="flex flex-1 items-center overflow-hidden">
            <motion.div style={{ x }} className="flex gap-12 px-[8vw]">
              {cocktails.map((item) => (
                <VinylCard key={item.title} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
