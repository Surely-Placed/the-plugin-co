import { Link } from "react-router-dom";
import { brand } from "../../lib/brand";
import { SiteImage } from "../ui/SiteImage";

interface LogoProps {
  /** @deprecated Wordmark colors are the same everywhere now */
  variant?: "light" | "dark";
  className?: string;
  iconClassName?: string;
  asLink?: boolean;
}

export function Logo({
  className = "",
  iconClassName = "h-10 w-auto sm:h-11 md:h-12",
  asLink = true,
}: LogoProps) {
  const content = (
    <SiteImage
      src={brand.logo}
      alt={brand.name}
      width={1557}
      height={303}
      priority
      className={`shrink-0 object-contain object-left ${iconClassName} ${className}`}
    />
  );

  if (!asLink) return content;

  return (
    <Link to="/" className="inline-flex min-h-11 min-w-11 shrink-0 items-center" aria-label={`${brand.name} home`}>
      {content}
    </Link>
  );
}
