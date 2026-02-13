import { motion } from "framer-motion";
import { ArrowRight, Anchor, Shield, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
// import heroImage from "@/assets/hero-boat.jpg";

const stats = [
  { icon: Anchor, label: "Marine Grade", sublabel: "EVA Foam" },
  { icon: Shield, label: "5 Year", sublabel: "Warranty" },
  { icon: Ruler, label: "Custom Fit", sublabel: "Every Time" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={"https://images.unsplash.com/photo-1585000962552-70f0a67223d9?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="Luxury boat on water"
          className="h-full w-full object-cover scale-105"
        />
        <div className="hero-overlay absolute inset-0" />
        {/* Extra bottom gradient for stats readability */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-40 sm:pb-0 lg:px-8">
        <div className="max-w-2xl pt-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-body font-medium uppercase tracking-widest text-white/90 glass">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Perth&apos;s Premium Marine Flooring
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-lg"
          >
            Custom EVA Foam
            <br />
            <span className="text-gradient drop-shadow-none">Flooring Solutions</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 max-w-lg font-body text-lg leading-relaxed text-white/90 drop-shadow-md"
          >
            From precision 3D scanning to expert installation — we craft
            bespoke marine flooring for boats, campervans, and 4x4 vehicles
            across Western Australia.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
            >
              Start Your Project
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-body text-sm font-medium text-white transition-all duration-300 hover:bg-white/20 glass"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0"
        >
          <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
            <div className="flex flex-wrap gap-6 sm:gap-12 items-center">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 glass">
                    <stat.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-white">
                      {stat.label}
                    </p>
                    <p className="font-body text-xs text-white/60">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              ))}
              {/* Decorative line */}
              <div className="ml-auto hidden h-px flex-1 bg-gradient-to-r from-white/20 to-transparent lg:block" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
