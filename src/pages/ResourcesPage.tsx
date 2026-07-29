import { useState } from "react";
import { Download } from "lucide-react";
import { resources, type Resource, type ResourceDivision } from "../lib/resources";
import { PageSEO } from "../components/seo/PageSEO";
import { PageHero } from "../components/sections/PageHero";
import { RevealSection } from "../components/sections/RevealSection";
import { GsapReveal } from "../components/effects/GsapReveal";
import { SectionHeading } from "../components/ui/Motion";
import { CTABlock } from "../components/ui/CTABlock";
import { staticPageSEO } from "../lib/seo";
import { sectionGradientClass } from "../lib/section-gradients";
import { BalancedCardGrid } from "../components/ui/BalancedCardGrid";

function ResourceDownloadForm({
  resource,
  onClose,
}: {
  resource: Resource;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="font-mono text-xl text-accent">
          Check your inbox, {resource.title} is on the way.
        </p>
        <button type="button" onClick={onClose} className="btn-secondary mt-6">
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass space-y-4 rounded-2xl p-8">
      <p className="font-mono font-medium text-white">{resource.title}</p>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/10"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/10"
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/10"
      />
      <button type="submit" className="btn-primary w-full">
        Download Resource
      </button>
      <button
        type="button"
        onClick={onClose}
        className="w-full text-center text-sm text-muted hover:text-white"
      >
        Cancel
      </button>
    </form>
  );
}

export function ResourcesPage() {
  const seo = staticPageSEO["/resources"];
  const [activeType, setActiveType] = useState<"All" | ResourceDivision>("All");
  const [gatedResource, setGatedResource] = useState<Resource | null>(null);

  const filtered =
    activeType === "All"
      ? resources
      : resources.filter((r) => r.division === activeType);

  return (
    <main className="text-white">
      <PageSEO {...seo} path="/resources" />
      <PageHero page="resources">
        <GsapReveal immediate effect="down">
          <p className="label-xs mb-6">Resource Center</p>
        </GsapReveal>
        <div className="mb-6 h-px w-16 origin-left bg-accent/60" />
        <GsapReveal immediate delay={0.08} effect="scale">
          <SectionHeading
            title="Tools for Growth."
            subtitle="Templates, checklists, and blueprints. Built for founders who move fast."
          />
        </GsapReveal>
      </PageHero>

      <RevealSection className={`section-padding pt-0 section-after-hero ${sectionGradientClass("rise")}`}>
        <div className="container-site">
          <div className="mb-10 flex flex-wrap gap-2" data-reveal>
            <button
              type="button"
              onClick={() => setActiveType("All")}
              className={`rounded-full px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.15em] ${
                activeType === "All"
                  ? "bg-accent text-white"
                  : "border border-white/10 text-muted"
              }`}
            >
              All
            </button>
            {(["growth", "careers"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`rounded-full px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.15em] capitalize ${
                  activeType === type
                    ? "bg-accent text-white"
                    : "border border-white/10 text-muted"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <BalancedCardGrid
            itemCount={filtered.length}
            gapClass="gap-5"
            data-reveal-stagger
            data-stagger="wave"
          >
            {filtered.map((resource) => (
              <article key={resource.slug} className="glass-card flex flex-col p-7">
                <p className="label-xs capitalize text-accent">{resource.division}</p>
                <h3 className="heading-card-md mt-3">
                  {resource.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {resource.description}
                </p>
                <button
                  type="button"
                  onClick={() => setGatedResource(resource)}
                  className="label-xs mt-6 inline-flex items-center gap-2 text-accent hover:text-accent-blue"
                >
                  <Download size={14} />
                  Download
                </button>
              </article>
            ))}
          </BalancedCardGrid>
        </div>
      </RevealSection>

      {gatedResource && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/40 p-6 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <ResourceDownloadForm
              resource={gatedResource}
              onClose={() => setGatedResource(null)}
            />
          </div>
        </div>
      )}

      <CTABlock />
    </main>
  );
}
