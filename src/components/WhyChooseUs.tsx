import { motion } from "framer-motion";
import { Anchor, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const reasons = [
    {
        title: "Precision 3D Scanning",
        desc: "Sub-millimetre accuracy ensures every panel fits like a glove.",
        image:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
        imageAlt: "3D scanning technology capturing boat deck measurements",
    },
    {
        title: "Custom Designed & Built",
        desc: "Every floor is tailored to your exact specifications.",
        image:
            "https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=800&auto=format&fit=crop",
        imageAlt: "Custom EVA foam flooring being installed on a luxury vessel",
        cta: true,
    },
    {
        title: "Expert Installation",
        desc: "Professional on-site fitting across all of Western Australia.",
        image:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
        imageAlt: "Professional marine flooring installation on a boat",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 lg:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 lg:mb-16"
                >
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                            <Anchor size={13} className="text-white" />
                        </span>
                        <span className="text-sm font-medium text-[#1a2f45]/70">
                            Why Choose Us
                        </span>
                    </div>

                    <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl lg:text-[2.75rem]">
                        Why Sail With Us?
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-relaxed text-[#1a2f45]/40">
                        We take care of the details, so you can focus on the view.
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
                                    className="w-full h-[360px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* "Learn More" pill on middle card — always visible */}
                                {item.cta && (
                                    <Link
                                        to="/contact"
                                        className="absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-[#1a2f45] shadow-lg shadow-black/10 transition-all duration-300 hover:shadow-xl hover:bg-[#f5f8fa]"
                                    >
                                        Learn More <ArrowRight size={12} />
                                    </Link>
                                )}
                            </div>

                            {/* Text */}
                            <h3 className="mt-5 text-base font-semibold text-[#1a2f45]">
                                {item.title}
                            </h3>
                            <p className="mt-1 text-sm text-[#1a2f45]/40">
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
