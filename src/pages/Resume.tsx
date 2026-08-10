import { Download } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/data/siteConfig';
import { skillCategories } from '@/data/skills';
import { resumeData } from '@/data/resume';

export function Resume() {
  return (
    <>
      <Seo
        title="Resume"
        description={`Resume for ${siteConfig.name} — ${siteConfig.title}.`}
        path="/resume"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <Eyebrow>cat resume.md</Eyebrow>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-text)]">Resume</h1>
          </div>
          <a
            href={siteConfig.resumePdfPath}
            download
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-2.5 font-mono text-sm font-medium text-[#12130f] hover:brightness-110 transition shrink-0"
          >
            <Download className="h-4 w-4" /> Download Resume PDF
          </a>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Professional Summary</h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-text-muted)]">{resumeData.summary}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Technical Skills</h2>
          <div className="mt-4 space-y-4">
            {skillCategories.map((category) => (
              <div key={category.id}>
                <p className="font-mono text-xs text-[var(--color-accent-2)]">{category.label}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Education</h2>
          <div className="mt-4 space-y-4">
            {resumeData.education.map((entry) => (
              <div
                key={entry.institution}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-sm text-[var(--color-text)]">{entry.credential}</p>
                  <p className="font-mono text-xs text-[var(--color-text-muted)]">{entry.period}</p>
                </div>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{entry.institution}</p>
                {entry.details && entry.details.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {entry.details.map((d) => (
                      <li key={d} className="text-sm text-[var(--color-text-muted)]">
                        &bull; {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Experience</h2>
          <div className="mt-4 space-y-4">
            {resumeData.experience.map((entry) => (
              <div
                key={`${entry.role}-${entry.organization}`}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-sm text-[var(--color-text)]">{entry.role}</p>
                  <p className="font-mono text-xs text-[var(--color-text-muted)]">{entry.period}</p>
                </div>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {entry.organization}
                  {entry.location ? ` \u00b7 ${entry.location}` : ''}
                </p>
                <ul className="mt-3 space-y-1">
                  {entry.highlights.map((h) => (
                    <li key={h} className="text-sm text-[var(--color-text-muted)]">
                      &bull; {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Certifications</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {resumeData.certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
              >
                <div>
                  <p className="font-mono text-sm text-[var(--color-text)]">{cert.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{cert.issuer}</p>
                </div>
                <Badge variant={cert.status === 'Completed' ? 'accent' : 'default'}>{cert.status}</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 mb-4">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Relevant Training</h2>
          <ul className="mt-4 space-y-2">
            {resumeData.training.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 font-mono text-sm text-[var(--color-text)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
