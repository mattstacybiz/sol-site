"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { analytics } from "@/lib/analytics";
import {
  getCheckoutUrlAction,
  removeCartLineAction,
  updateCartLineAction,
} from "@/app/actions/cart";
import { formatMoney, pluralize } from "@/lib/utils";

export function CartDrawer() {
  const { cart, setCart, isOpen, setIsOpen } = useCart();
  const [busy, setBusy] = React.useState(false);

  const onUpdate = async (lineId: string, qty: number) => {
    setBusy(true);
    try {
      const next = await updateCartLineAction(lineId, qty);
      setCart(next);
    } finally {
      setBusy(false);
    }
  };

  const onRemove = async (lineId: string) => {
    setBusy(true);
    try {
      const next = await removeCartLineAction(lineId);
      setCart(next);
      analytics.track("remove_from_cart", { lineId });
    } finally {
      setBusy(false);
    }
  };

  const onCheckout = async () => {
    setBusy(true);
    analytics.track("checkout_start", { value: cart?.subtotal.amount });
    try {
      const url = await getCheckoutUrlAction();
      if (url) {
        if (url.startsWith("http")) window.location.href = url;
        else window.location.assign(url);
      }
    } finally {
      setBusy(false);
    }
  };

  const lines = cart?.lines ?? [];
  const subtotal = cart?.subtotal;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent side="right" className="flex h-full max-h-screen flex-col gap-0 p-0">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <DialogTitle>Your cart</DialogTitle>
          <DialogDescription className="sr-only">Items added to your cart.</DialogDescription>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
            <p className="font-display text-2xl text-ink">Cart&rsquo;s empty.</p>
            <p className="text-sm text-ink-muted">
              Pick up a can or grab a sample pack to get started.
            </p>
            <Button asChild variant="sunset" className="mt-2" onClick={() => setIsOpen(false)}>
              <Link href="/shop">Shop Sol</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
            {lines.map((line) => (
              <div key={line.id} className="flex gap-4 border-b border-ink/10 pb-4 last:border-none">
                {line.image ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-md bg-cream">
                    <Image
                      src={line.image.url}
                      alt={line.image.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex-1">
                  <Link href={`/shop/${line.productHandle}`} className="font-medium text-ink hover:text-sunset">
                    {line.title}
                  </Link>
                  <p className="text-xs text-ink-muted">{line.variantTitle}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="inline-flex items-center rounded-full border border-ink/15">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="p-2 text-ink hover:bg-ink/5 disabled:opacity-50"
                        disabled={busy}
                        onClick={() => onUpdate(line.id, Math.max(0, line.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-sm font-medium tabular-nums">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="p-2 text-ink hover:bg-ink/5 disabled:opacity-50"
                        disabled={busy}
                        onClick={() => onUpdate(line.id, line.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove from cart"
                      className="ml-auto inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
                      disabled={busy}
                      onClick={() => onRemove(line.id)}
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
                <div className="text-right text-sm font-medium text-ink">
                  {formatMoney(line.lineTotal.amount, line.lineTotal.currencyCode)}
                </div>
              </div>
            ))}
          </div>
        )}

        {lines.length > 0 ? (
          <div className="border-t border-ink/10 bg-cream/40 p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">{pluralize(cart?.totalQuantity ?? 0, "item")}</span>
              <span className="text-ink-muted">Shipping at checkout</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-display text-lg text-ink">Subtotal</span>
              <span className="font-display text-lg text-ink">
                {subtotal ? formatMoney(subtotal.amount, subtotal.currencyCode) : "—"}
              </span>
            </div>
            <Button
              variant="sunset"
              size="lg"
              className="mt-4 w-full"
              disabled={busy}
              onClick={onCheckout}
            >
              Checkout
            </Button>
            <p className="mt-3 text-center text-xs text-ink-muted">
              Adults 21+ only. Sol does not ship to all US states — see{" "}
              <Link href="/policies/shipping" className="underline">shipping policy</Link>.
            </p>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
