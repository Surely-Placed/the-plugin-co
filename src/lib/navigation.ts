import { divisions, getDivisionNav, type DivisionId } from "./divisions";
import { legalPageLinks } from "./legal";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  division: DivisionId;
  links: readonly NavItem[];
}

/** Top-level Home link (always first in main nav) */
export const homeNavLink: NavItem = { label: "Home", href: "/" };

/** Desktop + mobile main navigation */
export const mainNavGroups: NavGroup[] = [
  { label: divisions.growth.label, division: "growth", links: getDivisionNav("growth") },
  { label: divisions.careers.label, division: "careers", links: getDivisionNav("careers") },
];

export const sharedNavLinks: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Flat top-level links for active-state / mobile ordering */
export const topNavLinks: NavItem[] = [homeNavLink, ...sharedNavLinks];

/** Flat list for mobile menu */
export function getMobileNavLinks(): NavItem[] {
  const divisionLinks = mainNavGroups.flatMap((group) =>
    group.links.map((link) => ({
      label: `${group.label}: ${link.label}`,
      href: link.href,
    }))
  );
  return [homeNavLink, ...divisionLinks, ...sharedNavLinks];
}

/** Footer link groups */
export const footerNavGroups = [
  { title: divisions.growth.label, links: getDivisionNav("growth") },
  { title: divisions.careers.label, links: getDivisionNav("careers") },
  { title: "Company", links: [...sharedNavLinks, ...legalPageLinks] },
] as const;
