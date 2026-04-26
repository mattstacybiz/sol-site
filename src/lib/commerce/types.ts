/**
 * Commerce types — shared across every implementation.
 *
 * Keep these provider-agnostic. If Shopify exposes a field that doesn't
 * fit here, map it inside shopify.ts rather than leaking the shape upward.
 */

export type Money = {
  /** Decimal amount as a string to avoid float math (e.g. "24.00"). */
  amount: string;
  /** ISO 4217 currency code. */
  currencyCode: string;
};

export type ProductImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  price: Money;
  /** Optional MSRP / compare-at price for showing a strikethrough. */
  compareAtPrice?: Money | null;
  available: boolean;
  /** Variant-level options (e.g. flavor, strength). Empty if single-variant. */
  options?: { name: string; value: string }[];
};

export type ProductCategory = "single" | "multipack" | "sample" | "merch";

export type Product = {
  id: string;
  /** URL-safe handle, used at /shop/[handle]. */
  handle: string;
  title: string;
  /** One-line teaser for cards and PDP hero. */
  subtitle: string;
  /** Long-form HTML or rich text — kept as plain string here for portability. */
  description: string;
  category: ProductCategory;
  /** Sort hint — higher first. */
  popularity: number;
  images: ProductImage[];
  variants: ProductVariant[];
  /** Convenience: cheapest variant's price for cards. */
  priceFrom: Money;
  /** Marketing-facing tags (e.g. "Bestseller"). Not Shopify tags. */
  badges?: string[];
  /** Per-product spec list rendered on PDP. */
  specs?: { label: string; value: string }[];
  /** Static ingredients block. */
  ingredients?: string[];
};

export type CartLine = {
  id: string;
  productId: string;
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  image?: ProductImage;
  quantity: number;
  unitPrice: Money;
  lineTotal: Money;
};

export type Cart = {
  id: string;
  lines: CartLine[];
  subtotal: Money;
  totalQuantity: number;
  /** Hosted checkout URL (Shopify Shop Pay etc.) — null for mock. */
  checkoutUrl: string | null;
};

export type ListProductsOpts = {
  category?: ProductCategory;
  /** Sort key — implementations should treat unknown keys as "default". */
  sort?: "default" | "price-asc" | "price-desc" | "popularity";
  limit?: number;
};

export interface CommerceAdapter {
  listProducts(opts?: ListProductsOpts): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
  createCart(): Promise<Cart>;
  addToCart(cartId: string, variantId: string, qty: number): Promise<Cart>;
  updateCartLine(cartId: string, lineId: string, qty: number): Promise<Cart>;
  removeFromCart(cartId: string, lineId: string): Promise<Cart>;
  getCart(cartId: string): Promise<Cart | null>;
  getCheckoutUrl(cartId: string): Promise<string>;
}
