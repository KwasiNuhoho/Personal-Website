import { Link } from 'react-router-dom';
import { FileText, Mail } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-text)] text-balance">
          Interested in working together?
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-[var(--color-text-muted)]">
          I'm looking for an entry-level Cloud or Cybersecurity role where I can keep building things
          like the projects on this site.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/resume"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-2.5 font-mono text-sm font-medium text-[#12130f] hover:brightness-110 transition"
          >
            <FileText className="h-4 w-4" /> View Resume
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)] transition"
          >
            <Mail className="h-4 w-4" /> Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
