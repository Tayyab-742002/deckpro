import { motion } from "framer-motion";
import {
  Box,
  ArrowRight,
  CheckCircle2,
  Crosshair,
  Layers,
  Monitor,
  FileDown,
  ChevronDown,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "@/components/Footer";

/* ───────── DATA ───────── */

const capabilities = [
  {
    icon: Crosshair,
    title: "Sub-Millimetre Accuracy",
    desc: "Our 3D scanners capture surfaces with tolerances under 0.5mm, ensuring a perfect digital replica.",
  },
  {
    icon: Layers,
    title: "Complex Geometries",
    desc: "Compound curves, recessed areas, hatches, and hardware — nothing is too complex for our scanners.",
  },
  {
    icon: Monitor,
    title: "Digital 3D Models",
    desc: "Receive full 3D models compatible with CAD, CAM, and CNC workflows. Ready for manufacturing.",
  },
  {
    icon: FileDown,
    title: "Export Any Format",
    desc: "STL, OBJ, STEP, DXF — we deliver in the format your workflow requires.",
  },
];

const useCases = [
  {
    title: "Marine Flooring Templates",
    desc: "Our core use. Every boat flooring project starts with a precision 3D scan to create the template for your custom EVA foam floor.",
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=700&q=80",
  },
  {
    title: "Vehicle Interior Mapping",
    desc: "Campervans, motorhomes, and 4x4s — we scan the entire floor area to create templates for custom flooring installations.",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=700&q=80",
  },
  {
    title: "Custom Part Design",
    desc: "Need a bespoke part, a replacement component, or a one-off fabrication? Our scans provide the precision data to make it happen.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&q=80",
  },
];

const faqs = [
  { q: "Can I get just a 3D scan without flooring?", a: "Yes. While most of our scans are part of a full flooring package, we do offer standalone scanning services. This is ideal for clients who need templates, measurements, or 3D models for their own projects." },
  { q: "What file formats do you deliver?", a: "We can deliver in STL, OBJ, STEP, DXF, and PDF formats depending on your needs. Just let us know your preferred format when enquiring." },
  { q: "How long does a scan take?", a: "A typical boat deck scan takes 1–2 hours depending on the size and complexity. Interior vehicle scans are usually under an hour." },
  { q: "Do you need the boat to be empty?", a: "Ideally, yes. A clear deck allows us to capture the full surface accurately. We'll let you know exactly what needs to be removed before the scan day." },
  { q: "How accurate are the scans?", a: "Our equipment achieves sub-millimetre accuracy (±0.5mm). This ensures a precision fit for every flooring template we manufacture." },
];

/* ───────── ANIMATIONS ───────── */

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const popUp = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary">
        <span className="font-display text-base font-bold text-foreground pr-4">{q}</span>
        <ChevronDown size={20} className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="pb-5 font-body text-sm leading-relaxed text-muted-foreground">{a}</p>
      </motion.div>
    </div>
  );
};

/* ───────── PAGE ───────── */

const Scanning3D = () => {
  return (
    <main>
      {/* ══════ HERO ══════ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#d0e4f0]/40 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#d0e4f0]/30 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2f45]">
                    <Box size={11} className="text-white" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60">
                    3D Scanning
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                className="text-4xl font-semibold text-[#1a2f45] leading-tight sm:text-5xl lg:text-6xl"
              >
                Precision
                <br />
                Scanning
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-5 max-w-md text-sm leading-relaxed text-[#1a2f45]/40 sm:text-base"
              >
                High-precision 3D scanning and digital modelling for marine, automotive,
                and custom fabrication projects. Sub-millimetre accuracy, every time.
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
                  Request a Scan
                </Link>
                <Link
                  to="/marine-flooring"
                  className="inline-flex items-center justify-center rounded-full border border-[#1a2f45]/20 px-7 py-3 text-sm font-medium text-[#1a2f45]/70 transition-all duration-300 hover:bg-[#1a2f45]/5"
                >
                  Marine Flooring
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="mt-12 flex gap-10"
              >
                {[
                  { value: "<0.5mm", label: "Accuracy" },
                  { value: "1-2hr", label: "Typical Scan" },
                  { value: "Any", label: "File Format" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-semibold text-[#1a2f45]">{stat.value}</p>
                    <p className="text-xs text-[#1a2f45]/40 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80"
                    alt="3D scanning technology in action"
                    className="w-full h-[480px] object-cover"
                  />
                </div>

                <div className="absolute -bottom-6 -left-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-black/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f1f8]">
                      <Box size={20} className="text-[#1a2f45]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a2f45]">Sub-mm Precision</p>
                      <p className="text-xs text-[#1a2f45]/40">CAD/CAM compatible</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-[#dce9f3]/50 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ CAPABILITIES ══════ */}
      <section className="py-28 lg:py-36 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">Capabilities</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">What Our Scanners Deliver</h2>
            <p className="mt-5 mx-auto max-w-xl font-body text-lg text-muted-foreground">
              Industry-leading precision that powers perfect results.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <motion.div key={c.title} variants={popUp} className="group rounded-2xl border border-border bg-card p-7 text-center transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon size={24} />
                </div>
                <h4 className="font-display text-base font-bold text-foreground mb-2">{c.title}</h4>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ USE CASES ══════ */}
      <section className="py-28 lg:py-36 section-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">Applications</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">How We Use 3D Scanning</h2>
          </motion.div>

          <div className="space-y-20">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`grid gap-12 lg:gap-16 lg:grid-cols-2 items-center ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}
              >
                <div className="relative lg:[direction:ltr]">
                  <div className="overflow-hidden rounded-2xl">
                    <img src={uc.image} alt={uc.title} className="h-72 lg:h-96 w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                  </div>
                </div>
                <div className="lg:[direction:ltr]">
                  <h3 className="font-display text-3xl font-bold text-foreground mb-4">{uc.title}</h3>
                  <p className="font-body text-base leading-relaxed text-muted-foreground mb-6">{uc.desc}</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:underline">
                    Enquire About This <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="py-28 lg:py-36 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">How It Works</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">The Scanning Process</h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-6">
            {[
              { num: "01", title: "Book Your Scan", desc: "Contact us with your project details. We'll confirm a scan date and location." },
              { num: "02", title: "On-Site Scanning", desc: "Our technician arrives with the scanning equipment. The process typically takes 1–2 hours." },
              { num: "03", title: "Data Processing", desc: "We process the raw scan data into clean, accurate 3D models and templates." },
              { num: "04", title: "Delivery", desc: "You receive your files in your preferred format — ready for design, manufacturing, or fabrication." },
            ].map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex gap-6 items-start rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-md hover:border-primary/20"
              >
                <span className="flex-shrink-0 font-display text-3xl font-bold text-primary/20">{s.num}</span>
                <div>
                  <h4 className="font-display text-lg font-bold text-foreground mb-1">{s.title}</h4>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="py-28 lg:py-36 section-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">FAQ</span>
              <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl mb-6">Scanning Questions</h2>
              <p className="font-body text-base text-muted-foreground mb-8">Common questions about our 3D scanning services.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:underline">
                Ask Us Anything <ArrowRight size={14} />
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
            <Zap size={32} className="text-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Need Precision<br /><span className="text-gradient">3D Data?</span>
            </h2>
            <p className="mx-auto max-w-lg font-body text-lg text-white/60 mb-10">
              Whether it&apos;s for flooring templates, custom parts, or detailed measurements — we&apos;ve got the technology.
            </p>
            <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
              Request a Scan <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Scanning3D;
