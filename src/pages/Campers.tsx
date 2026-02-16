import { motion } from "framer-motion";
import {
  Truck,
  ArrowRight,
  CheckCircle2,
  Shield,
  Thermometer,
  Volume2,
  Droplets,
  ScanLine,
  Palette,
  Factory,
  Wrench,
  ChevronDown,
  Mountain,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "@/components/Footer";


// Images

import heroImage from "@/assets/services/camper/camperAnd4x4.png";
import featuredImage from "@/assets/services/camper/CamperAnd4x4-featured-card.png";
/* ───────── DATA ───────── */

const whyEVA = [
  { icon: Thermometer, title: "Temperature Control", desc: "EVA foam insulates underfoot — cooler in summer, warmer in winter." },
  { icon: Volume2, title: "Sound Dampening", desc: "Reduces road noise and vibration for a quieter, smoother ride." },
  { icon: Droplets, title: "Easy to Clean", desc: "Closed-cell foam repels water and wipes clean in seconds." },
  { icon: Shield, title: "Shock Absorbing", desc: "Comfortable underfoot with genuine cushion for long road trips." },
];


const processSteps = [
  { icon: ScanLine, num: "01", title: "Precision Scan", desc: "Precision scanning of your vehicle interior — every contour, every angle." },
  { icon: Palette, num: "02", title: "Design", desc: "Custom design to your spec — colours, zones, branding, all tailored." },
  { icon: Factory, num: "03", title: "Manufacture", desc: "CNC-machined from premium EVA foam in our Perth workshop." },
  { icon: Wrench, num: "04", title: "Install", desc: "Expert fitting directly into your vehicle for a flawless finish." },
];

const faqs = [
  { q: "What vehicles can you work on?", a: "All campervans, motorhomes, caravans, and 4x4 vehicles. If it has a floor, we can upgrade it — from VW Transporters to 200 Series Land Cruisers." },
  { q: "Can I keep my existing layout?", a: "Yes. We scan around your current build. Seats, slide-outs, kitchenettes — everything stays in place." },
  { q: "Is EVA foam suitable for wet areas?", a: "Absolutely. Closed-cell EVA foam is waterproof and drains easily, making it perfect for outdoor showers, awning areas, and entry points." },
  { q: "How durable is the flooring under heavy gear?", a: "Very. EVA foam handles toolboxes, recovery gear, and heavy foot traffic without denting or deforming." },
  { q: "What are your payment terms?", a: "50% deposit upon accepting your quote to secure a scan date. Remaining 50% is due upon completion — no exceptions." },
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

const Campers = () => {
  return (
    <main>
      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#8CC3C8] via-[#6AB3B9] to-[#4B959C]" />
          <img
            src={heroImage}
            alt="Campervan adventure with premium EVA flooring"
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
              <Truck size={13} />
              Campers & 4x4
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-4xl font-semibold leading-tight text-[#1a2f45] sm:text-5xl md:text-6xl"
          >
            Adventure-Ready
            <br />
            Flooring
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-5 max-w-md mx-auto text-sm leading-relaxed text-[#1a2f45]/50 sm:text-base"
          >
            Premium EVA foam flooring for campervans, motorhomes, and 4x4 vehicles.
            Custom scanned, designed, and fitted to handle everything Australia throws at it.
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

      {/* ══════ WHY CAMPERS & 4x4 ══════ */}
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
                <Truck size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">Vehicles We Service</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">
              Built for Every<br />Adventure
            </h2>
            <p className="mt-4 mx-auto max-w-lg text-sm leading-relaxed text-[#1a2f45]/40">
              No matter the vehicle, our process delivers a perfect fit with premium
              EVA foam flooring — campervans, motorhomes, and 4x4s.
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
                  <Thermometer size={12} /> Insulated
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1a2f45]/10 px-3.5 py-1.5 text-xs font-medium text-[#1a2f45]/70">
                  <Shield size={12} /> Shock-Proof
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-[#1a2f45] mb-1.5">Campervans</h3>
              <p className="text-sm text-[#1a2f45]/40">VW · Sprinter · HiAce</p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-[#f0f0f0]">
                <img
                  src={featuredImage}
                  alt="Campervan interior with custom EVA foam flooring"
                  className="w-full h-[380px] md:h-[460px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:text-right">
              <p className="text-sm leading-relaxed text-[#1a2f45]/40 mb-6">
                Custom flooring for daily life on the road. Temperature-insulating,
                sound-dampening, and easy to clean — EVA foam handles everything your
                adventure throws at it.
              </p>
              <p className="text-3xl font-semibold text-[#1a2f45] mb-1">All Vehicles</p>
              <p className="text-xs text-[#1a2f45]/40 mb-6">Campervans · Motorhomes · 4x4</p>
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

      {/* ══════ WHY EVA ══════ */}
      <section className="py-24 lg:py-32 bg-[#fafbfc]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                <Shield size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">Why EVA Foam</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">Purpose-Built for Vehicles</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyEVA.map((f) => (
              <motion.div key={f.title} variants={popUp} className="group rounded-2xl border border-gray-100 bg-white p-7 text-center transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5f0f1] text-[#1a2f45] transition-all duration-300 group-hover:bg-[#1a2f45] group-hover:text-white">
                  <f.icon size={22} />
                </div>
                <h4 className="text-base font-semibold text-[#1a2f45] mb-2">{f.title}</h4>
                <p className="text-sm leading-relaxed text-[#1a2f45]/40">{f.desc}</p>
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
              <span className="text-sm font-medium text-[#1a2f45]/70">Our Process</span>
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
              <p className="text-sm leading-relaxed text-[#1a2f45]/40 mb-8">Have a question about our camper &amp; 4x4 flooring? We&apos;ve got answers.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2f45] hover:text-[#1a2f45]/70 transition-colors">
                Contact Us <ArrowRight size={14} />
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
            src={heroImage}
            alt="4x4 vehicle on outback road"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
            loading="lazy"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Mountain size={28} className="text-white/40 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-white leading-tight sm:text-4xl lg:text-5xl mb-5">
              Ready for the<br />Open Road?
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/50 mb-10">
              Send us your vehicle details and we&apos;ll deliver an accurate quote within 48 hours.
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

export default Campers;
