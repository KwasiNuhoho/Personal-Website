import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedPosts } from '@/lib/blog';
import { ArticleCard } from '@/components/ArticleCard';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function LatestArticles() {
  const posts = getFeaturedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <Eyebrow>tail -f ~/blog/articles.log</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-text)]">
            Latest Articles
          </h2>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 font-mono text-sm text-[var(--color-accent-2)] hover:gap-2 transition-all"
        >
          All articles <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
