import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { siteConfig } from '@/data/siteConfig';

export function AboutSummary() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-2)]/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <Eyebrow>cat about.md</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-text)]">
            About
          </h2>
        </div>
        <div>
          <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
            [PROFESSIONAL SUMMARY — a few sentences on your background, how you got into cloud and
            security, and what kind of role you're looking for. Keep it honest and specific rather
            than a list of buzzwords.]
          </p>
          <Link
            to="/about"
            className="mt-5 inline-flex items-center gap-1 font-mono text-sm text-[var(--color-accent-2)] hover:gap-2 transition-all"
          >
            More about {siteConfig.name}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
