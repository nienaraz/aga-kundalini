/**
 * Feature flags — single source of truth.
 *
 * Default: OFF for all "big" features.
 * Override via env: NEXT_PUBLIC_FLAG_ENABLE_WEBINARS=true
 *
 * When a flag is OFF the corresponding routes must:
 *  - return 404 for non-admin users
 *  - be excluded from nav, footer, homepage, sitemap, and RSS
 */

export type ExposureMode = 'disabled' | 'footer-only' | 'nav' | 'members-only';

export interface FeatureFlag {
  enabled: boolean;
  exposure: ExposureMode;
  /** Route prefixes controlled by this flag */
  routes: string[];
  label: string;
}

export type FlagName =
  | 'enableWebinars'
  | 'enableSeries'
  | 'enableChallenges'
  | 'enableMembersArea'
  | 'enableEvidenceLibrary'
  | 'enableSafetyCenter';

function envBool(key: string, fallback: boolean): boolean {
  const v = typeof process !== 'undefined' ? process.env?.[key] : undefined;
  if (v === undefined || v === '') return fallback;
  return v === 'true' || v === '1';
}

export const featureFlags: Record<FlagName, FeatureFlag> = {
  enableWebinars: {
    enabled: envBool('NEXT_PUBLIC_FLAG_ENABLE_WEBINARS', false),
    exposure: 'footer-only',
    routes: ['/webinars'],
    label: 'Webinary',
  },
  enableSeries: {
    enabled: envBool('NEXT_PUBLIC_FLAG_ENABLE_SERIES', false),
    exposure: 'disabled',
    routes: ['/series'],
    label: 'Serie',
  },
  enableChallenges: {
    enabled: envBool('NEXT_PUBLIC_FLAG_ENABLE_CHALLENGES', false),
    exposure: 'disabled',
    routes: ['/challenges'],
    label: 'Wyzwania',
  },
  enableMembersArea: {
    enabled: envBool('NEXT_PUBLIC_FLAG_ENABLE_MEMBERS_AREA', false),
    exposure: 'disabled',
    routes: ['/members'],
    label: 'Strefa członkowska',
  },
  enableEvidenceLibrary: {
    enabled: envBool('NEXT_PUBLIC_FLAG_ENABLE_EVIDENCE', true),
    exposure: 'nav',
    routes: ['/resources/evidence'],
    label: 'Biblioteka dowodów',
  },
  enableSafetyCenter: {
    enabled: envBool('NEXT_PUBLIC_FLAG_ENABLE_SAFETY', true),
    exposure: 'nav',
    routes: ['/safety'],
    label: 'Centrum bezpieczeństwa',
  },
};

/** Check if a flag is enabled */
export function isFeatureEnabled(name: FlagName): boolean {
  return featureFlags[name]?.enabled ?? false;
}

/** Check if a route is blocked by a disabled flag. Returns the flag name if blocked, null otherwise. */
export function getBlockingFlag(pathname: string): FlagName | null {
  for (const [name, flag] of Object.entries(featureFlags) as [FlagName, FeatureFlag][]) {
    if (!flag.enabled) {
      for (const route of flag.routes) {
        if (pathname === route || pathname.startsWith(route + '/')) {
          return name;
        }
      }
    }
  }
  return null;
}

/** Get all route prefixes that are currently disabled */
export function getDisabledRoutes(): string[] {
  const disabled: string[] = [];
  for (const flag of Object.values(featureFlags)) {
    if (!flag.enabled) {
      disabled.push(...flag.routes);
    }
  }
  return disabled;
}

/** Check if a route should appear in navigation based on exposure mode */
export function shouldShowInNav(name: FlagName): boolean {
  const flag = featureFlags[name];
  if (!flag) return false;
  return flag.enabled && (flag.exposure === 'nav');
}

/** Check if a route should appear in footer */
export function shouldShowInFooter(name: FlagName): boolean {
  const flag = featureFlags[name];
  if (!flag) return false;
  return flag.enabled && (flag.exposure === 'nav' || flag.exposure === 'footer-only');
}
