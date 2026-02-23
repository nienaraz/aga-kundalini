import type { MetadataRoute } from 'next';
import { getAllArticles, getAllPractices, getAllPaths } from '@joga/content';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  // ---------------------------------------------------------------------------
  // Static routes
  // ---------------------------------------------------------------------------
  const staticRoutes = [
    '',
    '/start',
    '/library',
    '/practices',
    '/paths',
    '/tools',
    '/video',
    '/webinars',
    '/about',
    '/resources',
    '/resources/glossary',
    '/resources/recommendations',
    '/newsletter',
    '/quiz',
    '/legal/privacy',
    '/legal/cookies',
    '/legal/disclaimer',
    '/tools/check-in',
    '/tools/grounding-menu',
    '/tools/trigger-journal',
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/start' ? 0.9 : 0.7,
  }));

  // ---------------------------------------------------------------------------
  // Education category index pages
  // ---------------------------------------------------------------------------
  const categories = [
    'uklad-nerwowy',
    'reaktywnosc-vs-reakcja',
    'oddech-i-sygnaly-ciala',
    'domkniecie-cyklu-stresu',
    'kundalini-podstawy',
  ];

  for (const cat of categories) {
    entries.push({
      url: `${BASE_URL}/library/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // ---------------------------------------------------------------------------
  // Practice category index pages
  // ---------------------------------------------------------------------------
  const practiceCategories = ['oddech', 'ruch', 'medytacja', 'resety'];

  for (const cat of practiceCategories) {
    entries.push({
      url: `${BASE_URL}/practices/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // ---------------------------------------------------------------------------
  // Dynamic: individual articles
  // ---------------------------------------------------------------------------
  try {
    const articles = getAllArticles();
    for (const article of articles) {
      entries.push({
        url: `${BASE_URL}/library/${article.category}/${article.slug}`,
        lastModified: article.updatedAt
          ? new Date(article.updatedAt)
          : new Date(article.publishedAt),
        changeFrequency: 'monthly',
        priority: article.featured ? 0.8 : 0.6,
      });
    }
  } catch {
    // Content may not exist yet during initial builds
  }

  // ---------------------------------------------------------------------------
  // Dynamic: individual practices
  // ---------------------------------------------------------------------------
  try {
    const practices = getAllPractices();
    for (const practice of practices) {
      entries.push({
        url: `${BASE_URL}/practices/${practice.practiceCategory}/${practice.slug}`,
        lastModified: practice.updatedAt
          ? new Date(practice.updatedAt)
          : new Date(practice.publishedAt),
        changeFrequency: 'monthly',
        priority: practice.featured ? 0.8 : 0.6,
      });
    }
  } catch {
    // Content may not exist yet during initial builds
  }

  // ---------------------------------------------------------------------------
  // Dynamic: paths
  // ---------------------------------------------------------------------------
  try {
    const paths = getAllPaths();
    for (const p of paths) {
      entries.push({
        url: `${BASE_URL}/paths/${p.slug}`,
        lastModified: p.updatedAt
          ? new Date(p.updatedAt)
          : new Date(p.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  } catch {
    // Content may not exist yet during initial builds
  }

  return entries;
}
