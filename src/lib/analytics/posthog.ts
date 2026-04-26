/**
 * PostHog adapter — useful for product analytics + session replay.
 *
 * Uses the loader injected by AnalyticsProvider; no heavy SDK import here.
 */

import type { AnalyticsAdapter } from "./types";

declare global {
  interface Window {
    posthog?: { capture: (e: string, p?: unknown) => void; identify: (id: string, p?: unknown) => void };
  }
}

const safe = (fn: () => void) => {
  if (typeof window === "undefined") return;
  try {
    fn();
  } catch {
    /* swallow */
  }
};

export const posthogAnalytics: AnalyticsAdapter = {
  track(event, props) {
    safe(() => window.posthog?.capture(event, props));
  },
  identify(userId, traits) {
    safe(() => window.posthog?.identify(userId, traits));
  },
  page(path, title) {
    safe(() => window.posthog?.capture("$pageview", { path, title }));
  },
};
