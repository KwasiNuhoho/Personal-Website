import { Mail } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { LinkedinIcon } from '@/components/icons/LinkedinIcon';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display font-semibold text-[var(--color-text)]">{siteConfig.name}</p>
          <p className="font-mono text-xs text-[var(--color-text-muted)] mt-1">{siteConfig.title}</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-2)] transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-2)] transition-colors"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Send an email"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-2)] transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        <p className="font-mono text-xs text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Built with React &amp; Tailwind.
        </p>
      </div>
    </footer>
  );
}
