/**
 * Central site configuration.
 * Replace the placeholder values with your own information.
 * Everything on the site (SEO tags, hero, footer, contact page) reads from here.
 */
export const siteConfig = {
  name: 'Dodzi Kwasi Nuhoho',
  title: 'Infrastructure & Cloud Engineer',
  shortTitle: 'Infra & Cloud Eng.',
  tagline: 'Building and securing infrastructure, one lab at a time.',
  description:
    'Infrastructure and cloud engineer working across Azure, identity and access, networking, and security operations. This site documents the projects, labs, and research behind that work.',
  location: 'Hillerød, Denmark',
  availability: 'Open to Cloud / Infrastructure / Security roles',

  // TODO: set this to your real domain once Netlify is pointed at it.
  // scripts/generate-sitemap.mjs has its own copy — update both.
  url: 'https://your-domain.netlify.app',
  github: 'https://github.com/KwasiNuhoho',
  linkedin: 'https://linkedin.com/in/dodzi-kwasi-nuhoho',
  email: 'dnuhoho2000@outlook.com',

  resumePdfPath: '/resume.pdf',

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ],

  // Netlify Forms is used for the contact form (see src/pages/Contact.tsx).
  // No custom backend is required.
  contactFormName: 'contact',
} as const;
