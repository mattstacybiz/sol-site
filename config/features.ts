/**
 * Feature flags. Flip these without touching component code.
 *
 * Some flags can be overridden at runtime via env vars (NEXT_PUBLIC_FEATURE_*)
 * so we can stage things in production without redeploying.
 */

const env = (key: string, fallback: boolean): boolean => {
  const v = process.env[key];
  if (v == null) return fallback;
  return v === "1" || v.toLowerCase() === "true";
};

export const features = {
  /** Show the 18+ age gate on first visit. Off by default — flip for launch. */
  ageGate: env("NEXT_PUBLIC_FEATURE_AGE_GATE", false),
  /** Show the newsletter signup in the footer + after add-to-cart. */
  newsletter: env("NEXT_PUBLIC_FEATURE_NEWSLETTER", true),
  /** Expose the wholesale page + nav link. */
  wholesale: env("NEXT_PUBLIC_FEATURE_WHOLESALE", true),
  /** Expose /find-us store locator (will read empty until locations are seeded). */
  locator: env("NEXT_PUBLIC_FEATURE_LOCATOR", true),
  /** Show a top-of-page announcement bar. */
  announcementBar: env("NEXT_PUBLIC_FEATURE_ANNOUNCEMENT", true),
} as const;

export type Features = typeof features;
