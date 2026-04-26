/**
 * Composite adapter — fans out every call to a list of child adapters.
 * Used when ANALYTICS_PROVIDERS is "ga4,meta,tiktok" etc.
 */

import type { AnalyticsAdapter } from "./types";

export const multiAnalytics = (children: AnalyticsAdapter[]): AnalyticsAdapter => ({
  track(event, props) {
    for (const c of children) c.track(event, props);
  },
  identify(userId, traits) {
    for (const c of children) c.identify(userId, traits);
  },
  page(path, title) {
    for (const c of children) c.page(path, title);
  },
});
