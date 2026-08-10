import { useMemo, useState } from 'react';
import { Seo } from '@/components/Seo';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ProjectCard } from '@/components/ProjectCard';
import { projects, projectCategories } from '@/data/projects';

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category.includes(activeCategory));
  }, [activeCategory]);

  const categories = ['All', ...projectCategories];

  return (
    <>
      <Seo
        title="Projects"
        description="Cloud, cybersecurity, networking and automation projects — labs I've built to learn how production environments actually work."
        path="/projects"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <Eyebrow>ls ~/projects -la</Eyebrow>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-text)]">Projects</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
          Hands-on labs across cloud infrastructure, cybersecurity, networking and automation. Each one
          links to its source code and a write-up of what I built and learned.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
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
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center font-mono text-sm text-[var(--color-text-muted)]">
            No projects in this category yet.
          </p>
        )}
      </div>
    </>
  );
}
