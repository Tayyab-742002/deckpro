import { motion } from "framer-motion";
import {
  Anchor,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Sun,
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



// images 

import image1 from "@/assets/services/marine/1.jpg";
import image2 from "@/assets/services/marine/2.jpg";
import image3 from "@/assets/services/marine/3.jpg";
import image4 from "@/assets/services/marine/4.jpg";
import image5 from "@/assets/services/marine/5.jpg";
import image6 from "@/assets/services/marine/6.jpg";
import image7 from "@/assets/services/marine/7.jpg";

/* ───────── DATA ───────── */



const processSteps = [
  { icon: ScanLine, num: "01", title: "Precision Scan", desc: "We scan every contour of your boat deck with sub-millimetre precision." },
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
    a: "No. We come to your boat for both the scan and the installation. We service all of Western Australia.",
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
  { src: image1, alt: "Boat deck flooring" },
  { src: image2, alt: "Marine EVA close-up" },
  { src: image3, alt: "Custom fitted deck" },
  { src: image4, alt: "Boat on water" },
  { src: image5, alt: "Premium finish" },
  { src: image6, alt: "Precision fitting" },
];

/* ───────── ANIMATIONS ───────── */

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const popUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ───────── FAQ ITEM ───────── */

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-[#1a2f45]"
      >
        <span className="text-base font-semibold text-[#1a2f45] pr-4">{q}</span>
        <ChevronDown
          size={20}
          className={`text-[#1a2f45]/30 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#1a2f45]" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed text-[#1a2f45]/40">{a}</p>
      </motion.div>
    </div>
  );
};

/* ───────── PAGE ───────── */

const MarineFlooring = () => {
  return (
    <main>
      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#8CC3C8] via-[#6AB3B9] to-[#4B959C]" />
          <img
            src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=1760&auto=format&fit=crop"
            alt="Luxury boat with custom marine flooring"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-white/30 to-white/50" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#1a2f45]/75 px-5 py-2 text-xs font-medium tracking-wider text-white backdrop-blur-sm">
              <Anchor size={13} />
              Marine Flooring
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-4xl font-semibold leading-tight text-[#1a2f45] sm:text-5xl md:text-6xl"
          >
            Custom Boat
            <br />
            Flooring
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-5 max-w-md mx-auto text-sm leading-relaxed text-[#1a2f45]/50 sm:text-base"
          >
            From tinnies & Jet skis to Luxury Vessels - Every deck gets the same premium,
            Custom design and expert installation using certified marine grade products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#1a2f45] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#1a2f45]/90 hover:shadow-xl"
            >
              Get a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════ WHY EVA FOAM ══════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20 lg:mb-24"
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                <Anchor size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">Why choose Deckpro Marine?</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">
              The Gold Standard in<br />Marine Flooring
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-sm leading-relaxed text-[#1a2f45]/40">
              EVA foam is the material of choice for premium marine flooring worldwide.
              Lightweight, durable, and available in an extensive range of colours and textures.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#1a2f45] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#1a2f45]/90 hover:shadow-lg"
            >
              Explore All
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr_1fr]"
          >
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1a2f45]/10 px-3.5 py-1.5 text-xs font-medium text-[#1a2f45]/70">
                  <Droplets size={12} /> Waterproof
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1a2f45]/10 px-3.5 py-1.5 text-xs font-medium text-[#1a2f45]/70">
                  <Sun size={12} /> UV Stable
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-[#1a2f45] mb-1.5">Premium EVA Foam</h3>
              <p className="text-sm text-[#1a2f45]/40">Marine-Grade Material</p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-[#f0f0f0]">
                <img
                  src={image7}
                  alt="Premium EVA foam marine flooring"
                  className="w-full h-[380px] md:h-[460px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:text-right">
              <p className="text-sm leading-relaxed text-[#1a2f45]/40 mb-6">
                Closed-cell foam that won't absorb water, resists UV fading, and provides
                non-slip grip — even in the wettest conditions.
              </p>
              <p className="text-3xl font-semibold text-[#1a2f45] mb-1">5yr Warranty</p>
              <p className="text-xs text-[#1a2f45]/40 mb-6">Marine-grade durability</p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#1a2f45] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#1a2f45]/90 hover:shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ GALLERY STRIP ══════ */}
      <section className="py-24 lg:py-32 bg-[#fafbfc]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                <Waves size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">Our Work</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">Marine Projects</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div key={i} variants={popUp} className="group overflow-hidden rounded-2xl bg-[#f0f0f0]">
                <img src={img.src} alt={img.alt} className="h-52 lg:h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                <ScanLine size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">How It Works</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">Scan. Design. Build. Fit.</h2>
            <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-[#1a2f45]/40">
              Our seamless four-stage process delivers premium results, every single time.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <motion.div key={s.num} variants={popUp} className="group relative rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1">
                <span className="absolute top-5 right-5 text-5xl font-bold text-[#1a2f45]/[0.05] select-none">{s.num}</span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5f0f1] text-[#1a2f45] transition-all duration-300 group-hover:bg-[#1a2f45] group-hover:text-white">
                  <s.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-[#1a2f45] mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[#1a2f45]/40">{s.desc}</p>
                {i < processSteps.length - 1 && <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-gray-200 lg:block" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="py-24 lg:py-32 bg-[#fafbfc]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-2 mb-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                  <CheckCircle2 size={13} className="text-white" />
                </span>
                <span className="text-sm font-medium text-[#1a2f45]/70">FAQ</span>
              </div>
              <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl mb-5">Common Questions</h2>
              <p className="text-sm leading-relaxed text-[#1a2f45]/40 mb-8">
                Everything you need to know about our marine flooring service. Can&apos;t find your answer?
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2f45] hover:text-[#1a2f45]/70 transition-colors">
                Get in touch <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="rounded-2xl border border-gray-100 bg-white p-8">
              {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2f45] via-[#1a2f45]/95 to-[#1a2f45]" />
          <img
            src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=1760&auto=format&fit=crop"
            alt="Boat on open water"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
            loading="lazy"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Anchor size={28} className="text-white/40 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-white leading-tight sm:text-4xl lg:text-5xl mb-5">
              Ready to Transform<br />Your Deck?
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/50 mb-10">
              Send us your boat details and we&apos;ll have an accurate quote back to you within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-[#1a2f45] transition-all duration-300 hover:shadow-xl">
                Get a Free Quote <ArrowRight size={14} />
              </Link>
              <Link to="/#gallery" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:bg-white/5">
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
