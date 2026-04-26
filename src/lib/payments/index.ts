/**
 * Payments adapter — intentionally not wired.
 *
 * Sol uses Shopify's hosted checkout. If we ever migrate to a self-hosted
 * Stripe checkout, implement `stripe.ts` against `PaymentsAdapter` here.
 */

import type { PaymentsAdapter } from "./types";

export const payments: PaymentsAdapter = {
  async createCheckoutSession() {
    throw new Error(
      "Payments adapter is not implemented. Sol uses Shopify hosted checkout — see /lib/commerce/shopify.ts.",
    );
  },
};

export type { PaymentsAdapter } from "./types";
