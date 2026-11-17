import { Routes, Route, Navigate } from "react-router-dom";
import {
  LegacyBlogRedirect,
  LegacyBookCareersRedirect,
  LegacyBookGrowthRedirect,
  LegacyCareersRedirect,
  LegacyForBusinessesCatchAllRedirect,
  LegacyForBusinessesRedirect,
  LegacyGrowthRedirect,
  LegacyPortfolioRedirect,
} from "./components/routing/LegacyRedirects";
import { TpHeader } from "./components/design/TpHeader";
import { TpStickyBar } from "./components/design/TpStickyBar";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { SiteLayout } from "./components/layout/SiteLayout";
import { AnalyticsScripts } from "./components/analytics/AnalyticsScripts";
import { OrganizationJsonLd, WebSiteJsonLd } from "./components/seo/JsonLd";
import { ToastProvider } from "./components/ui/ToastProvider";
import { BookCallProvider } from "./components/book-call/BookCallProvider";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { DesignServiceRoute } from "./pages/DesignServiceRoute";
import { HowWeWorkPage } from "./pages/HowWeWorkPage";
import { WorkPage } from "./pages/WorkPage";
import { PricingPage } from "./pages/PricingPage";
import { FreeGrowthAuditPage } from "./pages/FreeGrowthAuditPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { InsightsPage } from "./pages/InsightsPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { CareersLandingPage } from "./pages/careers/CareersLandingPage";
import { CareersServicesPage } from "./pages/careers/CareersServicesPage";
import { CareersHowItWorksPage } from "./pages/careers/CareersHowItWorksPage";
import { CareersSuccessStoriesPage } from "./pages/careers/CareersSuccessStoriesPage";
import { CareersSuccessStoryPage } from "./pages/careers/CareersSuccessStoryPage";
import { CareersPricingPage } from "./pages/careers/CareersPricingPage";
import { GrowthBookPage, CareersBookPage } from "./pages/book/BookPage";
import { TeamPage } from "./pages/TeamPage";
import { LegalPage } from "./pages/LegalPage";
import { PaymentResultPage } from "./pages/PaymentResultPage";
import { growthRoutes } from "./lib/design/routes";

export default function App() {
  return (
    <ToastProvider>
      <BookCallProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ScrollToTop />
        <AnalyticsScripts />
        <TpHeader />
        <TpStickyBar />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route path={growthRoutes.services} element={<ServicesPage />} />
            <Route path={`${growthRoutes.services}/:slug`} element={<DesignServiceRoute />} />
            <Route path={growthRoutes.howItWorks} element={<HowWeWorkPage />} />
            <Route path={growthRoutes.work} element={<WorkPage />} />
            <Route path={growthRoutes.pricing} element={<PricingPage />} />
            <Route path={growthRoutes.audit} element={<FreeGrowthAuditPage />} />
            <Route path={growthRoutes.about} element={<AboutPage />} />
            <Route path={growthRoutes.contact} element={<ContactPage />} />
            <Route path={growthRoutes.insights} element={<InsightsPage />} />
            <Route path={`${growthRoutes.insights}/:slug`} element={<BlogPostPage />} />

            <Route path="/for-businesses" element={<LegacyForBusinessesRedirect />} />
            <Route path="/for-businesses/*" element={<LegacyForBusinessesCatchAllRedirect />} />
            <Route path="/blog" element={<Navigate to={growthRoutes.insights} replace />} />
            <Route path="/blog/*" element={<LegacyBlogRedirect />} />

            <Route path="/for-talent" element={<CareersLandingPage />} />
            <Route path="/for-talent/services" element={<CareersServicesPage />} />
            <Route path="/for-talent/how-it-works" element={<CareersHowItWorksPage />} />
            <Route path="/for-talent/success-stories" element={<CareersSuccessStoriesPage />} />
            <Route path="/for-talent/success-stories/:slug" element={<CareersSuccessStoryPage />} />
            <Route path="/for-talent/pricing" element={<CareersPricingPage />} />

            <Route path="/book/for-businesses" element={<GrowthBookPage />} />
            <Route path="/book/for-talent" element={<CareersBookPage />} />

            <Route path="/growth/*" element={<LegacyGrowthRedirect />} />
            <Route path="/careers/*" element={<LegacyCareersRedirect />} />
            <Route path="/book/growth" element={<LegacyBookGrowthRedirect />} />
            <Route path="/book/careers" element={<LegacyBookCareersRedirect />} />

            <Route path="/team" element={<TeamPage />} />
            <Route path="/privacy-policy" element={<LegalPage />} />
            <Route path="/terms-and-conditions" element={<LegalPage />} />
            <Route path="/refund-cancellation-policy" element={<LegalPage />} />
            <Route path="/payment/success" element={<PaymentResultPage kind="success" />} />
            <Route path="/payment/failure" element={<PaymentResultPage kind="failure" />} />

            <Route path="/portfolio" element={<LegacyPortfolioRedirect />} />
            <Route path="/portfolio/:slug" element={<LegacyPortfolioRedirect />} />
          </Route>
        </Routes>
      </BookCallProvider>
    </ToastProvider>
  );
}