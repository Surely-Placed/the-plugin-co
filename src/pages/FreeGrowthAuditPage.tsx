import { DesignMarketingPage } from "../components/design/DesignMarketingPage";
import { ContactForm } from "../components/contact/ContactForm";
import { pageFreeGrowthAudit } from "../lib/design/pages/page-free-growth-audit";
import { growthRoutes } from "../lib/design/routes";

export function FreeGrowthAuditPage() {
  return (
    <>
      <DesignMarketingPage
        path={growthRoutes.audit}
        page={pageFreeGrowthAudit}
        breadcrumbLabel="FREE GROWTH AUDIT"
      />
      <section className="tp-section-compact border-t border-tp-border-subtle">
        <div className="tp-container max-w-xl">
          <h2 className="tp-heading-section mb-6 text-3xl">Request your audit</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}