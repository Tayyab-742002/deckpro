import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SanityImageProps {
  /** Full Sanity CDN asset URL (pre-resolved at build time by fetch-blog.mjs). */
  url: string;
  alt: string;
  /** Sanity's built-in base64 LQIP for the blur-up placeholder. */
  lqip?: string;
  className?: string;
  /** Delivery width hint (Sanity CDN resizes on the fly). */
  width?: number;
  eager?: boolean;
}

/** Blog image with the same LQIP blur-up treatment as CldImage, but backed by
 *  Sanity's image CDN (auto format + on-the-fly resizing via URL params). */
export function SanityImage({ url, alt, lqip, className, width = 1200, eager = false }: SanityImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Same hydration race as CldImage: prerendered pages can finish downloading
  // the image before React attaches onLoad.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  const src = `${url}?w=${width}&auto=format&q=80`;
  const srcSet = [Math.round(width / 2), width, width * 2 <= 2400 ? width * 2 : null]
    .filter((w): w is number => !!w)
    .map((w) => `${url}?w=${w}&auto=format&q=80 ${w}w`)
    .join(", ");

  return (
    <span className={cn("relative block overflow-hidden", className)}>
      {lqip && (
        <img
          src={lqip}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
          style={{ opacity: loaded ? 0 : 1, transition: "opacity 0.5s ease" }}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes="(min-width: 1024px) 768px, 100vw"
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        {...({ fetchpriority: eager ? "high" : "auto" } as Record<string, string>)}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
      />
    </span>
  );
}
