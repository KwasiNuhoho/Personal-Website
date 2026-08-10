import { useMemo, useState } from 'react';
import { Seo } from '@/components/Seo';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ArticleCard } from '@/components/ArticleCard';
import { getAllPosts, getAllBlogCategories } from '@/lib/blog';

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const posts = getAllPosts();
  const categories = ['All', ...getAllBlogCategories()];

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter((p) => p.frontmatter.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <>
      <Seo
        title="Blog"
        description="Technical writing documenting cloud, cybersecurity, networking and homelab projects."
        path="/blog"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <Eyebrow>tail -f ~/blog/articles.log</Eyebrow>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-text)]">Blog</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
          Write-ups on what I built, what broke, and what I learned fixing it.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                activeCategory === cat
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                  : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent-2)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center font-mono text-sm text-[var(--color-text-muted)]">
            No articles in this category yet.
          </p>
        )}
      </div>
    </>
  );
}
