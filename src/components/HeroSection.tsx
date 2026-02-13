import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award } from "lucide-react";

const stats = [
  { label: "Happy Traveler", value: "50", suffix: "k+" },
  { label: "Global Destination", value: "120", suffix: "+" },
  { label: "Satisfaction Rate", value: "98", suffix: "%" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0">
        {/* Base blue gradient — sky to ocean */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8CB9D8] via-[#74AAC9] to-[#4B8AB8]" />

        {/* Ocean photo — natural depth (no blend-mode, just opacity) */}
        <img
          src="https://images.unsplash.com/photo-1585000962552-70f0a67223d9?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Luxury vessel on open water"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.65]"
          loading="eager"
        />

        {/* Soft lighter wash at top for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

        {/* Bottom gradient for stats readability */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#2D5E85]/10 to-transparent" />
      </div>

      {/* ── Content — upper-center to match reference ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center px-6 pt-[20vh] text-center sm:pt-[22vh]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1a2f45]/75 px-5 py-2 text-xs font-medium tracking-wider text-white backdrop-blur-sm">
            <Award size={13} />
            Best Marine Flooring 2025
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-semibold leading-tight text-[#1a2f45] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Wake Up in a New
          <br />
          Paradise Every Day
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-5 max-w-md text-sm leading-relaxed text-[#1a2f45]/50 sm:text-base"
        >
          Experience the freedom of the open ocean with the elegance
          you deserve. Where every nautical mile is a story waiting to be told.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8"
        >
          <Link
            to="/marine-flooring"
            className="inline-flex items-center justify-center rounded-full bg-[#1a2f45] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#1a2f45]/90 hover:shadow-xl"
          >
            Explore Services
          </Link>
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="mx-auto max-w-4xl px-8 pb-10 lg:pb-12">
          <div className="flex items-end justify-between">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-xs font-medium uppercase tracking-widest text-white/50">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                  {stat.value}
                  <span className="text-2xl font-semibold sm:text-3xl">{stat.suffix}</span>
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
