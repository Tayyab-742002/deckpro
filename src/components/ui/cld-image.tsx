import { useEffect, useRef, useState } from "react";
import { cldImageUrl, cldPlaceholderUrl, cldSrcSet } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

interface CldImageProps {
  /** Cloudinary public ID, e.g. "deckpro/site-assets/hero-image" */
  publicId: string;
  alt: string;
  /** Classes for sizing/position/rounding/hover — applied to the wrapping box. */
  className?: string;
  /** Requested delivery width in px — also the largest responsive candidate. */
  width?: number;
  /** `sizes` hint for the responsive srcset. Defaults to full-bleed, the common case here. */
  sizes?: string;
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
  sizes = "100vw",
  eager = false,
  objectFit = "cover",
}: CldImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const loading = eager ? "eager" : "lazy";
  const fit = objectFit === "contain" ? "object-contain" : "object-cover";

  // With prerendered HTML the image often finishes downloading before React
  // hydrates and attaches onLoad — the event has already fired, so `loaded`
  // would stay false and the blurred placeholder would never crossfade away.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

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
        ref={imgRef}
        src={cldImageUrl(publicId, width)}
        srcSet={width ? cldSrcSet(publicId, width) : undefined}
        sizes={width ? sizes : undefined}
        alt={alt}
        loading={loading}
        // React 18 only forwards the lowercase DOM attribute; the camelCase
        // prop is dropped with a warning (camelCase support landed in React 19).
        {...({ fetchpriority: eager ? "high" : "auto" } as Record<string, string>)}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn("absolute inset-0 h-full w-full", fit)}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
      />
    </span>
  );
}
