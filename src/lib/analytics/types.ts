/**
 * Analytics adapter types.
 *
 * Designed to be a fan-out: the active "adapter" can be one provider OR a
 * composite (multi.ts) that broadcasts every event to GA4, Meta, TikTok, etc.
 */

export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

/**
 * A small, opinionated catalog of named events. Adding a new event here keeps
 * call sites lint-friendly and helps future Matt grep for what fires where.
 */
export type AnalyticsEvent =
  | "page_view"
  | "add_to_cart"
  | "remove_from_cart"
  | "checkout_start"
  | "contact_submit"
  | "wholesale_submit"
  | "newsletter_submit"
  | "age_gate_pass"
  | "age_gate_fail";

export interface AnalyticsAdapter {
  /** Track a named event with optional properties. */
  track(event: AnalyticsEvent, props?: AnalyticsProps): void;
  /** Tie an anonymous user to a known identity (email, customer id). */
  identify(userId: string, traits?: AnalyticsProps): void;
  /** Page view — typically called from the top-level layout. */
  page(path: string, title?: string): void;
}
