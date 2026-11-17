import { DesignMarketingPage } from "../components/design/DesignMarketingPage";
import { pageWork } from "../lib/design/pages/page-work";
import { growthRoutes } from "../lib/design/routes";

export function WorkPage() {
  return (
    <DesignMarketingPage path={growthRoutes.work} page={pageWork} breadcrumbLabel="WORK" />
  );
}