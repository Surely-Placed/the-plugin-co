import { useEffect, useState } from "react";
import { brand } from "../../lib/brand";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";
import { Logo } from "./Logo";
import { NavHeader } from "../ui/nav-header";
import { MenuToggleButton } from "../effects/MenuToggleButton";
import { StaggeredMenu } from "../effects/StaggeredMenu";

const SCROLL_THRESHOLD = 32;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= SCROLL_THRESHOLD) {
        setScrolled(false);
        setMenuOpen((open) => (open ? false : open));
      } else {
        setScrolled(true);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);
  const showMenuToggle = scrolled || menuOpen;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] overflow-visible bg-transparent pointer-events-none">
        <div className="pointer-events-auto px-6 py-3 md:px-10 md:py-4 lg:px-16">
          <div className="container-site flex items-center justify-between gap-3 md:gap-6">
            <Logo iconClassName="h-10 w-auto sm:h-11 md:h-12" />

            <div className="hidden flex-1 justify-center overflow-visible lg:flex">
              <NavHeader />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <PrimaryCtaButton compact className="hidden md:inline-flex" />
              <PrimaryCtaButton
                compact
                label={brand.cta.labelShort}
                className="md:hidden"
              />

              {showMenuToggle && (
                <MenuToggleButton
                  isOpen={menuOpen}
                  onToggle={toggleMenu}
                  compact
                  theme="dark"
                  className="lg:hidden"
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <StaggeredMenu isOpen={menuOpen} onToggle={closeMenu} />
    </>
  );
}
