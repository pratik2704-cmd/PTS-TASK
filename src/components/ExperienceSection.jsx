import { motion } from "framer-motion";

const categories = [
  { title: "FOOD", side: "Food" },
  { title: "COCKTAILS", side: "Cocktails" },
  { title: "AMBIANCE", side: "Ambiance" },
];

export default function ExperienceSection() {
  return (
    <section className="bg-black text-white">
      {categories.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: index * 0.15,
          }}
          className="relative flex h-[35px] items-center justify-center border-b border-white/5 px-6 md:h-[75px] md:px-10"
        >
          {/* Left Text */}
          <span className="absolute left-6 text-[10px] tracking-wide text-white/60 md:left-10">
            {item.side}
          </span>

          {/* Center Title */}
          <h2
            className="
              font-bold
              uppercase
              tracking-tight
              text-white
              text-[32px]
md:text-[42px]
lg:text-[56px]
              leading-none
            "
          >
            {item.title}
          </h2>

          {/* Right Text */}
          <span className="absolute right-6 text-[10px] tracking-wide text-white/60 md:right-10">
            {item.side}
          </span>
        </motion.div>
      ))}
    </section>
  );
}
