import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Choose Your Flooring",
    description:
      "Browse our marine flooring collection and find your perfect match for any vessel.",
    image:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Marine flooring options",
  },
  {
    number: "2",
    title: "Book a Consultation",
    description:
      "Schedule a free 3D scan and consultation to get your custom design plan.",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Booking a consultation",
  },
  {
    number: "3",
    title: "Set Sail",
    description:
      "We handle the expert installation and you enjoy the open water in style.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Enjoying your new flooring on the water",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 lg:mb-24"
        >
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2f45]">
              <Compass size={11} className="text-white" />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60">
              How It Works
            </span>
          </div>

          <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">
            Seamless From
            <br />
            Start to Sea
          </h2>

          <p className="mt-5 mx-auto max-w-sm text-sm leading-relaxed text-[#1a2f45]/40">
            Unpack once and let the world drift by your window. From
            sun-drenched islands to icy frontiers, your next story begins here.
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
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm font-medium text-[#1a2f45]/50">
                      {step.number}
                    </div>

                    <h3 className="text-2xl font-semibold text-[#1a2f45] mb-2">
                      {step.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[#1a2f45]/40 max-w-[15rem]">
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
                    <div className="rounded-2xl bg-[#e8f1f8] overflow-hidden">
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
            className="inline-flex items-center justify-center rounded-full bg-[#1a2f45] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#1a2f45]/90 hover:shadow-xl"
          >
            Book Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
