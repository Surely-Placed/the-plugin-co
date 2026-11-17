import { Navigate, useLocation, useParams } from "react-router-dom";
import { divisions } from "../../lib/divisions";
import { growthRoutes } from "../../lib/design/routes";
import { legacyServiceSlugRedirect } from "../../lib/design/service-slugs";

const forBusinessPathMap: Record<string, string> = {
  "/for-businesses": growthRoutes.home,
  "/for-businesses/services": growthRoutes.services,
  "/for-businesses/how-it-works": growthRoutes.howItWorks,
  "/for-businesses/case-studies": growthRoutes.work,
  "/for-businesses/pricing": growthRoutes.pricing,
  "/book/for-businesses": growthRoutes.audit,
};

export function LegacyServiceRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const targetSlug = slug ? legacyServiceSlugRedirect[slug] ?? slug : undefined;
  return (
    <Navigate
      to={targetSlug ? `${growthRoutes.services}/${targetSlug}` : growthRoutes.services}
      replace
    />
  );
}

export function LegacyPortfolioRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <Navigate
      to={slug ? `${growthRoutes.work}#${slug}` : growthRoutes.work}
      replace
    />
  );
}

export function LegacyGrowthRedirect() {
  const { pathname, search, hash } = useLocation();
  const suffix = pathname.replace(/^\/growth/, "").replace(/^\//, "");
  const legacyKey = suffix ? `/for-businesses/${suffix}` : "/for-businesses";
  const target = (forBusinessPathMap[legacyKey] ?? growthRoutes.home) + search + hash;
  return <Navigate to={target} replace />;
}

export function LegacyForBusinessesRedirect() {
  const { pathname, search, hash } = useLocation();
  const target = (forBusinessPathMap[pathname] ?? growthRoutes.home) + search + hash;
  return <Navigate to={target} replace />;
}

export function LegacyForBusinessesCatchAllRedirect() {
  const { pathname, search, hash } = useLocation();
  const serviceMatch = pathname.match(/^\/for-businesses\/services\/([^/]+)/);
  if (serviceMatch) {
    const slug = legacyServiceSlugRedirect[serviceMatch[1]] ?? serviceMatch[1];
    return <Navigate to={`${growthRoutes.services}/${slug}${search}${hash}`} replace />;
  }
  const caseMatch = pathname.match(/^\/for-businesses\/case-studies/);
  if (caseMatch) {
    return <Navigate to={`${growthRoutes.work}${search}${hash}`} replace />;
  }
  const suffix = pathname.replace(/^\/for-businesses/, "");
  const key = suffix ? `/for-businesses${suffix}` : "/for-businesses";
  const target = (forBusinessPathMap[key] ?? growthRoutes.home) + search + hash;
  return <Navigate to={target} replace />;
}

export function LegacyCareersRedirect() {
  const { pathname, search, hash } = useLocation();
  const target = pathname.replace(/^\/careers(?=\/|$)/, "/for-talent") + search + hash;
  return <Navigate to={target} replace />;
}

export function LegacyBookGrowthRedirect() {
  return <Navigate to={growthRoutes.audit} replace />;
}

export function LegacyBookCareersRedirect() {
  return <Navigate to={divisions.careers.routes.book} replace />;
}

export function LegacyBlogRedirect() {
  const { pathname, search, hash } = useLocation();
  const target = pathname.replace(/^\/blog/, growthRoutes.insights) + search + hash;
  return <Navigate to={target} replace />;
}