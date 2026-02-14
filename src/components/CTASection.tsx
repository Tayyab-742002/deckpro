import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench } from "lucide-react";

/* ── Recent project cards ── */
const projects = [
  {
    video:
      "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=600&auto=format&fit=crop",
    category: "Marine Flooring",
    title: "Bar Crusher 780HT — Full Deck Refit",
  },
  {
    video:
      "https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop",
    category: "Marine Flooring",
    title: "Quintrex 610 Trident — Custom Cockpit Floor",
  },
  {
    video:
      "https://videos.pexels.com/video-files/2499611/2499611-hd_1920_1080_24fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=600&auto=format&fit=crop",
    category: "Campervan",
    title: "Toyota HiAce — Full Interior Floor Build",
  },
];

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Header: heading left, description right ── */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-14 lg:mb-18 items-end">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2f45]">
                <Wrench size={11} className="text-white" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60">
                Recent Projects
              </span>
            </div>

            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">
              Featured
              <br />
              Builds
            </h2>
          </motion.div>

          {/* Right */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm leading-relaxed text-[#1a2f45]/40 max-w-sm md:ml-auto"
          >
            Every project is unique. Here's a look at some of our recent
            custom EVA foam flooring builds for boats, campervans, and 4x4s
            across Western Australia.
          </motion.p>
        </div>

        {/* ── Cards grid: CTA + 3 projects ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Quote card */}
          <motion.div
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
          </motion.div>

          {/* Project cards */}
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="group"
            >
              {/* Video thumbnail */}
              <div className="relative overflow-hidden rounded-2xl bg-[#e5f0f1] h-56 sm:h-64 lg:h-72">
                <video
                  src={project.video}
                  poster={project.poster}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Meta */}
              <p className="mt-4 text-xs font-medium text-[#3A868F] tracking-wide uppercase">
                {project.category}
              </p>
              <h4 className="mt-1 text-base font-semibold text-[#1a2f45] leading-snug">
                {project.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
