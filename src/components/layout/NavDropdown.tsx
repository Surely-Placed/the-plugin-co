import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { NavGroup } from "../../lib/navigation";

interface NavDropdownProps {
  group: NavGroup;
}

function isGroupActive(group: NavGroup, pathname: string) {
  return group.links.some(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`)
  );
}

export function NavDropdown({ group }: NavDropdownProps) {
  const ref = useRef<HTMLLIElement>(null);
  const skipCloseRef = useRef(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = isGroupActive(group, pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (skipCloseRef.current) {
        skipCloseRef.current = false;
        return;
      }

      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      data-active={active ? "true" : "false"}
      className="relative z-[70] shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={(event) => {
          event.stopPropagation();
          skipCloseRef.current = true;
          setOpen(true);
        }}
        className={`touch-target block px-3 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-wide transition-colors duration-200 sm:px-4 sm:py-3 sm:text-xs md:px-5 md:py-3 md:text-sm ${
          active || open ? "text-white" : "text-white/65 hover:text-white/90"
        }`}
      >
        {group.label} ▾
      </button>

      {/* pt-2 bridges the gap between trigger and menu so hover doesn't break */}
      <div
        className={`absolute left-0 top-full z-[80] min-w-[11rem] pt-2 transition-opacity duration-150 ${
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <ul className="rounded-xl border border-white/15 bg-black/95 py-2 shadow-glass">
          {group.links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`block px-4 py-2 font-mono text-xs transition-colors hover:bg-white/10 hover:text-white ${
                  pathname === link.href ? "text-flow-light" : "text-white/75"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
