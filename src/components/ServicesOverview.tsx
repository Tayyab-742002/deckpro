import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const slides = [
  {
    badge: "Marine Flooring",
    heading: ["Custom EVA Foam", "For Your Vessel"],
    subtitle:
      "Precision-scanned and fitted to perfection. Premium marine flooring for boats of all sizes, from luxury yachts to fishing vessels.",
    bg: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1920&auto=format&fit=crop",
    brandText: "Premium Flooring",
    hotspots: [
      { label: "3D Scanned", desc: "Millimetre-perfect fit", top: "52%", left: "28%" },
      { label: "Custom Patterns", desc: "Unlimited design options", top: "36%", left: "54%" },
      { label: "Marine Grade", desc: "Built for the water", top: "60%", left: "44%" },
    ],
    feature: {
      title: "EVA Foam Deck",
      desc: "Non-slip, UV-resistant comfort",
      image:
        "https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=400&auto=format&fit=crop",
    },
  },
  {
    badge: "Campers & 4x4",
    heading: ["Transform Your", "Adventure Vehicle"],
    subtitle:
      "Durable, stylish custom flooring for campervans, motorhomes, and 4x4s. Built to withstand the outback and look great doing it.",
    bg: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?q=80&w=1920&auto=format&fit=crop",
    brandText: "Tailored to You",
    hotspots: [
      { label: "Rugged Build", desc: "Outback-tough materials", top: "50%", left: "30%" },
      { label: "Easy Clean", desc: "Wipe-down simplicity", top: "38%", left: "56%" },
      { label: "Perfect Fit", desc: "Custom-cut precision", top: "58%", left: "46%" },
    ],
    feature: {
      title: "4x4 Interior",
      desc: "Adventure-ready flooring",
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400&auto=format&fit=crop",
    },
  },
  {
    badge: "3D Scanning",
    heading: ["High-Precision", "Digital Mapping"],
    subtitle:
      "Advanced 3D scanning and modelling services for clients requiring detailed templates and designs. Accuracy down to the millimetre.",
    bg: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1920&auto=format&fit=crop",
    brandText: "Meticulous Detail",
    hotspots: [
      { label: "Laser Accurate", desc: "Sub-millimetre precision", top: "48%", left: "26%" },
      { label: "Digital Models", desc: "3D design templates", top: "35%", left: "52%" },
      { label: "Any Surface", desc: "Complex shapes mapped", top: "56%", left: "42%" },
    ],
    feature: {
      title: "3D Template",
      desc: "Perfect measurements guaranteed",
      image:
        "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=400&auto=format&fit=crop",
    },
  },
];

const AUTOPLAY_MS = 6000;

const ServicesOverview = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const resetAutoplay = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    resetAutoplay();
    return () => clearInterval(timerRef.current);
  }, [resetAutoplay]);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    resetAutoplay();
  }, [resetAutoplay]);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
    resetAutoplay();
  }, [resetAutoplay]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* ── Background images with crossfade ── */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100 z-[1]" : "opacity-0 z-0"
            }`}
        >
          <img
            src={s.bg}
            alt=""
            className="h-full w-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* ── All content ── */}
      <div className="relative z-10 flex h-full flex-col justify-between px-8 py-10 sm:px-12 sm:py-12 lg:px-16 lg:py-16">
        {/* Top-left: badge + heading + subtitle */}
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wider text-white backdrop-blur-sm">
                <Sparkles size={12} />
                {slide.badge}
              </span>

              {/* Heading */}
              <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {slide.heading[0]}
                <br />
                {slide.heading[1]}
              </h2>

              {/* Subtitle */}
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Hotspot labels — desktop only ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`hotspots-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-[3] hidden pointer-events-none lg:block"
          >
            {slide.hotspots.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.45 }}
                className="absolute"
                style={{ top: h.top, left: h.left }}
              >
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 shadow-lg backdrop-blur-md">
                  <p className="text-sm font-semibold text-white">{h.label}</p>
                  <p className="text-xs text-white/60">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Feature card — top-right, desktop only ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`feature-${current}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute right-8 top-10 z-[4] hidden lg:block lg:right-16 lg:top-16"
          >
            <div className="w-56 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
              <img
                src={slide.feature.image}
                alt={slide.feature.title}
                className="h-28 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-sm font-semibold text-white">
                  {slide.feature.title}
                </p>
                <p className="mt-0.5 text-xs text-white/60">
                  {slide.feature.desc}
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    to="/marine-flooring"
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1a2f45] transition-all hover:bg-white/90"
                  >
                    Learn More
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-white/10"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom-left: brand text + nav arrows */}
        <div>
          <AnimatePresence mode="wait">
            <motion.p
              key={`brand-${current}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            >
              {slide.brandText}
            </motion.p>
          </AnimatePresence>

          <div className="mt-4 flex gap-2">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white/10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-all hover:bg-white/10"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;