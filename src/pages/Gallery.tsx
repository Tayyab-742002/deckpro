import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

/* ───────── DATA ───────── */

type GalleryCategory = "all" | "marine" | "campers" | "scanning";

interface GalleryItem {
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
  desc: string;
}

const categories: { key: GalleryCategory; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "marine", label: "Marine Flooring" },
  { key: "campers", label: "Campers & 4x4" },
  { key: "scanning", label: "Precision Scanning" },
];

const galleryItems: GalleryItem[] = [
  { src: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80", alt: "Luxury boat deck flooring", category: "marine", title: "38ft Cruiser", desc: "Full deck EVA foam replacement — teak pattern in charcoal and cream." },
  { src: "https://images.unsplash.com/photo-1559827291-beb535aa5d4c?w=800&q=80", alt: "Marine EVA close-up texture", category: "marine", title: "Centre Console", desc: "Custom non-slip pattern with dual-tone diamond inlay." },
  { src: "https://images.unsplash.com/photo-1541962716-c85f547ebb7e?w=800&q=80", alt: "Custom fitted boat deck", category: "marine", title: "Pontoon Refit", desc: "Complete pontoon deck reflooring — slate grey with teal accents." },
  { src: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80", alt: "Campervan interior flooring", category: "campers", title: "VW Transporter", desc: "Full-floor custom EVA foam with living and kitchen zones." },
  { src: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80", alt: "Motorhome reflooring", category: "campers", title: "Jayco Motorhome", desc: "Multi-room installation with entryway drainage design." },
  { src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", alt: "4x4 cargo area flooring", category: "campers", title: "200 Series Land Cruiser", desc: "Heavy-duty cargo area flooring — built for outback touring." },
  { src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80", alt: "Precision scanning equipment", category: "scanning", title: "Deck Scanning", desc: "Precision scan capturing every contour of a 42ft yacht deck." },
  { src: "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=800&q=80", alt: "Custom precision template", category: "scanning", title: "Template Generation", desc: "Digital template created from scan data — ready for CNC cutting." },
  { src: "https://images.unsplash.com/photo-1605281317010-fe5fffff7ee1?w=800&q=80", alt: "Finished premium flooring", category: "marine", title: "Ski Boat", desc: "Full cockpit flooring with custom branding and UV-stable colours." },
  { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", alt: "Boat on open water", category: "marine", title: "Game Fisher", desc: "Rear deck and cockpit flooring — marine grey with white accent lines." },
  { src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80", alt: "Adventure vehicle on road", category: "campers", title: "Sprinter Conversion", desc: "Mercedes Sprinter full-floor build — charcoal EVA with custom logo." },
  { src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80", alt: "Camping setup with vehicle", category: "campers", title: "Hilux Canopy", desc: "Canopy floor build for touring setup — washable, durable, warm." },
];

/* ───────── ANIMATIONS ───────── */

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const popUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ───────── LIGHTBOX ───────── */

const Lightbox = ({ item, onClose }: { item: GalleryItem; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-background"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors" aria-label="Close">
        <X size={20} />
      </button>
      <img src={item.src} alt={item.alt} className="w-full h-auto max-h-[70vh] object-cover" />
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-foreground mb-1">{item.title}</h3>
        <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
      </div>
    </motion.div>
  </motion.div>
);

/* ───────── PAGE ───────── */

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filtered = activeCategory === "all" ? galleryItems : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <main>
      {/* ══════ HERO ══════ */}
      <section className="relative py-32 lg:py-40 overflow-hidden section-dark">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-body font-semibold uppercase tracking-[0.3em] text-white/80 glass">
              Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-5"
          >
            Our Work Speaks
            <br />
            <span className="text-gradient">For Itself.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mx-auto max-w-xl font-body text-lg text-white/60">
            Browse our portfolio of completed marine flooring, camper builds, and precision scanning projects across Western Australia.
          </motion.p>
        </div>
      </section>

      {/* ══════ GALLERY ══════ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-6 py-2.5 font-body text-sm font-medium transition-all duration-300 ${activeCategory === cat.key
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            key={activeCategory}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={`${item.title}-${i}`}
                variants={popUp}
                layout
                className={`group cursor-pointer overflow-hidden rounded-2xl ${i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-full min-h-[200px]">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 5 === 0 ? "h-full" : "h-52 lg:h-60"
                      }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h4 className="font-display text-sm font-bold text-white">{item.title}</h4>
                    <p className="font-body text-xs text-white/70 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="py-20 lg:py-28 section-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl mb-5">
              Like What You See?
            </h2>
            <p className="mx-auto max-w-lg font-body text-base text-muted-foreground mb-8">
              Every project in our gallery started with a simple enquiry. Your dream floor could be next.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
            >
              Start Your Project
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />}

      <Footer />
    </main>
  );
};

export default Gallery;
