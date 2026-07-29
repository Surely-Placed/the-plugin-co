import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { SiteImage } from "../ui/SiteImage";

interface ParallaxMediaProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
}

export function ParallaxMedia({
  src,
  alt,
  className = "",
  speed = 0.15,
  overlay = true,
  priority = false,
  width = 1200,
  height = 900,
}: ParallaxMediaProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const media = mediaRef.current;
    if (!wrap || !media) return;

    gsap.to(media, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === wrap) t.kill();
      });
    };
  }, [speed]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden rounded-3xl ${className}`}
    >
      <SiteImage
        ref={mediaRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="h-[120%] w-full object-cover"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      )}
    </div>
  );
}
