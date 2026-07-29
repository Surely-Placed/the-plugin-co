import { PageHeroVideo } from "../sections/PageHeroVideo";
import { pageHeroImages } from "../../lib/visuals";

/** @deprecated Use PageHero instead */
export function EcosystemBackground() {
  return <PageHeroVideo image={pageHeroImages.services.image} />;
}
