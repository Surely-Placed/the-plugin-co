import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Animated Menu ↔ Close label swap (used in pill nav + staggered panel) */
export function useMenuLabelAnimation(isOpen: boolean, enabled = true) {
  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const closeLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled || !menuLabelRef.current || !closeLabelRef.current) return;
    if (isOpen) {
      gsap.to(menuLabelRef.current, { y: "-100%", duration: 0.4, ease: "power3.inOut" });
      gsap.to(closeLabelRef.current, { y: "-100%", duration: 0.4, ease: "power3.inOut" });
    } else {
      gsap.to(menuLabelRef.current, { y: "0%", duration: 0.4, ease: "power3.inOut" });
      gsap.to(closeLabelRef.current, { y: "0%", duration: 0.4, ease: "power3.inOut" });
    }
  }, [isOpen, enabled]);

  return { menuLabelRef, closeLabelRef };
}
