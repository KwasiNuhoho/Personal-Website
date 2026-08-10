import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';
import { GithubIcon } from '@/components/icons/GithubIcon';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent-2)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {project.category.slice(0, 2).map((cat) => (
            <Badge key={cat} variant="outline">
              {cat}
            </Badge>
          ))}
        </div>
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-2)] transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-text)]">
        <Link to={`/projects/${project.slug}`} className="hover:text-[var(--color-accent)] transition-colors">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
        {project.technologies.length > 4 && <Badge>+{project.technologies.length - 4}</Badge>}
      </div>

      <Link
        to={`/projects/${project.slug}`}
        className="mt-5 inline-flex items-center gap-1 font-mono text-sm text-[var(--color-accent-2)] group-hover:gap-2 transition-all"
      >
        View project <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
