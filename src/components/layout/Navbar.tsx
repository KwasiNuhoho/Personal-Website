import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Download, Moon, Sun, TerminalSquare } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useTheme } from '@/lib/theme';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-mono text-sm px-1 py-1 border-b-2 transition-colors ${
      isActive
        ? 'text-[var(--color-text)] border-[var(--color-accent)]'
        : 'text-[var(--color-text-muted)] border-transparent hover:text-[var(--color-text)]'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5">
        <NavLink to="/" className="flex items-center gap-2 font-display font-semibold text-[var(--color-text)]">
          <TerminalSquare className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
          <span>{siteConfig.name}</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClasses} end={item.href === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-md border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent-2)] transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={siteConfig.resumePdfPath}
            download
            className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-4 py-2 font-mono text-sm font-medium text-[#12130f] hover:brightness-110 transition"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-md border border-[var(--color-border)] p-2 text-[var(--color-text-muted)]"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="rounded-md border border-[var(--color-border)] p-2 text-[var(--color-text)]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 sm:px-6 py-4 flex flex-col gap-4"
        >
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-mono text-base ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`
              }
              end={item.href === '/'}
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={siteConfig.resumePdfPath}
            download
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-4 py-2.5 font-mono text-sm font-medium text-[#12130f]"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Resume
          </a>
        </nav>
      )}
    </header>
  );
}
