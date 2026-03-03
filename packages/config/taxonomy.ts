/**
 * Canonical taxonomy registry — single source of truth for tags and categories.
 *
 * Content must use only tags from this registry.
 * Validated at build time via `pnpm audit:tags`.
 */

// ---------------------------------------------------------------------------
// Article categories
// ---------------------------------------------------------------------------

export const articleCategories = [
  'uklad-nerwowy',
  'reaktywnosc-vs-reakcja',
  'oddech-i-sygnaly-ciala',
  'domkniecie-cyklu-stresu',
  'kundalini-podstawy',
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

// ---------------------------------------------------------------------------
// Practice categories (must match practiceSchema enum)
// ---------------------------------------------------------------------------

export const practiceCategories = [
  'oddech',
  'ruch',
  'medytacja',
  'reset',
] as const;

export type PracticeCategory = (typeof practiceCategories)[number];

// ---------------------------------------------------------------------------
// Evidence levels
// ---------------------------------------------------------------------------

export const evidenceLevels = ['A', 'B', 'C', 'D', 'E'] as const;
export type EvidenceLevel = (typeof evidenceLevels)[number];

// ---------------------------------------------------------------------------
// Difficulty levels
// ---------------------------------------------------------------------------

export const difficultyLevels = [
  'podstawowy',
  'sredni',
  'zaawansowany',
] as const;

export type DifficultyLevel = (typeof difficultyLevels)[number];

// ---------------------------------------------------------------------------
// Canonical tag registry
// ---------------------------------------------------------------------------

export const canonicalTags = [
  // Układ nerwowy
  'układ nerwowy',
  'autonomiczny',
  'współczulny',
  'przywspółczulny',
  'nerw błędny',
  'vagus',
  'pobudzenie',
  'regulacja',
  'okno tolerancji',
  'cykl stresu',
  'aktywacja',
  'walcz lub uciekaj',
  'równowaga',

  // Praktyka
  'oddech',
  'ruch',
  'medytacja',
  'reset',
  'szybka praktyka',
  'uziemienie',
  'grounding',
  'uspokojenie',
  'trzęsienie',
  'rozciąganie',
  'przebudzenie',
  'odpoczynek',
  'regeneracja',

  // Stany i procesy
  'reaktywność',
  'automatyzm',
  'stres',
  'rozładowanie',
  'lęk',
  'trauma',
  'dysocjacja',
  'nadmierne pobudzenie',

  // Ciało
  'świadomość ciała',
  'oddychanie',
  'HRV',

  // Nauka
  'teoria poliwagalna',
  'metaanaliza',
  'zdrowie psychiczne',
  'joga',
  'kundalini',
  'neurobiologia',

  // Ścieżki
  'ścieżka',
  '7 dni',

  // Meta
  'podstawy',
  'praktyka',
  'praktyki',
  'anatomia',
  'newsletter',
  'powitanie',
  'wprowadzenie',
] as const;

export type CanonicalTag = (typeof canonicalTags)[number];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const tagSet = new Set<string>(canonicalTags.map((t) => t.toLowerCase()));

/** Check if a tag is in the canonical registry (case-insensitive) */
export function isCanonicalTag(tag: string): boolean {
  return tagSet.has(tag.toLowerCase());
}

/** Return non-canonical tags from a list */
export function getNonCanonicalTags(tags: string[]): string[] {
  return tags.filter((t) => !tagSet.has(t.toLowerCase()));
}

const articleCategorySet = new Set<string>(articleCategories);
const practiceCategorySet = new Set<string>(practiceCategories);

export function isValidArticleCategory(cat: string): boolean {
  return articleCategorySet.has(cat);
}

export function isValidPracticeCategory(cat: string): boolean {
  return practiceCategorySet.has(cat);
}
