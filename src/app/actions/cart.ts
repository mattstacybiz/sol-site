"use server";

import { revalidatePath } from "next/cache";

import { commerce } from "@/lib/commerce";
import { getOrCreateCart, getCurrentCart } from "@/lib/cart-store";
import type { Cart } from "@/lib/commerce/types";

export async function addToCartAction(variantId: string, qty = 1): Promise<Cart> {
  const cart = await getOrCreateCart();
  const next = await commerce.addToCart(cart.id, variantId, qty);
  revalidatePath("/", "layout");
  return next;
}

export async function updateCartLineAction(lineId: string, qty: number): Promise<Cart | null> {
  const cart = await getCurrentCart();
  if (!cart) return null;
  const next = await commerce.updateCartLine(cart.id, lineId, qty);
  revalidatePath("/", "layout");
  return next;
}

export async function removeCartLineAction(lineId: string): Promise<Cart | null> {
  const cart = await getCurrentCart();
  if (!cart) return null;
  const next = await commerce.removeFromCart(cart.id, lineId);
  revalidatePath("/", "layout");
  return next;
}

export async function getCheckoutUrlAction(): Promise<string | null> {
  const cart = await getCurrentCart();
  if (!cart) return null;
  return commerce.getCheckoutUrl(cart.id);
}
