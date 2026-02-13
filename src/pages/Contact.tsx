import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Send,
  Upload,
  AlertCircle,
  CheckCircle2,
  Ship,
  Truck,
  Box,
} from "lucide-react";
import { useState, type FormEvent, type ChangeEvent } from "react";
import Footer from "@/components/Footer";

/* ───────── TYPES ───────── */

type ServiceType = "marine" | "camper" | "scanning" | "";

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: ServiceType;
  // Marine fields
  boatLocation: string;
  boatMake: string;
  boatModel: string;
  boatSize: string;
  boatReady: string;
  // Camper/4x4 fields
  vehicleLocation: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleType: string;
  vehicleReady: string;
  // Scanning fields
  scanType: string;
  scanLocation: string;
  scanDetails: string;
  // Shared
  dimensions: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  serviceType: "",
  boatLocation: "",
  boatMake: "",
  boatModel: "",
  boatSize: "",
  boatReady: "",
  vehicleLocation: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleType: "",
  vehicleReady: "",
  scanType: "",
  scanLocation: "",
  scanDetails: "",
  dimensions: "",
  message: "",
};

/* ───────── ANIMATIONS ───────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ───────── REUSABLE INPUT ───────── */

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none";
const labelClass = "block font-body text-sm font-semibold text-foreground mb-1.5";
const requiredStar = <span className="text-red-500 ml-0.5">*</span>;

/* ───────── PAGE ───────── */

const Contact = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on field change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
      if (errors.photos) setErrors((prev) => ({ ...prev, photos: "" }));
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    // Core fields
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Please enter a valid email.";
    if (!formData.address.trim()) errs.address = "Address is required.";
    if (!formData.serviceType) errs.serviceType = "Please select a service type.";

    // Conditional fields
    if (formData.serviceType === "marine") {
      if (!formData.boatLocation.trim()) errs.boatLocation = "Boat location is required.";
      if (!formData.boatMake.trim()) errs.boatMake = "Boat make is required.";
      if (!formData.boatModel.trim()) errs.boatModel = "Boat model is required.";
      if (!formData.boatSize.trim()) errs.boatSize = "Boat size is required.";
      if (!formData.boatReady) errs.boatReady = "Please confirm readiness.";
    }

    if (formData.serviceType === "camper") {
      if (!formData.vehicleLocation.trim()) errs.vehicleLocation = "Vehicle location is required.";
      if (!formData.vehicleMake.trim()) errs.vehicleMake = "Vehicle make is required.";
      if (!formData.vehicleModel.trim()) errs.vehicleModel = "Vehicle model is required.";
      if (!formData.vehicleType) errs.vehicleType = "Please select vehicle type.";
      if (!formData.vehicleReady) errs.vehicleReady = "Please confirm readiness.";
    }

    if (formData.serviceType === "scanning") {
      if (!formData.scanType) errs.scanType = "Please select scan type.";
      if (!formData.scanLocation.trim()) errs.scanLocation = "Scan location is required.";
    }

    if (!formData.dimensions.trim()) errs.dimensions = "Approximate dimensions are required.";
    if (photos.length === 0) errs.photos = "Please upload at least one photo.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main>
        <section className="min-h-screen flex items-center justify-center bg-background pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg mx-auto px-6"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 size={40} className="text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Enquiry Received!
            </h1>
            <p className="font-body text-base text-muted-foreground mb-8">
              Thank you for your detailed enquiry. Our team will review your information and
              get back to you with an accurate quote within <strong>48 hours</strong>.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              Back to Home
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      {/* ══════ HERO ══════ */}
      <section className="relative py-32 lg:py-40 overflow-hidden section-dark">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-body font-semibold uppercase tracking-[0.3em] text-white/80 glass mb-6">
                <Send size={14} className="text-primary" />
                Get a Quote
              </span>
              <h1 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
                Start Your
                <br />
                <span className="text-gradient">Project Today.</span>
              </h1>
              <p className="font-body text-lg text-white/60 max-w-lg mb-10">
                Provide as much detail as possible about your project. The more info you share,
                the faster and more accurate our quote will be.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-white">Perth, Western Australia</p>
                    <p className="font-body text-xs text-white/50">Serving all of WA</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-white">Quick Response</p>
                    <p className="font-body text-xs text-white/50">Quotes within 48 hours</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/share/1AVApWZLQa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-primary hover:text-primary"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="mailto:info@deckpro.com.au"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-primary hover:text-primary"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                  <a
                    href="tel:+61000000000"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-primary hover:text-primary"
                    aria-label="Phone"
                  >
                    <Phone size={18} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* What We Need — info card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <h3 className="font-display text-xl font-bold text-white mb-5">What We Need From You</h3>
              <ul className="space-y-3 font-body text-sm text-white/60">
                {[
                  "Your name, phone, and email",
                  "Your address",
                  "Boat/vehicle make, model, and size",
                  "Photos of the area to be floored",
                  "Approximate dimensions",
                  "Location of the boat or vehicle",
                  "Confirmation it's ready for scanning",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Payment Terms</p>
                <p className="font-body text-sm text-white/70">
                  50% deposit upon accepting quote. Remaining 50% due upon job completion.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ FORM ══════ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
              Enquiry Form
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Tell Us About Your Project
            </h2>
            <p className="mt-3 font-body text-base text-muted-foreground">
              All fields marked with <span className="text-red-500">*</span> are required.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* ── SECTION: Personal Details ── */}
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary font-body text-xs font-bold">1</span>
                Your Details
              </h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>Full Name {requiredStar}</label>
                  <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Sean Mitchell" className={inputClass} />
                  {errors.name && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone {requiredStar}</label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="04XX XXX XXX" className={inputClass} />
                  {errors.phone && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email {requiredStar}</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
                  {errors.email && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="address" className={labelClass}>Address {requiredStar}</label>
                  <input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Your suburb, WA" className={inputClass} />
                  {errors.address && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.address}</p>}
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* ── SECTION: Service Type ── */}
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary font-body text-xs font-bold">2</span>
                Service Type
              </h3>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { key: "marine" as ServiceType, icon: Ship, label: "Marine Flooring", sub: "Boats & Yachts" },
                  { key: "camper" as ServiceType, icon: Truck, label: "Campers & 4x4", sub: "Vehicles" },
                  { key: "scanning" as ServiceType, icon: Box, label: "3D Scanning", sub: "Standalone" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, serviceType: opt.key }));
                      if (errors.serviceType) setErrors((prev) => ({ ...prev, serviceType: "" }));
                    }}
                    className={`group flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all duration-300 ${formData.serviceType === opt.key
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border hover:border-primary/30"
                      }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${formData.serviceType === opt.key ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                      }`}>
                      <opt.icon size={22} />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-foreground">{opt.label}</p>
                      <p className="font-body text-xs text-muted-foreground">{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
              {errors.serviceType && <p className="mt-2 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.serviceType}</p>}
            </div>

            {/* ── CONDITIONAL: Marine Fields ── */}
            {formData.serviceType === "marine" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.4 }}>
                <div className="h-px bg-border mb-10" />
                <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary font-body text-xs font-bold">3</span>
                  Boat Details
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="boatMake" className={labelClass}>Boat Make {requiredStar}</label>
                    <input id="boatMake" name="boatMake" value={formData.boatMake} onChange={handleChange} placeholder="e.g. Quintrex, Haines Hunter" className={inputClass} />
                    {errors.boatMake && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.boatMake}</p>}
                  </div>
                  <div>
                    <label htmlFor="boatModel" className={labelClass}>Boat Model {requiredStar}</label>
                    <input id="boatModel" name="boatModel" value={formData.boatModel} onChange={handleChange} placeholder="e.g. 610 Trident" className={inputClass} />
                    {errors.boatModel && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.boatModel}</p>}
                  </div>
                  <div>
                    <label htmlFor="boatSize" className={labelClass}>Boat Size (ft/m) {requiredStar}</label>
                    <input id="boatSize" name="boatSize" value={formData.boatSize} onChange={handleChange} placeholder="e.g. 21ft / 6.4m" className={inputClass} />
                    {errors.boatSize && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.boatSize}</p>}
                  </div>
                  <div>
                    <label htmlFor="boatLocation" className={labelClass}>Boat Location {requiredStar}</label>
                    <input id="boatLocation" name="boatLocation" value={formData.boatLocation} onChange={handleChange} placeholder="e.g. Hillarys Boat Harbour" className={inputClass} />
                    {errors.boatLocation && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.boatLocation}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="boatReady" className={labelClass}>Is the boat ready for scanning & fit-out? {requiredStar}</label>
                    <select id="boatReady" name="boatReady" value={formData.boatReady} onChange={handleChange} className={inputClass}>
                      <option value="">Select...</option>
                      <option value="yes">Yes — deck is clear and accessible</option>
                      <option value="soon">Not yet — will be within 2 weeks</option>
                      <option value="unsure">Unsure — need advice</option>
                    </select>
                    {errors.boatReady && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.boatReady}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── CONDITIONAL: Camper/4x4 Fields ── */}
            {formData.serviceType === "camper" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.4 }}>
                <div className="h-px bg-border mb-10" />
                <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary font-body text-xs font-bold">3</span>
                  Vehicle Details
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="vehicleMake" className={labelClass}>Vehicle Make {requiredStar}</label>
                    <input id="vehicleMake" name="vehicleMake" value={formData.vehicleMake} onChange={handleChange} placeholder="e.g. Toyota, VW, Mercedes" className={inputClass} />
                    {errors.vehicleMake && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.vehicleMake}</p>}
                  </div>
                  <div>
                    <label htmlFor="vehicleModel" className={labelClass}>Vehicle Model {requiredStar}</label>
                    <input id="vehicleModel" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="e.g. HiAce, Transporter T6" className={inputClass} />
                    {errors.vehicleModel && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.vehicleModel}</p>}
                  </div>
                  <div>
                    <label htmlFor="vehicleType" className={labelClass}>Vehicle Type {requiredStar}</label>
                    <select id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className={inputClass}>
                      <option value="">Select...</option>
                      <option value="campervan">Campervan</option>
                      <option value="motorhome">Motorhome</option>
                      <option value="4x4">4x4 / SUV</option>
                      <option value="caravan">Caravan</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.vehicleType && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.vehicleType}</p>}
                  </div>
                  <div>
                    <label htmlFor="vehicleLocation" className={labelClass}>Vehicle Location {requiredStar}</label>
                    <input id="vehicleLocation" name="vehicleLocation" value={formData.vehicleLocation} onChange={handleChange} placeholder="e.g. Joondalup, WA" className={inputClass} />
                    {errors.vehicleLocation && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.vehicleLocation}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="vehicleReady" className={labelClass}>Is the vehicle ready for scanning & fit-out? {requiredStar}</label>
                    <select id="vehicleReady" name="vehicleReady" value={formData.vehicleReady} onChange={handleChange} className={inputClass}>
                      <option value="">Select...</option>
                      <option value="yes">Yes — floor is clear and accessible</option>
                      <option value="soon">Not yet — will be within 2 weeks</option>
                      <option value="unsure">Unsure — need advice</option>
                    </select>
                    {errors.vehicleReady && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.vehicleReady}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── CONDITIONAL: Scanning Fields ── */}
            {formData.serviceType === "scanning" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.4 }}>
                <div className="h-px bg-border mb-10" />
                <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary font-body text-xs font-bold">3</span>
                  Scanning Details
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="scanType" className={labelClass}>What do you need scanned? {requiredStar}</label>
                    <select id="scanType" name="scanType" value={formData.scanType} onChange={handleChange} className={inputClass}>
                      <option value="">Select...</option>
                      <option value="boat">Boat deck</option>
                      <option value="vehicle">Vehicle interior</option>
                      <option value="part">Custom part / component</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.scanType && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.scanType}</p>}
                  </div>
                  <div>
                    <label htmlFor="scanLocation" className={labelClass}>Location of Item {requiredStar}</label>
                    <input id="scanLocation" name="scanLocation" value={formData.scanLocation} onChange={handleChange} placeholder="e.g. Fremantle, WA" className={inputClass} />
                    {errors.scanLocation && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.scanLocation}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="scanDetails" className={labelClass}>Additional Details</label>
                    <textarea id="scanDetails" name="scanDetails" value={formData.scanDetails} onChange={handleChange} rows={3} placeholder="Tell us more about what you need scanned and what format you require..." className={inputClass} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SECTION: Dimensions & Photos ── */}
            {formData.serviceType && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.4 }}>
                <div className="h-px bg-border mb-10" />
                <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary font-body text-xs font-bold">4</span>
                  Photos & Dimensions
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="dimensions" className={labelClass}>Approximate Dimensions {requiredStar}</label>
                    <input id="dimensions" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="e.g. 4m x 2.5m, or 150 sq ft" className={inputClass} />
                    {errors.dimensions && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.dimensions}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="photos" className={labelClass}>Upload Photos {requiredStar}</label>
                    <div className="relative">
                      <input
                        id="photos"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className={`flex items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors duration-300 ${photos.length > 0 ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/30"
                        }`}>
                        <Upload size={24} className="text-muted-foreground" />
                        <div>
                          <p className="font-body text-sm font-semibold text-foreground">
                            {photos.length > 0
                              ? `${photos.length} file${photos.length > 1 ? "s" : ""} selected`
                              : "Click to upload photos"}
                          </p>
                          <p className="font-body text-xs text-muted-foreground">
                            JPG, PNG — show the area to be floored
                          </p>
                        </div>
                      </div>
                    </div>
                    {errors.photos && <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-body"><AlertCircle size={12} />{errors.photos}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SECTION: Message ── */}
            {formData.serviceType && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.4 }}>
                <div className="h-px bg-border mb-10" />
                <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary font-body text-xs font-bold">5</span>
                  Additional Notes
                </h3>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any other details, preferences, or questions..."
                  className={inputClass}
                />
              </motion.div>
            )}

            {/* ── SUBMIT ── */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-12 py-4 font-body text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Enquiry
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <p className="mt-4 font-body text-xs text-muted-foreground">
                By submitting this form, you agree to be contacted via phone or email regarding your project enquiry.
              </p>
            </div>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
