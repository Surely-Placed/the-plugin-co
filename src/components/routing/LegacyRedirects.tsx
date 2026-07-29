import { Navigate, useLocation, useParams } from "react-router-dom";
import { divisions } from "../../lib/divisions";

const growthRoutes = divisions.growth.routes;

export function LegacyServiceRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <Navigate
      to={slug ? `${growthRoutes.services}/${slug}` : growthRoutes.services}
      replace
    />
  );
}

export function LegacyPortfolioRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <Navigate
      to={slug ? `${growthRoutes.stories}/${slug}` : growthRoutes.stories}
      replace
    />
  );
}

/** /growth/* → /for-businesses/* (SPA fallback when host has no server redirect) */
export function LegacyGrowthRedirect() {
  const { pathname, search, hash } = useLocation();
  const target = pathname.replace(/^\/growth(?=\/|$)/, "/for-businesses") + search + hash;
  return <Navigate to={target} replace />;
}

/** /careers/* → /for-talent/* */
export function LegacyCareersRedirect() {
  const { pathname, search, hash } = useLocation();
  const target = pathname.replace(/^\/careers(?=\/|$)/, "/for-talent") + search + hash;
  return <Navigate to={target} replace />;
}

export function LegacyBookGrowthRedirect() {
  return <Navigate to={divisions.growth.routes.book} replace />;
}

export function LegacyBookCareersRedirect() {
  return <Navigate to={divisions.careers.routes.book} replace />;
}
