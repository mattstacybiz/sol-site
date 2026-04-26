import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "sunset",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "sunset" | "ocean" | "ink" | "cream" }) {
  const palette = {
    sunset: "bg-sunset/10 text-sunset",
    ocean: "bg-ocean/10 text-ocean",
    ink: "bg-ink/10 text-ink",
    cream: "bg-cream text-ink",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
        palette[variant],
        className,
      )}
      {...props}
    />
  );
}
