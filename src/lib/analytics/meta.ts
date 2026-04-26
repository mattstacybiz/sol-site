/**
 * Meta (Facebook) Pixel adapter. Loader injected by AnalyticsProvider.
 */

import type { AnalyticsAdapter } from "./types";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

// Map our internal event names to standard Pixel events where possible.
const META_EVENT_MAP: Record<string, string> = {
  add_to_cart: "AddToCart",
  checkout_start: "InitiateCheckout",
  contact_submit: "Contact",
  wholesale_submit: "Lead",
  newsletter_submit: "Subscribe",
  page_view: "PageView",
};

const safe = (fn: () => void) => {
  if (typeof window === "undefined") return;
  try {
    fn();
  } catch {
    /* swallow */
  }
};

export const metaAnalytics: AnalyticsAdapter = {
  track(event, props) {
    const mapped = META_EVENT_MAP[event];
    safe(() => {
      if (mapped) window.fbq?.("track", mapped, props ?? {});
      else window.fbq?.("trackCustom", event, props ?? {});
    });
  },
  identify() {
    /* Pixel ties to cookies; no first-class identify */
  },
  page() {
    safe(() => window.fbq?.("track", "PageView"));
  },
};
