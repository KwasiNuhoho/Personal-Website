import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';

// Lazy-load lighter-traffic pages so the homepage bundle stays small.
// BlogPost in particular pulls in the syntax highlighter, which is the
// single largest dependency in the project.
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const Projects = lazy(() => import('@/pages/Projects').then((m) => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })));
const Blog = lazy(() => import('@/pages/Blog').then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() => import('@/pages/BlogPost').then((m) => ({ default: m.BlogPost })));
const Resume = lazy(() => import('@/pages/Resume').then((m) => ({ default: m.Resume })));
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

function PageFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
      <div className="h-4 w-32 animate-pulse rounded bg-[var(--color-surface-2)]" />
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
