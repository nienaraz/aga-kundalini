export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

const isDev =
  typeof process !== "undefined" && process.env.NODE_ENV === "development";

/**
 * Track a custom analytics event.
 * In development: logs to console. In production: no-op (placeholder for real analytics).
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (isDev) {
    console.log("[Analytics] Event:", event.name, event.properties ?? "");
  }
  // TODO: integrate real analytics provider (e.g. Plausible, Umami)
}

/**
 * Track a page view.
 * In development: logs to console. In production: no-op (placeholder for real analytics).
 */
export function trackPageView(path: string): void {
  if (isDev) {
    console.log("[Analytics] Page view:", path);
  }
  // TODO: integrate real analytics provider
}

/**
 * Hook placeholder for analytics in React components.
 * Returns trackEvent and trackPageView functions.
 */
export function useAnalytics(): {
  trackEvent: typeof trackEvent;
  trackPageView: typeof trackPageView;
} {
  return { trackEvent, trackPageView };
}
