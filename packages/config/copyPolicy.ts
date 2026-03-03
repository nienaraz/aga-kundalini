/**
 * Copy policy — forbidden words and patterns for public-facing content.
 *
 * Used by scripts/audit-copy.ts to scan MDX and page files.
 */

export const forbiddenPatterns = {
  /** Promotional / commercial language */
  promotional: [
    'kup',
    'zamów',
    'oferta',
    'promocja',
    'rabat',
    'zniżka',
    'gratis',
    'limitowana',
    'ostatnie miejsca',
    'nie przegap',
    'ekskluzywny',
    'ekskluzywna',
    'ekskluzywne',
    'VIP',
  ],

  /** Medical / diagnostic claims */
  medical: [
    'leczy',
    'wyleczy',
    'diagnoza',
    'diagnozuje',
    'gwarantuje',
    'zapewnia',
    'rozwiąże',
  ],

  /** Hype / pressure language */
  hype: [
    'musisz',
    'koniecznie',
    'transformacja życia',
    'całkowita zmiana',
    'sekret',
    'przełom',
    'rewolucja',
  ],
} as const;

/** All forbidden words as a flat array */
export const allForbiddenWords: string[] = [
  ...forbiddenPatterns.promotional,
  ...forbiddenPatterns.medical,
  ...forbiddenPatterns.hype,
];

/** Category for a matched forbidden word */
export function getForbiddenCategory(word: string): string | null {
  const lower = word.toLowerCase();
  for (const [category, words] of Object.entries(forbiddenPatterns)) {
    if ((words as readonly string[]).some((w) => lower.includes(w.toLowerCase()))) {
      return category;
    }
  }
  return null;
}
