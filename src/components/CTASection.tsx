import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden section-dark">
      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
              Ready to Start?
            </span>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Let&apos;s Build Your
              <br />
              <span className="text-gradient">Dream Floor</span>
            </h2>
            <p className="font-body text-lg text-white/60 max-w-md mb-10">
              Tell us about your project. The more detail you provide, the faster
              we can deliver an accurate quote.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              >
                Get a Quote
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+61000000000"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-body text-sm font-medium text-white transition-all duration-300 hover:bg-white/5"
              >
                <Phone size={16} />
                Call Us
              </a>
            </div>
          </motion.div>

          {/* Right — Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="font-display text-xl font-bold text-white mb-3">What We Need From You</h3>
              <ul className="space-y-2 font-body text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Boat/vehicle make, model, and size
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Photos of the area to be floored
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Approximate dimensions
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Location of the boat/vehicle
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Confirmation it&apos;s ready for scanning
                </li>
              </ul>
            </div>

            <div className="flex gap-6">
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <MapPin size={20} className="text-primary mb-3" />
                <p className="font-body text-sm font-semibold text-white">Based in Perth</p>
                <p className="font-body text-xs text-white/50">Serving all of Western Australia</p>
              </div>
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <Phone size={20} className="text-primary mb-3" />
                <p className="font-body text-sm font-semibold text-white">Quick Response</p>
                <p className="font-body text-xs text-white/50">Quotes within 48 hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
