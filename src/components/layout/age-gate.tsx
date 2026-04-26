"use client";

import * as React from "react";

import { brand } from "@config/brand";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";

const COOKIE_NAME = "sol_age_ok";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

const hasCookie = () =>
  typeof document !== "undefined" &&
  document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE_NAME}=1`));

const setCookie = () => {
  document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

export function AgeGate() {
  const [open, setOpen] = React.useState(false);
  const [tooYoung, setTooYoung] = React.useState(false);

  React.useEffect(() => {
    setOpen(!hasCookie());
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 backdrop-blur"
    >
      <div className="hero-gradient relative w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl p-8 text-white shadow-2xl">
        <span className="grain-overlay" style={{ ["--tw-bg-grain" as string]: "var(--tw-bg-grain)" }} />
        <h2 id="age-gate-title" className="font-display text-3xl">{brand.name} is for adults 21+.</h2>
        <p className="mt-3 text-white/90">Are you 21 or older?</p>

        {tooYoung ? (
          <p className="mt-6 rounded-md bg-white/10 p-4 text-sm">
            Catch you in a few. Sol is for adults only.
          </p>
        ) : (
          <div className="mt-6 flex gap-3">
            <Button
              variant="primary"
              size="md"
              className="bg-white text-ink hover:bg-white/90"
              onClick={() => {
                setCookie();
                analytics.track("age_gate_pass");
                setOpen(false);
              }}
            >
              I&rsquo;m 21+
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="text-white hover:bg-white/10"
              onClick={() => {
                analytics.track("age_gate_fail");
                setTooYoung(true);
              }}
            >
              No
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
