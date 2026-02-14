import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X } from "lucide-react";

// project 1 : images

import image1 from "@/assets/gallery/project-one/1.jpg";
import image2 from "@/assets/gallery/project-one/2.jpg";
import image3 from "@/assets/gallery/project-one/3.jpg";
import image4 from "@/assets/gallery/project-one/4.jpg";
import image5 from "@/assets/gallery/project-one/5.jpg";
import image6 from "@/assets/gallery/project-one/6.jpg";
import image7 from "@/assets/gallery/project-one/7.jpg";
import image8 from "@/assets/gallery/project-one/8.jpg";
import image9 from "@/assets/gallery/project-one/9.jpg";
import image10 from "@/assets/gallery/project-one/10.jpg";
import image11 from "@/assets/gallery/project-one/11.jpg";
import image12 from "@/assets/gallery/project-one/12.jpg";


// project 2 : images
import image13 from "@/assets/gallery/project-two/1.jpg";
import image14 from "@/assets/gallery/project-two/2.jpg";
import image15 from "@/assets/gallery/project-two/3.jpg";
import image16 from "@/assets/gallery/project-two/4.jpg";
import image17 from "@/assets/gallery/project-two/5.jpg";
import image19 from "@/assets/gallery/project-two/6.jpg";
import image20 from "@/assets/gallery/project-two/7.jpg";
import image21 from "@/assets/gallery/project-two/8.jpg";
import image22 from "@/assets/gallery/project-two/9.jpg";
import image23 from "@/assets/gallery/project-two/10.jpg";
import image24 from "@/assets/gallery/project-two/11.jpg";


// project 3 : Images

import image25 from "@/assets/gallery/project-three/1.jpg";
import image26 from "@/assets/gallery/project-three/2.jpg";
import image27 from "@/assets/gallery/project-three/3.jpg";
import image28 from "@/assets/gallery/project-three/4.jpg";
import image29 from "@/assets/gallery/project-three/5.jpg";
import image30 from "@/assets/gallery/project-three/6.jpg";
import image31 from "@/assets/gallery/project-three/7.jpg";
import image32 from "@/assets/gallery/project-three/8.jpg";
import image33 from "@/assets/gallery/project-three/9.jpg";
import image34 from "@/assets/gallery/project-three/10.jpg";
import image35 from "@/assets/gallery/project-three/11.jpg";
import image36 from "@/assets/gallery/project-three/12.jpg";
import image37 from "@/assets/gallery/project-three/13.jpg";
import image38 from "@/assets/gallery/project-three/14.jpg";
import image39 from "@/assets/gallery/project-three/15.jpg";

const galleryItems = [
    image25, image3, image13, image36, image8, image29, image17, image1,
    image34, image14, image6, image31, image22, image9, image37, image20,
    image4, image27, image11, image16, image33, image2, image23, image39,
    image7, image30, image15, image35, image21, image5, image26, image10,
    image38, image19, image12, image28, image32, image24,
];

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
                        From pristine boat decks to rugged 4×4 interiors, every project
                        is precision-cut and hand-finished. Browse a snapshot of our
                        latest work across Western Australia.
                    </motion.p>
                </div>
            </div>

            {/* ── Infinite horizontal marquee ── */}
            <div className="relative">
                {/* Fade masks on the edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

                <motion.div
                    className="flex gap-5 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeItems.map((src, i) => {
                        const h = getHeight(i);
                        return (
                            <div
                                key={i}
                                className="group flex-shrink-0 cursor-pointer"
                                style={{ width: 280 }}
                                onClick={() => setSelectedImage(src)}
                            >
                                <div
                                    className="overflow-hidden rounded-2xl bg-[#e5f0f1]"
                                    style={{ height: h }}
                                >
                                    <img
                                        src={src}
                                        alt="Deckpro custom EVA foam flooring project"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
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
                            src={selectedImage}
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
