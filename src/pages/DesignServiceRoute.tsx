import { Navigate, useParams } from "react-router-dom";
import { DesignServiceDetailPage } from "../components/design/DesignServiceDetailPage";
import { designServices } from "../lib/design/pages/services-index";
import {
  designServiceSlugs,
  resolveDesignServiceSlug,
  type DesignServiceSlug,
} from "../lib/design/service-slugs";
import { growthRoutes } from "../lib/design/routes";

export function DesignServiceRoute() {
  const { slug } = useParams<{ slug: string }>();
  const resolved = slug ? resolveDesignServiceSlug(slug) : undefined;

  if (!resolved || !(designServiceSlugs as readonly string[]).includes(resolved)) {
    return <Navigate to={growthRoutes.services} replace />;
  }

  const page = designServices[resolved as DesignServiceSlug];
  return <DesignServiceDetailPage slug={resolved} page={page} />;
}