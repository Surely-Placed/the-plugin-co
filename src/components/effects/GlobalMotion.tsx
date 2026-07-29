import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RevealEffect } from "../../lib/gsapEffects";
import { initGsapSection } from "../../lib/initGsapSection";

gsap.registerPlugin(ScrollTrigger);

const autoRevealEffects: RevealEffect[] = [
  "up",
  "left",
  "right",
  "scale",
  "blur",
  "clip",
  "flip",
  "down",
];

const autoStaggerEffects = ["rise", "cascade", "wave", "flip", "zoom"] as const;

interface GlobalMotionProps {
  children: ReactNode;
}

/**
 * Auto-initializes GSAP on unmanaged sections with rotating effect types.
 */
export function GlobalMotion({ children }: GlobalMotionProps) {
  const location = useLocation();

  useEffect(() => {
    const contexts: gsap.Context[] = [];
    const main = document.querySelector("main");
    if (!main) return;

    const sections = main.querySelectorAll(
      ":scope > section:not([data-gsap-managed]):not([data-gsap-skip])"
    );

    sections.forEach((section, sectionIndex) => {
      const el = section as HTMLElement;
      if (!el.querySelector("[data-reveal], [data-reveal-stagger], [data-reveal-media]")) {
        const stagger = autoStaggerEffects[sectionIndex % autoStaggerEffects.length];
        el.setAttribute("data-reveal-stagger", "");
        el.setAttribute("data-stagger", stagger);
        Array.from(el.children).forEach((child, i) => {
          if (child instanceof HTMLElement) {
            child.setAttribute(
              "data-reveal",
              autoRevealEffects[(sectionIndex + i) % autoRevealEffects.length]
            );
          }
        });
      }
      contexts.push(initGsapSection(el));
    });

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(t);
      contexts.forEach((ctx) => ctx.revert());
    };
  }, [location.pathname]);

  return <>{children}</>;
}
