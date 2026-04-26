/**
 * Stub shipping adapter — returns sensible placeholder rates and a fake
 * fulfillment id. Swap for a real provider when ready.
 *
 * TODO future implementations to slot in:
 *   - amazon-mcf.ts   → Amazon Multi-Channel Fulfillment (SP-API)
 *   - shipbob.ts      → ShipBob API
 *   - shipstation.ts  → ShipStation API
 *   - self-fulfill.ts → flat-rate matrix from Pirate Ship etc.
 */

import type { ShippingAdapter } from "./types";

export const stubShipping: ShippingAdapter = {
  async getRates() {
    // Free shipping on multipacks is enforced at the cart level; these are
    // single-can fallbacks so the UI can show *something* during development.
    return [
      {
        id: "ground",
        carrier: "USPS",
        service: "Ground Advantage",
        amount: "5.95",
        currencyCode: "USD",
        estimatedBusinessDays: { min: 3, max: 6 },
      },
      {
        id: "priority",
        carrier: "USPS",
        service: "Priority Mail",
        amount: "9.95",
        currencyCode: "USD",
        estimatedBusinessDays: { min: 2, max: 3 },
      },
    ];
  },
  async createFulfillment(input) {
    // eslint-disable-next-line no-console
    console.log("[shipping:stub] would create fulfillment for", input.orderId);
    return { id: `stub_${input.orderId}` };
  },
};
