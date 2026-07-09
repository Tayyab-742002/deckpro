import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Anchor } from "lucide-react";
import { CldImage } from "@/components/ui/cld-image";
const stats = [
  { label: "Projects Completed", value: "50", suffix: "+" },
  { label: "Client Satisfaction", value: "100", suffix: "%" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0">
        {/* Base teal gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8CC3C8] via-[#6AB3B9] to-[#4B959C]" />

        {/* Hero photo */}
        <CldImage
          publicId="deckpro/site-assets/hero-image"
          alt="Custom EVA foam marine flooring on a boat deck"
          className="absolute inset-0 h-full w-full opacity-60"
          eager
          width={1600}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Bottom gradient for stats readability */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center px-5 pt-28 text-center sm:px-6 sm:pt-32 md:pt-[20vh] lg:pt-[22vh]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-5 sm:mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1a2f45]/75 px-4 py-1.5 text-[11px] font-medium tracking-wider text-white backdrop-blur-sm sm:px-5 sm:py-2 sm:text-xs">
            <Anchor size={13} />
            Perth's Custom Marine Flooring Specialists
          </span>
        </motion.div>

        {/* Heading — standard responsive: 36 → 48 → 60 → 72px */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[2rem] font-bold leading-[1.15] text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Custom Designed
          <br />
          Marine Grade Flooring
        </motion.h1>

        {/* Subtitle — 16px → 18px */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-4 max-w-md text-base leading-relaxed text-white/90 drop-shadow-sm sm:mt-5 sm:max-w-lg sm:text-lg"
        >
          Precision scanned, custom designed, and expertly fitted on-site —
          premium EVA foam flooring for boats, campervans, and 4x4 vehicles
          across WA.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1a2f45] transition-all duration-300 hover:bg-white/90 hover:shadow-xl sm:px-7 sm:py-3 sm:text-base"
          >
            Get a Free Quote
          </Link>
          <a
            href="#services-overview"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 sm:px-7 sm:py-3 sm:text-base"
          >
            Our Services
          </a>
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="mx-auto max-w-4xl px-6 pb-8 sm:px-8 sm:pb-10 lg:pb-12">
          <div className="flex items-end justify-center gap-16 sm:gap-24 md:gap-32">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-[10px] font-medium uppercase tracking-widest text-white/60 sm:text-xs">
                  {stat.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-white drop-shadow-md sm:mt-1.5 sm:text-4xl md:text-5xl lg:text-6xl">
                  {stat.value}
                  <span className="text-lg font-semibold sm:text-2xl md:text-3xl">{stat.suffix}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
