import { m } from "framer-motion";
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
import FaqSchema from "@/components/FaqSchema";
import { CldImage } from "@/components/ui/cld-image";

const heroImage = "deckpro/site-assets/services/scanning/scanning";
const marineTemplate = "deckpro/site-assets/services/scanning/marine-template";
const camperInterior = "deckpro/site-assets/services/camper/CamperAnd4x4-featured-card";

/* ───────── DATA ───────── */

const capabilities = [
  {
    icon: Crosshair,
    title: "Sub-Millimetre Accuracy",
    desc: "Our scanners capture surfaces with tolerances under 0.5mm, ensuring a perfect digital replica.",
  },
  {
    icon: Layers,
    title: "Complex Geometries",
    desc: "Compound curves, recessed areas, hatches, and hardware — nothing is too complex for our scanners.",
  },
  {
    icon: Monitor,
    title: "Digital Models",
    desc: "Receive full digital models compatible with CAD, CAM, and CNC workflows. Ready for manufacturing.",
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
    desc: "Our core use. Every boat flooring project starts with a precision scan to create the template for your custom EVA foam floor.",
    image: marineTemplate,
    related: { to: "/marine-flooring", label: "Explore marine flooring" },
  },
  {
    title: "Vehicle Interior Mapping",
    desc: "Campervans, motorhomes, and 4x4s — we scan the entire floor area to create templates for custom flooring installations.",
    image: camperInterior,
    related: { to: "/campers", label: "Explore camper & 4x4 flooring" },
  },
  {
    title: "Custom Part Design",
    desc: "Need a bespoke part, a replacement component, or a one-off fabrication? Our scans provide the precision data to make it happen.",
    image: heroImage,
    related: undefined as { to: string; label: string } | undefined,
  },
];

const faqs = [
  { q: "Can I get just a scan without flooring?", a: "Yes. While most of our scans are part of a full flooring package, we do offer standalone scanning services. This is ideal for clients who need templates, measurements, or digital models for their own projects." },
  { q: "What file formats do you deliver?", a: "We can deliver in STL, OBJ, STEP, DXF, and PDF formats depending on your needs. Just let us know your preferred format when enquiring." },
  { q: "How long does a scan take?", a: "A typical boat deck scan takes 1–2 hours depending on the size and complexity. Interior vehicle scans are usually under an hour." },
  { q: "Do you need the boat to be empty?", a: "Ideally, yes. A clear deck allows us to capture the full surface accurately. We'll let you know exactly what needs to be removed before the scan day." },
  { q: "How accurate are the scans?", a: "Our equipment achieves sub-millimetre accuracy (±0.5mm). This ensures a precision fit for every flooring template we manufacture." },
  { q: "Where do you offer scanning?", a: "We're a fully mobile service based in Perth, covering a 200km radius — our technician comes to your boat, vehicle, or part wherever it is." },
  { q: "How do I book a scan?", a: "Submit an enquiry through our contact form with your project details and location, and we'll confirm a scan date and provide a quote within 48 hours." },
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
      <m.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="pb-5 text-sm leading-relaxed text-[#1a2f45]/40">{a}</p>
      </m.div>
    </div>
  );
};

/* ───────── PAGE ───────── */

const Scanning3D = () => {
  return (
    <main>
      <FaqSchema faqs={faqs} />
      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#8CC3C8] via-[#6AB3B9] to-[#4B959C]" />
          <CldImage
            publicId={heroImage}
            alt="Precision scanning technology in action"
            className="absolute inset-0 h-full w-full opacity-[0.55]"
            eager
            width={1600}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-white/30 to-white/50" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-20 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#1a2f45]/75 px-5 py-2 text-xs font-medium tracking-wider text-white backdrop-blur-sm">
              <Box size={13} />
              Precision Scanning
            </span>
          </m.div>

          <h1 className="text-4xl font-semibold leading-tight text-[#1a2f45] sm:text-5xl md:text-6xl">
            Precision
            <br />
            Scanning
          </h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-5 max-w-md mx-auto text-sm leading-relaxed text-[#1a2f45]/50 sm:text-base"
          >
            High-precision scanning and digital modelling for marine, automotive,
            and custom projects.Millimetre accuracy, every time.
          </m.p>

          <m.div
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
          </m.div>
        </div>
      </section>

      {/* ══════ CAPABILITIES ══════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <m.div
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
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr_1fr]"
          >
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1a2f45]/10 px-3.5 py-1.5 text-xs font-medium text-[#1a2f45]/70">
                  <Crosshair size={12} /> Sub-mm
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1a2f45]/10 px-3.5 py-1.5 text-xs font-medium text-[#1a2f45]/70">
                  <Layers size={12} /> Digital Model
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-[#1a2f45] mb-1.5">Precision Scanning</h3>
              <p className="text-sm text-[#1a2f45]/40">Boats · Vehicles · Parts</p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-[#f0f0f0]">
                <CldImage
                  publicId={heroImage}
                  alt="Precision scanning technology capturing measurements"
                  className="w-full h-[380px] md:h-[460px]"
                  width={700}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
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
          </m.div>
        </div>
      </section>

      {/* ══════ USE CASES ══════ */}
      <section className="py-24 lg:py-32 bg-[#fafbfc]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                <Layers size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">Applications</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">How We Use Precision Scanning</h2>
          </m.div>

          <div className="space-y-20">
            {useCases.map((uc, i) => (
              <m.div
                key={uc.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                className={`grid gap-12 lg:gap-16 lg:grid-cols-2 items-center ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}
              >
                <div className="relative lg:[direction:ltr]">
                  <div className="overflow-hidden rounded-2xl bg-[#f0f0f0]">
                    <CldImage publicId={uc.image} alt={uc.title} className="h-72 lg:h-96 w-full transition-transform duration-700 hover:scale-105" width={800} sizes="(min-width: 1024px) 50vw, 100vw" />
                  </div>
                </div>
                <div className="lg:[direction:ltr]">
                  <h3 className="text-2xl font-semibold text-[#1a2f45] mb-4">{uc.title}</h3>
                  <p className="text-sm leading-relaxed text-[#1a2f45]/40 mb-6">{uc.desc}</p>
                  <div className="flex flex-wrap items-center gap-6">
                    <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2f45] hover:text-[#1a2f45]/70 transition-colors">
                      Enquire About This <ArrowRight size={14} />
                    </Link>
                    {uc.related && (
                      <Link to={uc.related.to} className="inline-flex items-center gap-2 text-sm font-medium text-[#3A868F] hover:text-[#1a2f45] transition-colors">
                        {uc.related.label} <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                <Box size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">How It Works</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">The Scanning Process</h2>
          </m.div>

          <div className="mx-auto max-w-3xl space-y-6">
            {[
              { num: "01", title: "Book Your Scan", desc: "Contact us with your project details. We'll confirm a scan date and location." },
              { num: "02", title: "On-Site Scanning", desc: "Our technician arrives with the scanning equipment. The process typically takes 1–2 hours." },
              { num: "03", title: "Data Processing", desc: "We process the raw scan data into clean, accurate digital models and templates." },
              { num: "04", title: "Delivery", desc: "You receive your files in your preferred format — ready for design, manufacturing, or fabrication." },
            ].map((s, i) => (
              <m.div
                key={s.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex gap-6 items-start rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
              >
                <span className="flex-shrink-0 text-3xl font-bold text-[#1a2f45]/10">{s.num}</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2f45] mb-1">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-[#1a2f45]/40">{s.desc}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="py-24 lg:py-32 bg-[#fafbfc]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-2 mb-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                  <CheckCircle2 size={13} className="text-white" />
                </span>
                <span className="text-sm font-medium text-[#1a2f45]/70">FAQ</span>
              </div>
              <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl mb-5">Scanning Questions</h2>
              <p className="text-sm leading-relaxed text-[#1a2f45]/40 mb-8">Common questions about our precision scanning services.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2f45] hover:text-[#1a2f45]/70 transition-colors">
                Ask Us Anything <ArrowRight size={14} />
              </Link>
            </m.div>
            <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="rounded-2xl border border-gray-100 bg-white p-8">
              {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
            </m.div>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2f45] via-[#1a2f45]/95 to-[#1a2f45]" />
          <CldImage
            publicId={heroImage}
            alt="Precision scanning equipment"
            className="absolute inset-0 h-full w-full opacity-20"
            width={1600}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Zap size={28} className="text-white/40 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-white leading-tight sm:text-4xl lg:text-5xl mb-5">
              Need Precision<br />Digital Data?
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/50 mb-10">
              Whether it&apos;s for flooring templates, custom parts, or detailed measurements — we&apos;ve got the technology.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-[#1a2f45] transition-all duration-300 hover:shadow-xl">
              Request a Scan <ArrowRight size={14} />
            </Link>
          </m.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Scanning3D;
