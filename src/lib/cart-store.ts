/**
 * Server-side cart helpers. The cart id lives in an httpOnly cookie so
 * server actions can read/mutate it on every request without round-tripping
 * the id back to the client.
 */

import { cookies } from "next/headers";

import { commerce } from "./commerce";
import type { Cart } from "./commerce/types";

const COOKIE = "sol_cart_id";
const SECONDS_IN_30_DAYS = 60 * 60 * 24 * 30;

/** Get the current cart, or `null` if there isn't one yet. */
export async function getCurrentCart(): Promise<Cart | null> {
  const id = cookies().get(COOKIE)?.value;
  if (!id) return null;
  try {
    return await commerce.getCart(id);
  } catch {
    return null;
  }
}

/** Get the current cart, creating one if needed, and stash the id in a cookie. */
export async function getOrCreateCart(): Promise<Cart> {
  const existing = await getCurrentCart();
  if (existing) return existing;
  const cart = await commerce.createCart();
  cookies().set(COOKIE, cart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SECONDS_IN_30_DAYS,
  });
  return cart;
}
