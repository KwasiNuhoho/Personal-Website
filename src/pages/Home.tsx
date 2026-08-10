import { Seo } from '@/components/Seo';
import { Hero } from '@/components/sections/Hero';
import { TechnicalFocus } from '@/components/sections/TechnicalFocus';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { LatestArticles } from '@/components/sections/LatestArticles';
import { AboutSummary } from '@/components/sections/AboutSummary';
import { CurrentlyLearning } from '@/components/sections/CurrentlyLearning';
import { CtaSection } from '@/components/sections/CtaSection';
import { siteConfig } from '@/data/siteConfig';

export function Home() {
  return (
    <>
      <Seo title={siteConfig.title} description={siteConfig.description} path="/" />
      <Hero />
      <TechnicalFocus />
      <FeaturedProjects />
      <LatestArticles />
      <AboutSummary />
      <CurrentlyLearning />
      <CtaSection />
    </>
  );
}
