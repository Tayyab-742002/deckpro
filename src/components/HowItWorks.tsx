import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScanLine } from "lucide-react";
import scanning from "@/assets/howItWorks/scanning.png";
import design from "@/assets/howItWorks/design.jpg";
import manufacturing from "@/assets/howItWorks/manufacturing.jpg";
import fitting from "@/assets/howItWorks/expert-fitting.jpg";
const steps = [
  {
    number: "1",
    title: "3D Scanning",
    description:
      "We come to you — whether it's a boat at the marina, a campervan in your driveway, or a 4x4 in the garage. Our handheld 3D scanner captures every curve and contour with sub-millimetre accuracy, creating an exact digital template of your floor.",
    image: scanning,
    imageAlt: "3D scanning a boat deck for custom flooring template",
  },
  {
    number: "2",
    title: "Custom Design",
    description:
      "Using the scan data, we design your flooring to your exact specifications. Choose your colours, patterns, and layout — even add custom logos or branding. You approve the design before we start manufacturing.",
    image: design,
    imageAlt: "Custom flooring design layout on screen",
  },
  {
    number: "3",
    title: "Manufacturing",
    description:
      "Your premium EVA foam panels are precision-cut and assembled in our Perth workshop. Every piece is quality-checked to ensure a perfect fit — non-slip, UV resistant, and built to handle the harsh WA conditions.",
    image: manufacturing,
    imageAlt: "EVA foam flooring panels being manufactured in the workshop",
  },
  {
    number: "4",
    title: "Expert Fitting",
    description:
      "Our experienced team professionally installs your custom flooring on-site, ensuring a flawless finish. The result — a durable, easy-to-clean floor that looks and feels premium for years to come.",
    image: fitting,
    imageAlt: "Professional EVA foam flooring installation on a boat",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2f45] sm:h-7 sm:w-7">
              <ScanLine size={11} className="text-white" />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60 sm:text-sm">
              How It Works
            </span>
          </div>

          <h2 className="text-2xl font-bold text-[#1a2f45] leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Our 4-Stage
            <br />
            Process
          </h2>

          <p className="mt-3 mx-auto max-w-lg text-base leading-relaxed text-[#1a2f45]/50 sm:mt-5 sm:text-lg">
            From precision 3D scanning to expert fitting — every step is
            engineered to deliver EVA foam flooring that fits your vessel
            perfectly.
          </p>
        </motion.div>

        {/* ── Steps with vertical timeline ── */}
        <div className="relative">
          {/* Timeline line — runs down the center on desktop */}
          <div className="absolute left-1/2 top-4 bottom-24 w-px -translate-x-1/2 bg-gray-200 hidden md:block" />

          <div className="space-y-14 md:space-y-0">
            {steps.map((step, i) => {
              const isReversed = i % 2 !== 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="grid md:grid-cols-2 gap-6 md:gap-0 items-center md:py-10"
                >
                  {/* Text column */}
                  <div
                    className={
                      isReversed
                        ? "md:order-2 md:pl-14 lg:pl-20"
                        : "md:pr-14 lg:pr-20"
                    }
                  >
                    {/* Number circle */}
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm font-medium text-[#1a2f45]/50 sm:h-10 sm:w-10 sm:text-base">
                      {step.number}
                    </div>

                    <h3 className="text-lg font-bold text-[#1a2f45] mb-2 sm:text-xl md:text-2xl">
                      {step.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[#1a2f45]/50 max-w-xs sm:text-base">
                      {step.description}
                    </p>
                  </div>

                  {/* Image column */}
                  <div
                    className={
                      isReversed
                        ? "md:order-1 md:pr-14 lg:pr-20"
                        : "md:pl-14 lg:pl-20"
                    }
                  >
                    <div className="rounded-2xl bg-[#e5f0f1] overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        className="w-full aspect-[4/3] object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#1a2f45] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1a2f45]/90 hover:shadow-xl sm:px-7 sm:py-3 sm:text-base"
          >
            Get a Free Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
