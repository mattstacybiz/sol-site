/**
 * Payments adapter types.
 *
 * !! Not implemented. Sol uses Shopify's hosted checkout (Shop Pay, Apple Pay,
 * Google Pay) via the Storefront API — see /lib/commerce/shopify.ts.
 *
 * Only build this out if Sol moves OFF Shopify checkout (e.g. a fully custom
 * checkout running on Stripe). Stripe Checkout Sessions docs:
 *   https://docs.stripe.com/payments/checkout
 *   https://docs.stripe.com/payments/quickstart?lang=node
 */

export interface PaymentsAdapter {
  createCheckoutSession(input: {
    lineItems: { variantId: string; quantity: number }[];
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ url: string }>;
}
