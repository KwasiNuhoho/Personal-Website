interface StatusDotProps {
  label: string;
  tone?: 'ok' | 'accent' | 'muted';
}

const toneMap = {
  ok: 'bg-[var(--color-accent-ok)]',
  accent: 'bg-[var(--color-accent)]',
  muted: 'bg-[var(--color-text-muted)]',
};

export function StatusDot({ label, tone = 'ok' }: StatusDotProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-muted)]">
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${toneMap[tone]} opacity-60`}
        />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${toneMap[tone]}`} />
      </span>
      {label}
    </div>
  );
}
