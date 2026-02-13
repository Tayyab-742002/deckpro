import { motion } from "framer-motion";
import { ScanLine, Palette, Factory, Wrench } from "lucide-react";

const steps = [
  {
    icon: ScanLine,
    step: "01",
    title: "3D Scanning",
    description:
      "We use precision 3D scanning technology to capture every contour of your boat deck, campervan, or 4x4 floor.",
  },
  {
    icon: Palette,
    step: "02",
    title: "Custom Design",
    description:
      "Your flooring is designed to your exact specifications — colour, pattern, texture, and layout tailored to you.",
  },
  {
    icon: Factory,
    step: "03",
    title: "Manufacturing",
    description:
      "Each piece is CNC-machined from premium EVA foam in our workshop, ensuring a perfect fit every time.",
  },
  {
    icon: Wrench,
    step: "04",
    title: "Expert Fitting",
    description:
      "Our team professionally installs your custom flooring on-site, delivering a flawless finish.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const HowItWorks = () => {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden section-cream">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl translate-x-1/3 translate-y-1/3" />

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
            How It Works
          </h2>
          <p className="mt-5 mx-auto max-w-xl font-body text-lg text-muted-foreground">
            From scan to fit — a seamless four-stage process delivering premium results.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative rounded-2xl border border-border bg-background p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Step number */}
              <span className="absolute top-6 right-6 font-display text-5xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                {step.step}
              </span>

              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <step.icon size={24} />
              </div>

              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {/* Connector line for desktop */}
              {i < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 hidden h-px w-8 bg-border lg:block" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Terms Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Payment Terms
          </p>
          <p className="font-body text-base text-foreground">
            50% deposit required upon accepting your quote to secure a scan date.
            <br />
            <span className="text-muted-foreground">
              Remaining 50% is due upon job completion — no exceptions.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
