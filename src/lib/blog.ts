import { parseFrontmatter } from './frontmatter';

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  [key: string]: unknown;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
}

// Eagerly import every markdown file in src/content/blog as raw text.
// Drop a new .md file in that folder (with the frontmatter shown in README.md)
// and it will automatically appear here — no other code changes required.
const modules = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.md$/, '');
}

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

const posts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter<BlogFrontmatter>(raw);
    return {
      slug: slugFromPath(path),
      frontmatter: {
        title: data.title ?? 'Untitled',
        description: data.description ?? '',
        date: data.date ?? '',
        category: data.category ?? 'General',
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
      },
      content,
      readingTime: estimateReadingTime(content),
    };
  })
  .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllBlogCategories(): string[] {
  return Array.from(new Set(posts.map((p) => p.frontmatter.category))).sort();
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
  return posts.slice(0, limit);
}
