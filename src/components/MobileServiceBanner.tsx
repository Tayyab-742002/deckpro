import { motion } from "framer-motion";
import { Truck, ScanLine, Palette, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: ScanLine, label: "Precision Scan" },
  { icon: Palette, label: "Custom Design" },
  { icon: Wrench, label: "Expert Fitting" },
];

const MobileServiceBanner = () => {
  return (
    <section className="bg-[#1a2f45] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <div className="mb-3 flex items-center justify-center gap-2 lg:justify-start">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3A868F]">
                <Truck size={16} className="text-white" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-white/50 sm:text-sm">
                Mobile Service
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              We Come to You
            </h2>
            <p className="mt-2 text-base leading-relaxed text-white/60 sm:mt-3 sm:text-lg">
              No need to move your boat or vehicle. Our fully mobile team
              handles everything on-site — from scanning to fitting.
            </p>
          </motion.div>

          {/* Right — three service points + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 lg:mt-0"
          >
            <div className="flex items-center gap-6 sm:gap-8">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 sm:h-14 sm:w-14">
                    <f.icon size={22} className="text-[#3A868F]" />
                  </span>
                  <span className="text-xs font-medium text-white/70 sm:text-sm">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#3A868F] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#3A868F]/85 hover:shadow-lg sm:px-7 sm:py-3 sm:text-base"
            >
              Book a Mobile Visit
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileServiceBanner;
