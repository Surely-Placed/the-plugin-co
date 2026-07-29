import { ContactForm } from "../components/contact/ContactForm";
import { Breadcrumbs } from "../components/seo/Breadcrumbs";
import { PageSEO } from "../components/seo/PageSEO";
import { PageHero } from "../components/sections/PageHero";
import { RevealSection } from "../components/sections/RevealSection";
import { GsapReveal } from "../components/effects/GsapReveal";
import { PrimaryCtaButton } from "../components/ui/PrimaryCtaButton";
import { BalancedCardGrid } from "../components/ui/BalancedCardGrid";
import { staticPageSEO } from "../lib/seo";
import { contactExtended, contactPage } from "../lib/page-content";
import { sectionGradientClass } from "../lib/section-gradients";
import { divisions } from "../lib/divisions";

export function ContactPage() {
  const seo = staticPageSEO["/contact"];

  return (
    <>
      <PageSEO {...seo} path="/contact" />

      <PageHero page="contact">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <GsapReveal immediate effect="clip">
          <h1 className="heading-section text-white">{contactPage.title}</h1>
        </GsapReveal>
        <GsapReveal immediate delay={0.08} effect="left">
          <p className="mt-4 max-w-2xl font-mono text-xl text-flow-light md:text-2xl">
            {contactPage.subtitle}
          </p>
        </GsapReveal>
      </PageHero>

      <RevealSection className={`section-padding pt-0 section-after-hero ${sectionGradientClass("rise")}`}>
        <div className="container-site card-grid grid gap-8 lg:grid-cols-2">
          <article className="flow-card card-stack">
            <p className="label-xs shrink-0 text-flow-light">{divisions.growth.label}</p>
            <h2 className="heading-card-lg mt-3 shrink-0">{contactPage.growth.title}</h2>
            <p className="card-stack__grow font-mono text-sm leading-relaxed text-white/85 md:text-base">
              {contactPage.growth.description}
            </p>
            <PrimaryCtaButton
              className="card-stack__footer"
              fullWidth
              label={contactPage.growth.cta}
              href={divisions.growth.routes.book}
            />
            <a
              href={`mailto:${divisions.growth.email}`}
              className="mt-4 block text-center font-mono text-sm text-flow-light hover:text-white"
            >
              {divisions.growth.email}
            </a>
          </article>

          <article className="flow-card card-stack border-l-4 border-l-flow-mid">
            <p className="label-xs shrink-0 text-flow-light">{divisions.careers.label}</p>
            <h2 className="heading-card-lg mt-3 shrink-0">{contactPage.careers.title}</h2>
            <p className="card-stack__grow font-mono text-sm leading-relaxed text-white/85 md:text-base">
              {contactPage.careers.description}
            </p>
            <PrimaryCtaButton
              className="card-stack__footer"
              fullWidth
              label={contactPage.careers.cta}
              href={divisions.careers.routes.book}
            />
            {/* careers@theplugin.world. Hidden for now
            <a
              href={`mailto:${divisions.careers.email}`}
              className="mt-4 block text-center font-mono text-sm text-flow-light hover:text-white"
            >
              {divisions.careers.email}
            </a>
            */}
          </article>
        </div>
      </RevealSection>

      <section className={`section-padding ${sectionGradientClass("deep")}`}>
        <div className="container-site mx-auto max-w-2xl">
          <RevealSection className="glass-panel p-8 md:p-12">
            <p className="label-xs mb-4" data-reveal="blur">
              General Enquiry
            </p>
            <p className="mb-8 font-mono text-sm text-white/75">
              Not sure which team you need? Send a message and we'll route you to the right place.
            </p>
            <div data-reveal="scale">
              <ContactForm />
            </div>
          </RevealSection>
        </div>
      </section>

      <RevealSection className={`section-padding ${sectionGradientClass("slash")}`}>
        <div className="container-site">
          <h2 className="heading-section mb-12 text-white" data-reveal="rotate">
            Common Questions
          </h2>
          <BalancedCardGrid itemCount={contactExtended.faq.length} data-reveal-stagger>
            {contactExtended.faq.map((item) => (
              <article key={item.q} className="flow-card card-stack">
                <h3 className="heading-card-md shrink-0">{item.q}</h3>
                <p className="card-stack__grow mt-3 font-mono text-sm leading-relaxed text-white/90">{item.a}</p>
              </article>
            ))}
          </BalancedCardGrid>
        </div>
      </RevealSection>
    </>
  );
}
