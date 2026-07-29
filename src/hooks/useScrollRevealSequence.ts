import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARD_SELECTOR = "[data-scroll-reveal-card]";
const MARKER_SELECTOR = "[data-scroll-reveal-marker]";

export function getScrollRevealEnabled() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useScrollRevealSequence(
  itemCount: number,
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean
) {
  useLayoutEffect(() => {
    if (!enabled || itemCount === 0) return;

    const container = containerRef.current;
    if (!container) return;

    const cards = gsap.utils.toArray<HTMLElement>(CARD_SELECTOR, container);
    const markers = gsap.utils.toArray<HTMLElement>(MARKER_SELECTOR, container);

    gsap.set(cards, { opacity: 0, x: -48 });
    if (markers.length) {
      gsap.set(markers, { opacity: 0.35, scale: 0.92 });
    }

    if (cards[0]) {
      gsap.set(cards[0], { opacity: 1, x: 0 });
    }
    if (markers[0]) {
      gsap.set(markers[0], { opacity: 1, scale: 1 });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 78%",
        end: "bottom 25%",
        scrub: 0.4,
        invalidateOnRefresh: true,
      },
    });

    cards.forEach((card, index) => {
      if (index === 0) return;

      const marker = markers[index];
      const position = index - 0.15;

      timeline.fromTo(
        card,
        { opacity: 0, x: -48 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        position
      );

      if (marker) {
        timeline.fromTo(
          marker,
          { opacity: 0.35, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.65, ease: "power2.out" },
          position
        );
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshId = window.requestAnimationFrame(refresh);

    return () => {
      window.cancelAnimationFrame(refreshId);
      window.removeEventListener("load", refresh);
      timeline.scrollTrigger?.kill();
      timeline.kill();

      cards.forEach((card) => {
        gsap.set(card, { clearProps: "opacity,transform" });
      });
      markers.forEach((marker) => {
        gsap.set(marker, { clearProps: "opacity,transform" });
      });
    };
  }, [itemCount, containerRef, enabled]);
}
