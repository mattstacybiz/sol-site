/**
 * Commerce adapter selector. Pages and components import from here.
 *
 *   import { commerce } from "@/lib/commerce";
 *   const products = await commerce.listProducts();
 *
 * The active implementation is decided once at module load by the
 * COMMERCE_PROVIDER env var (default: "mock").
 */

import { mockCommerce } from "./mock";
import { shopifyCommerce } from "./shopify";
import type { CommerceAdapter } from "./types";

const provider = (process.env.COMMERCE_PROVIDER ?? "mock").toLowerCase();

export const commerce: CommerceAdapter =
  provider === "shopify" ? shopifyCommerce : mockCommerce;

export type { Cart, CartLine, Product, ProductVariant, Money } from "./types";
