import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

const Warranty = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Check session storage on mount
    useEffect(() => {
        const auth = sessionStorage.getItem("deckpro_warranty_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "Deckpro2025") {
            sessionStorage.setItem("deckpro_warranty_auth", "true");
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password");
        }
    };

    // Prevent right-click, copy, and add blur on focus loss
    useEffect(() => {
        let hideTimeout: NodeJS.Timeout;
        const content = document.getElementById('warranty-content');

        const handleContext = (e: MouseEvent) => e.preventDefault();

        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent Print (Ctrl/Cmd+P), Save (Ctrl/Cmd+S), Copy (Ctrl/Cmd+C)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's' || e.key === 'c')) {
                e.preventDefault();
            }

            // ─── AGGRESSIVE SCREENSHOT PREVENTION ───
            // Detect common screenshot keys: PrintScreen, Win+Shift+S, Cmd+Shift+3/4
            const isPrintScreen = e.key === 'PrintScreen';
            const isWindowsSnip = e.metaKey && e.shiftKey && e.key.toLowerCase() === 's';
            const isMacScreenshot = e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4');

            if (isPrintScreen || isWindowsSnip || isMacScreenshot) {
                // INSTANTLY hide content
                content?.classList.add('opacity-0', 'blur-xl');

                // Clear previous timeout if spamming keys
                clearTimeout(hideTimeout);

                // Restore after 2 seconds (time for snipping ui to close/snapshot to finish)
                hideTimeout = setTimeout(() => {
                    content?.classList.remove('opacity-0', 'blur-xl');
                }, 3000);
            }
        };

        // Blur content when window loses focus (e.g. snipping tool usage)
        const handleVisibilityChange = () => {
            if (document.hidden || !document.hasFocus()) {
                content?.classList.add('blur-md');
            } else {
                content?.classList.remove('blur-md');
            }
        };

        // Check focus state periodically as some browsers don't fire blur immediately for system tools
        const focusInterval = setInterval(() => {
            if (!document.hasFocus()) {
                content?.classList.add('blur-md');
            } else {
                // Only unblur if not explicitly hidden by keydown
                if (!content?.classList.contains('opacity-0')) {
                    content?.classList.remove('blur-md');
                }
            }
        }, 500);

        document.addEventListener("contextmenu", handleContext);
        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("blur", handleVisibilityChange);
        window.addEventListener("focus", handleVisibilityChange);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearInterval(focusInterval);
            clearTimeout(hideTimeout);
            document.removeEventListener("contextmenu", handleContext);
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("blur", handleVisibilityChange);
            window.removeEventListener("focus", handleVisibilityChange);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    if (loading) return null;

    return (
        <main className="min-h-screen bg-[#fafbfc]">
            <AnimatePresence mode="wait">
                {!isAuthenticated ? (
                    /* ── LOCK SCREEN ── */
                    <motion.div
                        key="lock-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#fafbfc] px-6"
                    >
                        <div className="w-full max-w-md">
                            <div className="mb-8 text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a2f45]/5">
                                    <Lock className="text-[#1a2f45]" size={32} />
                                </div>
                                <h1 className="font-display text-3xl font-semibold text-[#1a2f45]">
                                    Warranty Access
                                </h1>
                                <p className="mt-3 text-sm text-[#1a2f45]/60">
                                    This document is password protected. Please enter the password provided with your purchase.
                                </p>
                            </div>

                            <form onSubmit={handleLogin} className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-[#1a2f45] placeholder:text-gray-400 focus:border-[#1a2f45] focus:outline-none focus:ring-1 focus:ring-[#1a2f45] transition-all shadow-sm"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-2 bottom-2 rounded-lg bg-[#1a2f45] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1a2f45]/90"
                                >
                                    Unlock
                                </button>
                            </form>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 flex items-center justify-center gap-2 text-sm text-red-500"
                                >
                                    <AlertCircle size={16} />
                                    {error}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    /* ── WARRANTY CONTENT ── */
                    <motion.div
                        key="content"
                        id="warranty-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white selection:bg-transparent select-none print:hidden relative transition-all duration-300"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {/* Watermark Overlay */}
                        <div className="pointer-events-none fixed inset-0 z-50 flex flex-wrap content-center justify-center gap-20 overflow-hidden opacity-[0.09] rotate-[-15deg]">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <span key={i} className="whitespace-nowrap text-4xl font-bold uppercase text-black">
                                    Deckpro Warranty • Do Not Copy
                                </span>
                            ))}
                        </div>

                        {/* Print Warning */}
                        <div className="hidden print:flex fixed inset-0 z-[100] bg-white items-center justify-center flex-col text-center p-10">
                            <ShieldCheck size={64} className="text-[#1a2f45] mb-4" />
                            <h1 className="text-3xl font-bold text-[#1a2f45]">Protected Document</h1>
                            <p className="mt-2 text-gray-500">Printing of this document is disabled for security reasons.</p>
                        </div>

                        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
                            {/* Header */}
                            <div className="mb-16 border-b border-gray-100 pb-10 text-center">
                                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f0f1]">
                                    <ShieldCheck className="text-[#1a2f45]" size={24} />
                                </div>
                                <h1 className="font-display text-3xl font-semibold text-[#1a2f45] sm:text-4xl">
                                    2 Year Limited Warranty
                                </h1>
                                <p className="mt-4 text-[#1a2f45]/60 font-medium">
                                    Deckpro Marine Flooring WA Pty Ltd
                                </p>
                                <div className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                                    Version Date: December 2025
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="prose prose-lg prose-slate mx-auto max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-[#1a2f45] prose-p:text-[#1a2f45]/70 prose-li:text-[#1a2f45]/70">

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">Warranty Provider</h3>
                                    <p>
                                        This warranty is provided by <strong>Deckpro Marine Flooring WA Pty Ltd</strong><br />
                                        ACN: 693 671 635<br />
                                        Phone: 0415 604 457<br />
                                        Email: deckpromarine@gmail.com
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">1. Warranty Period</h3>
                                    <p>
                                        Deckpro Marine Flooring WA Pty Ltd warrants its EVA marine flooring products for a period of <strong>two (2) years</strong> from the date of installation.
                                    </p>
                                    <p>
                                        Any repair, replacement, or remedy provided under this warranty does not extend or restart the original warranty period. The warranty period remains calculated from the original date of installation.
                                    </p>
                                    <p>
                                        Deckpro Marine Flooring WA Pty Ltd reserves the right to modify or discontinue this limited warranty at its discretion. Any changes will not apply retroactively.
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">2. Who Is Covered</h3>
                                    <p>
                                        This warranty applies to the original purchaser only and is not transferable. It applies solely to products supplied and installed by Deckpro Marine Flooring WA Pty Ltd within Australia.
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">3. What Is Covered</h3>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Manufacturing and material defects under normal use.</li>
                                        <li>Delamination of EVA foam layers.</li>
                                        <li>Production faults or manufacturing damage.</li>
                                        <li>Excessive or abnormal fading beyond expected aging.</li>
                                        <li>Material degradation within rated environmental conditions.</li>
                                        <li>Colour fastness and UV stability within design limits.</li>
                                        <li>Excessive pitting affecting structural integrity.</li>
                                        <li>Installation workmanship, including adhesive application, when performed by Deckpro Marine Flooring WA Pty Ltd.</li>
                                    </ul>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">4. Installation & Adhesion</h3>
                                    <p>
                                        Installation workmanship includes proper surface preparation, adhesive application, and fitting when performed by Deckpro Marine Flooring WA Pty Ltd.
                                    </p>
                                    <p>
                                        This warranty does not cover adhesion failures caused by substrate condition, structural movement, contamination, moisture ingress, customer-supplied surfaces, or environmental factors beyond Deckpro Marine Flooring WA Pty Ltd control.
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">5. Colour & Appearance</h3>
                                    <p>
                                        Minor shade or tone variations may occur due to batch production, lighting, or installation environment. Colour variance of up to ±15% from approved samples is considered acceptable.
                                    </p>
                                    <p>
                                        Products with black or predominantly dark top colours absorb higher levels of heat and UV exposure. These products are covered for manufacturing defects only and are not warranted against heat-related distortion, surface damage, or fading caused by elevated temperatures.
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">6. What Is Not Covered</h3>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Normal wear and tear.</li>
                                        <li>Scratches, scuffs, stains, or surface abrasion.</li>
                                        <li>Damage from misuse, neglect, animals, chemicals, or sharp objects.</li>
                                        <li>Heat or sun damage caused by reflected or amplified light.</li>
                                        <li>UV exposure beyond design limits (approximately 3000 cumulative hours of direct exposure).</li>
                                        <li>Temperatures outside -30°C to 65°C.</li>
                                        <li>Installations directly behind the magnification of direct sunlight (e.g. Dash area).</li>
                                        <li>Self-installation or third-party installation.</li>
                                        <li>Modified, cut, or altered products.</li>
                                        <li>Secondary owners.</li>
                                    </ul>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">7. Customer Responsibilities</h3>
                                    <p>
                                        Customers must keep flooring covered when not in use (This will help prolong the life of the product from harmful UV), clean spills promptly using approved EVA Foam PH-neutral cleaners, avoid abrasive tools and high-pressure cleaners, and prevent any chemical exposure or overheating.
                                    </p>
                                    <p>
                                        Warranty claims must be reported within 14 days of the defect becoming apparent. This requirement does not limit any rights or remedies available under Australian Consumer Law.
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">8. Inspection & Remedies</h3>
                                    <p>
                                        If a valid warranty claim is approved, Deckpro Marine Flooring WA Pty Ltd may, at its discretion, repair the affected area, replace the defective product, or provide another appropriate remedy consistent with Australian Consumer Law. Access to the vessel or product must be provided for inspection.
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">9. Ongoing Use & Responsibility</h3>
                                    <p>
                                        Following installation, responsibility for the product’s ongoing condition, performance, exposure, and use transfers to the customer, except where the issue arises from a defect, faulty materials, or installation workmanship covered by this warranty or Australian Consumer Law. Deckpro Marine Flooring WA Pty Ltd is not responsible for deterioration or damage arising from environmental exposure, usage patterns, maintenance practices, or conditions beyond its control. Deckpro Marine Flooring WA Pty Ltd does not warrant ongoing performance outside the stated environmental, usage, and maintenance parameters.
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">10. Australian Consumer Law - Consumer Guarantees</h3>
                                    <p>
                                        This warranty is provided in addition to rights and remedies available under the Australian Consumer Law. Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage. For services, you are entitled to have the service remedied if it is not provided with due care and skill, or to cancel the service and receive a refund for the unused portion. Any repair or replacement provided under this warranty does not affect your statutory rights.
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">11. How to Make a Claim</h3>
                                    <p>
                                        To make a claim under this warranty or under Australian Consumer Law, please contact us at:<br />
                                        Deckpro Marine Flooring WA Pty Ltd<br />
                                        Phone: 0415 604 457<br />
                                        Email: <a href="mailto:deckpromarine@gmail.com" className="text-[#1a2f45] underline">deckpromarine@gmail.com</a>
                                    </p>
                                    <p>
                                        Provide proof of purchase (e.g., invoice), photos of the issue, and details of when/how the defect occurred. We will inspect the product/installation photos (at our cost) and advise on the next steps within 28 business days.
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">12. Terms & Conditions Summary</h3>
                                    <p>
                                        By accepting a quotation or invoice, the customer agrees to Deckpro Marine Flooring WA Pty Ltd’s Terms & Conditions of Supply and Installation.
                                    </p>
                                    <p>
                                        Installation is carried out on surfaces deemed suitable at the time of installation. Deckpro Marine Flooring WA Pty Ltd is not responsible for failures arising from substrate condition, structural movement, moisture ingress, or environmental factors beyond its control.
                                    </p>
                                </section>

                                <section className="mb-12">
                                    <h3 className="text-xl mb-4">13. Governing Law</h3>
                                    <p>
                                        This warranty is governed by the laws of Western Australia.
                                    </p>
                                </section>

                            </div>
                        </div>
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default Warranty;
