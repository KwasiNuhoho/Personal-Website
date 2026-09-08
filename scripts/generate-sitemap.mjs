// Regenerates public/sitemap.xml from the current blog posts and project slugs.
// Runs automatically before `npm run build` (see the "prebuild" script in package.json).
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE_URL = 'https://your-domain.netlify.app';

const staticRoutes = ['/', '/about', '/projects', '/blog', '/resume', '/contact'];

const blogDir = path.join(root, 'src/content/blog');
const blogSlugs = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  // Drafts are excluded from production builds, so they must not be advertised
  // in the sitemap either — otherwise crawlers get told about 404s.
  .filter((f) => !/^draft:\s*true\s*$/m.test(readFileSync(path.join(blogDir, f), 'utf-8')))
  .map((f) => `/blog/${f.replace(/\.md$/, '')}`);

const projectsSource = readFileSync(path.join(root, 'src/data/projects.ts'), 'utf-8');
const projectSlugs = [...projectsSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => `/projects/${m[1]}`);

const urls = [...staticRoutes, ...projectSlugs, ...blogSlugs];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join('\n')}
</urlset>
`;

writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
