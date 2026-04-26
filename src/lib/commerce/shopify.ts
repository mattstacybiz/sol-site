/**
 * Shopify Storefront API adapter.
 *
 * To activate:
 *   1. Set COMMERCE_PROVIDER=shopify in .env.local
 *   2. Create a Storefront API access token in your Shopify admin
 *      (Apps -> Develop apps -> Configure Storefront API access).
 *   3. Set SHOPIFY_STORE_DOMAIN (e.g. "solkava.myshopify.com") and
 *      SHOPIFY_STOREFRONT_API_TOKEN.
 *
 * Notes:
 *  - We never import @shopify/* SDKs — we hit the GraphQL endpoint directly
 *    so this stays dependency-light and easy to vendor-swap.
 *  - Cart and checkout use the modern Cart API, NOT legacy Checkout API.
 *  - `checkoutUrl` returned from `cartCreate` is the Shop Pay-enabled URL.
 */

import type {
  Cart,
  CartLine,
  CommerceAdapter,
  ListProductsOpts,
  Money,
  Product,
} from "./types";

const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2024-10";

const endpoint = () => {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!domain)
    throw new Error("SHOPIFY_STORE_DOMAIN is not set — cannot use Shopify adapter.");
  return `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`;
};

const token = () => {
  const t = process.env.SHOPIFY_STOREFRONT_API_TOKEN;
  if (!t)
    throw new Error(
      "SHOPIFY_STOREFRONT_API_TOKEN is not set — cannot use Shopify adapter.",
    );
  return t;
};

async function gql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token(),
    },
    body: JSON.stringify({ query, variables }),
    // Storefront responses change with cart state — don't cache mutations,
    // and tag reads so we can revalidate by tag if needed later.
    next: { revalidate: 60, tags: ["shopify"] },
  });
  if (!res.ok) {
    throw new Error(`Shopify GraphQL error: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  if (!json.data) throw new Error("Shopify GraphQL returned no data.");
  return json.data;
}

// ---------------------------------------------------------------------------
// Mappers — keep Shopify shapes from leaking past this file.
// ---------------------------------------------------------------------------

type ShopifyMoney = { amount: string; currencyCode: string };

type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: { name: string; value: string }[];
};

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string | null;
  tags: string[];
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
  priceRange: { minVariantPrice: ShopifyMoney };
};

const toMoney = (m: ShopifyMoney): Money => ({
  amount: m.amount,
  currencyCode: m.currencyCode,
});

const toProduct = (p: ShopifyProduct): Product => ({
  id: p.id,
  handle: p.handle,
  title: p.title,
  subtitle: p.tags.find((t) => t.startsWith("subtitle:"))?.slice(9) ?? "",
  description: p.description,
  // Heuristic — refine in Shopify by tagging products with `category:single` etc.
  category:
    (p.tags.find((t) => t.startsWith("category:"))?.slice(9) as Product["category"]) ??
    "single",
  popularity:
    parseInt(p.tags.find((t) => t.startsWith("popularity:"))?.slice(11) ?? "0", 10) ||
    0,
  images: p.images.edges.map(({ node }) => ({
    url: node.url,
    alt: node.altText ?? p.title,
    width: node.width ?? undefined,
    height: node.height ?? undefined,
  })),
  variants: p.variants.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    price: toMoney(node.price),
    compareAtPrice: node.compareAtPrice ? toMoney(node.compareAtPrice) : null,
    available: node.availableForSale,
    options: node.selectedOptions,
  })),
  priceFrom: toMoney(p.priceRange.minVariantPrice),
  badges: p.tags.filter((t) => t.startsWith("badge:")).map((t) => t.slice(6)),
});

type ShopifyCartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: ShopifyMoney; amountPerQuantity: ShopifyMoney };
  merchandise: {
    id: string;
    title: string;
    image: ShopifyImage | null;
    product: { id: string; handle: string; title: string };
  };
};

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: ShopifyMoney };
  lines: { edges: { node: ShopifyCartLine }[] };
};

const toCart = (c: ShopifyCart): Cart => {
  const lines: CartLine[] = c.lines.edges.map(({ node }) => ({
    id: node.id,
    productId: node.merchandise.product.id,
    variantId: node.merchandise.id,
    productHandle: node.merchandise.product.handle,
    title: node.merchandise.product.title,
    variantTitle: node.merchandise.title,
    image: node.merchandise.image
      ? {
          url: node.merchandise.image.url,
          alt: node.merchandise.image.altText ?? node.merchandise.product.title,
          width: node.merchandise.image.width ?? undefined,
          height: node.merchandise.image.height ?? undefined,
        }
      : undefined,
    quantity: node.quantity,
    unitPrice: toMoney(node.cost.amountPerQuantity),
    lineTotal: toMoney(node.cost.totalAmount),
  }));
  return {
    id: c.id,
    lines,
    subtotal: toMoney(c.cost.subtotalAmount),
    totalQuantity: c.totalQuantity,
    checkoutUrl: c.checkoutUrl,
  };
};

// ---------------------------------------------------------------------------
// Queries / mutations
// ---------------------------------------------------------------------------

const PRODUCT_FIELDS = `
  id handle title description productType tags
  images(first: 8) { edges { node { url altText width height } } }
  variants(first: 25) {
    edges { node {
      id title availableForSale
      price { amount currencyCode }
      compareAtPrice { amount currencyCode }
      selectedOptions { name value }
    } }
  }
  priceRange { minVariantPrice { amount currencyCode } }
`;

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 50) { edges { node {
    id quantity
    cost {
      totalAmount { amount currencyCode }
      amountPerQuantity { amount currencyCode }
    }
    merchandise { ... on ProductVariant {
      id title
      image { url altText width height }
      product { id handle title }
    } }
  } } }
`;

export const shopifyCommerce: CommerceAdapter = {
  async listProducts(opts = {}) {
    const sortKey =
      opts.sort === "price-asc" || opts.sort === "price-desc"
        ? "PRICE"
        : "BEST_SELLING";
    const reverse = opts.sort === "price-desc";
    const data = await gql<{ products: { edges: { node: ShopifyProduct }[] } }>(
      `query Products($first:Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
        products(first: $first, sortKey: $sortKey, reverse: $reverse) {
          edges { node { ${PRODUCT_FIELDS} } }
        }
      }`,
      { first: opts.limit ?? 24, sortKey, reverse },
    );
    let out = data.products.edges.map(({ node }) => toProduct(node));
    if (opts.category) out = out.filter((p) => p.category === opts.category);
    return out;
  },

  async getProduct(handle: string) {
    const data = await gql<{ product: ShopifyProduct | null }>(
      `query Product($handle:String!) {
        product(handle: $handle) { ${PRODUCT_FIELDS} }
      }`,
      { handle },
    );
    return data.product ? toProduct(data.product) : null;
  },

  async createCart() {
    const data = await gql<{ cartCreate: { cart: ShopifyCart } }>(
      `mutation { cartCreate { cart { ${CART_FIELDS} } } }`,
    );
    return toCart(data.cartCreate.cart);
  },

  async addToCart(cartId, variantId, qty) {
    const data = await gql<{ cartLinesAdd: { cart: ShopifyCart } }>(
      `mutation Add($cartId:ID!, $lines:[CartLineInput!]!) {
        cartLinesAdd(cartId:$cartId, lines:$lines) { cart { ${CART_FIELDS} } }
      }`,
      { cartId, lines: [{ merchandiseId: variantId, quantity: qty }] },
    );
    return toCart(data.cartLinesAdd.cart);
  },

  async updateCartLine(cartId, lineId, qty) {
    const data = await gql<{ cartLinesUpdate: { cart: ShopifyCart } }>(
      `mutation Upd($cartId:ID!, $lines:[CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId:$cartId, lines:$lines) { cart { ${CART_FIELDS} } }
      }`,
      { cartId, lines: [{ id: lineId, quantity: qty }] },
    );
    return toCart(data.cartLinesUpdate.cart);
  },

  async removeFromCart(cartId, lineId) {
    const data = await gql<{ cartLinesRemove: { cart: ShopifyCart } }>(
      `mutation Rm($cartId:ID!, $lineIds:[ID!]!) {
        cartLinesRemove(cartId:$cartId, lineIds:$lineIds) { cart { ${CART_FIELDS} } }
      }`,
      { cartId, lineIds: [lineId] },
    );
    return toCart(data.cartLinesRemove.cart);
  },

  async getCart(cartId) {
    const data = await gql<{ cart: ShopifyCart | null }>(
      `query Cart($cartId:ID!) { cart(id:$cartId) { ${CART_FIELDS} } }`,
      { cartId },
    );
    return data.cart ? toCart(data.cart) : null;
  },

  async getCheckoutUrl(cartId) {
    const cart = await this.getCart(cartId);
    if (!cart?.checkoutUrl) throw new Error("No checkout URL on cart.");
    return cart.checkoutUrl;
  },
};
