import { useEffect, useRef, type ReactNode } from "react";
import { initGsapSection } from "../../lib/initGsapSection";
import { ParallaxMedia } from "../effects/ParallaxMedia";
import type { MediaEffect, RevealEffect } from "../../lib/gsapEffects";
import { sectionGradientClass } from "../../lib/section-gradients";

interface SplitFeatureSectionProps {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt: string;
  reverse?: boolean;
  children?: ReactNode;
  dark?: boolean;
  sectionTone?: "black" | "rise";
  mediaEffect?: MediaEffect;
  textReveal?: RevealEffect;
}

export function SplitFeatureSection({
  eyebrow,
  title,
  paragraphs,
  image,
  imageAlt,
  reverse = false,
  children,
  dark = false,
  sectionTone = "black",
  mediaEffect = "zoom",
  textReveal = "up",
}: SplitFeatureSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = initGsapSection(el);
    return () => ctx.revert();
  }, []);

  const mediaSrc = image;
  if (!mediaSrc) return null;

  const sectionBg =
    sectionTone === "rise"
      ? sectionGradientClass("rise")
      : sectionGradientClass("slashReverse");

  return (
    <section
      ref={ref}
      data-gsap-managed
      className={`section-padding ${sectionBg} text-white`}
    >
      <div className="container-site">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div>
            {eyebrow && (
              <p
                className={`label-xs mb-4 ${dark ? "text-white/60" : ""}`}
                data-reveal="blur"
              >
                {eyebrow}
              </p>
            )}
            <div
              className="mb-6 h-px w-16 origin-left bg-flow-mid/60"
              data-section-line
            />
            <h2 className="heading-section text-white" data-reveal={textReveal}>
              {title}
            </h2>
            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-reveal={i % 2 === 0 ? "left" : "right"}
                  className={`font-mono text-base leading-relaxed md:text-lg ${
                    dark ? "text-white/75" : "text-white/85"
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>
            {children && (
              <div className="mt-8" data-reveal="scale">
                {children}
              </div>
            )}
          </div>

          <div data-reveal-media={mediaEffect}>
            <ParallaxMedia
              src={mediaSrc}
              alt={imageAlt}
              className="aspect-[4/5] lg:aspect-[3/4]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
