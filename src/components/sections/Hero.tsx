import { Link } from 'react-router-dom';
import { Mail, Download, FolderGit2 } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { StatusDot } from '@/components/ui/StatusDot';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { LinkedinIcon } from '@/components/icons/LinkedinIcon';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-topology">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg)]/60 to-[var(--color-bg)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="font-mono text-xs text-[var(--color-text-muted)] mb-6">
          <span className="text-[var(--color-accent-2)]">~</span>/portfolio{' '}
          <span className="text-[var(--color-text)]">$</span> whoami
        </div>

        <h1 className="max-w-3xl font-display text-4xl sm:text-6xl font-semibold tracking-tight text-balance text-[var(--color-text)]">
          {siteConfig.title}
        </h1>

        <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--color-text-muted)]">
          I work across cloud infrastructure, cybersecurity, networking and automation — currently
          focused on Microsoft Azure. This site documents the labs and projects I build to learn how
          production environments actually work.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-2.5 font-mono text-sm font-medium text-[#12130f] hover:brightness-110 transition"
          >
            <FolderGit2 className="h-4 w-4" /> View My Projects
          </Link>
          <a
            href={siteConfig.resumePdfPath}
            download
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)] transition"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <StatusDot label={siteConfig.availability} tone="ok" />
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="rounded-md border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-2)] hover:border-[var(--color-accent-2)] transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-md border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-2)] hover:border-[var(--color-accent-2)] transition-colors"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Send an email"
              className="rounded-md border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-2)] hover:border-[var(--color-accent-2)] transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
