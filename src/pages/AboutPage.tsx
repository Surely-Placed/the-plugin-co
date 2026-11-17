import { DesignMarketingPage } from "../components/design/DesignMarketingPage";
import { pageAbout } from "../lib/design/pages/page-about";
import { growthRoutes } from "../lib/design/routes";

export function AboutPage() {
  return (
    <DesignMarketingPage path={growthRoutes.about} page={pageAbout} breadcrumbLabel="ABOUT" />
  );
}