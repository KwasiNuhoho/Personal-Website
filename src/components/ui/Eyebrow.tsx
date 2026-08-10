interface EyebrowProps {
  children: React.ReactNode;
}

/**
 * Renders a section label styled as a terminal command, e.g. `~/projects $ ls -la`.
 * This is the site's recurring signature motif — it ties each section to a
 * real command a cloud/security engineer would run, rather than a decorative label.
 */
export function Eyebrow({ children }: EyebrowProps) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[var(--color-accent-2)] mb-3">
      <span aria-hidden="true" className="text-[var(--color-text-muted)]">
        $
      </span>
      <span>{children}</span>
      <span aria-hidden="true" className="inline-block w-[7px] h-[1em] bg-[var(--color-accent-2)] animate-pulse" />
    </div>
  );
}
