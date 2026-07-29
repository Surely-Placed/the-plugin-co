import { useMemo, useState } from "react";
import { CaseStudyCard } from "../components/portfolio/CaseStudyCard";
import { PortfolioFilters } from "../components/portfolio/PortfolioFilters";
import { CTABlock } from "../components/ui/CTABlock";
import { PageSEO } from "../components/seo/PageSEO";
import { PageHero } from "../components/sections/PageHero";
import { RevealSection } from "../components/sections/RevealSection";
import { GsapReveal } from "../components/effects/GsapReveal";
import { SectionHeading } from "../components/ui/Motion";
import {
  caseStudies,
  getFilterOptions,
  type PortfolioFilterKey,
} from "../lib/portfolio";
import { serviceDetails } from "../lib/services";
import { portfolioExtended } from "../lib/page-content";
import { staticPageSEO } from "../lib/seo";
import { sectionGradientClass } from "../lib/section-gradients";
import { BalancedCardGrid } from "../components/ui/BalancedCardGrid";

const serviceOptionLabels = Object.fromEntries(
  Object.entries(serviceDetails).map(([slug, s]) => [slug, s.title])
);

export function PortfolioPage() {
  const seo = staticPageSEO["/portfolio"];
  const [filters, setFilters] = useState<Record<PortfolioFilterKey, string>>({
    industry: "All",
    service: "All",
    resultType: "All",
    platform: "All",
  });

  const options = useMemo(
    () => ({
      industry: getFilterOptions("industry"),
      service: ["All", ...getFilterOptions("service")],
      resultType: getFilterOptions("resultType"),
      platform: getFilterOptions("platform"),
    }),
    []
  );

  const filtered = useMemo(() => {
    return caseStudies.filter((study) => {
      if (filters.industry !== "All" && study.industry !== filters.industry)
        return false;
      if (filters.service !== "All" && study.service !== filters.service)
        return false;
      if (
        filters.resultType !== "All" &&
        study.resultType !== filters.resultType
      )
        return false;
      if (filters.platform !== "All" && study.platform !== filters.platform)
        return false;
      return true;
    });
  }, [filters]);

  const handleFilterChange = (key: PortfolioFilterKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="text-white">
      <PageSEO {...seo} path="/portfolio" />
      <PageHero page="portfolio">
        <GsapReveal immediate effect="down">
          <p className="label-xs mb-6">Portfolio</p>
        </GsapReveal>
        <div className="mb-6 h-px w-16 origin-left bg-accent/60" />
        <GsapReveal immediate delay={0.08} effect="scale">
          <SectionHeading
            title="Watch Us Work."
            subtitle="Here's what happens when you plug us in."
          />
        </GsapReveal>
        <div className="prose-rich mt-8 max-w-3xl">
          {portfolioExtended.intro.map((p, i) => (
            <GsapReveal immediate key={p.slice(0, 40)} delay={0.14 + i * 0.05} effect={i % 2 ? "left" : "blur"}>
              <p>{p}</p>
            </GsapReveal>
          ))}
        </div>
      </PageHero>

      <RevealSection className={`section-padding pt-0 section-after-hero ${sectionGradientClass("rise")}`}>
        <div className="container-site">
          <div data-reveal>
            <PortfolioFilters
              filters={filters}
              options={options}
              optionLabels={{ service: serviceOptionLabels }}
              onChange={handleFilterChange}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-muted" data-reveal>
              No case studies match these filters. Try adjusting your selection.
            </p>
          ) : (
            <BalancedCardGrid
              itemCount={filtered.length}
              className="mt-12"
              data-reveal-stagger
              data-stagger="cascade"
            >
              {filtered.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </BalancedCardGrid>
          )}
        </div>
      </RevealSection>

      <CTABlock />
    </main>
  );
}
