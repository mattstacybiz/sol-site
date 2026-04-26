import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Horizontal scrolling text strip. Items are rendered twice in a single
 * track that translates -50% — a CSS-only seamless loop. Animation auto-
 * disables under prefers-reduced-motion (handled in globals.css).
 */
export function Marquee({
  items,
  className,
}: {
  items: React.ReactNode[];
  className?: string;
}) {
  // Render twice for the seamless loop.
  const doubled = [...items, ...items];

  return (
    <div className={cn("marquee", className)} aria-hidden>
      <div className="marquee__track">
        {doubled.map((node, i) => (
          <span key={i} className="marquee__item">
            {node}
            <span className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
