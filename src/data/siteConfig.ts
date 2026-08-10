/**
 * Central site configuration.
 * Replace the placeholder values with your own information.
 * Everything on the site (SEO tags, hero, footer, contact page) reads from here.
 */
export const siteConfig = {
  name: 'Dodzi Kwasi Nuhoho',
  title: 'Cloud & Cybersecurity Engineer',
  shortTitle: 'Cloud & Security Eng.',
  tagline: 'Building and securing infrastructure, one lab at a time.',
  description:
    'Entry-level Cloud & Cybersecurity professional working across Azure infrastructure, security monitoring, networking and automation. This site documents projects, labs and technical writing.',
  location: '[YOUR CITY, COUNTRY]',
  availability: 'Open to entry-level Cloud / Cybersecurity roles',

  url: 'https://your-domain.netlify.app',
  github: 'https://github.com/[YOUR-GITHUB-USERNAME]',
  linkedin: 'https://linkedin.com/in/[YOUR-LINKEDIN]',
  email: '[YOUR-EMAIL]@example.com',

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
