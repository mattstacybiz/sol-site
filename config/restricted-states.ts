/**
 * US states where Sol does NOT currently ship.
 *
 * !! TODO — REVIEW WITH COUNSEL BEFORE LAUNCH !!
 *
 * Kava regulation varies by jurisdiction (and by county/municipality in
 * some cases). This list is a placeholder — Matt must confirm the final
 * list with a regulatory attorney before going live.
 *
 * Used in:
 *  - /policies/shipping page (rendered as a list)
 *  - Future checkout state-validation logic
 */

export type RestrictedState = {
  code: string; // 2-letter USPS code
  name: string;
  reason: string; // brief, lawyer-friendly note
};

export const restrictedStates: RestrictedState[] = [
  // Examples below are illustrative only — DO NOT trust this list for shipping decisions.
  // Counsel must confirm.
  {
    code: "XX",
    name: "PLACEHOLDER",
    reason:
      "Replace this list with the final attorney-reviewed set before launch.",
  },
];

export const isShippableState = (code: string): boolean =>
  !restrictedStates.some((s) => s.code.toUpperCase() === code.toUpperCase());
