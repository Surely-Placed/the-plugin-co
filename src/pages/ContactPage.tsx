import { DesignMarketingPage } from "../components/design/DesignMarketingPage";
import { ContactForm } from "../components/contact/ContactForm";
import { pageContact } from "../lib/design/pages/page-contact";
import { growthRoutes } from "../lib/design/routes";
import { TpAuditLink, TpBookCallLink } from "../components/design/TpButtons";

export function ContactPage() {
  return (
    <>
      <DesignMarketingPage
        path={growthRoutes.contact}
        page={{
          ...pageContact,
          sections: {
            Paths: pageContact.sections.Paths,
          },
        }}
        breadcrumbLabel="CONTACT"
      />
      <section className="tp-section-compact border-t border-tp-border-subtle">
        <div className="tp-container grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="tp-heading-section text-3xl">{pageContact.sections.Form.title}</h2>
            {pageContact.sections.Form.paragraphs.map((p) => (
              <p key={p} className="m-0 text-base text-tp-muted-strong">
                {p}
              </p>
            ))}
            <div className="flex flex-wrap gap-3">
              <TpBookCallLink cta="contact-book" />
              <TpAuditLink href={growthRoutes.audit} cta="contact-audit" />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}