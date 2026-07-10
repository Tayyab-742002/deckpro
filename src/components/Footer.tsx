import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = [
  { label: "Marine Flooring", path: "/marine-flooring" },
  { label: "Campers & 4x4", path: "/campers" },
  { label: "Precision Scanning", path: "/3d-scanning" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Warranty", path: "/warranty" },
];

// Mirrors the service areas on the Google Business Profile — keep the two in
// sync (Google caps service areas at 20). Popular areas first.
const serviceAreas = [
  "Perth",
  "Fremantle",
  "Mandurah",
  "Hillarys",
  "Ocean Reef",
  "Joondalup",
  "Rockingham",
  "Two Rocks",
  "Yanchep",
  "Henderson",
  "Coogee",
  "South Fremantle",
  "Success",
  "Safety Bay",
  "Dawesville",
  "Bunbury",
  "Busselton",
  "Lancelin",
  "Cervantes",
  "Westminster",
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with email service
    setEmail("");
  };

  return (
    <footer className="relative min-h-[85vh] flex flex-col overflow-hidden">
      {/* ── Ocean background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8CC3C8] via-[#6AB3B9] to-[#4B959C]" />
        <img
          src="https://images.unsplash.com/photo-1733128666089-e313cc0113ef?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          loading="lazy"
        />
        {/* Soft top fade for blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
      </div>

      {/* ── Dark top gradient for link readability ── */}
      <div className="absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-black/40 to-transparent" />

      {/* ── Top bar: nav links — line — social icons ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pt-10 lg:pt-14">
        <div className="flex items-center justify-between gap-4">
          {/* Nav links */}
          <nav className="flex items-center gap-5 sm:gap-7">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs sm:text-sm font-medium text-white drop-shadow-sm transition-colors duration-300 hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Separator line */}
          <div className="hidden sm:block flex-1 mx-6 h-px bg-white/40" />

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white drop-shadow-sm transition-colors duration-300 hover:text-white/80"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/share/1AVApWZLQa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white drop-shadow-sm transition-colors duration-300 hover:text-white/80"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Center content: heading + email form ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1a2f45] leading-tight mb-4">
          Ready to
          <br />
          Get Started?
        </h2>

        <p className="text-sm text-[#1a2f45]/50 max-w-sm mb-8">
          Get in touch for a quote on some custom designs, unique to your requirements.
        </p>
      </div>

      {/* ── Large watermark brand text ── */}
      <div className="relative z-0 overflow-hidden pointer-events-none select-none">
        <p
          className="text-[18vw] sm:text-[16vw] lg:text-[14vw] uppercase font-display font-bold leading-none text-white/40 whitespace-nowrap text-center tracking-tight"
          aria-hidden="true"
        >
          Deckpro
        </p>
      </div>

      {/* ── Areas we serve ── */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-4">
        <h2 className="text-center text-xs font-semibold uppercase tracking-wider text-white mb-2">
          Areas We Serve
        </h2>
        <p className="text-center text-xs leading-relaxed text-white/80 font-body">
          {serviceAreas.join(" · ")}
          {" "}— fully mobile service across Perth &amp; WA, up to 200km from the metro area.
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 pb-6 pt-2">
        <p className="text-center text-xs text-white font-body">
          © {new Date().getFullYear()} Deckpro Marine Flooring WA. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
