/**
 * Shipping adapter selector. Stub by default.
 */

import { stubShipping } from "./stub";
import type { ShippingAdapter } from "./types";

const provider = (process.env.SHIPPING_PROVIDER ?? "stub").toLowerCase();

export const shipping: ShippingAdapter = (() => {
  switch (provider) {
    // case "amazon_mcf": return amazonMcfShipping;
    // case "shipbob":    return shipbobShipping;
    // case "shipstation": return shipStationShipping;
    default:
      return stubShipping;
  }
})();

export type { Address, ShippingRate, ShippingItem, FulfillmentOrder } from "./types";
