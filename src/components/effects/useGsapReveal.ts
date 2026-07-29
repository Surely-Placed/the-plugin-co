import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal<T extends HTMLElement>(
  options?: { y?: number; stagger?: number; start?: string }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-reveal]");
    const targets = children.length > 0 ? children : [el];

    gsap.fromTo(
      targets,
      { y: options?.y ?? 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: options?.stagger ?? 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top 82%",
          once: true,
        },
      }
    );
  }, [options?.y, options?.stagger, options?.start]);

  return ref;
}
