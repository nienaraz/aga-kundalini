import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  featureFlags,
  isFeatureEnabled,
  getBlockingFlag,
  getDisabledRoutes,
  shouldShowInNav,
  shouldShowInFooter,
} from '@joga/config/featureFlags';

describe('featureFlags', () => {
  describe('defaults', () => {
    it('webinars are disabled by default', () => {
      expect(featureFlags.enableWebinars.enabled).toBe(false);
    });

    it('series are disabled by default', () => {
      expect(featureFlags.enableSeries.enabled).toBe(false);
    });

    it('challenges are disabled by default', () => {
      expect(featureFlags.enableChallenges.enabled).toBe(false);
    });

    it('members area is disabled by default', () => {
      expect(featureFlags.enableMembersArea.enabled).toBe(false);
    });

    it('evidence library is enabled by default', () => {
      expect(featureFlags.enableEvidenceLibrary.enabled).toBe(true);
    });

    it('safety center is enabled by default', () => {
      expect(featureFlags.enableSafetyCenter.enabled).toBe(true);
    });
  });

  describe('isFeatureEnabled', () => {
    it('returns false for disabled flags', () => {
      expect(isFeatureEnabled('enableWebinars')).toBe(false);
      expect(isFeatureEnabled('enableSeries')).toBe(false);
    });

    it('returns true for enabled flags', () => {
      expect(isFeatureEnabled('enableEvidenceLibrary')).toBe(true);
      expect(isFeatureEnabled('enableSafetyCenter')).toBe(true);
    });
  });

  describe('getBlockingFlag', () => {
    it('returns flag name for disabled route', () => {
      expect(getBlockingFlag('/webinars')).toBe('enableWebinars');
      expect(getBlockingFlag('/webinars/some-slug')).toBe('enableWebinars');
      expect(getBlockingFlag('/series')).toBe('enableSeries');
      expect(getBlockingFlag('/series/my-series/episode-1')).toBe('enableSeries');
    });

    it('returns null for enabled routes', () => {
      // Evidence and safety are enabled by default
      expect(getBlockingFlag('/resources/evidence')).toBe(null);
      expect(getBlockingFlag('/safety')).toBe(null);
    });

    it('returns null for uncontrolled routes', () => {
      expect(getBlockingFlag('/')).toBe(null);
      expect(getBlockingFlag('/library')).toBe(null);
      expect(getBlockingFlag('/practices')).toBe(null);
      expect(getBlockingFlag('/quiz')).toBe(null);
    });

    it('does not match partial prefixes', () => {
      // /webinars-info should NOT be blocked by /webinars flag
      expect(getBlockingFlag('/webinars-info')).toBe(null);
    });
  });

  describe('getDisabledRoutes', () => {
    it('returns routes for all disabled flags', () => {
      const disabled = getDisabledRoutes();
      expect(disabled).toContain('/webinars');
      expect(disabled).toContain('/series');
      expect(disabled).toContain('/challenges');
      expect(disabled).toContain('/members');
    });

    it('does not include routes for enabled flags', () => {
      const disabled = getDisabledRoutes();
      expect(disabled).not.toContain('/resources/evidence');
      expect(disabled).not.toContain('/safety');
    });
  });

  describe('shouldShowInNav', () => {
    it('returns false for disabled flags', () => {
      expect(shouldShowInNav('enableWebinars')).toBe(false);
      expect(shouldShowInNav('enableSeries')).toBe(false);
    });

    it('returns true for enabled flags with nav exposure', () => {
      expect(shouldShowInNav('enableEvidenceLibrary')).toBe(true);
    });

    it('returns false for footer-only exposure even if enabled', () => {
      // webinars has footer-only exposure, and is disabled by default
      // but even if it were enabled, footer-only should not show in nav
      expect(shouldShowInNav('enableWebinars')).toBe(false);
    });
  });

  describe('shouldShowInFooter', () => {
    it('returns false for disabled flags', () => {
      expect(shouldShowInFooter('enableWebinars')).toBe(false);
    });

    it('returns true for enabled flags with nav or footer-only exposure', () => {
      expect(shouldShowInFooter('enableEvidenceLibrary')).toBe(true);
      expect(shouldShowInFooter('enableSafetyCenter')).toBe(true);
    });
  });
});
