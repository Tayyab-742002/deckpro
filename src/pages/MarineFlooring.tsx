import { motion } from "framer-motion";
import {
  Anchor,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Sun,
  Shield,
  Footprints,
  ScanLine,
  Palette,
  Factory,
  Wrench,
  ChevronDown,
  Waves,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "@/components/Footer";

/* ───────── DATA ───────── */

const features = [
  {
    icon: Droplets,
    title: "100% Waterproof",
    desc: "Closed-cell EVA foam won't absorb water — no mould, no mildew, no rot.",
  },
  {
    icon: Sun,
    title: "UV Stabilised",
    desc: "Advanced UV inhibitors prevent fading, even under intense Australian sun.",
  },
  {
    icon: Footprints,
    title: "Non-Slip Grip",
    desc: "Textured teak or diamond patterns for superior traction when wet.",
  },
  {
    icon: Shield,
    title: "5-Year Warranty",
    desc: "Marine-grade durability backed by our comprehensive warranty.",
  },
];

const processSteps = [
  { icon: ScanLine, num: "01", title: "3D Scan", desc: "We scan every contour of your boat deck with sub-millimetre precision." },
  { icon: Palette, num: "02", title: "Design", desc: "Choose colours, patterns, and layout — everything tailored to your vision." },
  { icon: Factory, num: "03", title: "Manufacture", desc: "CNC-machined from premium EVA foam in our dedicated workshop." },
  { icon: Wrench, num: "04", title: "Install", desc: "Professional on-site fitting for a flawless, seamless finish." },
];

const faqs = [
  {
    q: "What types of boats do you work on?",
    a: "We work on all types — from tinnies and centre consoles to luxury yachts and pontoons. If it has a deck, we can floor it.",
  },
  {
    q: "How long does the full process take?",
    a: "Typically 2–3 weeks from scan to installation, depending on the complexity of the design and the size of the boat.",
  },
  {
    q: "Can I choose any colour or pattern?",
    a: "Absolutely. We offer an extensive range of colours, textures, and patterns. Custom branding and logos are also available.",
  },
  {
    q: "Do I need to bring my boat to you?",
    a: "No. We come to your boat for both the 3D scan and the installation. We service all of Western Australia.",
  },
  {
    q: "What are your payment terms?",
    a: "50% deposit upon accepting your quote to secure a scan date. Remaining 50% is due upon completion — no exceptions.",
  },
  {
    q: "Is the EVA foam slippery when wet?",
    a: "Not at all. Our textured surfaces are specifically designed for non-slip grip, even in the wettest conditions.",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80", alt: "Boat deck flooring" },
  { src: "https://images.unsplash.com/photo-1559827291-beb535aa5d4c?w=600&q=80", alt: "Marine EVA close-up" },
  { src: "https://images.unsplash.com/photo-1541962716-c85f547ebb7e?w=600&q=80", alt: "Custom fitted deck" },
  { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", alt: "Boat on water" },
  { src: "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=600&q=80", alt: "Premium finish" },
  { src: "https://images.unsplash.com/photo-1605281317010-fe5fffff7ee1?w=600&q=80", alt: "Precision fitting" },
];

/* ───────── ANIMATIONS ───────── */

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const popUp = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ───────── FAQ ITEM ───────── */

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary"
      >
        <span className="font-display text-base font-bold text-foreground pr-4">{q}</span>
        <ChevronDown
          size={20}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-5 font-body text-sm leading-relaxed text-muted-foreground">{a}</p>
      </motion.div>
    </div>
  );
};

/* ───────── PAGE ───────── */

const MarineFlooring = () => {
  return (
    <main>
      {/* ══════ HERO ══════ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#d0e4f0]/40 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#d0e4f0]/30 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2f45]">
                    <Anchor size={11} className="text-white" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60">
                    Marine Flooring
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                className="text-4xl font-semibold text-[#1a2f45] leading-tight sm:text-5xl lg:text-6xl"
              >
                Custom Boat
                <br />
                Flooring
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-5 max-w-md text-sm leading-relaxed text-[#1a2f45]/40 sm:text-base"
              >
                From tinnies to luxury yachts — every deck gets the same meticulous
                3D scan, custom design, and expert installation using premium
                marine-grade EVA foam.
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
                  Get a Quote
                </Link>
                <Link
                  to="/#gallery"
                  className="inline-flex items-center justify-center rounded-full border border-[#1a2f45]/20 px-7 py-3 text-sm font-medium text-[#1a2f45]/70 transition-all duration-300 hover:bg-[#1a2f45]/5"
                >
                  View Gallery
                </Link>
              </motion.div>

              {/* Mini stats */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="mt-12 flex gap-10"
              >
                {[
                  { value: "50+", label: "Boats Fitted" },
                  { value: "5yr", label: "Warranty" },
                  { value: "<0.5mm", label: "Scan Accuracy" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-semibold text-[#1a2f45]">{stat.value}</p>
                    <p className="text-xs text-[#1a2f45]/40 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=900&q=80"
                    alt="Luxury boat with custom EVA foam flooring"
                    className="w-full h-[480px] object-cover"
                  />
                </div>

                {/* Floating accent card */}
                <div className="absolute -bottom-6 -left-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-black/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f1f8]">
                      <Anchor size={20} className="text-[#1a2f45]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a2f45]">Marine Grade EVA</p>
                      <p className="text-xs text-[#1a2f45]/40">UV & saltwater resistant</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-[#dce9f3]/50 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ WHY EVA FOAM ══════ */}
      <section className="py-28 lg:py-36 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">Why EVA Foam</span>
              <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl mb-6">
                The Gold Standard in Marine Flooring
              </h2>
              <p className="font-body text-base leading-relaxed text-muted-foreground mb-10">
                EVA (Ethylene-Vinyl Acetate) foam is the material of choice for premium marine flooring worldwide.
                Lightweight, durable, and available in an extensive range of colours and textures — it transforms any
                boat deck into a comfortable, stylish, and safe surface.
              </p>

              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-5">
                {features.map((f) => (
                  <motion.div key={f.title} variants={popUp} className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:border-primary/20">
                    <f.icon size={22} className="text-primary mb-3" />
                    <h4 className="font-display text-sm font-bold text-foreground mb-1">{f.title}</h4>
                    <p className="font-body text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl"><img src="https://images.unsplash.com/photo-1559827291-beb535aa5d4c?w=500&q=80" alt="EVA foam texture" className="h-48 w-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
                  <div className="overflow-hidden rounded-2xl"><img src="https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=500&q=80" alt="Flooring pattern" className="h-64 w-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-2xl"><img src="https://images.unsplash.com/photo-1541962716-c85f547ebb7e?w=500&q=80" alt="Boat deck" className="h-64 w-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
                  <div className="overflow-hidden rounded-2xl"><img src="https://images.unsplash.com/photo-1605281317010-fe5fffff7ee1?w=500&q=80" alt="Finished result" className="h-48 w-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
                </div>
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ GALLERY STRIP ══════ */}
      <section className="py-20 lg:py-28 section-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">Our Work</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Marine Projects</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div key={i} variants={popUp} className="group overflow-hidden rounded-2xl">
                <img src={img.src} alt={img.alt} className="h-52 lg:h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/#gallery" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:underline">
              View Full Gallery <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section className="py-28 lg:py-36 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">How It Works</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Scan. Design. Build. Fit.</h2>
            <p className="mt-5 mx-auto max-w-xl font-body text-lg text-muted-foreground">
              Our seamless four-stage process delivers premium results, every single time.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <motion.div key={s.num} variants={popUp} className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <span className="absolute top-6 right-6 font-display text-6xl font-bold text-primary/[0.07] group-hover:text-primary/[0.14] transition-colors select-none">{s.num}</span>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                  <s.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                {i < processSteps.length - 1 && <div className="absolute top-1/2 -right-4 hidden h-px w-8 bg-gradient-to-r from-border to-primary/30 lg:block" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="py-28 lg:py-36 section-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">FAQ</span>
              <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl mb-6">Common Questions</h2>
              <p className="font-body text-base text-muted-foreground mb-8">
                Everything you need to know about our marine flooring service. Can&apos;t find your answer?
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:underline">
                Get in touch <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="rounded-2xl border border-border bg-background p-8">
              {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden section-dark">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Waves size={32} className="text-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Ready to Transform<br /><span className="text-gradient">Your Deck?</span>
            </h2>
            <p className="mx-auto max-w-lg font-body text-lg text-white/60 mb-10">
              Send us your boat details and we&apos;ll have an accurate quote back to you within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
                Get a Free Quote <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/#gallery" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-10 py-4 font-body text-sm font-medium text-white transition-all duration-300 hover:bg-white/5">
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

export default MarineFlooring;
