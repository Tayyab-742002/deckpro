import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Anchor, Truck, Box } from "lucide-react";
import logoImg from "@/assets/logo.svg";

/* ── Service dropdown items ── */
const serviceLinks = [
  { label: "Marine Flooring", desc: "Tinnies, Jet Skis & Luxury Vessels", path: "/marine-flooring", icon: Anchor },
  { label: "Campers & 4x4", desc: "Motorhomes & Off-Road", path: "/campers", icon: Truck },
  { label: "Precision Scanning", desc: "Digital Modelling", path: "/3d-scanning", icon: Box },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

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
    setDropdownOpen(false);
    setMobileServicesOpen(false);
    // Only scroll to top if there's no hash
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

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

  // ── Close dropdown on outside click ──
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const isServicePage = serviceLinks.some((s) => location.pathname === s.path);
  // Pages with light headers where the transparent white-text navbar would be invisible.
  // /blog (list) keeps its teal hero, but blog post pages are near-white at the top.
  const isLightPage =
    location.pathname === "/warranty" || /^\/blog\/./.test(location.pathname);
  const transparent = !scrolled && !isOpen && !isLightPage;

  /** Scroll to a section on the homepage — navigate first if not already there */
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/#" + sectionId);
      // After navigation, wait for the page to render then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* ── HEADER BAR ── */}
      <m.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isOpen
          ? "bg-white"
          : scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
          }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between lg:grid lg:grid-cols-3 lg:h-24">
            {/* ── Left — Desktop Nav ── */}
            <nav className="hidden items-center gap-1 lg:flex">
              {/* Home */}
              <Link
                to="/"
                className={`px-4 py-2 text-sm font-body transition-colors duration-300 ${transparent ? "font-semibold" : "font-medium"} ${location.pathname === "/" && !location.hash
                  ? transparent ? "text-white" : "text-primary"
                  : transparent ? "text-white/80 hover:text-white" : "text-[#1e3348]/60 hover:text-[#1e3348]"
                  }`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  onMouseEnter={() => setDropdownOpen(true)}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-body transition-colors duration-300 ${transparent ? "font-semibold" : "font-medium"} ${isServicePage
                    ? transparent ? "text-white" : "text-primary"
                    : transparent ? "text-white/80 hover:text-white" : "text-[#1e3348]/60 hover:text-[#1e3348]"
                    }`}
                >
                  Services
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <m.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setDropdownOpen(false)}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/5"
                    >
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.path}
                          to={service.path}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200 ${location.pathname === service.path
                            ? "bg-[#e5f0f1] text-[#1a2f45]"
                            : "text-[#1a2f45]/70 hover:bg-[#f5f8fa]"
                            }`}
                        >
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#e5f0f1]">
                            <service.icon size={16} className="text-[#1a2f45]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{service.label}</p>
                            <p className="text-xs text-[#1a2f45]/40">{service.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              {/* How It Works — scroll link */}
              <button
                onClick={() => scrollToSection("how-it-works")}
                className={`px-4 py-2 text-sm font-body transition-colors duration-300 ${transparent ? "font-semibold text-white/80 hover:text-white" : "font-medium text-[#1e3348]/60 hover:text-[#1e3348]"}`}
              >
                How It Works
              </button>
            </nav>

            {/* ── Center — Logo (centered on all screens) ── */}
            <Link to="/" className="relative z-[90] lg:justify-self-center" onClick={() => setIsOpen(false)}>
              <img
                src={logoImg}
                alt="Deckpro Marine Flooring WA logo"
                width={112}
                height={112}
                className={`w-auto transition-all duration-300 ${scrolled || !transparent ? "invert" : ""} ${scrolled ? "h-16 sm:h-20 lg:h-24" : "h-28 sm:h-36 lg:h-48"}`}
              />
            </Link>

            {/* ── Right — Desktop links + CTA ── */}
            <div className="hidden items-center justify-end gap-1 lg:flex">
              {/* Gallery — scroll link */}
              <button
                onClick={() => scrollToSection("gallery")}
                className={`px-4 py-2 text-sm font-body transition-colors duration-300 ${transparent ? "font-semibold text-white/80 hover:text-white" : "font-medium text-[#1e3348]/60 hover:text-[#1e3348]"}`}
              >
                Gallery
              </button>

              {/* Contact */}
              <Link
                to="/contact"
                className={`px-4 py-2 text-sm font-body transition-colors duration-300 ${transparent ? "font-semibold" : "font-medium"} ${location.pathname === "/contact"
                  ? transparent ? "text-white" : "text-primary"
                  : transparent ? "text-white/80 hover:text-white" : "text-[#1e3348]/60 hover:text-[#1e3348]"
                  }`}
              >
                Contact
              </Link>

              {/* Blog */}
              <Link
                to="/blog"
                className={`px-4 py-2 text-sm font-body transition-colors duration-300 ${transparent ? "font-semibold" : "font-medium"} ${location.pathname.startsWith("/blog")
                  ? transparent ? "text-white" : "text-primary"
                  : transparent ? "text-white/80 hover:text-white" : "text-[#1e3348]/60 hover:text-[#1e3348]"
                  }`}
              >
                Blog
              </Link>

              {/* Warranty */}
              <Link
                to="/warranty"
                className={`px-4 py-2 text-sm font-body transition-colors duration-300 ${transparent ? "font-semibold" : "font-medium"} ${location.pathname === "/warranty"
                  ? transparent ? "text-white" : "text-primary"
                  : transparent ? "text-white/80 hover:text-white" : "text-[#1e3348]/60 hover:text-[#1e3348]"
                  }`}
              >
                Warranty
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={toggleMenu}
              className={`relative z-[70] flex h-11 w-11 items-center justify-center rounded-lg lg:hidden transition-colors duration-300 ${transparent ? "text-white" : "text-[#1e3348]"}`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <m.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </m.div>
                ) : (
                  <m.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </m.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </m.header>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-white lg:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto overscroll-contain pt-24 pb-10 px-8">
              <nav className="flex flex-col gap-1">
                {/* Home */}
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={`block py-3.5 font-display text-2xl sm:text-3xl font-medium transition-colors ${location.pathname === "/"
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground"
                      }`}
                  >
                    Home
                  </Link>
                </m.div>

                {/* Services Accordion */}
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <button
                    onClick={() => setMobileServicesOpen((p) => !p)}
                    className={`flex w-full items-center justify-between py-3.5 font-display text-2xl sm:text-3xl font-medium transition-colors ${isServicePage
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground"
                      }`}
                  >
                    Services
                    <ChevronDown
                      size={22}
                      className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pl-4"
                      >
                        {serviceLinks.map((service, i) => (
                          <m.div
                            key={service.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                          >
                            <Link
                              to={service.path}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-3 py-3 transition-colors ${location.pathname === service.path
                                ? "text-primary"
                                : "text-foreground/50 hover:text-foreground"
                                }`}
                            >
                              <service.icon size={18} />
                              <span className="font-display text-lg font-medium">
                                {service.label}
                              </span>
                            </Link>
                          </m.div>
                        ))}
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>

                {/* How It Works */}
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="block py-3.5 font-display text-2xl sm:text-3xl font-medium text-foreground/60 hover:text-foreground transition-colors text-left"
                  >
                    How It Works
                  </button>
                </m.div>

                {/* Gallery */}
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <button
                    onClick={() => scrollToSection("gallery")}
                    className="block py-3.5 font-display text-2xl sm:text-3xl font-medium text-foreground/60 hover:text-foreground transition-colors text-left"
                  >
                    Gallery
                  </button>
                </m.div>

                {/* Contact */}
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className={`block py-3.5 font-display text-2xl sm:text-3xl font-medium transition-colors ${location.pathname === "/contact"
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground"
                      }`}
                  >
                    Contact
                  </Link>
                </m.div>

                {/* Blog */}
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Link
                    to="/blog"
                    onClick={() => setIsOpen(false)}
                    className={`block py-3.5 font-display text-2xl sm:text-3xl font-medium transition-colors ${location.pathname.startsWith("/blog")
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground"
                      }`}
                  >
                    Blog
                  </Link>
                </m.div>

                {/* Warranty */}
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Link
                    to="/warranty"
                    onClick={() => setIsOpen(false)}
                    className={`block py-3.5 font-display text-2xl sm:text-3xl font-medium transition-colors ${location.pathname === "/warranty"
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground"
                      }`}
                  >
                    Warranty
                  </Link>
                </m.div>

              </nav>

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
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
