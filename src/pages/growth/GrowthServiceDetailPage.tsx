import { Navigate, useParams } from "react-router-dom";
import { ServiceDetailTemplate } from "../../components/services/ServiceDetailTemplate";
import { PageSEO } from "../../components/seo/PageSEO";
import { ServiceJsonLd } from "../../components/seo/JsonLd";
import { buildCanonical } from "../../lib/seo";
import { getDivision } from "../../lib/divisions";
import { getServiceBySlug } from "../../lib/services";

export function GrowthServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const basePath = getDivision("growth").routes.services;

  if (!service) {
    return <Navigate to={basePath} replace />;
  }

  const path = `${basePath}/${service.slug}`;

  return (
    <>
      <PageSEO title={service.title} description={service.description} path={path} />
      <ServiceJsonLd
        name={service.title}
        description={service.description}
        url={buildCanonical(path)}
      />
      <ServiceDetailTemplate service={service} servicesPath={basePath} />
    </>
  );
}
