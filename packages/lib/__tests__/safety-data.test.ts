import { describe, it, expect } from 'vitest';
import {
  crisisLines,
  redFlags,
  professionalHelpSigns,
  safetyGateStatements,
} from '@joga/config/safetyData';

describe('safetyData', () => {
  describe('crisisLines', () => {
    it('has at least 2 crisis lines', () => {
      expect(crisisLines.length).toBeGreaterThanOrEqual(2);
    });

    it('each line has required fields', () => {
      for (const line of crisisLines) {
        expect(line.name).toBeTruthy();
        expect(line.number).toBeTruthy();
        expect(line.description).toBeTruthy();
        expect(line.hours).toBeTruthy();
      }
    });

    it('includes 116 123 and 800 70 2222', () => {
      const numbers = crisisLines.map((l) => l.number);
      expect(numbers).toContain('116 123');
      expect(numbers).toContain('800 70 2222');
    });
  });

  describe('redFlags', () => {
    it('has at least 4 red flags', () => {
      expect(redFlags.length).toBeGreaterThanOrEqual(4);
    });

    it('mentions dissociation and panic', () => {
      const joined = redFlags.join(' ').toLowerCase();
      expect(joined).toContain('dysocjacja');
      expect(joined).toContain('panika');
    });
  });

  describe('professionalHelpSigns', () => {
    it('has at least 4 signs', () => {
      expect(professionalHelpSigns.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('safetyGateStatements', () => {
    it('has primary and secondary statements', () => {
      expect(safetyGateStatements.primary).toBeTruthy();
      expect(safetyGateStatements.secondary).toBeTruthy();
    });

    it('primary states this is not therapy', () => {
      expect(safetyGateStatements.primary.toLowerCase()).toContain(
        'nie jest terapia'
      );
    });

    it('has action and learnMore labels', () => {
      expect(safetyGateStatements.action).toBeTruthy();
      expect(safetyGateStatements.learnMore).toBeTruthy();
    });
  });
});
