import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';

const learning = [
  { label: 'AZ-104: Azure Administrator', status: 'In Progress' },
  { label: 'Cloud Infrastructure Fundamentals', status: 'In Progress' },
  { label: 'Security Monitoring & Detection', status: 'Ongoing' },
  { label: 'Infrastructure as Code (Bicep)', status: 'Ongoing' },
];

export function CurrentlyLearning() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <Eyebrow>ps aux | grep learning</Eyebrow>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-text)]">
        Currently Learning
      </h2>
      <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
        What's actively running in the background right now.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {learning.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4"
          >
            <span className="font-mono text-sm text-[var(--color-text)]">{item.label}</span>
            <Badge variant="accent">{item.status}</Badge>
          </div>
        ))}
      </div>
    </section>
  );
}
