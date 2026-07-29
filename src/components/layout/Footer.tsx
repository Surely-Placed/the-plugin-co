import { Link } from "react-router-dom";
import { brand } from "../../lib/brand";
import { divisions } from "../../lib/divisions";
import { footerNavGroups } from "../../lib/navigation";
import { sectionGradientClass } from "../../lib/section-gradients";
import { Logo } from "./Logo";

const socialLinks = [
  { label: "LinkedIn", href: brand.social.linkedin },
  { label: "Instagram", href: brand.social.instagram },
  { label: "X", href: brand.social.twitter },
];

export function Footer() {
  return (
    <footer className={`${sectionGradientClass("footer")} section-soft-blend--no-bottom text-white`}>
      <div className="container-site section-padding pb-10 pt-16">
        <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <Logo asLink={false} className="mb-6" iconClassName="h-12 w-auto sm:h-14 md:h-16" />
            <p className="font-mono text-xl not-italic text-white/85 md:text-2xl">
              {brand.tagline}
            </p>
            <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-white/80">
              One brand. Two ways to plug in. Business systems for ambitious companies, talent systems for UK graduates.
            </p>
          </div>

          {footerNavGroups.map((group) => (
            <div key={group.title} className="min-w-0">
              <p className="label-xs mb-5 text-white/60">{group.title}</p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="touch-target inline-flex font-mono text-sm text-white/85 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="min-w-0">
            <p className="label-xs mb-5 text-white/60">Connect</p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target inline-flex font-mono text-sm text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${divisions.growth.email}`}
                  className="touch-target inline-flex font-mono text-sm text-white/85 transition-colors hover:text-white"
                >
                  {divisions.growth.email}
                </a>
              </li>
              {/* careers@theplugin.world. Hidden for now
              <li>
                <a
                  href={`mailto:${divisions.careers.email}`}
                  className="touch-target inline-flex font-mono text-sm text-white/85 transition-colors hover:text-white"
                >
                  {divisions.careers.email}
                </a>
              </li>
              */}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <p className="label-xs text-white/60">© The Plugin 2026 · All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
