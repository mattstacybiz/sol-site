/**
 * GA4 client adapter — assumes the gtag.js loader is on the page.
 * The loader is injected by AnalyticsProvider when ga4 is in ANALYTICS_PROVIDERS.
 */

import type { AnalyticsAdapter } from "./types";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: unknown[];
  }
}

const safe = (fn: () => void) => {
  if (typeof window === "undefined") return;
  try {
    fn();
  } catch {
    /* swallow — analytics must never break the page */
  }
};

export const ga4Analytics: AnalyticsAdapter = {
  track(event, props) {
    safe(() => window.gtag?.("event", event, props ?? {}));
  },
  identify(userId, traits) {
    safe(() => window.gtag?.("set", "user_properties", { user_id: userId, ...traits }));
  },
  page(path, title) {
    safe(() => window.gtag?.("event", "page_view", { page_path: path, page_title: title }));
  },
};
