import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RevealEffect } from "../../lib/gsapEffects";
import { animateReveal, animateRevealImmediate } from "../../lib/gsapEffects";

gsap.registerPlugin(ScrollTrigger);

interface GsapRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  effect?: RevealEffect;
  /** Use on hero content — visible on load, not scroll-triggered */
  immediate?: boolean;
}

export function GsapReveal({
  children,
  delay = 0,
  className = "",
  effect = "up",
  immediate = false,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (immediate) {
      const tween = animateRevealImmediate(el, effect, delay);
      return () => {
        tween.kill();
      };
    }

    const tween = animateReveal(el, effect, {
      trigger: el,
      start: "top 88%",
      once: true,
    });
    if (delay) tween.delay(delay);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, effect, immediate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
