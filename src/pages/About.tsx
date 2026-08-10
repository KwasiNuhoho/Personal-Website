import { Seo } from '@/components/Seo';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';

const focusAreas = ['Cloud Infrastructure', 'Cybersecurity Monitoring', 'Networking', 'Automation'];
const currentlyLearning = ['AZ-104: Azure Administrator', 'Security monitoring & detection', 'Infrastructure as Code'];

export function About() {
  return (
    <>
      <Seo
        title="About"
        description="Background, education, and career direction for an entry-level Cloud & Cybersecurity professional."
        path="/about"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <Eyebrow>cat about.md</Eyebrow>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-text)]">About</h1>

        <section className="mt-10 space-y-5 text-base leading-relaxed text-[var(--color-text-muted)]">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Introduction</h2>
          <p>
            [PROFESSIONAL INTRODUCTION — 2-4 sentences on who you are, how you got interested in cloud
            and cybersecurity, and what you're focused on right now. Keep it grounded and specific:
            avoid words like "expert" or "guru" — let the projects speak for that.]
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Education</h2>
          <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="font-mono text-sm text-[var(--color-text)]">[DEGREE / PROGRAM]</p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              [SCHOOL / UNIVERSITY NAME] &middot; [START YEAR]–[END YEAR]
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Technical Interests</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <Badge key={area} variant="accent">
                {area}
              </Badge>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Currently Learning</h2>
          <ul className="mt-4 space-y-2">
            {currentlyLearning.map((item) => (
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

        <section className="mt-10 space-y-5 text-base leading-relaxed text-[var(--color-text-muted)]">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">Career Direction</h2>
          <p>
            [CAREER DIRECTION — what kind of team and role you're looking for, e.g. an entry-level
            cloud infrastructure or SOC analyst position where you can keep building hands-on skills.]
          </p>
        </section>

        <section className="mt-10 space-y-5 text-base leading-relaxed text-[var(--color-text-muted)]">
          <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">How I Work</h2>
          <p>
            [PROFESSIONAL PHILOSOPHY — a short, honest statement about how you approach learning and
            problem-solving, e.g. building things hands-on, documenting what breaks, and asking good
            questions rather than claiming to know everything.]
          </p>
        </section>
      </div>
    </>
  );
}
