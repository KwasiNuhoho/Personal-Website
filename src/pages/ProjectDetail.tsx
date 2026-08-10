import { useParams, Link, Navigate } from 'react-router-dom';
import { ExternalLink, BookOpen, ArrowLeft, ImageOff } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Badge } from '@/components/ui/Badge';
import { getProjectBySlug } from '@/data/projects';
import { GithubIcon } from '@/components/icons/GithubIcon';

const sections: Array<{ key: 'overview' | 'problem' | 'architecture' | 'implementation' | 'challenges' | 'whatLearned' | 'results'; title: string }> = [
  { key: 'overview', title: 'Overview' },
  { key: 'problem', title: 'Problem' },
  { key: 'architecture', title: 'Architecture' },
  { key: 'implementation', title: 'Implementation' },
  { key: 'challenges', title: 'Key Challenges' },
  { key: 'whatLearned', title: 'What I Learned' },
  { key: 'results', title: 'Results' },
];

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      <Seo title={project.title} description={project.description} path={`/projects/${project.slug}`} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-2)] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.category.map((cat) => (
            <Badge key={cat} variant="outline">
              {cat}
            </Badge>
          ))}
        </div>

        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-[var(--color-text)]">
          {project.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2 font-mono text-xs text-[var(--color-text)] hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)] transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" /> Repository
            </a>
          )}
          {project.links.blog && (
            <a
              href={project.links.blog}
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2 font-mono text-xs text-[var(--color-text)] hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)] transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" /> Blog post
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2 font-mono text-xs text-[var(--color-text)] hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)] transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live demo
            </a>
          )}
        </div>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Technologies</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Skills Demonstrated</h2>
          <ul className="mt-3 space-y-2">
            {project.skillsDemonstrated.map((skill) => (
              <li key={skill} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {sections.map(({ key, title }) => (
          <section key={key} className="mt-10">
            <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">{title}</h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-text-muted)] whitespace-pre-line">
              {project.detail[key]}
            </p>
          </section>
        ))}

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Evidence</h2>
          {project.detail.evidence.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {project.detail.evidence.map((item) => (
                <figure key={item.src} className="overflow-hidden rounded-lg border border-[var(--color-border)]">
                  <img src={item.src} alt={item.alt} className="w-full" loading="lazy" />
                  {item.caption && (
                    <figcaption className="p-3 font-mono text-xs text-[var(--color-text-muted)]">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-14 text-center">
              <ImageOff className="h-6 w-6 text-[var(--color-text-muted)]" aria-hidden="true" />
              <p className="font-mono text-xs text-[var(--color-text-muted)]">
                Add screenshots, terminal output, or diagrams to{' '}
                <code>src/data/projects.ts</code> for this project.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
