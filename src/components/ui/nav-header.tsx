import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import type { NavItem } from "../../lib/navigation";
import { mainNavGroups, sharedNavLinks } from "../../lib/navigation";
import { NavDropdown } from "../layout/NavDropdown";

interface CursorPosition {
  left: number;
  width: number;
  opacity: number;
}

function isSharedActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface NavFlatLinkProps {
  link: NavItem;
  pathname: string;
}

function NavFlatLink({ link, pathname }: NavFlatLinkProps) {
  const isActive = isSharedActive(link.href, pathname);

  return (
    <li data-active={isActive ? "true" : "false"} className="relative z-10 shrink-0">
      <Link
        to={link.href}
        className={`touch-target block px-3 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-wide transition-colors duration-200 sm:px-4 sm:py-3 sm:text-xs md:px-5 md:py-3 md:text-sm ${
          isActive ? "text-white" : "text-white/65 hover:text-white/90"
        }`}
      >
        {link.label}
      </Link>
    </li>
  );
}

export function NavHeader() {
  const location = useLocation();
  const listRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const syncActiveTab = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const active = list.querySelector<HTMLLIElement>(':scope > li[data-active="true"]');
    if (!active) {
      setPosition((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    setPosition({
      width: active.offsetWidth,
      left: active.offsetLeft,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    syncActiveTab();
  }, [location.pathname, syncActiveTab]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const observer = new ResizeObserver(() => syncActiveTab());
    observer.observe(list);
    window.addEventListener("resize", syncActiveTab);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncActiveTab);
    };
  }, [syncActiveTab]);

  return (
    <nav aria-label="Main" className="nav-pill-shell">
      <span className="nav-pill-glow" aria-hidden />
      <ul
        ref={listRef}
        className="nav-pill-inner relative mx-auto flex w-fit max-w-full items-center overflow-visible rounded-full border border-white/15 bg-black/30 p-1 backdrop-blur-md"
      >
        {mainNavGroups.map((group) => (
          <NavDropdown key={group.label} group={group} />
        ))}

        {sharedNavLinks.map((link) => (
          <NavFlatLink key={link.href} link={link} pathname={location.pathname} />
        ))}

        <ActiveIndicator position={position} />
      </ul>
    </nav>
  );
}

function ActiveIndicator({ position }: { position: CursorPosition }) {
  return (
    <motion.li
      aria-hidden
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
      className="pointer-events-none absolute top-1/2 z-0 h-[calc(100%-0.35rem)] -translate-y-1/2 rounded-full bg-flow-mid/90 shadow-[0_0_20px_rgba(27,104,207,0.45)]"
    />
  );
}
