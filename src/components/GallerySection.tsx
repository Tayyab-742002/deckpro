import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const galleryItems = [
    {
        src: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=800&auto=format&fit=crop",
        alt: "Custom EVA foam marine deck flooring on a luxury vessel",
        label: "Marine Deck Fit",
    },
    {
        src: "https://images.unsplash.com/photo-1559827291-beb535aa5d4c?q=80&w=800&auto=format&fit=crop",
        alt: "EVA foam texture close-up with diamond pattern",
        label: "EVA Diamond Pattern",
    },
    {
        src: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800&auto=format&fit=crop",
        alt: "Campervan interior custom flooring installation",
        label: "Camper Interior",
    },
    {
        src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
        alt: "3D scanning precision measurement for custom flooring",
        label: "3D Scan Precision",
    },
    {
        src: "https://images.unsplash.com/photo-1541962716-c85f547ebb7e?q=80&w=800&auto=format&fit=crop",
        alt: "Custom fitted pontoon boat deck in slate grey",
        label: "Pontoon Refit",
    },
    {
        src: "https://images.unsplash.com/photo-1605281317010-fe5fffff7ee1?q=80&w=800&auto=format&fit=crop",
        alt: "Finished premium ski boat flooring with custom branding",
        label: "Ski Boat Cockpit",
    },
    {
        src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
        alt: "Land Cruiser cargo area with heavy-duty EVA flooring",
        label: "4x4 Cargo Build",
    },
    {
        src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
        alt: "Game fisher boat on open water with custom deck",
        label: "Game Fisher Deck",
    },
    {
        src: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop",
        alt: "Motorhome reflooring with multi-room installation",
        label: "Motorhome Floor",
    },
    {
        src: "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=800&auto=format&fit=crop",
        alt: "Digital template generated from 3D scan data",
        label: "CNC Template",
    },
];

/* Card widths: alternate between tall and short for visual interest */
const getHeight = (i: number) => {
    const pattern = [280, 340, 300, 360, 280, 320, 340, 280, 360, 300];
    return pattern[i % pattern.length];
};

const GallerySection = () => {
    // Duplicate the items so the marquee loops seamlessly
    const marqueeItems = [...galleryItems, ...galleryItems];

    return (
        <section id="gallery" className="py-24 lg:py-32 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                        <div className="flex items-center gap-2 mb-5">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2f45]">
                                <Camera size={11} className="text-white" />
                            </span>
                            <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60">
                                Our Gallery
                            </span>
                        </div>

                        <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-5xl">
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
                        className="text-sm leading-relaxed text-[#1a2f45]/40 max-w-sm md:ml-auto"
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
                    {marqueeItems.map((item, i) => {
                        const h = getHeight(i);
                        return (
                            <div
                                key={`${item.label}-${i}`}
                                className="group flex-shrink-0"
                                style={{ width: 280 }}
                            >
                                {/* Image card */}
                                <div
                                    className="overflow-hidden rounded-2xl bg-[#e8f1f8]"
                                    style={{ height: h }}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Label */}
                                <p className="mt-3 text-sm font-medium text-[#1a2f45]/70">
                                    {item.label}
                                </p>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default GallerySection;
