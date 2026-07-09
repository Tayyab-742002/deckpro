import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench } from "lucide-react";
import { CldVideo } from "@/components/ui/cld-video";

/* ── Recent project cards ── */
const projects = [
  {
    video: "deckpro/site-assets/featured-videos/1",
    category: "Marine Flooring",
    title: "1974 Custom Norwegian Build",
  },
  {
    video: "deckpro/site-assets/featured-videos/2",
    category: "Marine Flooring",
    title: "Haines Hunter Classic 6.0",
  },
  {
    video: "deckpro/site-assets/featured-videos/3",
    category: "Marine Flooring",
    title: "Caribbean Reefrunner",
  },
];

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header: heading left, description right ── */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-14 lg:mb-18 items-end">
          {/* Left */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2f45] sm:h-7 sm:w-7">
                <Wrench size={11} className="text-white" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60 sm:text-sm">
                Recent Projects
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#1a2f45] leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Featured
              <br />
              Builds
            </h2>
          </m.div>

          {/* Right */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base leading-relaxed text-[#1a2f45]/50 max-w-sm md:ml-auto sm:text-lg"
          >
            Every project is unique. Check out some of our recent custom designs.
          </m.p>
        </div>

        {/* ── Cards grid: CTA + 3 projects ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Quote card */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-7 flex flex-col justify-between"
            style={{
              background:
                "linear-gradient(180deg, #a8d4d8 0%, #7dc0c6 50%, #5aadb5 100%)",
            }}
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Get a Free Quote
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-8">
                Ready to upgrade your flooring? Tell us about your project and
                we'll get back to you within 48 hours.
              </p>
            </div>

            <Link
              to="/contact"
              className="w-full flex items-center justify-between rounded-xl bg-white/25 backdrop-blur-sm border border-white/20 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/35"
            >
              Get a Quote
              <ArrowRight size={16} />
            </Link>
          </m.div>

          {/* Project cards */}
          {projects.map((project, i) => (
            <m.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="group"
            >
              {/* Video thumbnail */}
              <div className="relative overflow-hidden rounded-2xl bg-[#e5f0f1] h-56 sm:h-64 lg:h-72">
                <CldVideo publicId={project.video} className="h-full w-full" />
              </div>

              {/* Meta */}
              <p className="mt-4 text-xs font-medium text-[#3A868F] tracking-wide uppercase">
                {project.category}
              </p>
              <h4 className="mt-1 text-base font-semibold text-[#1a2f45] leading-snug">
                {project.title}
              </h4>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
