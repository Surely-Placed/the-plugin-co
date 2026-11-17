import { Link } from "react-router-dom";
import { BOOK_CALL_URL } from "../../lib/design/navigation";
import { divisions } from "../../lib/divisions";
import { trackCtaClick } from "../../lib/design/cta";

interface TpFinalCtaProps {
  title?: string;
  body?: string;
}

const defaults = {
  title: "Make your mark in the digital world.",
  body: "Book a call, or start with a free growth audit. No commitment, just clarity on your next move.",
};

export function TpFinalCta({ title = defaults.title, body = defaults.body }: TpFinalCtaProps) {
  const auditHref = divisions.growth.routes.book;

  return (
    <section id="tp-final" className="tp-section-compact">
      <div className="tp-container">
        <div className="tp-final-band" data-tp-keep>
          <FinalCtaRing className="right-[-6%] bottom-[-30%] w-[46%]" />
          <FinalCtaRing className="right-[4%] bottom-[-10%] w-[26%] border-tp-cyan/35" />
          <div className="relative flex max-w-[720px] flex-col gap-5">
            <h2 className="tp-heading-final text-balance">{title}</h2>
            <p className="text-base leading-relaxed text-white/90 md:text-lg">{body}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="final-book"
                className="tp-btn-final-primary"
                onClick={() => trackCtaClick("final-book")}
              >
                BOOK A CALL <span aria-hidden>→</span>
              </a>
              <Link
                to={auditHref}
                data-cta="final-audit"
                className="tp-btn-final-secondary"
                onClick={() => trackCtaClick("final-audit")}
              >
                GET A FREE AUDIT <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCtaRing({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute aspect-square rounded-full border border-tp-cyan/25 ${className}`}
    />
  );
}