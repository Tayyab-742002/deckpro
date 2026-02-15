import { motion } from "framer-motion";
import {
  Ship,
  Truck,
  Box,
  ScanLine,
  Palette,
  Factory,
  Wrench,
  ArrowRight,
  Shield,
  Droplets,
  Sun,
  Footprints,
  CheckCircle2,
  Waves,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

/* ───────────────── DATA ───────────────── */

const services = [
  {
    icon: Ship,
    title: "Marine Flooring",
    subtitle: "Boats & Yachts",
    description:
      "Custom EVA foam flooring for boats of all sizes. From tinnies to luxury yachts — precision scanned and expertly fitted for a flawless, non-slip finish that withstands the harshest marine conditions.",
    features: [
      "Precision scanning of your deck",
      "Custom colour & pattern design",
      "CNC-machined from premium EVA foam",
      "Professional on-site installation",
      "UV & saltwater resistant",
    ],
    link: "/marine-flooring",
    image:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80",
    accent: "from-cyan-500/20 to-blue-600/20",
  },
  {
    icon: Truck,
    title: "Campers & 4x4",
    subtitle: "Motorhomes & Off-Road",
    description:
      "Transform your campervan, motorhome, or 4x4 interior with durable, stylish custom flooring. Our EVA foam solutions are built to handle the toughest outback conditions while keeping your ride looking premium.",
    features: [
      "Tailored to any vehicle layout",
      "Shock-absorbing & comfortable underfoot",
      "Easy to clean & maintain",
      "Custom branding & designs available",
      "Built for harsh Australian conditions",
    ],
    link: "/campers",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
    accent: "from-amber-500/20 to-orange-600/20",
  },
  {
    icon: Box,
    title: "Precision Scanning",
    subtitle: "Digital Modelling",
    description:
      "High-precision scanning and digital modelling for clients requiring detailed templates, accurate measurements, and bespoke design solutions. Perfect for complex or unique spaces.",
    features: [
      "Sub-millimetre accuracy",
      "Digital models & templates",
      "Compatible with CAD/CAM workflows",
      "Ideal for complex geometries",
      "Available as standalone service",
    ],
    link: "/3d-scanning",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
    accent: "from-violet-500/20 to-purple-600/20",
  },
];

const processSteps = [
  {
    icon: ScanLine,
    step: "01",
    title: "Precision Scanning",
    description:
      "We use precision scanning technology to capture every contour and dimension of your boat deck, campervan, or 4x4 floor — ensuring an exact digital template.",
  },
  {
    icon: Palette,
    step: "02",
    title: "Custom Design",
    description:
      "Your flooring is designed to your exact specifications. Choose your colours, patterns, textures, and layout — all tailored to your vision and lifestyle.",
  },
  {
    icon: Factory,
    step: "03",
    title: "Manufacturing",
    description:
      "Each piece is CNC-machined from premium marine-grade EVA foam in our dedicated workshop. Precision-cut, quality-checked, and built to last.",
  },
  {
    icon: Wrench,
    step: "04",
    title: "Expert Fitting",
    description:
      "Our experienced team professionally installs your custom flooring on-site. The result? A flawless finish that looks and performs exactly as promised.",
  },
];

const materialFeatures = [
  {
    icon: Droplets,
    title: "Water Resistant",
    description: "Closed-cell EVA foam repels water, preventing mould and mildew buildup.",
  },
  {
    icon: Sun,
    title: "UV Stabilised",
    description: "Advanced UV inhibitors protect against fading in harsh Australian sun.",
  },
  {
    icon: Footprints,
    title: "Non-Slip Surface",
    description: "Textured diamond or teak pattern provides superior grip when wet.",
  },
  {
    icon: Shield,
    title: "Marine Grade",
    description: "Built for the harshest saltwater environments. 5-year warranty included.",
  },
];

/* ───────────────── ANIMATIONS ───────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemPop = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ───────────────── COMPONENT ───────────────── */

const Services = () => {
  return (
    <main>
      {/* ════════════════════════════════════════════
          SECTION 1 — HERO BANNER (Inner-page style)
      ════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#d0eaec]/40 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#d0eaec]/30 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Text */}
            <div>
              {/* Breadcrumb-style badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2f45]">
                    <Waves size={11} className="text-white" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60">
                    Our Services
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl font-semibold text-[#1a2f45] leading-tight sm:text-5xl lg:text-6xl"
              >
                Crafted with
                <br />
                Precision
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-5 max-w-md text-sm leading-relaxed text-[#1a2f45]/40 sm:text-base"
              >
                Premium custom EVA foam flooring for boats, campervans, and 4x4
                vehicles. Every project follows our meticulous four-stage
                process — from precision scan to expert installation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#1a2f45] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#1a2f45]/90 hover:shadow-xl"
                >
                  Start Your Project
                </Link>
                <a
                  href="#our-services"
                  className="inline-flex items-center justify-center rounded-full border border-[#1a2f45]/20 px-7 py-3 text-sm font-medium text-[#1a2f45]/70 transition-all duration-300 hover:bg-[#1a2f45]/5"
                >
                  Explore Below
                </a>
              </motion.div>

              {/* Mini stats strip */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="mt-12 flex gap-10"
              >
                {[
                  { value: "50+", label: "Projects Completed" },
                  { value: "5yr", label: "Warranty" },
                  { value: "WA", label: "Owned & Operated" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-semibold text-[#1a2f45]">
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#1a2f45]/40 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Image composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main image */}
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80"
                    alt="Premium marine flooring services"
                    className="w-full h-[480px] object-cover"
                  />
                </div>

                {/* Floating accent card */}
                <div className="absolute -bottom-6 -left-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-black/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f0f1]">
                      <Ship size={20} className="text-[#1a2f45]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a2f45]">
                        Marine Grade EVA
                      </p>
                      <p className="text-xs text-[#1a2f45]/40">
                        UV & saltwater resistant
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soft blob behind the image */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-[#dcedef]/50 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — SERVICES DEEP DIVE
      ════════════════════════════════════════════ */}
      <section id="our-services" className="py-28 lg:py-36 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-20 text-center"
          >
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
              What We Offer
            </span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              Premium Flooring Services
            </h2>
            <p className="mt-5 mx-auto max-w-2xl font-body text-lg text-muted-foreground">
              Whether it&apos;s a luxury yacht, an outback 4x4, or a detailed digital model
              — every project receives the same meticulous attention to perfection.
            </p>
          </motion.div>

          {/* Service Cards — Alternating Layout */}
          <div className="space-y-24 lg:space-y-32">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`grid gap-12 lg:gap-16 lg:grid-cols-2 items-center ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""
                  }`}
              >
                {/* Image Side */}
                <div className="relative lg:[direction:ltr]">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-80 lg:h-[480px] w-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Floating badge */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-xl border border-white/15 bg-black/40 px-5 py-3 backdrop-blur-md">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <service.icon size={20} />
                      </div>
                      <div>
                        <p className="font-display text-sm font-bold text-white">
                          {service.title}
                        </p>
                        <p className="font-body text-xs text-white/60">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative gradient blob */}
                  <div
                    className={`absolute -z-10 -bottom-8 ${i % 2 !== 0 ? "-left-8" : "-right-8"
                      } w-72 h-72 rounded-full bg-gradient-to-br ${service.accent} blur-3xl`}
                  />
                </div>

                {/* Content Side */}
                <div className="lg:[direction:ltr]">
                  <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">
                    {service.subtitle}
                  </span>
                  <h3 className="font-display text-3xl font-bold text-foreground sm:text-4xl mb-5">
                    {service.title}
                  </h3>
                  <p className="font-body text-base leading-relaxed text-muted-foreground mb-8">
                    {service.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-10">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 font-body text-sm text-foreground/80"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-primary flex-shrink-0 mt-0.5"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={service.link}
                    className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-7 py-3.5 font-body text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                  >
                    Learn More
                    <ChevronRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3 — OUR PROCESS (VERTICAL TIMELINE)
      ════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-cream">
        {/* Decorative blurs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl translate-x-1/3 translate-y-1/4" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
              Our Process
            </span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              From Scan to Fit
            </h2>
            <p className="mt-5 mx-auto max-w-xl font-body text-lg text-muted-foreground">
              A seamless four-stage workflow delivering premium results,
              every single time.
            </p>
          </motion.div>

          {/* Timeline — Desktop: horizontal row, Mobile: vertical */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                variants={itemPop}
                className="group relative rounded-2xl border border-border bg-background p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Step number watermark */}
                <span className="absolute top-6 right-6 font-display text-6xl font-bold text-primary/[0.07] group-hover:text-primary/[0.14] transition-colors duration-500 select-none">
                  {step.step}
                </span>

                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                  <step.icon size={24} />
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* Connector line (desktop only) */}
                {i < processSteps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 hidden h-px w-8 bg-gradient-to-r from-border to-primary/30 lg:block" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Payment Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"
          >
            <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Payment Terms
            </p>
            <p className="font-body text-base text-foreground leading-relaxed">
              50% deposit required upon accepting your quote to secure a scan date.
              <br />
              <span className="text-muted-foreground">
                Remaining 50% is due upon job completion — no exceptions.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — MATERIAL SHOWCASE
      ════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
                The Material
              </span>
              <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl mb-6">
                Premium EVA Foam
              </h2>
              <p className="font-body text-base leading-relaxed text-muted-foreground mb-10">
                We exclusively use marine-grade EVA (Ethylene-Vinyl Acetate) foam —
                the gold standard in marine and automotive flooring. Lightweight,
                durable, and available in an extensive range of colours and textures.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-5"
              >
                {materialFeatures.map((feat) => (
                  <motion.div
                    key={feat.title}
                    variants={itemPop}
                    className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:border-primary/20"
                  >
                    <feat.icon
                      size={22}
                      className="text-primary mb-3"
                    />
                    <h4 className="font-display text-sm font-bold text-foreground mb-1">
                      {feat.title}
                    </h4>
                    <p className="font-body text-xs leading-relaxed text-muted-foreground">
                      {feat.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1559827291-beb535aa5d4c?w=500&q=80"
                      alt="EVA foam close-up texture"
                      className="h-48 w-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=500&q=80"
                      alt="Custom marine flooring pattern"
                      className="h-64 w-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1541962716-c85f547ebb7e?w=500&q=80"
                      alt="Boat deck with custom flooring"
                      className="h-64 w-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1605281317010-fe5fffff7ee1?w=500&q=80"
                      alt="Premium finished result"
                      className="h-48 w-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/10 blur-[100px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5 — WHY CHOOSE US
      ════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 section-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
              Why Deckpro
            </span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              The Deckpro Difference
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                num: "01",
                title: "Full-Service Solution",
                desc: "We handle everything from scan to fit — no outsourcing, no middlemen. One team, one standard of excellence.",
              },
              {
                num: "02",
                title: "Precision Technology",
                desc: "Precision scanning captures every contour with sub-millimetre accuracy. The result is a perfect fit, every time.",
              },
              {
                num: "03",
                title: "WA Owned & Operated",
                desc: "Based in Perth, serving all of Western Australia. We know local conditions and we build for them.",
              },
              {
                num: "04",
                title: "Premium Materials Only",
                desc: "We exclusively use marine-grade EVA foam — UV-stabilised, non-slip, and backed by a 5-year warranty.",
              },
              {
                num: "05",
                title: "Custom by Default",
                desc: "Every project is bespoke. Your design, your colours, your specifications — brought to life with precision.",
              },
              {
                num: "06",
                title: "Transparent Process",
                desc: "Clear pricing, upfront deposit terms, and no surprises. You know exactly what to expect at every stage.",
              },
            ].map((item) => (
              <motion.div
                key={item.num}
                variants={itemPop}
                className="group rounded-2xl border border-border bg-background p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <span className="inline-block font-display text-3xl font-bold text-primary/15 group-hover:text-primary/30 transition-colors duration-500 mb-4">
                  {item.num}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 6 — CTA
      ════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-dark">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-6">
              Ready to Get Started?
            </span>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Let&apos;s Build Your
              <br />
              <span className="text-gradient">Dream Floor</span>
            </h2>
            <p className="mx-auto max-w-xl font-body text-lg text-white/60 mb-10">
              Tell us about your project. Provide the details we need and
              we&apos;ll deliver an accurate quote within 48 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              >
                Get a Free Quote
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/#gallery"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-10 py-4 font-body text-sm font-medium text-white transition-all duration-300 hover:bg-white/5"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
