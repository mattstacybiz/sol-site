/**
 * Default no-op analytics. Lets every call site `analytics.track(...)` safely
 * even when no provider is configured (i.e. local dev with empty .env).
 */

import type { AnalyticsAdapter } from "./types";

export const noopAnalytics: AnalyticsAdapter = {
  track() {
    /* no-op */
  },
  identify() {
    /* no-op */
  },
  page() {
    /* no-op */
  },
};
