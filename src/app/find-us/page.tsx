import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { locations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Find Sol",
  description: "Kava bars and shops carrying Sol kava pouches.",
};

export default async function FindUsPage() {
  const list = await locations.listLocations();

  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-3xl">
        <Badge variant="ocean">Find Sol</Badge>
        <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
          Stocked near you.
        </h1>
        <p className="mt-5 text-lg text-ink-muted">
          Sol is launching wholesale-first into kava bars and smoke shops, starting in
          Tampa / St. Petersburg, FL. As accounts come online, they&rsquo;ll show up here.
        </p>
      </div>

      {list.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-ink/20 bg-white p-10 text-center">
          <p className="font-display text-2xl text-ink">Coming soon.</p>
          <p className="mt-2 text-ink-muted">
            We&rsquo;re onboarding bars right now. In the meantime, the easiest way to try Sol
            is to order a sample pack.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="sunset">
              <Link href="/shop/sol-sample-pack">Get a sample pack</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/wholesale">Run a kava bar? Talk to wholesale</Link>
            </Button>
          </div>
        </div>
      ) : (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((loc) => (
            <li key={loc.id} className="rounded-2xl border border-ink/10 bg-white p-6">
              <p className="font-display text-xl text-ink">{loc.name}</p>
              <p className="mt-1 text-sm text-ink-muted">
                {loc.street}, {loc.city}, {loc.state} {loc.postalCode}
              </p>
              {loc.website ? (
                <a className="mt-3 inline-block text-sm text-sunset underline" href={loc.website}>
                  Visit website
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
