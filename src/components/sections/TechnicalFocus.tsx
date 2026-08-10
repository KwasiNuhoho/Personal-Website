import { skillCategories } from '@/data/skills';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';

export function TechnicalFocus() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <Eyebrow>cat focus-areas.json</Eyebrow>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-text)]">
        What I Work With
      </h2>
      <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
        The tools and platforms I use to build, secure, and operate infrastructure.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <p className="font-mono text-xs text-[var(--color-accent-2)]">{category.eyebrow}</p>
            <h3 className="mt-2 font-display text-lg font-semibold text-[var(--color-text)]">{category.label}</h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{category.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
