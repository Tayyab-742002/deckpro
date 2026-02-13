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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ───────── FAQ ITEM ───────── */

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-[#1a2f45]">
        <span className="text-base font-semibold text-[#1a2f45] pr-4">{q}</span>
        <ChevronDown size={20} className={`text-[#1a2f45]/30 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#1a2f45]" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="pb-5 text-sm leading-relaxed text-[#1a2f45]/40">{a}</p>
      </motion.div>
    </div>
  );
};

/* ───────── PAGE ───────── */

const Scanning3D = () => {
  return (
    <main>
      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#8CB9D8] via-[#74AAC9] to-[#4B8AB8]" />
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1760&auto=format&fit=crop"
            alt="3D scanning technology in action"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
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
              <Box size={13} />
              3D Scanning
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-4xl font-semibold leading-tight text-[#1a2f45] sm:text-5xl md:text-6xl"
          >
            Precision
            <br />
            Scanning
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-5 max-w-md mx-auto text-sm leading-relaxed text-[#1a2f45]/50 sm:text-base"
          >
            High-precision 3D scanning and digital modelling for marine, automotive,
            and custom fabrication projects. Sub-millimetre accuracy, every time.
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
              Request a Scan
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════ CAPABILITIES ══════ */}
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
                <Box size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">Capabilities</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">
              What Our Scanners<br />Deliver
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-sm leading-relaxed text-[#1a2f45]/40">
              Industry-leading precision that powers perfect results.
              Sub-millimetre accuracy for every project, every time.
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
              <p className="text-3xl font-light text-[#1a2f45]/20 mb-8">
                <span className="text-[#1a2f45] font-semibold">01</span>/03
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1a2f45]/10 px-3.5 py-1.5 text-xs font-medium text-[#1a2f45]/70">
                  <Crosshair size={12} /> Sub-mm
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1a2f45]/10 px-3.5 py-1.5 text-xs font-medium text-[#1a2f45]/70">
                  <Layers size={12} /> 3D Model
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-[#1a2f45] mb-1.5">Precision Scanning</h3>
              <p className="text-sm text-[#1a2f45]/40">Boats · Vehicles · Parts</p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-[#f0f0f0]">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop"
                  alt="3D scanning technology capturing precise measurements"
                  className="w-full h-[380px] md:h-[460px] object-cover"
                  loading="lazy"
                />
              </div>
              <button className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#1a2f45] shadow-lg transition-all hover:bg-white hover:shadow-xl">
                <ArrowRight size={16} className="rotate-180" />
              </button>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#1a2f45] shadow-lg transition-all hover:bg-white hover:shadow-xl">
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="lg:text-right">
              <p className="text-sm leading-relaxed text-[#1a2f45]/40 mb-6">
                Our scanners capture every contour — compound curves, recessed
                areas, hatches, and hardware. The digital model is exported in
                any format your workflow requires.
              </p>
              <p className="text-3xl font-semibold text-[#1a2f45] mb-1">&lt;0.5mm</p>
              <p className="text-xs text-[#1a2f45]/40 mb-6">Scan accuracy guaranteed</p>
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

      {/* ══════ USE CASES ══════ */}
      <section className="py-24 lg:py-32 bg-[#fafbfc]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                <Layers size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">Applications</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">How We Use 3D Scanning</h2>
          </motion.div>

          <div className="space-y-20">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                className={`grid gap-12 lg:gap-16 lg:grid-cols-2 items-center ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}
              >
                <div className="relative lg:[direction:ltr]">
                  <div className="overflow-hidden rounded-2xl bg-[#f0f0f0]">
                    <img src={uc.image} alt={uc.title} className="h-72 lg:h-96 w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                  </div>
                </div>
                <div className="lg:[direction:ltr]">
                  <h3 className="text-2xl font-semibold text-[#1a2f45] mb-4">{uc.title}</h3>
                  <p className="text-sm leading-relaxed text-[#1a2f45]/40 mb-6">{uc.desc}</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2f45] hover:text-[#1a2f45]/70 transition-colors">
                    Enquire About This <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                <Box size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">How It Works</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">The Scanning Process</h2>
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
                className="flex gap-6 items-start rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
              >
                <span className="flex-shrink-0 text-3xl font-bold text-[#1a2f45]/10">{s.num}</span>
                <div>
                  <h4 className="text-lg font-semibold text-[#1a2f45] mb-1">{s.title}</h4>
                  <p className="text-sm leading-relaxed text-[#1a2f45]/40">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl mb-5">Scanning Questions</h2>
              <p className="text-sm leading-relaxed text-[#1a2f45]/40 mb-8">Common questions about our 3D scanning services.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2f45] hover:text-[#1a2f45]/70 transition-colors">
                Ask Us Anything <ArrowRight size={14} />
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
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1760&auto=format&fit=crop"
            alt="3D scanning equipment"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
            loading="lazy"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Zap size={28} className="text-white/40 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-white leading-tight sm:text-4xl lg:text-5xl mb-5">
              Need Precision<br />3D Data?
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/50 mb-10">
              Whether it&apos;s for flooring templates, custom parts, or detailed measurements — we&apos;ve got the technology.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-[#1a2f45] transition-all duration-300 hover:shadow-xl">
              Request a Scan <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Scanning3D;
