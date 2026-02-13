import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Marine Flooring", path: "/marine-flooring" },
  { label: "Campers & 4x4", path: "/campers" },
  { label: "3D Scanning", path: "/3d-scanning" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    // Check on mount in case the page is already scrolled
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
      // Restore scroll position
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

  // Determine text colour states
  // When menu is open: always use foreground colours (menu has solid bg)
  // When scrolled: foreground colours (glass bg)
  // Default: white (transparent over hero)
  const showDark = isOpen || scrolled;

  return (
    <>
      {/* ── HEADER BAR ── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isOpen
            ? "bg-background"
            : scrolled
              ? "nav-glass border-b border-border/50 shadow-sm"
              : "bg-transparent"
          }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-[70]" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span className="font-display text-lg font-bold text-primary-foreground">
                    D
                  </span>
                </div>
                <div className="flex flex-col leading-none">
                  <span
                    className={`font-display text-xl font-bold tracking-tight transition-colors duration-300 ${showDark ? "text-foreground" : "text-white"
                      }`}
                  >
                    Deckpro
                  </span>
                  <span
                    className={`text-[10px] font-body font-medium uppercase tracking-[0.25em] transition-colors duration-300 ${showDark ? "text-muted-foreground" : "text-white/60"
                      }`}
                  >
                    Marine Flooring WA
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium font-body transition-colors duration-300 ${location.pathname === link.path
                      ? scrolled
                        ? "text-primary"
                        : "text-white"
                      : scrolled
                        ? "text-muted-foreground hover:text-foreground"
                        : "text-white/70 hover:text-white"
                    }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-4 lg:flex">
              <Link
                to="/contact"
                className="group flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium font-body text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                <Phone size={14} />
                Get a Quote
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={toggleMenu}
              className={`relative z-[70] flex h-11 w-11 items-center justify-center rounded-lg lg:hidden transition-colors duration-300 ${showDark ? "text-foreground" : "text-white"
                }`}
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

      {/* ── MOBILE MENU OVERLAY (rendered OUTSIDE header for clean z-index) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-background lg:hidden"
          >
            {/* Scrollable content area */}
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
                      <span className="flex items-center gap-3">
                        {location.pathname === link.path && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        )}
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-10"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-body text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  <Phone size={16} />
                  Get a Quote
                </Link>
              </motion.div>

              {/* Contact info at bottom */}
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
