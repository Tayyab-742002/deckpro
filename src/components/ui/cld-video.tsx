import { useEffect, useRef, useState } from "react";
import { cldVideoUrl, cldVideoPlaceholderUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

interface CldVideoProps {
  /** Cloudinary public ID, e.g. "deckpro/site-assets/featured-videos/1" */
  publicId: string;
  className?: string;
}

/** Autoplaying background video with a blurred placeholder frame (LQIP) that crossfades in once playable.
 *  The <video> element (and its network request) isn't mounted until it's near the viewport —
 *  muted autoplay otherwise makes browsers fetch it immediately regardless of `preload`. */
export function CldVideo({ publicId, className }: CldVideoProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={containerRef} className={cn("relative block overflow-hidden", className)}>
      <img
        src={cldVideoPlaceholderUrl(publicId)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
        style={{ opacity: loaded ? 0 : 1, transition: "opacity 0.5s ease" }}
      />
      {inView && (
        <video
          src={cldVideoUrl(publicId)}
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          onLoadedData={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
        />
      )}
    </span>
  );
}
