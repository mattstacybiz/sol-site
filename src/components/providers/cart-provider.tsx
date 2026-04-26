"use client";

import * as React from "react";

import type { Cart } from "@/lib/commerce/types";

type CartContextValue = {
  cart: Cart | null;
  /** Open the cart drawer (set by CartDrawer). */
  open: () => void;
  /** Programmatically replace local cart state after a server action. */
  setCart: (cart: Cart | null) => void;
  /** Drawer state — wired to CartDrawer. */
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<Cart | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  // Hydrate the cart from the server on first paint (cookie -> server -> JSON).
  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/cart", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Cart | null) => {
        if (!cancelled) setCart(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const value = React.useMemo<CartContextValue>(
    () => ({ cart, setCart, isOpen, setIsOpen, open: () => setIsOpen(true) }),
    [cart, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
