import { describe, it, expect } from 'vitest';
import {
  canonicalTags,
  articleCategories,
  practiceCategories,
  evidenceLevels,
  difficultyLevels,
  isCanonicalTag,
  getNonCanonicalTags,
  isValidArticleCategory,
  isValidPracticeCategory,
} from '@joga/config/taxonomy';

describe('taxonomy', () => {
  describe('canonicalTags', () => {
    it('has at least 20 tags', () => {
      expect(canonicalTags.length).toBeGreaterThanOrEqual(20);
    });

    it('contains no duplicates', () => {
      const lower = canonicalTags.map((t) => t.toLowerCase());
      expect(new Set(lower).size).toBe(lower.length);
    });
  });

  describe('isCanonicalTag', () => {
    it('returns true for canonical tags', () => {
      expect(isCanonicalTag('oddech')).toBe(true);
      expect(isCanonicalTag('układ nerwowy')).toBe(true);
      expect(isCanonicalTag('regulacja')).toBe(true);
      expect(isCanonicalTag('reaktywność')).toBe(true);
    });

    it('is case-insensitive', () => {
      expect(isCanonicalTag('Oddech')).toBe(true);
      expect(isCanonicalTag('REGULACJA')).toBe(true);
    });

    it('returns false for non-canonical tags', () => {
      expect(isCanonicalTag('random-tag')).toBe(false);
      expect(isCanonicalTag('niekanoniczny')).toBe(false);
    });
  });

  describe('getNonCanonicalTags', () => {
    it('returns empty array when all tags are canonical', () => {
      expect(getNonCanonicalTags(['oddech', 'regulacja', 'reset'])).toEqual(
        []
      );
    });

    it('returns non-canonical tags', () => {
      expect(
        getNonCanonicalTags(['oddech', 'fake-tag', 'regulacja'])
      ).toEqual(['fake-tag']);
    });
  });

  describe('categories', () => {
    it('article categories are valid', () => {
      expect(articleCategories).toContain('uklad-nerwowy');
      expect(articleCategories).toContain('kundalini-podstawy');
    });

    it('practice categories match schema', () => {
      expect(practiceCategories).toContain('oddech');
      expect(practiceCategories).toContain('ruch');
      expect(practiceCategories).toContain('medytacja');
      expect(practiceCategories).toContain('reset');
    });

    it('isValidArticleCategory works', () => {
      expect(isValidArticleCategory('uklad-nerwowy')).toBe(true);
      expect(isValidArticleCategory('fake-cat')).toBe(false);
    });

    it('isValidPracticeCategory works', () => {
      expect(isValidPracticeCategory('oddech')).toBe(true);
      expect(isValidPracticeCategory('resety')).toBe(false);
    });
  });

  describe('enums', () => {
    it('evidence levels are A through E', () => {
      expect(evidenceLevels).toEqual(['A', 'B', 'C', 'D', 'E']);
    });

    it('difficulty levels are 3', () => {
      expect(difficultyLevels.length).toBe(3);
      expect(difficultyLevels).toContain('podstawowy');
    });
  });
});
