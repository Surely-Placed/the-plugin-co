import { PageSEO } from "../seo/PageSEO";
import { Breadcrumbs } from "../seo/Breadcrumbs";
import { PageHero } from "../sections/PageHero";
import { GsapReveal } from "../effects/GsapReveal";
import { sectionGradientClass } from "../../lib/section-gradients";
import type { LegalPageContent, LegalSection, LegalSubsection } from "../../lib/legal/types";

function LegalList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 font-mono text-sm leading-relaxed text-white/85 md:text-base">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function LegalSubsectionBlock({ subsection }: { subsection: LegalSubsection }) {
  return (
    <div className="mt-8">
      <h3 className="heading-card-sm text-white" id={subsection.id}>
        {subsection.title}
      </h3>
      {subsection.paragraphs.map((paragraph) => (
        <p key={paragraph} className="prose-body mt-4">
          {paragraph}
        </p>
      ))}
      <LegalList items={subsection.list} />
    </div>
  );
}

function LegalSectionBlock({ section }: { section: LegalSection }) {
  return (
    <section className="scroll-mt-28 border-t border-white/10 pt-10 first:border-t-0 first:pt-0" id={section.id}>
      <h2 className="heading-card text-white">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="prose-body mt-4">
          {paragraph}
        </p>
      ))}
      <LegalList items={section.list} />
      {section.subsections.map((subsection) => (
        <LegalSubsectionBlock key={subsection.id} subsection={subsection} />
      ))}
    </section>
  );
}

export function LegalPageTemplate({ content }: { content: LegalPageContent }) {
  const toc = content.sections.map((section) => ({
    id: section.id,
    title: section.title.replace(/^\d+\.\s*/, ""),
  }));

  return (
    <>
      <PageSEO title={content.seoTitle} description={content.seoDescription} path={content.path} />
      <article>
        <PageHero page="about" className="pb-16 md:pb-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: content.title },
            ]}
          />
          <GsapReveal immediate effect="clip">
            <h1 className="heading-section mt-6 text-white">{content.title}</h1>
          </GsapReveal>
          <GsapReveal immediate delay={0.08} effect="blur">
            <p className="mt-4 font-mono text-sm text-white/70">Last updated: {content.lastUpdated}</p>
          </GsapReveal>
        </PageHero>

        <section className={`section-padding pt-0 section-after-hero ${sectionGradientClass("rise")}`}>
          <div className="container-site grid gap-12 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">
              <p className="label-xs mb-4">Contents</p>
              <nav className="sticky top-32 space-y-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block font-mono text-sm text-white/70 transition-colors hover:text-accent"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="min-w-0">
              {content.sections.map((section) => (
                <LegalSectionBlock key={section.id} section={section} />
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
