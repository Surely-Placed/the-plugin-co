import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { brand } from "../../lib/brand";
import {
  BOOK_CALL_URL,
  designCoreServices,
  primaryNav,
  serviceDetailHref,
  supportingPlugins,
} from "../../lib/design/navigation";
import { divisions } from "../../lib/divisions";
import { trackCtaClick } from "../../lib/design/cta";
import { ThemeToggle } from "./ThemeToggle";

const DESKTOP_NAV = 1320;
const MOBILE_MENU = 820;

export function TpHeader() {
  const location = useLocation();
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const desk = width >= DESKTOP_NAV;
  const navMob = width < DESKTOP_NAV;
  const auditHref = divisions.growth.routes.book;

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <header
        ref={headerRef}
        id="tp-header"
        className={`tp-header ${scrolled ? "tp-header--scrolled" : ""}`}
      >
        <Link to="/" aria-label="The Plugin home" className="tp-header__logo">
          <img src={brand.logo} alt="The Plugin" width={185} height={36} className="h-9 w-auto" />
        </Link>

        {desk ? (
          <>
            <nav
              aria-label="Main"
              className="tp-nav-pill"
              onMouseLeave={() => setMegaOpen(false)}
            >
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                const isServices = "megaKey" in item && item.megaKey === "services";
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`tp-nav-link ${active ? "tp-nav-link--active" : ""}`}
                    onMouseEnter={() => (isServices ? setMegaOpen(true) : setMegaOpen(false))}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {megaOpen ? (
                <div className="tp-mega">
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {designCoreServices.map((s) => (
                      <Link
                        key={s.slug}
                        to={serviceDetailHref(s.slug)}
                        className="tp-mega-card"
                        onClick={() => setMegaOpen(false)}
                      >
                        <span className="font-mono text-[11px] tracking-[0.14em] text-tp-cyan">{s.num}</span>
                        <span className="text-[15px] font-bold leading-tight">{s.title}</span>
                        <span className="text-[13px] leading-snug text-tp-muted-strong">{s.tagline}</span>
                      </Link>
                    ))}
                    <Link
                      to={divisions.growth.routes.services}
                      className="tp-mega-all flex items-center justify-center rounded-2xl border border-dashed border-tp-cyan/40 p-4 font-mono text-xs tracking-[0.14em] text-tp-cyan"
                      onClick={() => setMegaOpen(false)}
                    >
                      ALL SERVICES →
                    </Link>
                  </div>
                  <p className="tp-mega-support">
                    <span className="text-tp-cyan">Supporting plugins:</span>{" "}
                    {supportingPlugins.map((p, i) => (
                      <span key={p}>
                        {i > 0 ? <span className="text-tp-muted"> · </span> : null}
                        {p}
                      </span>
                    ))}
                  </p>
                </div>
              ) : null}
            </nav>
            <div className="flex shrink-0 gap-2">
              <Link
                to={auditHref}
                data-cta="header-audit"
                className="tp-btn-header-ghost"
                onClick={() => trackCtaClick("header-audit")}
              >
                FREE AUDIT
              </Link>
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="header-book"
                className="tp-btn-header-primary"
                onClick={() => trackCtaClick("header-book")}
              >
                BOOK A CALL <span aria-hidden>→</span>
              </a>
            </div>
          </>
        ) : navMob && width >= MOBILE_MENU ? (
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="header-book"
              className="tp-btn-header-primary text-[11px]"
              onClick={() => trackCtaClick("header-book")}
            >
              BOOK
            </a>
            <button
              type="button"
              className="tp-menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span className="bg-tp-cyan" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="tp-menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span className="bg-tp-cyan" />
          </button>
        )}
      </header>

      {menuOpen && navMob ? (
        <div role="dialog" aria-modal className="tp-mobile-menu" aria-label="Menu">
          <div className="flex items-center justify-between px-4 py-5">
            <img src={brand.logo} alt="" className="h-8 w-auto" />
            <button
              type="button"
              className="tp-menu-toggle"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <Link
              to={divisions.growth.routes.services}
              className="block py-2 font-mono text-[11px] tracking-[0.18em] text-tp-cyan"
              onClick={() => setMenuOpen(false)}
            >
              SERVICES →
            </Link>
            {designCoreServices.map((s, i) => (
              <Link
                key={s.slug}
                to={serviceDetailHref(s.slug)}
                className="tp-mobile-service-row"
                style={{ animationDelay: `${60 + i * 50}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="flex items-baseline gap-3.5">
                  <span className="font-mono text-[11px] text-tp-cyan">{s.num}</span>
                  <span className="text-lg font-bold">{s.title}</span>
                </span>
                <span aria-hidden className="text-tp-muted">→</span>
              </Link>
            ))}
            <div className="mt-5 grid grid-cols-2 gap-2">
              {primaryNav
                .filter((n) => !("megaKey" in n))
                .map((n) => (
                  <Link key={n.href} to={n.href} className="tp-mobile-nav-chip" onClick={() => setMenuOpen(false)}>
                    {n.label}
                  </Link>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-tp-border-subtle p-4">
            <Link to={auditHref} data-cta="menu-audit" className="tp-btn-menu-ghost" onClick={() => { trackCtaClick("menu-audit"); setMenuOpen(false); }}>
              FREE AUDIT
            </Link>
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="menu-book"
              className="tp-btn-menu-primary"
              onClick={() => trackCtaClick("menu-book")}
            >
              BOOK A CALL →
            </a>
          </div>
        </div>
      ) : null}

      <ThemeToggle />
    </>
  );
}