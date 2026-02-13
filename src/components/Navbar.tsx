import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", path: "/services" },
  { label: "Marine Flooring", path: "/marine-flooring" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close menu & scroll to top on route change ──
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      {/* ── HEADER BAR ── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isOpen
            ? "bg-white"
            : scrolled
              ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm"
              : "bg-transparent"
          }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo — wave icon */}
            <Link to="/" className="relative z-[70]" onClick={() => setIsOpen(false)}>
              <svg
                viewBox="0 0 40 28"
                className="h-8 w-10 text-[#1e3348] transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
              >
                <path
                  d="M2 19 C8 13, 14 25, 20 19 C26 13, 32 25, 38 19"
                  strokeWidth="2.5"
                />
                <path
                  d="M5 13 C10 7, 15 19, 20 13 C25 7, 30 19, 35 13"
                  strokeWidth="2"
                  opacity="0.5"
                />
              </svg>
            </Link>

            {/* Center Nav Links */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium font-body transition-colors duration-300 ${location.pathname === link.path
                      ? "text-primary"
                      : "text-[#1e3348]/60 hover:text-[#1e3348]"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Buttons */}
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                to="/contact"
                className="rounded-full bg-[#1e3348] px-6 py-2.5 text-sm font-medium font-body text-white transition-all duration-300 hover:bg-[#1e3348]/90 hover:shadow-lg"
              >
                Get a Quote
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-[#1e3348]/30 px-6 py-2.5 text-sm font-medium font-body text-[#1e3348] transition-all duration-300 hover:bg-[#1e3348]/5"
              >
                Get Support
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={toggleMenu}
              className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-lg text-[#1e3348] lg:hidden transition-colors duration-300"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-white lg:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto overscroll-contain pt-24 pb-10 px-8">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3.5 font-display text-2xl sm:text-3xl font-medium transition-colors ${location.pathname === link.path
                          ? "text-primary"
                          : "text-foreground/60 hover:text-foreground"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-[#1e3348] px-8 py-3.5 font-body text-sm font-medium text-white"
                >
                  Get a Quote
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-[#1e3348]/30 px-8 py-3.5 font-body text-sm font-medium text-[#1e3348]"
                >
                  Get Support
                </Link>
              </motion.div>

              {/* Footer info */}
              <div className="mt-auto pt-10 border-t border-border/50">
                <p className="font-body text-xs text-muted-foreground">
                  Perth, Western Australia
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Deckpro Marine Flooring WA
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
