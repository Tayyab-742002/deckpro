import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X } from "lucide-react";
import { CldImage } from "@/components/ui/cld-image";
import { cldImageUrl } from "@/lib/cloudinary";

const GALLERY_BASE = "deckpro/site-assets/gallery";

// Shuffled display order across all three projects, by [project, index].
const galleryItems = [
    "project-three/1", "project-one/3", "project-two/1", "project-three/12", "project-one/8", "project-three/5", "project-two/5", "project-one/1",
    "project-three/10", "project-two/2", "project-one/6", "project-three/7", "project-two/9", "project-one/9", "project-three/13", "project-two/7",
    "project-one/4", "project-three/3", "project-one/11", "project-two/4", "project-three/9", "project-one/2", "project-two/10", "project-three/15",
    "project-one/7", "project-three/6", "project-two/3", "project-three/11", "project-two/8", "project-one/5", "project-three/2", "project-one/10",
    "project-three/14", "project-two/6", "project-one/12", "project-three/4", "project-three/8", "project-two/11",
].map((p) => `${GALLERY_BASE}/${p}`);

/* Card heights: alternate between tall and short for visual interest */
const getHeight = (i: number) => {
    const pattern = [280, 340, 300, 360, 280, 320, 340, 280, 360, 300];
    return pattern[i % pattern.length];
};

const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Duplicate the items so the marquee loops seamlessly
    const marqueeItems = [...galleryItems, ...galleryItems];

    return (
        <section id="gallery" className="py-20 lg:py-32 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                {/* ── Header area: heading left, description right ── */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-16 lg:mb-20 items-end">
                    {/* Left — badge + heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Badge */}
                        <div className="flex items-center gap-2 mb-4 sm:mb-5">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2f45] sm:h-7 sm:w-7">
                                <Camera size={11} className="text-white" />
                            </span>
                            <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60 sm:text-sm">
                                Our Gallery
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-[#1a2f45] leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                            Craftsmanship You
                            <br />
                            Can Walk On
                        </h2>
                    </motion.div>

                    {/* Right — subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-base leading-relaxed text-[#1a2f45]/50 max-w-sm md:ml-auto sm:text-lg"
                    >
                        From pristine boat decks to rugged 4x4 interiors, every project
                        is precision-cut and hand-finished. Browse a snapshot of our
                        latest work.
                    </motion.p>
                </div>
            </div>

            {/* ── Infinite horizontal marquee (pure CSS, GPU-composited) ── */}
            <div className="relative">
                {/* Fade masks on the edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

                <div className="marquee-track flex gap-5 w-max">
                    {marqueeItems.map((src, i) => {
                        const h = getHeight(i);
                        return (
                            <div
                                key={i}
                                className="marquee-card group flex-shrink-0 cursor-pointer"
                                style={{ width: 280 }}
                                onClick={() => setSelectedImage(src)}
                            >
                                <div
                                    className="overflow-hidden rounded-2xl bg-[#e5f0f1]"
                                    style={{ height: h }}
                                >
                                    <CldImage
                                        publicId={src}
                                        alt="Deckpro custom EVA foam flooring project"
                                        className="h-full w-full"
                                        width={400}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Lightbox modal ── */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                            aria-label="Close lightbox"
                        >
                            <X size={20} />
                        </button>

                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            src={cldImageUrl(selectedImage, 1600)}
                            alt="Deckpro custom EVA foam flooring project"
                            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GallerySection;
