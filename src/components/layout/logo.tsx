import Link from "next/link";

import { brand } from "@config/brand";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name} — home`}
      className={cn(
        "inline-flex items-center gap-2 font-display text-3xl leading-none tracking-tight text-ink",
        className,
      )}
    >
      {/* Wordmark — replace with an SVG logo when the final mark is finalized. */}
      <span className="relative">
        Sol
        <span className="absolute -right-2 top-0.5 h-2 w-2 rounded-full bg-sunset" aria-hidden />
      </span>
    </Link>
  );
}
