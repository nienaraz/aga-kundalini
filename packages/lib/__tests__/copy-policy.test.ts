import { describe, it, expect } from 'vitest';
import {
  allForbiddenWords,
  forbiddenPatterns,
  getForbiddenCategory,
} from '@joga/config/copyPolicy';

describe('copyPolicy', () => {
  describe('forbiddenPatterns', () => {
    it('has promotional, medical, and hype categories', () => {
      expect(forbiddenPatterns.promotional.length).toBeGreaterThan(0);
      expect(forbiddenPatterns.medical.length).toBeGreaterThan(0);
      expect(forbiddenPatterns.hype.length).toBeGreaterThan(0);
    });

    it('promotional includes commercial terms', () => {
      expect(forbiddenPatterns.promotional).toContain('kup');
      expect(forbiddenPatterns.promotional).toContain('promocja');
      expect(forbiddenPatterns.promotional).toContain('VIP');
    });

    it('medical includes diagnostic claims', () => {
      expect(forbiddenPatterns.medical).toContain('leczy');
      expect(forbiddenPatterns.medical).toContain('wyleczy');
      expect(forbiddenPatterns.medical).toContain('diagnoza');
    });

    it('hype includes pressure language', () => {
      expect(forbiddenPatterns.hype).toContain('musisz');
      expect(forbiddenPatterns.hype).toContain('sekret');
    });
  });

  describe('allForbiddenWords', () => {
    it('is a flat array of all forbidden words', () => {
      const total =
        forbiddenPatterns.promotional.length +
        forbiddenPatterns.medical.length +
        forbiddenPatterns.hype.length;
      expect(allForbiddenWords.length).toBe(total);
    });

    it('includes words from all categories', () => {
      expect(allForbiddenWords).toContain('kup');
      expect(allForbiddenWords).toContain('leczy');
      expect(allForbiddenWords).toContain('musisz');
    });
  });

  describe('getForbiddenCategory', () => {
    it('returns correct category for promotional words', () => {
      expect(getForbiddenCategory('promocja')).toBe('promotional');
      expect(getForbiddenCategory('Promocja')).toBe('promotional');
    });

    it('returns correct category for medical words', () => {
      expect(getForbiddenCategory('wyleczy')).toBe('medical');
    });

    it('returns correct category for hype words', () => {
      expect(getForbiddenCategory('musisz')).toBe('hype');
    });

    it('returns null for allowed words', () => {
      expect(getForbiddenCategory('może wspierać')).toBe(null);
      expect(getForbiddenCategory('praktyka')).toBe(null);
    });
  });
});
