import { useEffect, useRef } from "react";
import type { MediaEffect } from "../../lib/gsapEffects";
import { initGsapSection } from "../../lib/initGsapSection";
import { SiteImage } from "../ui/SiteImage";

interface MediaBandProps {
  src: string;
  alt: string;
  type?: "image" | "video";
  poster?: string;
  className?: string;
  overlay?: boolean;
  mediaEffect?: MediaEffect;
}

export function MediaBand({
  src,
  alt,
  type = "image",
  poster,
  className = "",
  overlay = true,
  mediaEffect = "zoom",
}: MediaBandProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = initGsapSection(el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      data-gsap-managed
      className={`relative min-h-[32vh] overflow-hidden md:min-h-[42vh] ${className}`}
    >
      <div data-reveal-media={mediaEffect} className="absolute inset-0">
        {type === "video" ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            className="h-full w-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <SiteImage
            src={src}
            alt={alt}
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
        )}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/50 via-bg-primary/25 to-bg-primary/50" />
        )}
      </div>
    </section>
  );
}
