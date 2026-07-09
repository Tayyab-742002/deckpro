import { useState } from "react";
import { cldImageUrl, cldPlaceholderUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

interface CldImageProps {
  /** Cloudinary public ID, e.g. "deckpro/site-assets/hero-image" */
  publicId: string;
  alt: string;
  /** Classes for sizing/position/rounding/hover — applied to the wrapping box. */
  className?: string;
  /** Requested delivery width in px, for responsive sizing. */
  width?: number;
  /** Load immediately instead of lazily (use for above-the-fold images). */
  eager?: boolean;
  objectFit?: "cover" | "contain";
}

/** Image with a blurred low-quality placeholder (LQIP) that crossfades into the full image once loaded. */
export function CldImage({
  publicId,
  alt,
  className,
  width,
  eager = false,
  objectFit = "cover",
}: CldImageProps) {
  const [loaded, setLoaded] = useState(false);
  const loading = eager ? "eager" : "lazy";
  const fit = objectFit === "contain" ? "object-contain" : "object-cover";

  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <img
        src={cldPlaceholderUrl(publicId)}
        alt=""
        aria-hidden="true"
        loading={loading}
        className={cn(
          "absolute inset-0 h-full w-full scale-110 blur-md",
          fit
        )}
        style={{ opacity: loaded ? 0 : 1, transition: "opacity 0.5s ease" }}
      />
      <img
        src={cldImageUrl(publicId, width)}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn("absolute inset-0 h-full w-full", fit)}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
      />
    </span>
  );
}
