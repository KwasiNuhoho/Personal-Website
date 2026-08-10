import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Seo } from '@/components/Seo';

export function NotFound() {
  return (
    <>
      <Seo title="404 Not Found" description="Page not found." path="/404" />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
        <p className="font-mono text-sm text-[var(--color-accent-2)]">$ curl this-page</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-[var(--color-text)]">404: Not Found</h1>
        <p className="mt-4 text-[var(--color-text-muted)]">
          The page you're looking for doesn't exist, or the route changed.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-2.5 font-mono text-sm font-medium text-[#12130f] hover:brightness-110 transition"
        >
          <Home className="h-4 w-4" /> Back home
        </Link>
      </div>
    </>
  );
}
