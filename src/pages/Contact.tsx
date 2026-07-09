import { m, AnimatePresence } from "framer-motion";
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
  ScanLine,
  Banknote,
  ClipboardCheck,
  Camera,
  X,
  Sparkles,
} from "lucide-react";
import { useState, useRef, useCallback, type FormEvent, type ChangeEvent } from "react";
import Footer from "@/components/Footer";
import { cldImageUrl } from "@/lib/cloudinary";

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
  cleaning: string;
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
  cleaning: "",
  message: "",
};

// project 1: before/after
const before1 = "deckpro/site-assets/before-after/project1/before";
const after1 = "deckpro/site-assets/before-after/project1/after";

//project 2: before/after
const before2 = "deckpro/site-assets/before-after/project2/before";
const after2 = "deckpro/site-assets/before-after/project2/after";

//project 3: before/after
const before3 = "deckpro/site-assets/before-after/project3/before";
const after3 = "deckpro/site-assets/before-after/project3/after";

/* ───────── CASE STUDIES (Before & After) ───────── */

const caseStudies = [
  {
    before: before1,
    after: after1,
    label: "1974 Custom Norwegian Fiberglass Project 8.5m",
    stat: "Attention to detail is our #1 priority.",
  },
  {
    before: before2,
    after: after2,
    label: "Haines Hunter Classic 6.5",
    stat: "Scan - Custom Design - Fitting - Mobile service",
  },
  {
    before: before3,
    after: after3,
    label: "Caribbean Reef Runner 21",
    stat: "Scan - Custom Design - Fitting - Mobile service",
  },
];

/* ───────── PROCESS STEPS ───────── */

const processSteps = [
  {
    icon: ClipboardCheck,
    num: "01",
    title: "Submit Enquiry",
    desc: "Fill out the form with your details, photos, and dimensions.",
  },
  {
    icon: ScanLine,
    num: "02",
    title: "We Quote",
    desc: "We review your info and send an accurate quote within 48 hours.",
  },
  {
    icon: Banknote,
    num: "03",
    title: "50% Deposit",
    desc: "Accept the quote and pay 50% deposit to book your scan date.",
  },
  {
    icon: Sparkles,
    num: "04",
    title: "We Deliver",
    desc: "Scan, design, manufacture, and install. Remaining 50% on completion.",
  },
];

/* ───────── ANIMATIONS ───────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const popUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ───────── REUSABLE INPUT STYLES ───────── */

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#1a2f45] placeholder:text-[#1a2f45]/30 transition-all duration-300 focus:border-[#1a2f45] focus:ring-2 focus:ring-[#1a2f45]/10 focus:outline-none";
const labelClass = "block text-sm font-semibold text-[#1a2f45] mb-1.5";
const requiredStar = <span className="text-red-500 ml-0.5">*</span>;
const errorMsg = (msg: string) => (
  <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
    <AlertCircle size={12} />
    {msg}
  </p>
);

/* ───────── BEFORE & AFTER SLIDER ───────── */

const BeforeAfterCard = ({
  before,
  after,
  label,
  stat,
}: {
  before: string;
  after: string;
  label: string;
  stat: string;
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/5">
      <div
        ref={containerRef}
        className="relative h-52 overflow-hidden cursor-col-resize select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* After image — full background */}
        <img
          src={cldImageUrl(after, 700)}
          alt={`${label} — After`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Before image — clipped by slider */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={cldImageUrl(before, 700)}
            alt={`${label} — Before`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100vw', maxWidth: 'none' }}
            draggable={false}
          />
        </div>

        {/* Slider line + handle */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="h-full w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg shadow-black/20 border border-gray-300">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4.5 3L1.5 7L4.5 11" stroke="#1a2f45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.5 3L12.5 7L9.5 11" stroke="#1a2f45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1a2f45] backdrop-blur-sm">
            Before
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="inline-block rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            After
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-[#1a2f45]">{label}</p>
        <p className="text-xs text-[#1a2f45]/40 mt-0.5">{stat}</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════ */

const Contact = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [photos, setPhotos] = useState<File[]>([]);
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");

  /* ── Cloudinary config ── */
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
      if (errors.photos) setErrors((prev) => ({ ...prev, photos: "" }));
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const removeLogo = (index: number) => {
    setLogoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLogoFiles(Array.from(e.target.files));
    }
  };

  /** Upload a single file to Cloudinary (unsigned preset) */
  const uploadToCloudinary = async (file: File, folder: string): Promise<string> => {
    const fd = new window.FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);
    fd.append("folder", `deckpro/${folder}`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      { method: "POST", body: fd }
    );

    if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
    const data = await res.json();
    return data.secure_url as string;
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Please enter a valid email.";
    if (!formData.address.trim()) errs.address = "Address is required.";
    if (!formData.serviceType) errs.serviceType = "Please select a service type.";

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

    if (!formData.cleaning) errs.cleaning = "Please confirm cleaning status.";

    if (!formData.dimensions.trim()) errs.dimensions = "Approximate dimensions are required.";
    if (photos.length === 0) errs.photos = "Please upload at least one photo.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");
    setUploadProgress("");

    try {
      // 1. Upload photos to Cloudinary
      setUploadProgress(`Uploading photos (0/${photos.length})...`);
      const photoUrls: string[] = [];
      for (let i = 0; i < photos.length; i++) {
        setUploadProgress(`Uploading photos (${i + 1}/${photos.length})...`);
        const url = await uploadToCloudinary(photos[i], "photos");
        photoUrls.push(url);
      }

      // 2. Upload logo files (if any)
      const logoUrls: string[] = [];
      if (logoFiles.length > 0) {
        setUploadProgress("Uploading logos...");
        for (const logo of logoFiles) {
          const url = await uploadToCloudinary(logo, "logos");
          logoUrls.push(url);
        }
      }

      // 3. Send form data + URLs to Netlify Function
      setUploadProgress("Sending enquiry...");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, photoUrls, logoUrls }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to send enquiry");
      }

      setSubmitting(false);
      setUploadProgress("");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitting(false);
      setUploadProgress("");
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or contact us directly."
      );
    }
  };

  /* ── SUCCESS STATE ── */
  if (submitted) {
    return (
      <main>
        <section className="min-h-screen flex items-center justify-center bg-white pt-20">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg mx-auto px-6"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f0f1]">
              <CheckCircle2 size={40} className="text-[#1a2f45]" />
            </div>
            <h1 className="text-3xl font-semibold text-[#1a2f45] mb-4">
              Enquiry Received!
            </h1>
            <p className="text-sm leading-relaxed text-[#1a2f45]/40 mb-8">
              Thank you for your detailed enquiry. Our team will review your information and
              get back to you with an accurate quote within <strong className="text-[#1a2f45]">48 hours</strong>.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a2f45] px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#1a2f45]/90 hover:shadow-xl"
            >
              Back to Home
              <ArrowRight size={16} />
            </a>
          </m.div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      {/* ══════════════════════════════════════
         HERO — Full-screen matching homepage
         ══════════════════════════════════════ */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#8CC3C8] via-[#6AB3B9] to-[#4B959C]" />
          <img
            src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=1760&auto=format&fit=crop"
            alt="Custom marine flooring craftsmanship"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-20 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#1a2f45]/75 px-5 py-2 text-xs font-medium tracking-wider text-white backdrop-blur-sm">
              <Send size={13} />
              Get a Quote
            </span>
          </m.div>

          <h1 className="text-4xl font-semibold leading-tight text-[#1a2f45] sm:text-5xl md:text-6xl">
            Start Your
            <br />
            Project Today
          </h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-5 max-w-md mx-auto text-sm leading-relaxed text-[#1a2f45]/50 sm:text-base"
          >
            Provide detailed information about your project and we&apos;ll send
            you an accurate quote within 48 hours. Serious enquiries only.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8"
          >
            <a
              href="#enquiry-form"
              className="inline-flex items-center justify-center rounded-full bg-[#1a2f45] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#1a2f45]/90 hover:shadow-xl"
            >
              Fill Out the Form
            </a>
          </m.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         HOW IT WORKS — Deposit policy strip
         ══════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                <ClipboardCheck size={13} className="text-white" />
              </span>
              <span className="text-sm font-medium text-[#1a2f45]/70">How It Works</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl">
              Our Enquiry Process
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-sm leading-relaxed text-[#1a2f45]/40">
              Our terms are 50% deposit prior to scanning & design, 50% upon completion.
            </p>
          </m.div>

          {/* Process steps */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((s, i) => (
              <m.div
                key={s.num}
                variants={popUp}
                className="group relative rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
              >
                <span className="absolute top-5 right-5 text-5xl font-bold text-[#1a2f45]/[0.05] select-none">
                  {s.num}
                </span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5f0f1] text-[#1a2f45] transition-all duration-300 group-hover:bg-[#1a2f45] group-hover:text-white">
                  <s.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-[#1a2f45] mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[#1a2f45]/40">{s.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-gray-200 lg:block" />
                )}
              </m.div>
            ))}
          </m.div>

          {/* Deposit callout */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 mx-auto max-w-2xl rounded-2xl border border-primary bg-[#1a2f45] p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Banknote size={18} className="text-white" />
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                Payment Terms
              </span>
            </div>
            <p className="text-sm text-white/50">
              <strong className="text-white">50% deposit</strong> upon accepting your quote to
              secure a scan date. Remaining <strong className="text-white">50% due upon
                job completion</strong>.
            </p>
          </m.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         FORM + BEFORE/AFTER — Two column layout
         ══════════════════════════════════════ */}
      <section id="enquiry-form" className="py-20 lg:py-28 bg-[#fafbfc]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">

            {/* ── LEFT: Enquiry Form ── */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                  <Send size={13} className="text-white" />
                </span>
                <span className="text-sm font-medium text-[#1a2f45]/70">Enquiry Form</span>
              </div>
              <h2 className="text-3xl font-semibold text-[#1a2f45] leading-tight sm:text-4xl mb-3">
                Tell Us About Your Project
              </h2>
              <p className="text-sm text-[#1a2f45]/40 mb-10">
                All fields marked with <span className="text-red-500">*</span> are{" "}
                required. The more detail you provide, the faster and more accurate
                our quote.
              </p>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* ── STEP 1: Personal Details ── */}
                <div>
                  <h3 className="text-base font-semibold text-[#1a2f45] mb-5 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e5f0f1] text-[#1a2f45] text-xs font-bold">
                      1
                    </span>
                    Your Details
                  </h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>Full Name {requiredStar}</label>
                      <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Sean Mitchell" className={inputClass} />
                      {errors.name && errorMsg(errors.name)}
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone {requiredStar}</label>
                      <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="04XX XXX XXX" className={inputClass} />
                      {errors.phone && errorMsg(errors.phone)}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email {requiredStar}</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
                      {errors.email && errorMsg(errors.email)}
                    </div>
                    <div>
                      <label htmlFor="address" className={labelClass}>Address {requiredStar}</label>
                      <input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Your suburb, WA" className={inputClass} />
                      {errors.address && errorMsg(errors.address)}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* ── STEP 2: Service Type ── */}
                <div>
                  <h3 className="text-base font-semibold text-[#1a2f45] mb-5 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e5f0f1] text-[#1a2f45] text-xs font-bold">
                      2
                    </span>
                    Service Type
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {([
                      { key: "marine" as ServiceType, icon: Ship, label: "Marine Flooring", sub: "Boats & Yachts" },
                      { key: "camper" as ServiceType, icon: Truck, label: "Campers & 4x4", sub: "Vehicles" },
                      { key: "scanning" as ServiceType, icon: Box, label: "Precision Scanning", sub: "Standalone" },
                    ]).map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, serviceType: opt.key }));
                          if (errors.serviceType) setErrors((prev) => ({ ...prev, serviceType: "" }));
                        }}
                        className={`group flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition-all duration-300 ${formData.serviceType === opt.key
                          ? "border-[#1a2f45] bg-[#1a2f45]/5 shadow-md shadow-[#1a2f45]/5"
                          : "border-gray-100 bg-white hover:border-[#1a2f45]/20"
                          }`}
                      >
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${formData.serviceType === opt.key
                            ? "bg-[#1a2f45] text-white"
                            : "bg-[#e5f0f1] text-[#1a2f45]"
                            }`}
                        >
                          <opt.icon size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1a2f45]">{opt.label}</p>
                          <p className="text-xs text-[#1a2f45]/40">{opt.sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.serviceType && errorMsg(errors.serviceType)}
                </div>

                {/* ── CONDITIONAL: Marine Fields ── */}
                <AnimatePresence>
                  {formData.serviceType === "marine" && (
                    <m.div
                      key="marine"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="h-px bg-gray-100 mb-10" />
                      <h3 className="text-base font-semibold text-[#1a2f45] mb-5 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e5f0f1] text-[#1a2f45] text-xs font-bold">3</span>
                        Boat Details
                      </h3>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="boatMake" className={labelClass}>Boat Make {requiredStar}</label>
                          <input id="boatMake" name="boatMake" value={formData.boatMake} onChange={handleChange} placeholder="e.g. Quintrex, Haines Hunter" className={inputClass} />
                          {errors.boatMake && errorMsg(errors.boatMake)}
                        </div>
                        <div>
                          <label htmlFor="boatModel" className={labelClass}>Boat Model {requiredStar}</label>
                          <input id="boatModel" name="boatModel" value={formData.boatModel} onChange={handleChange} placeholder="e.g. 610 Trident" className={inputClass} />
                          {errors.boatModel && errorMsg(errors.boatModel)}
                        </div>
                        <div>
                          <label htmlFor="boatSize" className={labelClass}>Boat Size (ft/m) {requiredStar}</label>
                          <input id="boatSize" name="boatSize" value={formData.boatSize} onChange={handleChange} placeholder="e.g. 21ft / 6.4m" className={inputClass} />
                          {errors.boatSize && errorMsg(errors.boatSize)}
                        </div>
                        <div>
                          <label htmlFor="boatLocation" className={labelClass}>Boat Location {requiredStar}</label>
                          <input id="boatLocation" name="boatLocation" value={formData.boatLocation} onChange={handleChange} placeholder="e.g. Hillarys Boat Harbour" className={inputClass} />
                          {errors.boatLocation && errorMsg(errors.boatLocation)}
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="boatReady" className={labelClass}>Is the boat ready for scanning & fit-out? {requiredStar}</label>
                          <select id="boatReady" name="boatReady" value={formData.boatReady} onChange={handleChange} className={inputClass}>
                            <option value="">Select...</option>
                            <option value="yes">Yes — deck is clear and accessible</option>
                            <option value="soon">Not yet — will be within 2 weeks</option>
                            <option value="unsure">Unsure — need advice</option>
                          </select>
                          {errors.boatReady && errorMsg(errors.boatReady)}
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                {/* ── CONDITIONAL: Camper/4x4 Fields ── */}
                <AnimatePresence>
                  {formData.serviceType === "camper" && (
                    <m.div
                      key="camper"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="h-px bg-gray-100 mb-10" />
                      <h3 className="text-base font-semibold text-[#1a2f45] mb-5 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e5f0f1] text-[#1a2f45] text-xs font-bold">3</span>
                        Vehicle Details
                      </h3>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="vehicleMake" className={labelClass}>Vehicle Make {requiredStar}</label>
                          <input id="vehicleMake" name="vehicleMake" value={formData.vehicleMake} onChange={handleChange} placeholder="e.g. Toyota, VW, Mercedes" className={inputClass} />
                          {errors.vehicleMake && errorMsg(errors.vehicleMake)}
                        </div>
                        <div>
                          <label htmlFor="vehicleModel" className={labelClass}>Vehicle Model {requiredStar}</label>
                          <input id="vehicleModel" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="e.g. HiAce, Transporter T6" className={inputClass} />
                          {errors.vehicleModel && errorMsg(errors.vehicleModel)}
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
                          {errors.vehicleType && errorMsg(errors.vehicleType)}
                        </div>
                        <div>
                          <label htmlFor="vehicleLocation" className={labelClass}>Vehicle Location {requiredStar}</label>
                          <input id="vehicleLocation" name="vehicleLocation" value={formData.vehicleLocation} onChange={handleChange} placeholder="e.g. Joondalup, WA" className={inputClass} />
                          {errors.vehicleLocation && errorMsg(errors.vehicleLocation)}
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="vehicleReady" className={labelClass}>Is the vehicle ready for scanning & fit-out? {requiredStar}</label>
                          <select id="vehicleReady" name="vehicleReady" value={formData.vehicleReady} onChange={handleChange} className={inputClass}>
                            <option value="">Select...</option>
                            <option value="yes">Yes — floor is clear and accessible</option>
                            <option value="soon">Not yet — will be within 2 weeks</option>
                            <option value="unsure">Unsure — need advice</option>
                          </select>
                          {errors.vehicleReady && errorMsg(errors.vehicleReady)}
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                {/* ── CONDITIONAL: Scanning Fields ── */}
                <AnimatePresence>
                  {formData.serviceType === "scanning" && (
                    <m.div
                      key="scanning"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="h-px bg-gray-100 mb-10" />
                      <h3 className="text-base font-semibold text-[#1a2f45] mb-5 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e5f0f1] text-[#1a2f45] text-xs font-bold">3</span>
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
                          {errors.scanType && errorMsg(errors.scanType)}
                        </div>
                        <div>
                          <label htmlFor="scanLocation" className={labelClass}>Location of Item {requiredStar}</label>
                          <input id="scanLocation" name="scanLocation" value={formData.scanLocation} onChange={handleChange} placeholder="e.g. Fremantle, WA" className={inputClass} />
                          {errors.scanLocation && errorMsg(errors.scanLocation)}
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="scanDetails" className={labelClass}>Additional Details</label>
                          <textarea id="scanDetails" name="scanDetails" value={formData.scanDetails} onChange={handleChange} rows={3} placeholder="Tell us more about what you need scanned and what format you require..." className={inputClass} />
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                {/* ── STEP 4: Residue & Cleaning ── */}
                <AnimatePresence>
                  {formData.serviceType && (
                    <m.div
                      key="cleaning"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="h-px bg-gray-100 mb-10" />
                      <h3 className="text-base font-semibold text-[#1a2f45] mb-5 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e5f0f1] text-[#1a2f45] text-xs font-bold">4</span>
                        Residue & Cleaning
                      </h3>

                      <div className="mb-6 rounded-lg bg-amber-50 p-4 border border-amber-100">
                        <p className="text-sm text-amber-900 flex gap-2">
                          <AlertCircle size={18} className="shrink-0 mt-0.5" />
                          <span>
                            Old Carpet/Flooring and Glue residue must be cleaned and removed prior to scanning and site visit.
                            <strong> Heavy soiling will be charged as an extra.</strong>
                          </span>
                        </p>
                      </div>

                      <div className="grid gap-5 mb-10">
                        <div>
                          <label htmlFor="cleaning" className={labelClass}>
                            Will the area be cleaned and prepared prior to our visit? {requiredStar}
                          </label>
                          <select
                            id="cleaning"
                            name="cleaning"
                            value={formData.cleaning}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          {errors.cleaning && errorMsg(errors.cleaning)}
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                {/* ── STEP 5: Logos & Lettering ── */}
                <AnimatePresence>
                  {formData.serviceType && (
                    <m.div
                      key="logos"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="h-px bg-gray-100 mb-10" />
                      <h3 className="text-base font-semibold text-[#1a2f45] mb-5 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e5f0f1] text-[#1a2f45] text-xs font-bold">5</span>
                        Logos & Lettering
                      </h3>

                      <div className="grid gap-5 mb-10">
                        <div>
                          <label className={labelClass}>
                            Do you have any logo or lettering you would like to be included in your design? Upload ideas here:
                          </label>
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleLogoChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div
                              className={`flex items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors duration-300 ${logoFiles.length > 0
                                ? "border-[#1a2f45]/30 bg-[#1a2f45]/5"
                                : "border-gray-300 hover:border-[#1a2f45]/20"
                                }`}
                            >
                              <Upload size={24} className="text-[#1a2f45]/30" />
                              <div>
                                <p className="text-sm font-semibold text-[#1a2f45]">
                                  {logoFiles.length > 0
                                    ? `${logoFiles.length} file${logoFiles.length > 1 ? "s" : ""} selected`
                                    : "Click to upload logos/ideas"}
                                </p>
                                <p className="text-xs text-[#1a2f45]/40">
                                  Optional. JPG, PNG, PDF
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Logo thumbnail previews */}
                          {logoFiles.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {logoFiles.map((file, i) => (
                                <div key={`${file.name}-${i}`} className="relative group">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Logo ${i + 1}`}
                                    className="h-14 w-14 rounded-lg object-cover border border-gray-300"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeLogo(i)}
                                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                {/* ── STEP 6: Dimensions & Photos ── */}
                <AnimatePresence>
                  {formData.serviceType && (
                    <m.div
                      key="photos"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="h-px bg-gray-100 mb-10" />
                      <h3 className="text-base font-semibold text-[#1a2f45] mb-5 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e5f0f1] text-[#1a2f45] text-xs font-bold">6</span>
                        Dimensions & Photos
                      </h3>

                      {/* Requirements callout */}
                      <div className="mb-6 rounded-lg bg-amber-50 p-4 border border-amber-100">
                        <p className="text-sm font-semibold text-amber-900 mb-2">To provide an accurate quote, we require the following:</p>
                        <ul className="text-sm text-amber-800 space-y-1">
                          <li>— <strong>Actual measurements</strong> of each area (Length × Width in mm). Generic or estimated dimensions cannot be quoted.</li>
                          <li>— <strong>Photos of the actual area</strong> to be floored — not stock images or similar boats/vehicles.</li>
                          <li>— Note whether the substrate (floor) is <strong>textured, smooth, carpet</strong>, etc.</li>
                          <li>— Note any <strong>holes, cracks, or damage</strong> that may need to be repaired first.</li>
                        </ul>
                      </div>

                      <div className="grid gap-5">
                        <div>
                          <label htmlFor="dimensions" className={labelClass}>
                            Exact Dimensions in mm — Length × Width of each section {requiredStar}
                          </label>
                          <input id="dimensions" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="e.g. Section 1: 4000mm x 2500mm, Section 2: 1200mm x 800mm" className={inputClass} />
                          {errors.dimensions && errorMsg(errors.dimensions)}
                          <p className="mt-1 text-xs text-red-400">
                            Generic or estimated measurements cannot be quoted accurately. Please measure the actual area.
                          </p>
                        </div>
                        <div>
                          <label htmlFor="photos" className={labelClass}>Photos of the Actual Area {requiredStar}</label>
                          <div className="relative">
                            <input
                              id="photos"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div
                              className={`flex items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors duration-300 ${photos.length > 0
                                ? "border-[#1a2f45]/30 bg-[#1a2f45]/5"
                                : "border-gray-300 hover:border-[#1a2f45]/20"
                                }`}
                            >
                              <Camera size={24} className="text-[#1a2f45]/30" />
                              <div>
                                <p className="text-sm font-semibold text-[#1a2f45]">
                                  {photos.length > 0
                                    ? `${photos.length} file${photos.length > 1 ? "s" : ""} selected`
                                    : "Click to upload photos"}
                                </p>
                                <p className="text-xs text-[#1a2f45]/40">
                                  JPG, PNG — photos of your actual boat/vehicle, not generic images
                                </p>
                              </div>
                            </div>
                          </div>
                          {errors.photos && errorMsg(errors.photos)}

                          {/* Thumbnail previews */}
                          {photos.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {photos.map((file, i) => (
                                <div key={`${file.name}-${i}`} className="relative group">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${i + 1}`}
                                    className="h-14 w-14 rounded-lg object-cover border border-gray-300"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removePhoto(i)}
                                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          <p className="mt-2 text-xs text-[#1a2f45]/30">
                            Include photos of each section, the floor surface/substrate, and any existing damage or hardware.
                          </p>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                {/* ── STEP 5: Message ── */}
                <AnimatePresence>
                  {formData.serviceType && (
                    <m.div
                      key="notes"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="h-px bg-gray-100 mb-10" />
                      <h3 className="text-base font-semibold text-[#1a2f45] mb-5 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e5f0f1] text-[#1a2f45] text-xs font-bold">5</span>
                        Additional Notes
                      </h3>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Any other details, preferences, colour ideas, or questions..."
                        className={inputClass}
                      />
                    </m.div>
                  )}
                </AnimatePresence>

                {/* ── SUBMIT ── */}
                <div className="pt-4">
                  {/* Error message */}
                  {submitError && (
                    <div className="mb-4 rounded-lg bg-red-50 p-4 border border-red-100">
                      <p className="text-sm text-red-700 flex gap-2">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1a2f45] px-12 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#1a2f45]/90 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {uploadProgress || "Submitting..."}
                      </>
                    ) : (
                      <>
                        Submit Enquiry
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-xs text-[#1a2f45]/30">
                    By submitting this form, you agree to be contacted via phone or email regarding your project enquiry.
                  </p>
                </div>
              </form>
            </m.div>

            {/* ── RIGHT: Before & After + Contact Info ── */}
            <div className="lg:sticky lg:top-28 space-y-8">
              {/* Before & After heading */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a2f45]">
                    <Sparkles size={13} className="text-white" />
                  </span>
                  <span className="text-sm font-medium text-[#1a2f45]/70">Our Results</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#1a2f45] mb-2">
                  Before & After
                </h3>
                <p className="text-sm text-[#1a2f45]/40 mb-6">
                  Attention to detail is one of our core values. Use the sliders below to see some of our projects.
                </p>
              </m.div>

              {/* Case study cards */}
              <m.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-4"
              >
                {caseStudies.map((cs, i) => (
                  <m.div key={i} variants={popUp}>
                    <BeforeAfterCard {...cs} />
                  </m.div>
                ))}
              </m.div>

              {/* Mobile service callout */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-2xl border border-[#3A868F]/20 bg-[#1a2f45] p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3A868F] flex-shrink-0">
                    <Truck size={18} className="text-white" />
                  </div>
                  <h4 className="text-base font-semibold text-white">Fully Mobile Service</h4>
                </div>
                <p className="text-sm leading-relaxed text-white/60">
                  We come to your location — marina, driveway, or garage. No need
                  to move your boat or vehicle.
                </p>

              </m.div>

              {/* Contact info */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4"
              >
                <h4 className="text-base font-semibold text-[#1a2f45] mb-4">Get In Touch</h4>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f0f1] text-[#1a2f45] flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a2f45]">Headquarters Perth - 200km Radius</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f0f1] text-[#1a2f45] flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a2f45]">+61 415 604 457</p>
                    <p className="text-xs text-[#1a2f45]/40">Call or text anytime</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f0f1] text-[#1a2f45] flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a2f45]">info@deckpromarine.com.au</p>
                    <p className="text-xs text-[#1a2f45]/40">Quotes within 48 hours</p>
                  </div>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/share/1AVApWZLQa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 text-[#1a2f45]/40 transition-all hover:border-[#1a2f45]/20 hover:text-[#1a2f45] hover:bg-[#e5f0f1]"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="mailto:info@deckpromarine.com.au"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 text-[#1a2f45]/40 transition-all hover:border-[#1a2f45]/20 hover:text-[#1a2f45] hover:bg-[#e5f0f1]"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                  <a
                    href="tel:+61415604457"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 text-[#1a2f45]/40 transition-all hover:border-[#1a2f45]/20 hover:text-[#1a2f45] hover:bg-[#e5f0f1]"
                    aria-label="Phone"
                  >
                    <Phone size={18} />
                  </a>
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
