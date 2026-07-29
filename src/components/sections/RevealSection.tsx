import { forwardRef, useEffect, useRef, type ReactNode } from "react";
import { initGsapSection } from "../../lib/initGsapSection";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const RevealSection = forwardRef<HTMLElement, RevealSectionProps>(
  function RevealSection({ children, className = "", id }, forwardedRef) {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const ctx = initGsapSection(el);
      return () => ctx.revert();
    }, []);

    return (
      <section
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        id={id}
        data-gsap-managed
        className={className}
      >
        {children}
      </section>
    );
  }
);

/** Alias for clarity in new code */
export const GsapSection = RevealSection;
