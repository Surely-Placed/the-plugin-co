import { useEffect, useRef, useCallback, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import gsap from "gsap";
import { brand } from "../../lib/brand";
import { useBookCall } from "../book-call/BookCallProvider";
import { getMobileNavLinks } from "../../lib/navigation";
import "./StaggeredMenu.css";

interface StaggeredMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const socialItems = [
  { label: "LinkedIn", href: brand.social.linkedin },
  { label: "Instagram", href: brand.social.instagram },
  { label: "X", href: brand.social.twitter },
];

export function StaggeredMenu({ isOpen, onToggle }: StaggeredMenuProps) {
  const location = useLocation();
  const { openBookCall } = useBookCall();
  const panelRef = useRef<HTMLDivElement>(null);
  const prelayer1Ref = useRef<HTMLDivElement>(null);
  const prelayer2Ref = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const animateOpen = useCallback(() => {
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(prelayer1Ref.current, { x: 0, duration: 0.55, ease: "power4.out" }, 0);
    tl.to(prelayer2Ref.current, { x: 0, duration: 0.55, ease: "power4.out" }, 0.06);
    tl.to(panelRef.current, { x: 0, duration: 0.75, ease: "power4.out" }, 0.12);
    // Fade prelayers back off-screen right — never slide left (that caused the blue block on the left)
    tl.to(
      [prelayer1Ref.current, prelayer2Ref.current],
      { opacity: 0, duration: 0.35, ease: "power2.in" },
      0.42
    );
    tl.set(
      [prelayer1Ref.current, prelayer2Ref.current],
      { x: "100%", opacity: 1 }
    );

    const items = navItemsRef.current.filter(Boolean);
    tl.fromTo(
      items,
      { yPercent: 140, rotate: 8 },
      { yPercent: 0, rotate: 0, duration: 1, stagger: 0.06, ease: "power4.out" },
      0.3
    );
    tl.fromTo(
      closeRef.current,
      { opacity: 0, scale: 0.85, rotate: -90 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "power3.out" },
      0.28
    );
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.55
    );
    tl.fromTo(
      socialsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.7
    );
  }, []);

  const animateClose = useCallback(() => {
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(closeRef.current, { opacity: 0, scale: 0.85, rotate: 90, duration: 0.25, ease: "power3.in" }, 0);
    tl.to(socialsRef.current, { opacity: 0, y: 20, duration: 0.3, ease: "power3.in" }, 0);
    tl.to(ctaRef.current, { opacity: 0, y: 20, duration: 0.3, ease: "power3.in" }, 0);
    const items = navItemsRef.current.filter(Boolean);
    tl.to(items, { yPercent: 140, rotate: -5, duration: 0.5, stagger: 0.03, ease: "power3.in" }, 0);
    tl.to(panelRef.current, { x: "100%", duration: 0.7, ease: "power3.inOut" }, 0.2);
    tl.set([prelayer1Ref.current, prelayer2Ref.current], { x: "100%" });
  }, []);

  useEffect(() => {
    tlRef.current?.kill();
    if (isOpen) animateOpen();
    else animateClose();
  }, [isOpen, animateOpen, animateClose]);

  useEffect(() => {
    if (isOpen) onToggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onLinkEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 12, duration: 0.45, ease: "power3.out" });
  };

  const onLinkLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, duration: 0.5, ease: "power3.out" });
  };

  return (
    <div className="staggered-menu" aria-hidden={!isOpen && undefined}>
      {isOpen && (
        <div className="menu-overlay" onClick={onToggle} aria-hidden />
      )}

      <div ref={prelayer1Ref} className="menu-prelayer menu-prelayer-1" />
      <div ref={prelayer2Ref} className="menu-prelayer menu-prelayer-2" />

      <div ref={panelRef} className="menu-panel">
        <div className="menu-panel-header">
          <p className="menu-panel-eyebrow">Navigation</p>
          <button
            ref={closeRef}
            type="button"
            className="menu-close"
            onClick={onToggle}
            aria-label="Close menu"
            style={{ opacity: 0 }}
          >
            <X size={22} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
        <ul className="menu-nav">
          {getMobileNavLinks().map((item, i) => (
            <li
              key={item.href}
              ref={(el) => {
                navItemsRef.current[i] = el;
              }}
            >
              <Link
                to={item.href}
                className={location.pathname === item.href ? "is-active" : ""}
                onClick={onToggle}
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div ref={ctaRef} className="menu-cta" style={{ opacity: 0 }}>
          <a
            href={brand.calendlyUrl}
            onClick={(e) => {
              e.preventDefault();
              onToggle();
              openBookCall();
            }}
          >
            {brand.cta.label}
          </a>
        </div>

        <div ref={socialsRef} className="menu-socials" style={{ opacity: 0 }}>
          <div className="menu-socials-title">Connect</div>
          <div className="menu-socials-links">
            {socialItems.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
