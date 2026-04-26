/**
 * TikTok Pixel adapter. Loader injected by AnalyticsProvider.
 */

import type { AnalyticsAdapter } from "./types";

declare global {
  interface Window {
    ttq?: { track: (e: string, p?: unknown) => void; page: () => void; identify: (t: unknown) => void };
  }
}

const TT_EVENT_MAP: Record<string, string> = {
  add_to_cart: "AddToCart",
  checkout_start: "InitiateCheckout",
  contact_submit: "Contact",
  wholesale_submit: "SubmitForm",
  newsletter_submit: "Subscribe",
};

const safe = (fn: () => void) => {
  if (typeof window === "undefined") return;
  try {
    fn();
  } catch {
    /* swallow */
  }
};

export const tiktokAnalytics: AnalyticsAdapter = {
  track(event, props) {
    const mapped = TT_EVENT_MAP[event] ?? event;
    safe(() => window.ttq?.track(mapped, props));
  },
  identify(userId, traits) {
    safe(() => window.ttq?.identify({ external_id: userId, ...traits }));
  },
  page() {
    safe(() => window.ttq?.page());
  },
};
