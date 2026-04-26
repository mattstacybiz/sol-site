/**
 * In-memory commerce adapter — the default. Lets `pnpm dev` work with
 * zero credentials. All product copy is placeholder; Matt should edit
 * inline or swap to the Shopify adapter once a real catalog exists.
 *
 * !! TODO: Matt to replace placeholder copy, photography, and pricing.
 *    Add additional SKUs (e.g. a "Reserve" strength) once formulation locks.
 */

import { randomUUID } from "node:crypto";

import type {
  Cart,
  CartLine,
  CommerceAdapter,
  ListProductsOpts,
  Money,
  Product,
} from "./types";

const USD = (amount: string): Money => ({ amount, currencyCode: "USD" });

const placeholderImage = (q: string, seed: string) => ({
  // Unsplash-source URLs are stable per seed and resize on the fly.
  url: `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=80&sig=${seed}`,
  alt: "",
  width: 1200,
  height: 1200,
});

// ---------------------------------------------------------------------------
// Seed catalog — three launch SKUs.
// ---------------------------------------------------------------------------

const PRODUCTS: Product[] = [
  {
    id: "prod_sol_original_can",
    handle: "sol-original",
    title: "Sol Original",
    subtitle: "20 noble kava pouches. Standard strength.",
    description:
      "The everyday Sol pouch. Concentrated noble kava root extract in a soft, slim pouch you tuck under your lip. Twenty per can — about a week if you pace yourself, a long weekend if you don't.",
    category: "single",
    popularity: 90,
    badges: ["Bestseller"],
    images: [
      {
        ...placeholderImage(
          "photo-1556909114-f6e7ad7d3136",
          "sol-original-1",
        ),
        alt: "A can of Sol Original kava pouches on a sunset-lit table.",
      },
      {
        ...placeholderImage("photo-1518791841217-8f162f1e1131", "sol-2"),
        alt: "Close-up of a Sol kava pouch.",
      },
    ],
    variants: [
      {
        id: "var_sol_original_can",
        title: "20-pouch can",
        price: USD("24.00"), // TODO: confirm launch price with Matt
        available: true,
      },
    ],
    priceFrom: USD("24.00"),
    specs: [
      { label: "Pouches per can", value: "20" },
      // TODO: lock kavalactone mg per pouch with Daily Manufacturing
      { label: "Kavalactones per pouch", value: "TBD mg" },
      { label: "Strength", value: "Standard" },
      { label: "Made in", value: "USA" },
    ],
    ingredients: [
      "Noble kava root extract",
      "Microcrystalline cellulose",
      "Food-grade flavor base",
      "Xanthan gum",
    ],
  },
  {
    id: "prod_sol_original_5pack",
    handle: "sol-original-5pack",
    title: "Sol Original — 5-Can Multipack",
    subtitle: "Five cans, one box. Stock the bar (and the glovebox).",
    description:
      "Save when you stock up. Five cans of Sol Original — 100 pouches total — in one box. Free shipping on multipacks.",
    category: "multipack",
    popularity: 80,
    badges: ["Best value"],
    images: [
      {
        ...placeholderImage("photo-1542838132-92c53300491e", "sol-5pack-1"),
        alt: "Five cans of Sol Original arranged in a row.",
      },
    ],
    variants: [
      {
        id: "var_sol_original_5pack",
        title: "5-can multipack",
        price: USD("108.00"), // ~10% off vs. 5x single — TODO confirm
        compareAtPrice: USD("120.00"),
        available: true,
      },
    ],
    priceFrom: USD("108.00"),
    specs: [
      { label: "Cans", value: "5" },
      { label: "Pouches total", value: "100" },
      { label: "Shipping", value: "Free in the US" },
      { label: "Made in", value: "USA" },
    ],
    ingredients: [
      "Noble kava root extract",
      "Microcrystalline cellulose",
      "Food-grade flavor base",
      "Xanthan gum",
    ],
  },
  {
    id: "prod_sol_sample_pack",
    handle: "sol-sample-pack",
    title: "Sol Sample Pack",
    subtitle: "One can, one sticker. New to kava? Start here.",
    description:
      "A first-timer's pack: one can of Sol Original (20 pouches) plus a Sol sticker for your laptop, water bottle, or kava bar wall. Built for trying.",
    category: "sample",
    popularity: 70,
    badges: ["New here?"],
    images: [
      {
        ...placeholderImage("photo-1525904097878-94fb15835963", "sol-sample-1"),
        alt: "A Sol Sample Pack — one can plus a brand sticker.",
      },
    ],
    variants: [
      {
        id: "var_sol_sample_pack",
        title: "Sample pack",
        price: USD("18.00"), // TODO confirm — keep this trial-friendly
        available: true,
      },
    ],
    priceFrom: USD("18.00"),
    specs: [
      { label: "Includes", value: "1 can + 1 sticker" },
      { label: "Pouches", value: "20" },
      { label: "Made in", value: "USA" },
    ],
    ingredients: [
      "Noble kava root extract",
      "Microcrystalline cellulose",
      "Food-grade flavor base",
      "Xanthan gum",
    ],
  },
  // TODO: add "Sol Reserve" (stronger formulation) once kavalactone delivery
  // is locked in with Daily Manufacturing. Also flavored variants when ready.
];

// ---------------------------------------------------------------------------
// In-memory cart store. Survives within a single dev session (process memory).
// In production, the Shopify adapter handles cart state via the API.
// ---------------------------------------------------------------------------

const CARTS = new Map<string, Cart>();

const sumMoney = (lines: CartLine[]): Money => {
  const total = lines.reduce(
    (acc, l) => acc + parseFloat(l.lineTotal.amount),
    0,
  );
  return { amount: total.toFixed(2), currencyCode: "USD" };
};

const lineTotal = (unit: Money, qty: number): Money => ({
  amount: (parseFloat(unit.amount) * qty).toFixed(2),
  currencyCode: unit.currencyCode,
});

const recalc = (cart: Cart): Cart => ({
  ...cart,
  subtotal: sumMoney(cart.lines),
  totalQuantity: cart.lines.reduce((n, l) => n + l.quantity, 0),
});

const findVariant = (variantId: string) => {
  for (const p of PRODUCTS) {
    const v = p.variants.find((x) => x.id === variantId);
    if (v) return { product: p, variant: v };
  }
  return null;
};

// ---------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------

export const mockCommerce: CommerceAdapter = {
  async listProducts(opts: ListProductsOpts = {}) {
    let out = [...PRODUCTS];
    if (opts.category) out = out.filter((p) => p.category === opts.category);
    switch (opts.sort) {
      case "price-asc":
        out.sort(
          (a, b) =>
            parseFloat(a.priceFrom.amount) - parseFloat(b.priceFrom.amount),
        );
        break;
      case "price-desc":
        out.sort(
          (a, b) =>
            parseFloat(b.priceFrom.amount) - parseFloat(a.priceFrom.amount),
        );
        break;
      case "popularity":
      case "default":
      default:
        out.sort((a, b) => b.popularity - a.popularity);
    }
    if (opts.limit) out = out.slice(0, opts.limit);
    return out;
  },

  async getProduct(handle: string) {
    return PRODUCTS.find((p) => p.handle === handle) ?? null;
  },

  async createCart() {
    const cart: Cart = {
      id: `cart_${randomUUID()}`,
      lines: [],
      subtotal: USD("0.00"),
      totalQuantity: 0,
      checkoutUrl: null,
    };
    CARTS.set(cart.id, cart);
    return cart;
  },

  async addToCart(cartId, variantId, qty) {
    const cart = CARTS.get(cartId);
    if (!cart) throw new Error(`Cart not found: ${cartId}`);
    const found = findVariant(variantId);
    if (!found) throw new Error(`Variant not found: ${variantId}`);

    const existing = cart.lines.find((l) => l.variantId === variantId);
    if (existing) {
      existing.quantity += qty;
      existing.lineTotal = lineTotal(existing.unitPrice, existing.quantity);
    } else {
      cart.lines.push({
        id: `line_${randomUUID()}`,
        productId: found.product.id,
        variantId: found.variant.id,
        productHandle: found.product.handle,
        title: found.product.title,
        variantTitle: found.variant.title,
        image: found.product.images[0],
        quantity: qty,
        unitPrice: found.variant.price,
        lineTotal: lineTotal(found.variant.price, qty),
      });
    }
    const next = recalc(cart);
    CARTS.set(cart.id, next);
    return next;
  },

  async updateCartLine(cartId, lineId, qty) {
    const cart = CARTS.get(cartId);
    if (!cart) throw new Error(`Cart not found: ${cartId}`);
    const line = cart.lines.find((l) => l.id === lineId);
    if (!line) return cart;
    if (qty <= 0) {
      cart.lines = cart.lines.filter((l) => l.id !== lineId);
    } else {
      line.quantity = qty;
      line.lineTotal = lineTotal(line.unitPrice, qty);
    }
    const next = recalc(cart);
    CARTS.set(cart.id, next);
    return next;
  },

  async removeFromCart(cartId, lineId) {
    return this.updateCartLine(cartId, lineId, 0);
  },

  async getCart(cartId) {
    return CARTS.get(cartId) ?? null;
  },

  async getCheckoutUrl(cartId) {
    const cart = CARTS.get(cartId);
    if (!cart) throw new Error(`Cart not found: ${cartId}`);
    // No real checkout in mock mode — surface a useful sentinel.
    return `/checkout-preview?cartId=${encodeURIComponent(cartId)}`;
  },
};
