import { cn } from "@/lib/utils";

/**
 * Decorative Sol "sun" mark — a sun with rays. Slowly rotates via the
 * `sun-spin` utility unless the user has reduced-motion enabled.
 *
 * Pure decorative — `aria-hidden` so screen readers skip it.
 */
export function SunMark({
  className,
  spin = true,
}: {
  className?: string;
  spin?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className={cn(spin && "sun-spin", className)}
    >
      <defs>
        <radialGradient id="sun-mark-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(36 100% 90%)" />
          <stop offset="55%" stopColor="hsl(20 100% 65%)" />
          <stop offset="100%" stopColor="hsl(330 70% 55%)" />
        </radialGradient>
      </defs>
      <g>
        {/* rays */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <rect
              key={i}
              x="98"
              y="6"
              width="4"
              height="28"
              rx="2"
              fill="currentColor"
              transform={`rotate(${angle} 100 100)`}
              opacity="0.85"
            />
          );
        })}
        <circle cx="100" cy="100" r="56" fill="url(#sun-mark-fill)" />
      </g>
    </svg>
  );
}
