import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { ScanLine } from "lucide-react";
import { CldImage } from "@/components/ui/cld-image";

const steps = [
  {
    number: "1",
    title: "Precision Scanning",
    description:
      "Our Team will come to your loaction. Our skilled technicians use advanced precision scanning technology to capture every curve and contour with sub-millimeter accuracy, procuding an exact digital template to ensure a flawless custom fit.",
    image: "deckpro/site-assets/howItWorks/scanning",
    imageAlt: "Precision scanning a boat deck for custom flooring template",
  },
  {
    number: "2",
    title: "Custom Design",
    description:
      "We design your flooring to exact specifications, colour, patterns and layout. You can also add custom logos or branding. Once we have your approval we will move onto the next stage of the project.",
    image: "deckpro/site-assets/howItWorks/design",
    imageAlt: "Custom flooring design layout on screen",
  },
  {
    number: "3",
    title: "Manufacturing",
    description:
      "Your premium product will be precision-cut and QAQC assessed in our Perth workshop. Non-slip, UV resistant, and built to handle the harsh WA conditions.",
    image: "deckpro/site-assets/howItWorks/manufacturing",
    imageAlt: "EVA foam flooring panels being manufactured in the workshop",
  },
  {
    number: "4",
    title: "Expert Fitting",
    description:
      "Our skilled team installs your flooring with precision and care, delivering a flawless finish. The result is a durable, easy-to-maintain surface that looks exceptional, feels premium, and is custom crafted specifically for your vessel.",
    image: "deckpro/site-assets/howItWorks/expert-fitting",
    imageAlt: "Professional EVA foam flooring installation on a boat",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <m.div
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
            From precision scanning to expert fitting — every step is
            engineered to deliver EVA foam flooring that fits your vessel
            perfectly.
          </p>
        </m.div>

        {/* ── Steps with vertical timeline ── */}
        <div className="relative">
          {/* Timeline line — runs down the center on desktop */}
          <div className="absolute left-1/2 top-4 bottom-24 w-px -translate-x-1/2 bg-gray-200 hidden md:block" />

          <div className="space-y-14 md:space-y-0">
            {steps.map((step, i) => {
              const isReversed = i % 2 !== 0;

              return (
                <m.div
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
                      <CldImage
                        publicId={step.image}
                        alt={step.imageAlt}
                        className="w-full aspect-[4/3]"
                        width={800}
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <m.div
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
        </m.div>
      </div>
    </section>
  );
};

export default HowItWorks;
