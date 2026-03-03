/**
 * Content loader -- wraps @joga/content for the web app.
 * Re-exports everything from the shared content package
 * and adds app-specific helpers (reading time enrichment, Polish labels).
 *
 * Note: @joga/content uses `fs` under the hood, so this module
 * must only run server-side (RSC, API routes, build scripts).
 */

import {
  getAllArticles,
  getAllPractices,
  getAllPaths,
  getAllGlossaryTerms,
  getAllNewsletterIssues,
  getAllEvidence,
  getArticleBySlug,
  getPracticeBySlug,
  getPathBySlug,
  getEvidenceBySlug,
  getEvidenceByLevel,
  getArticlesByCategory,
  getPracticesByCategory,
  getAllCategories,
  getAllTags,
  formatDate,
  getContentUrl,
  groupByCategory,
} from '@joga/content';

import type {
  Article,
  Practice,
  Path,
  GlossaryTerm,
  NewsletterIssue,
  Evidence,
  EvidenceSource,
  EvidenceLevel,
  ContentType,
} from '@joga/content';

import { calculateReadingTime } from '@joga/lib';

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export {
  getAllArticles,
  getAllPractices,
  getAllPaths,
  getAllGlossaryTerms,
  getAllNewsletterIssues,
  getAllEvidence,
  getArticleBySlug,
  getPracticeBySlug,
  getPathBySlug,
  getEvidenceBySlug,
  getEvidenceByLevel,
  getArticlesByCategory,
  getPracticesByCategory,
  getAllCategories,
  getAllTags,
  formatDate,
  getContentUrl,
  groupByCategory,
};

export type {
  Article,
  Practice,
  Path,
  GlossaryTerm,
  NewsletterIssue,
  Evidence,
  EvidenceSource,
  EvidenceLevel,
  ContentType,
};

// ---------------------------------------------------------------------------
// Enriched articles (with reading time)
// ---------------------------------------------------------------------------

export function getEnrichedArticles() {
  return getAllArticles().map((article) => ({
    ...article,
    readingTime: calculateReadingTime(article.content),
  }));
}

export function getEnrichedArticleBySlug(slug: string) {
  const article = getArticleBySlug(slug);
  if (!article) return null;
  return {
    ...article,
    readingTime: calculateReadingTime(article.content),
  };
}

// ---------------------------------------------------------------------------
// Polish category labels
// ---------------------------------------------------------------------------

export const categoryLabels: Record<string, string> = {
  // Edukacja
  'uklad-nerwowy': 'Uklad nerwowy',
  'reaktywnosc-vs-reakcja': 'Reaktywnosc vs reakcja',
  'oddech-i-sygnaly-ciala': 'Oddech i sygnaly ciala',
  'domkniecie-cyklu-stresu': 'Domkniecie cyklu stresu',
  'kundalini-podstawy': 'Kundalini -- podstawy',
  // Praktyki
  'oddech': 'Oddech',
  'ruch': 'Ruch',
  'medytacja': 'Medytacja',
  'resety': 'Resety (2-5 min)',
};

/**
 * Return Polish label for a category slug. Falls back to the slug itself
 * with dashes replaced by spaces.
 */
export function getCategoryLabel(slug: string): string {
  return categoryLabels[slug] ?? slug.replace(/-/g, ' ');
}
