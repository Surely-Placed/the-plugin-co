import { Navigate, useParams } from "react-router-dom";
import { getBlogPost, blogPosts } from "../lib/blog";
import { PageSEO } from "../components/seo/PageSEO";
import { ArticleJsonLd } from "../components/seo/JsonLd";
import { Breadcrumbs } from "../components/seo/Breadcrumbs";
import { buildCanonical } from "../lib/seo";
import { PageHero } from "../components/sections/PageHero";
import { GsapReveal } from "../components/effects/GsapReveal";
import { FadeIn, SectionHeading } from "../components/ui/Motion";
import { CTABlock } from "../components/ui/CTABlock";
import { PrimaryCtaButton } from "../components/ui/PrimaryCtaButton";
import { NewsletterForm } from "../components/ui/NewsletterForm";
import { BlogCard } from "../components/blog/BlogCard";
import { sectionGradientClass } from "../lib/section-gradients";
import { BalancedCardGrid } from "../components/ui/BalancedCardGrid";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.division === post.division)
    .slice(0, 3);

  if (related.length < 3) {
    const extras = blogPosts
      .filter((p) => p.slug !== post.slug && !related.includes(p))
      .slice(0, 3 - related.length);
    related.push(...extras);
  }

  return (
    <>
      <PageSEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        author={post.author}
        url={buildCanonical(`/blog/${post.slug}`)}
      />
      <article>
        <PageHero page="blog">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
          <GsapReveal immediate effect="blur">
            <p className="label-xs capitalize text-accent">{post.division}</p>
          </GsapReveal>
          <GsapReveal immediate delay={0.08} effect="clip">
            <h1 className="heading-section mt-4 text-white">{post.title}</h1>
          </GsapReveal>
          <GsapReveal immediate delay={0.14} effect="left">
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70">
              <span>{post.author}</span>
              <span>·</span>
              <span>{date}</span>
              <span>·</span>
              <span>{post.readingTime} read</span>
            </div>
          </GsapReveal>
        </PageHero>

        <section className={`section-padding pt-0 section-after-hero ${sectionGradientClass("rise")}`}>
          <div className="container-site grid gap-12 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">
              <FadeIn>
                <p className="label-xs mb-4">Contents</p>
                <nav className="sticky top-32 space-y-2">
                  {post.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-muted transition-colors hover:text-accent"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </FadeIn>
            </aside>

            <div className="max-w-3xl">
              {post.content.map((section, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <section
                    id={
                      section.heading
                        ? post.tableOfContents[i]?.id ?? `section-${i}`
                        : undefined
                    }
                    className="mb-12 scroll-mt-32"
                  >
                    {section.heading && (
                      <h2 className="font-mono text-2xl italic text-white md:text-3xl">
                        {section.heading}
                      </h2>
                    )}
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((p, j) => (
                        <p key={j} className="text-base leading-relaxed text-muted md:text-lg">
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                </FadeIn>
              ))}

              <FadeIn>
                <div className="glass rounded-2xl p-8 text-center">
                  <p className="font-mono text-xl italic text-white">
                    Want help implementing this?
                  </p>
                  <PrimaryCtaButton className="mt-6" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className={`section-padding ${sectionGradientClass("slash")}`}>
          <div className="container-site max-w-3xl">
            <FadeIn>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 font-mono text-xl text-accent">
                  TP
                </div>
                <div>
                  <p className="font-mono font-medium text-white">{post.author}</p>
                  <p className="text-sm text-muted">
                    Growth systems for ambitious businesses.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {related.length > 0 && (
          <section className={`section-padding ${sectionGradientClass("apex")}`}>
            <div className="container-site">
              <SectionHeading title="Related Articles." />
              <BalancedCardGrid itemCount={related.length} className="mt-12">
                {related.map((p, i) => (
                  <BlogCard key={p.slug} post={p} index={i} />
                ))}
              </BalancedCardGrid>
            </div>
          </section>
        )}

        <section className={`section-padding ${sectionGradientClass("band")}`}>
          <div className="container-site max-w-2xl">
            <SectionHeading
              title="Get Growth Insights."
              subtitle="No spam. Only useful ideas."
              align="center"
            />
            <div className="mt-10">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </article>

      <CTABlock />
    </>
  );
}
