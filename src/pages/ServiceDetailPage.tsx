import { Navigate, useParams } from "react-router-dom";
import { ServiceDetailTemplate } from "../components/services/ServiceDetailTemplate";
import { PageSEO } from "../components/seo/PageSEO";
import { ServiceJsonLd } from "../components/seo/JsonLd";
import { buildCanonical } from "../lib/seo";
import { getServiceBySlug } from "../lib/services";

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <PageSEO
        title={service.title}
        description={service.description}
        path={`/services/${service.slug}`}
      />
      <ServiceJsonLd
        name={service.title}
        description={service.description}
        url={buildCanonical(`/services/${service.slug}`)}
      />
      <ServiceDetailTemplate service={service} />
    </>
  );
}
