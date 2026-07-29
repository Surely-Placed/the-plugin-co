import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BlogCard } from "../components/blog/BlogCard";
import { NewsletterForm } from "../components/ui/NewsletterForm";
import { PageSEO } from "../components/seo/PageSEO";
import { PageHero } from "../components/sections/PageHero";
import { GsapReveal } from "../components/effects/GsapReveal";
import { FadeIn, SectionHeading } from "../components/ui/Motion";
import {
  blogFilters,
  filterBlogPosts,
  getFeaturedPost,
  POSTS_PER_PAGE,
  type BlogFilter,
} from "../lib/blog";
import { resources } from "../lib/resources";
import { staticPageSEO } from "../lib/seo";
import { sectionGradientClass } from "../lib/section-gradients";
import { visuals } from "../lib/visuals";
import { SiteImage } from "../components/ui/SiteImage";
import { BalancedCardGrid } from "../components/ui/BalancedCardGrid";

export function BlogPage() {
  const seo = staticPageSEO["/blog"];
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = (searchParams.get("filter") ?? "All") as BlogFilter;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const featured = getFeaturedPost();

  const filtered = useMemo(() => filterBlogPosts(filter), [filter]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  const setFilter = (next: BlogFilter) => {
    setSearchParams({ filter: next, page: "1" });
  };

  const setPage = (p: number) => {
    setSearchParams({ filter, page: String(p) });
  };

  return (
    <>
      <PageSEO {...seo} path="/blog" />
      <PageHero page="blog">
        <GsapReveal immediate effect="blur">
          <p className="label-xs mb-6">Blog</p>
        </GsapReveal>
        <GsapReveal immediate delay={0.08} effect="scale">
          <SectionHeading
            title="The Plugin Resource Hub"
            subtitle="Free knowledge from both sides of The Plugin. Marketing intelligence for businesses, career intelligence for graduates."
          />
        </GsapReveal>
      </PageHero>

      <section className={`section-padding pt-0 section-after-hero bg-gradient-page-growth`}>
        <div className="container-site">
          <FadeIn>
            <p className="label-xs mb-4">Featured</p>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-white/15 bg-white/5 lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SiteImage
                  src={visuals.blogFeatured.image}
                  alt={featured.title}
                  width={1200}
                  height={750}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="label-xs capitalize text-flow-light">{featured.division}</span>
                <h2 className="mt-4 font-mono text-3xl italic text-white transition-colors group-hover:text-flow-light md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 font-mono text-base text-white/80">{featured.excerpt}</p>
                <span className="label-xs mt-6 text-white group-hover:text-flow-light">
                  Read Article →
                </span>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-gradient-page-growth">
        <div className="container-site">
          <div className="mb-10 flex flex-wrap gap-2">
            {blogFilters.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.15em] transition-colors ${
                  filter === cat
                    ? "bg-flow-mid text-white"
                    : "border border-white/15 bg-black/30 text-white/70 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <BalancedCardGrid itemCount={paginated.length}>
            {paginated.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </BalancedCardGrid>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`h-10 w-10 rounded-full font-mono text-sm transition-colors ${
                    p === page
                      ? "bg-flow-mid text-white"
                      : "border border-white/15 text-white/70 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-gradient-page-careers">
        <div className="container-site">
          <SectionHeading
            title="Lead Magnets"
            subtitle="Free PDFs and newsletters from both divisions."
          />
          <BalancedCardGrid itemCount={resources.length} className="mt-10" gapClass="gap-4">
            {resources.map((resource) => (
              <article key={resource.slug} className="flow-card card-stack">
                <p className="label-xs shrink-0 capitalize">{resource.division}</p>
                <h3 className="heading-card-md mt-2 shrink-0">{resource.title}</h3>
                <p className="card-stack__grow mt-3 font-mono text-sm text-white/80">
                  {resource.description}
                </p>
                <p className="card-stack__footer mt-4 font-mono text-xs text-white/50">
                  {resource.gated ? `${resource.format} · Gated download` : `${resource.format} · Free`}
                </p>
              </article>
            ))}
          </BalancedCardGrid>
        </div>
      </section>

      <section className={`section-padding ${sectionGradientClass("vault")}`}>
        <div className="container-site max-w-2xl">
          <FadeIn>
            <SectionHeading
              title="Get Business & Talent Insights."
              subtitle="The Plugin · For Businesses Brief and For Talent Brief. No spam, only useful ideas."
              align="center"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10">
              <NewsletterForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
