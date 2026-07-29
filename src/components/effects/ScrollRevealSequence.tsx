import {
  createElement,
  forwardRef,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  getScrollRevealEnabled,
  useScrollRevealSequence,
} from "../../hooks/useScrollRevealSequence";

interface ScrollRevealSequenceProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  itemCount: number;
  as?: "div" | "section" | "ol" | "ul";
  className?: string;
}

export const ScrollRevealSequence = forwardRef<HTMLElement, ScrollRevealSequenceProps>(
  function ScrollRevealSequence(
    { children, itemCount, as: Tag = "div", className = "", ...rest },
    forwardedRef
  ) {
    const localRef = useRef<HTMLElement>(null);
    const [enabled] = useState(getScrollRevealEnabled);

    useScrollRevealSequence(itemCount, localRef, enabled);

    return createElement(
      Tag,
      {
        ref: (node: HTMLElement | null) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        },
        className: `scroll-reveal-seq relative ${className}`.trim(),
        "data-gsap-skip": true,
        "data-scroll-reveal-seq": true,
        ...rest,
      },
      children
    );
  }
);
