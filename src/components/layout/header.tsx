"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";

import { headerNav, type NavLink } from "@config/nav";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Logo } from "./logo";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

/**
 * Top-level nav item with optional hover/focus dropdown.
 *
 * - The trigger label itself is a Link to the parent's `href` (so clicking
 *   "Learn" navigates to `/learn`).
 * - The dropdown opens on hover (mouseenter) and on keyboard focus.
 * - Closes on mouseleave (small delay to let the cursor cross the gap),
 *   on Escape, or when any child link is activated.
 */
function NavItem({ link }: { link: NavLink }) {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  if (!link.children?.length) {
    return (
      <Link
        href={link.href}
        className={cn(
          "text-sm font-medium text-ink/80 transition hover:text-ink",
          link.emphasis && "text-sunset hover:text-sunset",
        )}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocusCapture={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={link.href}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium text-ink/80 transition hover:text-ink",
          link.emphasis && "text-sunset hover:text-sunset",
        )}
      >
        {link.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </Link>

      {open ? (
        <div
          role="menu"
          aria-label={link.label}
          className="absolute left-0 top-full z-50 pt-3"
        >
          <ul className="min-w-56 overflow-hidden rounded-2xl border border-ink/10 bg-cream p-1 shadow-xl ring-1 ring-ink/5">
            {link.children.map((child) => (
              <li key={child.href}>
                <Link
                  role="menuitem"
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink/85 transition hover:bg-sunset/10 hover:text-ink"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

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
              <NavItem key={link.href} link={link} />
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
                {link.children?.length ? (
                  <ul className="mb-2 ml-4 border-l border-ink/10 pl-4">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-2 text-sm text-ink/70"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
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
