"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { addToCartAction } from "@/app/actions/cart";
import { analytics } from "@/lib/analytics";

export function AddToCartButton({
  variantId,
  productHandle,
  productTitle,
}: {
  variantId: string;
  productHandle: string;
  productTitle: string;
}) {
  const { setCart, open } = useCart();
  const [busy, setBusy] = React.useState(false);

  const onClick = async () => {
    setBusy(true);
    try {
      const next = await addToCartAction(variantId, 1);
      setCart(next);
      analytics.track("add_to_cart", { variantId, productHandle, productTitle });
      open();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button onClick={onClick} variant="sunset" size="lg" disabled={busy}>
      {busy ? "Adding…" : "Add to cart"}
    </Button>
  );
}
