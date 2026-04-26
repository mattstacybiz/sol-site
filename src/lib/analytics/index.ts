/**
 * Analytics adapter selector.
 *
 *   import { analytics } from "@/lib/analytics";
 *   analytics.track("add_to_cart", { variantId, qty });
 *
 * Also exports a `getProviderList()` helper used by AnalyticsProvider to
 * decide which third-party loaders to inject into the page.
 */

import { ga4Analytics } from "./ga4";
import { metaAnalytics } from "./meta";
import { multiAnalytics } from "./multi";
import { noopAnalytics } from "./noop";
import { posthogAnalytics } from "./posthog";
import { tiktokAnalytics } from "./tiktok";
import type { AnalyticsAdapter } from "./types";

export const PROVIDER_NAMES = ["ga4", "meta", "tiktok", "posthog"] as const;
export type ProviderName = (typeof PROVIDER_NAMES)[number];

export function getProviderList(): ProviderName[] {
  // NEXT_PUBLIC_ is required so the value is also available on the client.
  const raw = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDERS ?? process.env.ANALYTICS_PROVIDERS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is ProviderName => (PROVIDER_NAMES as readonly string[]).includes(s));
}

const buildAdapter = (): AnalyticsAdapter => {
  const list = getProviderList();
  if (list.length === 0) return noopAnalytics;
  const adapters = list.map((p) => {
    switch (p) {
      case "ga4":
        return ga4Analytics;
      case "meta":
        return metaAnalytics;
      case "tiktok":
        return tiktokAnalytics;
      case "posthog":
        return posthogAnalytics;
    }
  });
  return adapters.length === 1 ? adapters[0]! : multiAnalytics(adapters);
};

export const analytics: AnalyticsAdapter = buildAdapter();

export type { AnalyticsAdapter, AnalyticsEvent, AnalyticsProps } from "./types";
