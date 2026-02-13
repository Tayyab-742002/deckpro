import { motion } from "framer-motion";
import { Ship, Truck, Box } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Ship,
    title: "Marine Flooring",
    description:
      "Custom EVA foam flooring for boats of all sizes — precision-scanned and fitted to perfection.",
    link: "/marine-flooring",
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80",
  },
  {
    icon: Truck,
    title: "Campers & 4x4",
    description:
      "Transform your campervan, motorhome, or 4x4 with durable, stylish custom flooring.",
    link: "/campers",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=600&q=80",
  },
  {
    icon: Box,
    title: "3D Scanning",
    description:
      "High-precision 3D scanning and modelling for clients requiring detailed templates and designs.",
    link: "/3d-scanning",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const ServicesOverview = () => {
  return (
    <section className="py-28 lg:py-36 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
            What We Do
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl max-w-xl">
              Premium Flooring, Tailored to You
            </h2>
            <p className="max-w-md font-body text-lg text-muted-foreground">
              Whether it&apos;s a luxury yacht or an outback 4x4, every project gets
              the same meticulous attention to detail.
            </p>
          </div>
        </motion.div>

        {/* Services Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 lg:grid-cols-3"
        >
          {services.map((service, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Link
                to={service.link}
                className="group block overflow-hidden rounded-2xl border border-border bg-background transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <service.icon size={22} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-primary">
                    Learn more
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
