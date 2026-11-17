import { DesignMarketingPage } from "../components/design/DesignMarketingPage";
import { pageHowWeWork } from "../lib/design/pages/page-how-we-work";
import { growthRoutes } from "../lib/design/routes";

export function HowWeWorkPage() {
  return (
    <DesignMarketingPage
      path={growthRoutes.howItWorks}
      page={pageHowWeWork}
      breadcrumbLabel="HOW WE WORK"
    />
  );
}