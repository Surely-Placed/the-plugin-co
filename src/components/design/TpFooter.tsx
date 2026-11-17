import { Link } from "react-router-dom";
import { brand } from "../../lib/brand";
import { footerCompanyLinks, footerServiceLinks } from "../../lib/design/navigation";
import { legalPageLinks } from "../../lib/legal";

const socialLinks = [
  { label: "LinkedIn", href: brand.social.linkedin, external: true },
  { label: "Instagram", href: brand.social.instagram, external: true },
  { label: "X", href: brand.social.twitter, external: true },
  { label: brand.email, href: `mailto:${brand.email}`, external: false },
];

export function TpFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="tp-footer">
      <div className="tp-container tp-footer__grid">
        <div className="flex max-w-[360px] flex-col gap-4">
          <img src={brand.logo} alt="The Plugin" className="h-11 w-auto self-start object-contain" />
          <span className="text-2xl font-black text-tp-text">Plug In. Grow.</span>
          <p className="m-0 text-[15px] leading-relaxed text-tp-muted-strong">
            A growth and performance agency running paid media, creative, websites, brand and CRM systems under
            one accountable team.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="tp-footer-label">SERVICES</span>
          {footerServiceLinks.map((l) => (
            <Link key={l.href} to={l.href} className="tp-footer-link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="tp-footer-label">COMPANY</span>
          {footerCompanyLinks.map((l) => (
            <Link key={l.href} to={l.href} className="tp-footer-link">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="tp-footer-label">CONNECT</span>
          {socialLinks.map((l) =>
            l.external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="tp-footer-link">
                {l.label}
              </a>
            ) : (
              <a key={l.href} href={l.href} className="tp-footer-link" rel="noopener">
                {l.label}
              </a>
            ),
          )}
        </div>
      </div>

      <div className="tp-container tp-footer__legal">
        <span>INDIA · UK · US · UAE · AUSTRALIA · CANADA</span>
        <span className="flex flex-wrap gap-4">
          {legalPageLinks.map((l) => (
            <Link key={l.href} to={l.href} className="text-tp-muted hover:text-tp-cyan">
              {l.label.toUpperCase()}
            </Link>
          ))}
          <span>© The Plugin {year} · All rights reserved.</span>
        </span>
      </div>
      <div className="h-[72px] md:hidden" aria-hidden />
    </footer>
  );
}