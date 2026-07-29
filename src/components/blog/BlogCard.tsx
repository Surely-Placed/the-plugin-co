import { Link } from "react-router-dom";
import type { BlogPost } from "../../lib/blog";
import { FadeIn } from "../ui/Motion";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <FadeIn delay={index * 0.04}>
      <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-glass-lg">
        <div className="aspect-[16/9] bg-gradient-to-br from-accent/15 via-bg-secondary to-accent-light/15" />
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label-xs rounded-full bg-black px-2.5 py-1 text-accent capitalize">
              {post.division}
            </span>
            <span className="text-[10px] text-muted">{post.readingTime}</span>
          </div>
          <h3 className="heading-card-md mt-4 group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted">
            <span>{post.author}</span>
            <span>{date}</span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="touch-target label-xs mt-5 inline-flex min-h-11 items-center py-2 text-white transition-colors hover:text-accent"
          >
            Read More →
          </Link>
        </div>
      </article>
    </FadeIn>
  );
}
