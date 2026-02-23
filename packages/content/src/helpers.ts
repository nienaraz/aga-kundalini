import type { Path, ContentType } from './schemas';

/**
 * Formatuje datę do polskiego formatu (np. "23 lutego 2026").
 * Domyślnie używa lokalizacji polskiej.
 */
export function formatDate(dateStr: string, locale: string = 'pl-PL'): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Oblicza szacowany łączny czas trwania ścieżki (w minutach)
 * na podstawie sumy estimatedTimeMin ze wszystkich dni.
 */
export function estimatePathDuration(path: Path): number {
  return path.days.reduce((total, day) => total + day.estimatedTimeMin, 0);
}

/**
 * Generuje URL dla treści na podstawie typu, kategorii i sluga.
 *
 * Przykłady:
 *   getContentUrl('article', 'uklad-nerwowy', 'jak-dziala-uklad-nerwowy')
 *     => '/edukacja/uklad-nerwowy/jak-dziala-uklad-nerwowy'
 *
 *   getContentUrl('practice', 'oddech', 'oddech-uwalniajacy')
 *     => '/praktyki/oddech/oddech-uwalniajacy'
 *
 *   getContentUrl('path', '', 'sciezka-7-dniowa')
 *     => '/sciezki/sciezka-7-dniowa'
 *
 *   getContentUrl('glossary', '', 'prana')
 *     => '/zasoby/slownik/prana'
 *
 *   getContentUrl('newsletter', '', 'wydanie-1')
 *     => '/newsletter/wydanie-1'
 */
export function getContentUrl(type: ContentType, category: string, slug: string): string {
  const typeToBase: Record<ContentType, string> = {
    article: '/edukacja',
    practice: '/praktyki',
    path: '/sciezki',
    glossary: '/zasoby/slownik',
    newsletter: '/newsletter',
  };

  const base = typeToBase[type];

  if (category) {
    return `${base}/${category}/${slug}`;
  }

  return `${base}/${slug}`;
}

/**
 * Grupuje tablicę elementów według kategorii.
 *
 * Przykład:
 *   groupByCategory(articles, a => a.category)
 *     => { 'uklad-nerwowy': [...], 'oddech-i-cialo': [...] }
 */
export function groupByCategory<T>(
  items: T[],
  getCategory: (item: T) => string
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const category = getCategory(item);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
}
