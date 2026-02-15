import { motion } from "framer-motion";
import { Anchor, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import scanning from "@/assets/whychoosus/3D-Scanning.png";
import manufacturing from "@/assets/whychoosus/custom-design.png";
import fitting from "@/assets/whychoosus/professional-fitting.jpg";
const reasons = [
    {
        title: "Precision Scanning",
        desc: "We use advanced scanning technology to capture every curve and contour of your boat, campervan, or 4x4 with sub-millimetre accuracy — no guesswork, just a perfect digital template.",
        image: scanning,
        imageAlt: "Precision scanning technology capturing boat deck measurements",
    },
    {
        title: "Custom Designed & Built",
        desc: "Every EVA foam panel is designed to your exact specifications — choose your colours, patterns, and even add custom logos. All manufactured in-house at our Perth workshop.",
        image: manufacturing,
        imageAlt: "Custom EVA foam flooring being manufactured in workshop",
        cta: true,
    },
    {
        title: "Professional Fitting",
        desc: "Our experienced team handles the complete on-site installation, ensuring a flawless, non-slip finish that's UV resistant, easy to clean, and built to last. Serving all of WA.",
        image: fitting,
        imageAlt: "Professional marine flooring installation on a boat",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 lg:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="mb-12 sm:mb-14 lg:mb-16"
                >
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-4 sm:mb-5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2f45] sm:h-7 sm:w-7">
                            <Anchor size={13} className="text-white" />
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wider text-[#1a2f45]/60 sm:text-sm sm:normal-case sm:tracking-normal sm:text-[#1a2f45]/70">
                            Why Choose Us
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1a2f45] leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                        Why Choose Deckpro?
                    </h2>

                    <p className="mt-3 max-w-lg text-base leading-relaxed text-[#1a2f45]/50 sm:mt-4 sm:text-lg">
                        From precision scanning to final fitting — we handle the entire process in-house, delivering premium EVA foam flooring for boats, campervans, and 4x4 vehicles across Western Australia.
                    </p>
                </motion.div>

                {/* ── Cards — middle one is wider ── */}
                <div className="grid gap-5 md:grid-cols-[1fr_1.6fr_1fr]">
                    {reasons.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, delay: i * 0.12 }}
                            className="group"
                        >
                            {/* Image container */}
                            <div className="relative overflow-hidden rounded-2xl bg-[#f0f0f0]">
                                <img
                                    src={item.image}
                                    alt={item.imageAlt}
                                    className="w-full h-[300px] sm:h-[360px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* "Learn More" pill on middle card */}
                                {item.cta && (
                                    <Link
                                        to="/contact"
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1a2f45] shadow-lg shadow-black/10 transition-all duration-300 hover:shadow-xl hover:bg-[#f5f8fa] sm:bottom-5 sm:px-5 sm:py-2.5 sm:text-sm"
                                    >
                                        Learn More <ArrowRight size={12} />
                                    </Link>
                                )}
                            </div>

                            {/* Text */}
                            <h3 className="mt-4 text-lg font-bold text-[#1a2f45] sm:mt-5 sm:text-xl">
                                {item.title}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-[#1a2f45]/50 sm:text-base">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
