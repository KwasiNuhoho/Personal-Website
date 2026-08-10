import { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { siteConfig } from '@/data/siteConfig';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { LinkedinIcon } from '@/components/icons/LinkedinIcon';

/**
 * Uses Netlify Forms — no custom backend required.
 * Netlify detects this form at build/deploy time because of the
 * `data-netlify="true"` attribute and the hidden `form-name` input.
 * Submissions show up in Site settings > Forms in the Netlify dashboard.
 * The honeypot field (`bot-field`) is Netlify's built-in spam filter.
 */
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      setSubmitted(true);
      form.reset();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch — email, LinkedIn, GitHub, or send a message directly."
        path="/contact"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <Eyebrow>echo "get in touch"</Eyebrow>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-text)]">Contact</h1>
        <p className="mt-3 max-w-xl text-[var(--color-text-muted)]">
          The fastest way to reach me is email or LinkedIn. Or use the form below.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5 text-sm text-[var(--color-text)] hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)] transition-colors"
          >
            <Mail className="h-4 w-4 shrink-0" /> Email
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5 text-sm text-[var(--color-text)] hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)] transition-colors"
          >
            <LinkedinIcon className="h-4 w-4 shrink-0" /> LinkedIn
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5 text-sm text-[var(--color-text)] hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)] transition-colors"
          >
            <GithubIcon className="h-4 w-4 shrink-0" /> GitHub
          </a>
        </div>

        <div className="mt-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle2 className="h-8 w-8 text-[var(--color-accent-ok)]" />
              <p className="font-display text-lg font-semibold text-[var(--color-text)]">Message sent</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Thanks for reaching out — I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Required for Netlify's static form detection at build time. */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label htmlFor="name" className="block font-mono text-xs text-[var(--color-text-muted)] mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none focus-visible:border-[var(--color-accent-2)]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-xs text-[var(--color-text-muted)] mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none focus-visible:border-[var(--color-accent-2)]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-[var(--color-text-muted)] mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none focus-visible:border-[var(--color-accent-2)]"
                />
              </div>

              {error && (
                <p className="text-sm text-[var(--color-accent-danger)]">
                  Something went wrong sending your message. Please try emailing me directly instead.
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-2.5 font-mono text-sm font-medium text-[#12130f] hover:brightness-110 transition disabled:opacity-60"
              >
                <Send className="h-4 w-4" /> {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
