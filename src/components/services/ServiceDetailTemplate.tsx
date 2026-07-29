import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ServiceDetail } from "../../lib/services";
import { getServiceIcon } from "../../lib/service-icons";
import { serviceDetails } from "../../lib/services";
import { serviceLongForm } from "../../lib/page-content";
import { getServiceVisual } from "../../lib/visuals";
import { sectionBlendClass, sectionGradientBg, sectionGradientClass } from "../../lib/section-gradients";
import { FAQJsonLd } from "../seo/JsonLd";
import { Breadcrumbs } from "../seo/Breadcrumbs";
import { CTABlock } from "../ui/CTABlock";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";
import { FadeIn, SectionHeading } from "../ui/Motion";
import { SplitFeatureSection } from "../sections/SplitFeatureSection";
import { ServiceCard } from "./ServiceCard";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";
import { ScrollRevealSequence } from "../effects/ScrollRevealSequence";
import { divisions } from "../../lib/divisions";

interface ServiceDetailPageProps {
  service: ServiceDetail;
  servicesPath?: string;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex min-h-11 w-full items-center justify-between py-4 text-left"
      >
        <span className="font-mono text-base font-medium text-white md:text-lg">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-white/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 font-mono text-sm leading-relaxed text-white/80 md:text-base">
          {answer}
        </p>
      )}
    </div>
  );
}

export function ServiceDetailTemplate({
  service,
  servicesPath = divisions.growth.routes.services,
}: ServiceDetailPageProps) {
  const Icon = getServiceIcon(service.slug);
  const visual = getServiceVisual(service.slug);
  const relatedServices = service.relatedSlugs
    .map((slug) => serviceDetails[slug])
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <FAQJsonLd items={service.faq} />
      <section
        className={`${sectionGradientBg("flow")} ${sectionBlendClass({ top: false })} relative section-padding pb-20 pt-36 md:pb-24`}
        data-gsap-skip
      >
        <div className="container-site relative z-10 text-white [&_.heading-section]:!text-white [&_.label-xs]:!text-white/80 [&_p]:text-white/75">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: servicesPath },
              { label: service.title },
            ]}
          />
          <FadeIn>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-flow-mid/20 text-flow-light">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <p className="label-xs">{service.title}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="heading-section mt-6 max-w-4xl whitespace-pre-line">
              {service.heroHeadline}
            </h1>
          </FadeIn>

          {service.heroSubheadline && (
            <FadeIn delay={0.15}>
              <p className="mt-5 max-w-2xl font-mono text-lg text-white/80">
                {service.heroSubheadline}
              </p>
            </FadeIn>
          )}

          <FadeIn delay={0.2}>
            <PrimaryCtaButton className="mt-10" />
          </FadeIn>
        </div>
      </section>

      <SplitFeatureSection
        eyebrow="Deep Dive"
        title={`How We Deliver ${service.title}.`}
        paragraphs={serviceLongForm[service.slug]}
        image={visual.image}
        imageAlt={service.title}
        reverse
        mediaEffect="kenburns"
      />

      <section className={`section-padding ${sectionGradientClass("rise")} text-white`}>
        <div className="container-site">
          <FadeIn>
            <SectionHeading title="The Problem." dark />
          </FadeIn>
          <div className="mt-12 space-y-4">
            {service.problem.map((line, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <p
                  className={`font-mono leading-snug ${
                    i === service.problem.length - 1
                      ? "text-3xl text-flow-light md:text-4xl"
                      : "text-xl text-white/80 md:text-2xl"
                  }`}
                >
                  {line}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={`section-padding ${sectionGradientClass("slash")}`}>
        <div className="container-site">
          <FadeIn>
            <SectionHeading title="What We Deliver." />
          </FadeIn>
          <BalancedCardGrid itemCount={service.deliverables.length} className="mt-12" gapClass="gap-4">
            {service.deliverables.map((item, i) => (
              <FadeIn key={item} delay={i * 0.04}>
                <div className="glass-package flex items-center gap-4">
                  <span className="font-mono text-2xl text-flow-light/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-sm font-medium text-white md:text-base">
                    {item}
                  </span>
                </div>
              </FadeIn>
            ))}
          </BalancedCardGrid>
        </div>
      </section>

      <section className={`section-padding ${sectionGradientClass("band")}`}>
        <div className="container-site">
          <FadeIn>
            <SectionHeading title="Our Process." />
          </FadeIn>
          <ScrollRevealSequence
            itemCount={service.process.length}
            className="mt-12 grid gap-4 md:grid-cols-5"
          >
            {service.process.map((step) => (
              <div
                key={step.step}
                data-scroll-reveal-card
                className="flow-card will-change-transform p-6"
              >
                <p
                  data-scroll-reveal-marker
                  className="font-mono text-3xl text-flow-light/50"
                >
                  {step.step}
                </p>
                <p className="heading-card-sm mt-3 tracking-[0.2em]">{step.title}</p>
              </div>
            ))}
          </ScrollRevealSequence>
        </div>
      </section>

      <section className={`section-padding ${sectionGradientClass("vault")}`}>
        <div className="container-site max-w-3xl">
          <FadeIn>
            <SectionHeading title="FAQ." align="center" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-12">
              {service.faq.map((item) => (
                <FAQItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className={`section-padding ${sectionGradientClass("slashReverse")}`}>
          <div className="container-site">
            <FadeIn>
              <SectionHeading
                title="Related Services."
                subtitle="Plug in complementary services for compounding growth."
              />
            </FadeIn>
            <BalancedCardGrid itemCount={relatedServices.length} className="mt-12" gapClass="gap-5">
              {relatedServices.map((related, i) => (
                <ServiceCard key={related.slug} service={related} index={i} basePath={servicesPath} />
              ))}
            </BalancedCardGrid>
          </div>
        </section>
      )}

      <CTABlock />
    </>
  );
}
