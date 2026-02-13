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

/* ───────── DATA ───────── */

const whyEVA = [
  { icon: Thermometer, title: "Temperature Control", desc: "EVA foam insulates underfoot — cooler in summer, warmer in winter." },
  { icon: Volume2, title: "Sound Dampening", desc: "Reduces road noise and vibration for a quieter, smoother ride." },
  { icon: Droplets, title: "Easy to Clean", desc: "Closed-cell foam repels water and wipes clean in seconds." },
  { icon: Shield, title: "Shock Absorbing", desc: "Comfortable underfoot with genuine cushion for long road trips." },
];

const vehicleTypes = [
  {
    title: "Campervans",
    desc: "Custom flooring for VW Transporters, Mercedes Sprinters, Toyota HiAces, and all popular campervan conversions. Built to handle daily life on the road.",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=700&q=80",
    features: ["Full-floor custom templates", "Slide-out bed compatible", "Wet-area variants available"],
  },
  {
    title: "Motorhomes",
    desc: "Premium reflooring for motorhomes of all sizes. Replace tired carpet or vinyl with durable, stylish EVA foam that's built for the long haul.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=700&q=80",
    features: ["Multi-room designs", "Kitchen & wet-area rated", "Wheelchair-friendly options"],
  },
  {
    title: "4x4 Vehicles",
    desc: "Tough, washable flooring for Land Cruisers, Patrols, Hiluxes, and more. Designed for serious off-road use — mud, sand, and saltwater don't stand a chance.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80",
    features: ["Mud & sand resistant", "Cargo-area solutions", "Custom fit to your build"],
  },
];

const processSteps = [
  { icon: ScanLine, num: "01", title: "3D Scan", desc: "Precision scanning of your vehicle interior — every contour, every angle." },
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

const Campers = () => {
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
                    <Truck size={11} className="text-white" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60">
                    Campers & 4x4
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                className="text-4xl font-semibold text-[#1a2f45] leading-tight sm:text-5xl lg:text-6xl"
              >
                Adventure-Ready
                <br />
                Flooring
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-5 max-w-md text-sm leading-relaxed text-[#1a2f45]/40 sm:text-base"
              >
                Premium EVA foam flooring for campervans, motorhomes, and 4x4 vehicles.
                Custom scanned, designed, and fitted to handle everything Australia throws at it.
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
                  View Our Work
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="mt-12 flex gap-10"
              >
                {[
                  { value: "All", label: "Vehicle Types" },
                  { value: "5yr", label: "Warranty" },
                  { value: "WA", label: "Wide Service" },
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
                    src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=900&q=80"
                    alt="Campervan with premium custom flooring"
                    className="w-full h-[480px] object-cover"
                  />
                </div>

                <div className="absolute -bottom-6 -left-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-black/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f1f8]">
                      <Truck size={20} className="text-[#1a2f45]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a2f45]">Built for Adventure</p>
                      <p className="text-xs text-[#1a2f45]/40">Mud, sand & saltwater proof</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-[#dce9f3]/50 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ VEHICLE TYPES ══════ */}
      <section className="py-28 lg:py-36 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">Vehicles We Service</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Built for Every Adventure</h2>
            <p className="mt-5 mx-auto max-w-xl font-body text-lg text-muted-foreground">
              No matter the vehicle, our process delivers a perfect fit with premium materials.
            </p>
          </motion.div>

          <div className="space-y-20">
            {vehicleTypes.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`grid gap-12 lg:gap-16 lg:grid-cols-2 items-center ${i % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}
              >
                <div className="relative lg:[direction:ltr]">
                  <div className="overflow-hidden rounded-2xl">
                    <img src={v.image} alt={v.title} className="h-72 lg:h-96 w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                  </div>
                </div>

                <div className="lg:[direction:ltr]">
                  <h3 className="font-display text-3xl font-bold text-foreground mb-4">{v.title}</h3>
                  <p className="font-body text-base leading-relaxed text-muted-foreground mb-6">{v.desc}</p>
                  <ul className="space-y-2.5 mb-8">
                    {v.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 font-body text-sm text-foreground/80">
                        <CheckCircle2 size={17} className="text-primary flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:underline">
                    Enquire Now <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ WHY EVA ══════ */}
      <section className="py-28 lg:py-36 section-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">Why EVA Foam</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Purpose-Built for Vehicles</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyEVA.map((f) => (
              <motion.div key={f.title} variants={popUp} className="group rounded-2xl border border-border bg-background p-7 text-center transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon size={24} />
                </div>
                <h4 className="font-display text-base font-bold text-foreground mb-2">{f.title}</h4>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section className="py-28 lg:py-36 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">Our Process</span>
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Scan. Design. Build. Fit.</h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <motion.div key={s.num} variants={popUp} className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <span className="absolute top-6 right-6 font-display text-6xl font-bold text-primary/[0.07] group-hover:text-primary/[0.14] transition-colors select-none">{s.num}</span>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
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
              <p className="font-body text-base text-muted-foreground mb-8">Have a question about our camper &amp; 4x4 flooring? We&apos;ve got answers.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:underline">
                Contact Us <ArrowRight size={14} />
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
            <Mountain size={32} className="text-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Ready for the<br /><span className="text-gradient">Open Road?</span>
            </h2>
            <p className="mx-auto max-w-lg font-body text-lg text-white/60 mb-10">
              Send us your vehicle details and we&apos;ll deliver an accurate quote within 48 hours.
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

export default Campers;
