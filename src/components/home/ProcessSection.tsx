import { packagesSection } from "../../lib/home-sections";
import { sectionGradientClass } from "../../lib/section-gradients";
import { RevealSection } from "../sections/RevealSection";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";

export function ProcessSection() {
  return (
    <RevealSection className={`section-padding ${sectionGradientClass("band")}`}>
      <div className="container-site">
        <div className="max-w-2xl" data-reveal="down">
          <h2 className="heading-section-lg">{packagesSection.title}</h2>
          <p className="mt-4 font-mono text-base leading-relaxed text-white/90 md:text-lg">
            {packagesSection.subtitle}
          </p>
        </div>

        <BalancedCardGrid
          itemCount={packagesSection.tiers.length}
          className="mt-14"
          data-reveal-stagger
          data-stagger="cascade"
        >
          {packagesSection.tiers.map((tier) => (
            <article key={tier.label} className="glass-package">
              <h3 className="heading-card-sm">
                {tier.label}
              </h3>
              <ul className="mt-6 space-y-3">
                {tier.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm leading-relaxed text-white/90 before:mr-2 before:content-['•']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </BalancedCardGrid>
      </div>
    </RevealSection>
  );
}
