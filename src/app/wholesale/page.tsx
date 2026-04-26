import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { WholesaleForm } from "@/components/forms/wholesale-form";

export const metadata: Metadata = {
  title: "Wholesale + bar partnerships",
  description:
    "Stock Sol at your kava bar, smoke shop, or retail. Case pricing, fast lead times, and Tampa-priority routing.",
};

export default function WholesalePage() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-16 md:grid-cols-[1.1fr_1fr] md:gap-20">
        <div>
          <Badge variant="sunset">Wholesale</Badge>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
            Stock Sol at your bar.
          </h1>
          <p className="mt-5 text-lg text-ink-muted">
            Sol is launching wholesale-first into kava bars and smoke shops. We&rsquo;re looking
            for accounts that share our crowd — adults who&rsquo;d rather wind down with a kava
            pouch than another round.
          </p>

          <ul className="mt-8 grid gap-4 text-base text-ink">
            <li className="flex gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sunset" />
              <span><strong>Extra revenue line.</strong> Take-home product your existing customers will buy on the way out.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sunset" />
              <span><strong>Customer retention.</strong> A pouch in a glovebox is a return trip to your bar.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sunset" />
              <span><strong>Tampa priority.</strong> Tampa / St. Pete accounts close fastest — that&rsquo;s our home market.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sunset" />
              <span><strong>Real noble kava, made in the USA.</strong> Same compounds your customers already drink.</span>
            </li>
          </ul>

          <div className="mt-10 rounded-2xl border border-ink/10 bg-white p-6">
            <p className="font-display text-xl text-ink">Case pricing</p>
            <p className="mt-2 text-sm text-ink-muted">
              Cases ship in increments of 12 cans (240 pouches). Tiered pricing kicks in at
              5+ cases per month. Reach out for the current sheet — pricing is updated quarterly.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-white p-8 md:p-10">
          <h2 className="font-display text-2xl text-ink">Tell us about your bar</h2>
          <p className="mt-1 text-sm text-ink-muted">
            We reply within 1&ndash;2 business days. Wholesale leads route to a dedicated inbox.
          </p>
          <div className="mt-6">
            <WholesaleForm />
          </div>
        </div>
      </div>
    </section>
  );
}
