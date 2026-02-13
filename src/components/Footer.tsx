import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="font-display text-lg font-bold text-primary-foreground">D</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold tracking-tight text-foreground">Deckpro</span>
                <span className="text-[10px] font-body font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  Marine Flooring WA
                </span>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Perth&apos;s premium custom EVA foam flooring specialists for boats, campervans, and 4x4 vehicles.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/share/1AVApWZLQa/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-4">Services</h4>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/marine-flooring" className="text-muted-foreground hover:text-primary transition-colors">Marine Flooring</Link></li>
              <li><Link to="/campers" className="text-muted-foreground hover:text-primary transition-colors">Campers & 4x4</Link></li>
              <li><Link to="/3d-scanning" className="text-muted-foreground hover:text-primary transition-colors">3D Scanning</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} className="text-primary flex-shrink-0" />
                Perth, Western Australia
              </li>
              <li>
                <a href="mailto:info@deckpro.com.au" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={14} className="text-primary flex-shrink-0" />
                  info@deckpro.com.au
                </a>
              </li>
              <li>
                <a href="tel:+61000000000" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={14} className="text-primary flex-shrink-0" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Deckpro Marine Flooring WA. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Premium EVA Foam Flooring Specialists
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
