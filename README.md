# [YOUR NAME] — Cloud & Cybersecurity Portfolio

A fast, static portfolio site built with React, Vite, TypeScript and Tailwind CSS,
designed for entry-level Cloud & Cybersecurity / Cloud Infrastructure job search.
Deploys straight from GitHub to Netlify with no backend or database.

## Tech stack

- React 19 + TypeScript
- Vite 8 (build tool)
- Tailwind CSS v4
- React Router (client-side routing)
- Markdown blog posts via `import.meta.glob` (no CMS)
- Netlify Forms for the contact form (no custom backend)

## 1. Install dependencies

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`.

## 3. Build for production

```bash
npm run build
```

This runs a `prebuild` step that regenerates `public/sitemap.xml` from your current
projects and blog posts, then type-checks and builds to `dist/`. Preview the production
build locally with:

```bash
npm run preview
```

## 4. Create a new blog post

Add a new Markdown file to `src/content/blog/`, e.g.:

```
src/content/blog/my-new-post.md
```

with frontmatter at the top:

```yaml
---
title: "My New Post"
description: "One or two sentences describing the post."
date: "2026-08-08"
category: "Cybersecurity"
tags:
  - Wazuh
  - SIEM
featured: false
---

Your content in Markdown below the closing `---`.
```

The post automatically appears on `/blog` and at `/blog/my-new-post` — no other code
changes required. Supported: headings, code blocks with syntax highlighting, images,
tables, lists, links, blockquotes, and inline code.

Currently highlighted code languages: `bash`, `powershell`, `python`, `yaml`, `json`,
`typescript`/`bicep`, `jsx`/`tsx`. To add another language, register it in
`src/pages/BlogPost.tsx` (see the `SyntaxHighlighter.registerLanguage(...)` calls).

## 5. Create a new project

Open `src/data/projects.ts` and add a new object to the `projects` array, following the
existing `Project` shape (title, slug, description, category, technologies, links, and
a `detail` block for the project's case-study page). The project automatically appears
on `/projects`, on the homepage if `featured: true`, and gets its own page at
`/projects/your-slug`.

To add screenshots or diagrams, drop image files under `public/projects/your-slug/` and
reference them in that project's `detail.evidence` array.

## 6. Replace the resume

Replace `public/resume.pdf` with your actual resume PDF (keep the same filename, or
update `resumePdfPath` in `src/data/siteConfig.ts` if you rename it). Also update the
web-readable version of your resume in `src/data/resume.ts` (summary, education,
experience, certifications, training) so it matches the PDF.

## 7. Change personal information

Almost everything site-wide is driven from a few data files:

| What | File |
| --- | --- |
| Name, title, links (GitHub/LinkedIn/email), site URL, nav | `src/data/siteConfig.ts` |
| Skills / "What I Work With" section | `src/data/skills.ts` |
| Projects | `src/data/projects.ts` |
| Resume content | `src/data/resume.ts` |
| About page copy | `src/pages/About.tsx` |
| Blog posts | `src/content/blog/*.md` |

Search the codebase for `[PLACEHOLDER]`-style bracketed text — every one of these marks
something you should replace with real information. Do not leave fabricated
accomplishments, employers, or metrics in place of a placeholder; write only what you
can speak to in an interview.

## 8. Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 9. Connect GitHub to Netlify

1. In Netlify, click **Add new site → Import an existing project**.
2. Choose GitHub and select this repository.
3. Build settings are already defined in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. Netlify will rebuild automatically on every push to `main`.
5. Contact form submissions will appear under **Site settings → Forms** once the site
   has deployed at least once (Netlify detects the hidden static form in `index.html`
   at build time).

No environment variables are required for the default setup.

## 10. Configure a custom domain

1. In Netlify: **Site settings → Domain management → Add a custom domain.**
2. Follow Netlify's instructions to either point your registrar's DNS to Netlify, or
   use Netlify DNS.
3. Once the domain is verified, update `url` in `src/data/siteConfig.ts` and the
   `SITE_URL` constant in `scripts/generate-sitemap.mjs` (and the `Sitemap:` line in
   `public/robots.txt`) to your real domain, then redeploy so SEO tags and the sitemap
   point at the right URL.

## Project structure

```
src/
├── components/       Reusable UI (layout, cards, badges, icons, sections)
├── pages/             One file per route
├── content/blog/      Markdown blog posts (content, not code)
├── data/              Site config, skills, projects, resume — edit these, not the pages
├── lib/               Markdown/frontmatter loading, theme context
└── styles/            Tailwind entry + design tokens (CSS variables)
public/
├── resume.pdf          Replace with your real resume
├── robots.txt, sitemap.xml (auto-generated), favicon, OG image
scripts/
└── generate-sitemap.mjs  Runs automatically before every build
```

## Design notes

Dark mode is the default (persisted in `localStorage`, togglable in the nav). The
palette and terminal-style section labels (`$ cat about.md`, `$ ls ~/projects -la`) are
a deliberate nod to the SOC/CLI environments the site's content is about — feel free to
adjust the CSS variables in `src/styles/global.css` if you want a different palette.

## Future ideas (not implemented yet, but the architecture supports them)

Certifications page, talks/presentations, GitHub stats widget, interactive architecture
diagrams, blog tag pages, search, analytics. Add these incrementally as separate pages
or data files without needing to restructure what's already here.
