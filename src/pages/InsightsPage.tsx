import { Link } from "react-router-dom";
import { DesignMarketingPage } from "../components/design/DesignMarketingPage";
import { pageInsights } from "../lib/design/pages/page-insights";
import { blogPosts } from "../lib/blog";
import { growthRoutes } from "../lib/design/routes";

export function InsightsPage() {
  const posts = blogPosts.filter((p) => p.division === "growth").slice(0, 12);

  return (
    <>
      <DesignMarketingPage
        path={growthRoutes.insights}
        page={pageInsights}
        breadcrumbLabel="INSIGHTS"
      />
      <section className="tp-section-compact border-t border-tp-border-subtle">
        <div className="tp-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="tp-card tp-card--hover">
              <p className="tp-eyebrow mb-0 text-[10px]">{post.topics[0] ?? "Insights"}</p>
              <h3 className="m-0 text-xl font-extrabold leading-snug text-tp-text">
                <Link to={`${growthRoutes.insights}/${post.slug}`} className="hover:text-tp-cyan">
                  {post.title}
                </Link>
              </h3>
              <p className="m-0 text-sm leading-relaxed text-tp-muted-strong">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}