"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";

import { headerNav } from "@config/nav";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Logo } from "./logo";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { cart, open: openCart } = useCart();
  const count = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {headerNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium text-ink/80 transition hover:text-ink",
                  link.emphasis && "text-sunset hover:text-sunset",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="sunset" size="sm" className="hidden md:inline-flex">
            <Link href="/shop">Shop Sol</Link>
          </Button>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart (${count} items)`}
            className="relative rounded-full p-2 text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sunset px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          aria-label="Mobile primary"
          className="border-t border-ink/10 bg-cream md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <ul className="container flex flex-col py-4">
            {headerNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-3 text-base font-medium text-ink/80",
                    link.emphasis && "text-sunset",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/shop"
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-sunset px-6 text-sm font-medium text-white"
              >
                Shop Sol
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}

      <CartDrawer />
    </header>
  );
}
