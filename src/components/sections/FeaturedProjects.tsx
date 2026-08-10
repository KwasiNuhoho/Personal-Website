import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-2)]/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <Eyebrow>ls ~/projects --featured</Eyebrow>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-text)]">
              Featured Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 font-mono text-sm text-[var(--color-accent-2)] hover:gap-2 transition-all"
          >
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
