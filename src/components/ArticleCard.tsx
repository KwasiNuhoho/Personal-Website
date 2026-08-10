import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';
import { Badge } from '@/components/ui/Badge';

function formatDate(date: string) {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent-2)]">
      <Badge variant="accent">{post.frontmatter.category}</Badge>

      <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-text)]">
        <Link to={`/blog/${post.slug}`} className="hover:text-[var(--color-accent)] transition-colors">
          {post.frontmatter.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)] line-clamp-3">
        {post.frontmatter.description}
      </p>

      <div className="mt-4 flex items-center gap-4 font-mono text-xs text-[var(--color-text-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" /> {formatDate(post.frontmatter.date)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {post.readingTime}
        </span>
      </div>

      <Link
        to={`/blog/${post.slug}`}
        className="mt-5 inline-flex items-center gap-1 font-mono text-sm text-[var(--color-accent-2)] group-hover:gap-2 transition-all"
      >
        Read article <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
