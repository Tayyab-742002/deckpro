import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";

/* ── Video / article cards ── */
const articles = [
  {
    video:
      "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=600&auto=format&fit=crop",
    date: "Jan 15, 2025",
    title: "Why EVA Foam Is the Future of Marine Flooring",
  },
  {
    video:
      "https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop",
    date: "Feb 02, 2025",
    title: "5 Things to Know Before Reflooring Your Boat",
  },
  {
    video:
      "https://videos.pexels.com/video-files/2499611/2499611-hd_1920_1080_24fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=600&auto=format&fit=crop",
    date: "Feb 10, 2025",
    title: "How 3D Scanning Transforms Custom Flooring",
  },
];

const CTASection = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxIndex = Math.max(0, articles.length - 3);
  const prev = () => setScrollIndex((i) => Math.max(0, i - 1));
  const next = () => setScrollIndex((i) => Math.min(maxIndex, i + 1));

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
                <Newspaper size={11} className="text-white" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60">
                Our Blog
              </span>
            </div>

            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">
              The Deckpro
              <br />
              Guide & Insights
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
            Expert tips, flooring guides, and project showcases to help you
            get the most out of your custom EVA foam installation.
          </motion.p>
        </div>

        {/* ── Cards grid: newsletter + 3 articles ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Subscribe card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-7 flex flex-col justify-between"
            style={{
              background:
                "linear-gradient(180deg, #a8cbe2 0%, #7db4d4 50%, #5a9ec4 100%)",
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

          {/* Video / article cards */}
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="group"
            >
              {/* Video thumbnail */}
              <div className="relative overflow-hidden rounded-2xl bg-[#e8f1f8] h-56 sm:h-64 lg:h-72">
                <video
                  src={article.video}
                  poster={article.poster}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Meta */}
              <p className="mt-4 text-xs font-medium text-[#1a2f45]/40 tracking-wide">
                {article.date}
              </p>
              <h4 className="mt-1 text-base font-semibold text-[#1a2f45] leading-snug">
                {article.title}
              </h4>
            </motion.div>
          ))}
        </div>

        {/* ── Navigation arrows ── */}
        <div className="flex items-center gap-2 mt-8">
          <button
            onClick={prev}
            disabled={scrollIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[#1a2f45]/50 transition-colors hover:border-[#1a2f45] hover:text-[#1a2f45] disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            disabled={scrollIndex === maxIndex}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a2f45] text-white transition-colors hover:bg-[#1a2f45]/90 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
