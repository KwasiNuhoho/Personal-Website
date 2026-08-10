import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'outline';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    default: 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-[var(--color-border)]',
    accent: 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-transparent',
    outline: 'bg-transparent text-[var(--color-text-muted)] border-[var(--color-border)]',
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 font-mono text-[11px] leading-none tracking-wide ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
