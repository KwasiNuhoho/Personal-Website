import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import powershell from 'react-syntax-highlighter/dist/esm/languages/prism/powershell';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('shell', bash);
SyntaxHighlighter.registerLanguage('powershell', powershell);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('bicep', typescript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', jsx);
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Badge } from '@/components/ui/Badge';
import { getPostBySlug } from '@/lib/blog';

function formatDate(date: string) {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        path={`/blog/${post.slug}`}
        type="article"
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-2)] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All articles
        </Link>

        <Badge variant="accent">{post.frontmatter.category}</Badge>

        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-[var(--color-text)] text-balance">
          {post.frontmatter.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> {formatDate(post.frontmatter.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.readingTime}
          </span>
        </div>

        <div className="prose-article prose max-w-none mt-10 prose-headings:font-display prose-a:text-[var(--color-accent-2)] prose-strong:text-[var(--color-text)] dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={{
              code(props) {
                const { children, className, node: _node, ...rest } = props as {
                  children?: React.ReactNode;
                  className?: string;
                  node?: unknown;
                  inline?: boolean;
                };
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !className;
                if (!isInline && match) {
                  return (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, background: 'transparent' }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  );
                }
                return (
                  <code className={className} {...rest}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {post.frontmatter.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-6">
            {post.frontmatter.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
