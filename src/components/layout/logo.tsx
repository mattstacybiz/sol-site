import Link from "next/link";

import { brand } from "@config/brand";
import { cn } from "@/lib/utils";

/**
 * Sol wordmark.
 *
 * Built to match the wordmark used on the product art:
 * Fraunces (display), bold, tight negative tracking, all-caps, with a
 * small sunset dot on the "O". Inherits color from `currentColor` so the
 * same component works on light and dark backgrounds.
 *
 * Sizing is controlled by `text-*` utilities passed through `className`.
 * Default sizing is `text-3xl`.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name} — home`}
      className={cn(
        "group relative inline-flex items-baseline font-display font-bold leading-none tracking-[-0.04em] text-ink",
        "text-3xl",
        className,
      )}
    >
      <span aria-hidden className="select-none">
        S<span className="relative inline-block">
          {/* O with a small sun dot in the centre */}
          O
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[0.18em] w-[0.18em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sunset transition group-hover:bg-magenta"
          />
        </span>L
      </span>
      <span className="sr-only">{brand.name}</span>
    </Link>
  );
}
