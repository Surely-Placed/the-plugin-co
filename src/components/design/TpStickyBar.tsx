import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BOOK_CALL_URL } from "../../lib/design/navigation";
import { divisions } from "../../lib/divisions";
import { trackCtaClick } from "../../lib/design/cta";

const SHOW_AFTER = 300;

export function TpStickyBar() {
  const [visible, setVisible] = useState(false);
  const auditHref = divisions.growth.routes.book;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const final = document.getElementById("tp-final");
      const finIn = final ? final.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(y > SHOW_AFTER && !finIn);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="tp-bar"
      className={`tp-sticky-bar ${visible ? "tp-sticky-bar--visible" : ""}`}
      aria-hidden={!visible}
    >
      <Link
        to={auditHref}
        data-cta="sticky-audit"
        className="tp-sticky-bar__audit"
        onClick={() => trackCtaClick("sticky-audit")}
      >
        FREE AUDIT
      </Link>
      <a
        href={BOOK_CALL_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="sticky-book"
        className="tp-sticky-bar__book"
        onClick={() => trackCtaClick("sticky-book")}
      >
        BOOK A CALL →
      </a>
    </div>
  );
}