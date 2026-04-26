/**
 * In-memory commerce adapter — the default. Lets `pnpm dev` work with
 * zero credentials. All product copy is placeholder; Matt should edit
 * inline or swap to the Shopify adapter once a real catalog exists.
 *
 * !! TODO: Matt to replace placeholder copy, photography, and pricing.
 *    Add additional flavors / sleeve sizes once the lineup expands.
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

// Local SVG mockups live under /public/images/products. They render crisp at
// any size and don't depend on external image hosts. Swap to real product
// photography in Shopify once we have shoot files.
const localImage = (file: string, alt: string) => ({
  url: `/images/products/${file}`,
  alt,
  width: 1200,
  height: 1200,
});

// ---------------------------------------------------------------------------
// Seed catalog — sleeves only. One flavor (mint) at launch.
// ---------------------------------------------------------------------------

const PRODUCTS: Product[] = [
  {
    id: "prod_sol_mint_sleeve",
    handle: "sol-mint-sleeve",
    title: "Sol Mint — Sleeve",
    subtitle: "Five tins of noble kava pouches. Cool mint.",
    description:
      "A sleeve of Sol Mint — five tins, twenty pouches each, one hundred pouches total. Concentrated noble kava root extract in a soft pouch you tuck under your lip. Cool mint flavor. Free shipping in the US.",
    category: "sleeve",
    popularity: 100,
    badges: ["Mint"],
    images: [
      localImage(
        "sol-original-5pack.svg",
        "A sleeve of five Sol Mint tins, fanned out.",
      ),
    ],
    variants: [
      {
        id: "var_sol_mint_sleeve",
        title: "Mint · 5-tin sleeve",
        price: USD("108.00"), // TODO confirm launch price
        available: true,
      },
    ],
    priceFrom: USD("108.00"),
    specs: [
      { label: "Flavor", value: "Mint" },
      { label: "Tins per sleeve", value: "5" },
      { label: "Pouches per tin", value: "20" },
      { label: "Pouches total", value: "100" },
      { label: "Shipping", value: "Free in the US" },
      { label: "Made in", value: "USA" },
    ],
    ingredients: [
      "Noble kava root extract",
      "Microcrystalline cellulose",
      "Natural mint flavor",
      "Xanthan gum",
    ],
  },
  // TODO: add additional flavors / sleeve sizes as the lineup expands.
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
