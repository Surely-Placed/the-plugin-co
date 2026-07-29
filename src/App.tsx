import { Routes, Route, Navigate } from "react-router-dom";
import {
  LegacyBookCareersRedirect,
  LegacyBookGrowthRedirect,
  LegacyCareersRedirect,
  LegacyGrowthRedirect,
  LegacyPortfolioRedirect,
  LegacyServiceRedirect,
} from "./components/routing/LegacyRedirects";
import { Navbar } from "./components/layout/Navbar";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { SiteLayout } from "./components/layout/SiteLayout";
import { AnalyticsScripts } from "./components/analytics/AnalyticsScripts";
import { OrganizationJsonLd, WebSiteJsonLd } from "./components/seo/JsonLd";
import { ToastProvider } from "./components/ui/ToastProvider";
import { divisions } from "./lib/divisions";
import { HomePage } from "./pages/HomePage";
import { GrowthLandingPage } from "./pages/growth/GrowthLandingPage";
import { GrowthServicesPage } from "./pages/growth/GrowthServicesPage";
import { GrowthHowItWorksPage } from "./pages/growth/GrowthHowItWorksPage";
import { GrowthCaseStudiesPage } from "./pages/growth/GrowthCaseStudiesPage";
import { GrowthPricingPage } from "./pages/growth/GrowthPricingPage";
import { CareersLandingPage } from "./pages/careers/CareersLandingPage";
import { CareersServicesPage } from "./pages/careers/CareersServicesPage";
import { CareersHowItWorksPage } from "./pages/careers/CareersHowItWorksPage";
import { CareersSuccessStoriesPage } from "./pages/careers/CareersSuccessStoriesPage";
import { CareersSuccessStoryPage } from "./pages/careers/CareersSuccessStoryPage";
import { CareersPricingPage } from "./pages/careers/CareersPricingPage";
import { GrowthBookPage, CareersBookPage } from "./pages/book/BookPage";
import { GrowthServiceDetailPage } from "./pages/growth/GrowthServiceDetailPage";
import { GrowthCaseStudyPage } from "./pages/growth/GrowthCaseStudyPage";
import { AboutPage } from "./pages/AboutPage";
import { TeamPage } from "./pages/TeamPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ContactPage } from "./pages/ContactPage";
import { LegalPage } from "./pages/LegalPage";
import { PaymentResultPage } from "./pages/PaymentResultPage";

const business = divisions.growth.routes;

export default function App() {
  return (
    <ToastProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <ScrollToTop />
      <AnalyticsScripts />
      <Navbar />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/for-businesses" element={<GrowthLandingPage />} />
          <Route path="/for-businesses/services" element={<GrowthServicesPage />} />
          <Route path="/for-businesses/services/:slug" element={<GrowthServiceDetailPage />} />
          <Route path="/for-businesses/how-it-works" element={<GrowthHowItWorksPage />} />
          <Route path="/for-businesses/case-studies" element={<GrowthCaseStudiesPage />} />
          <Route path="/for-businesses/case-studies/:slug" element={<GrowthCaseStudyPage />} />
          <Route path="/for-businesses/pricing" element={<GrowthPricingPage />} />

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

          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/terms-and-conditions" element={<LegalPage />} />
          <Route path="/refund-cancellation-policy" element={<LegalPage />} />
          <Route path="/payment/success" element={<PaymentResultPage kind="success" />} />
          <Route path="/payment/failure" element={<PaymentResultPage kind="failure" />} />

          <Route path="/services" element={<LegacyServiceRedirect />} />
          <Route path="/services/:slug" element={<LegacyServiceRedirect />} />
          <Route path="/pricing" element={<Navigate to={business.pricing} replace />} />
          <Route path="/portfolio" element={<LegacyPortfolioRedirect />} />
          <Route path="/portfolio/:slug" element={<LegacyPortfolioRedirect />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}
