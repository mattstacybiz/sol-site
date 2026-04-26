/**
 * Shipping adapter types.
 *
 * Stub for now — Sol launches direct from a small fulfillment partner.
 * Once volume justifies it, swap to Amazon Multi-Channel Fulfillment,
 * ShipBob, or ShipStation by implementing this interface.
 */

export type Address = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string; // ISO 3166-1 alpha-2 (default "US")
  phone?: string;
};

export type ShippingItem = {
  sku: string;
  quantity: number;
};

export type ShippingRate = {
  id: string;
  carrier: string;
  service: string;
  amount: string;
  currencyCode: string;
  estimatedBusinessDays?: { min: number; max: number };
};

export type FulfillmentOrder = {
  orderId: string;
  shipTo: Address;
  items: ShippingItem[];
};

export interface ShippingAdapter {
  getRates(input: { shipTo: Address; items: ShippingItem[] }): Promise<ShippingRate[]>;
  createFulfillment(input: FulfillmentOrder): Promise<{ id: string }>;
}
