import type { Metadata } from "next";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { brand } from "@config/brand";

export const metadata: Metadata = {
  title: "About Sol",
  description:
    "Sol is the first kava oral pouch — built by people who actually go to kava bars. Founded in Raleigh, NC. Made in the USA.",
};

export default function AboutPage() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Badge variant="ink">About</Badge>
        <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
          Built with the kava community, not at it.
        </h1>
        <p className="mt-5 text-lg text-ink-muted">
          {/* TODO: swap with real founder story from Matt */}
          Sol was founded in {brand.founded} in {brand.city} by people who go to kava bars on
          weeknights. The pouch was born out of a simple thought: <em>I want this experience,
          but I&rsquo;m not always near a bowl.</em>
        </p>
      </div>

      <div className="container my-16">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-cream">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80"
            alt="Hands holding a Sol can at sunset."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl prose-sol">
        <h2>Why pouches</h2>
        <p>
          The traditional kava experience is a beverage — slow, social, place-based. We love
          that, and Sol exists to extend it, not replace it. A pouch travels. A pouch is
          consistent. A pouch lets you take what you love about a kava bar to the porch, the
          tailgate, the cabin, or the green room.
        </p>

        <h2>What&rsquo;s in a Sol pouch</h2>
        <p>
          Concentrated noble kava root extract, food-grade carriers, and nothing else. No
          synthetics. No nicotine. No sugar. No alcohol. Real plant, modern format.
        </p>

        <h2>Sourcing &amp; manufacturing</h2>
        <p>
          Sol is manufactured in the United States by an experienced
          oral-format contract partner. Our noble kava root is sourced from
          established Pacific Island suppliers and tested before it ships.
        </p>

        <h2>Working with kava bars</h2>
        <p>
          Sol is built to live on the back-bar at kava bars and on the shelf at
          shops alongside the brewed bowl. If you run a bar, a shop, or a brand
          that overlaps with ours, we&rsquo;d love to talk &mdash; head over to{" "}
          <a href="/wholesale">/wholesale</a>.
        </p>

        <h2>Compliance, in plain English</h2>
        <p>
          Sol is for adults 18+. We don&rsquo;t make health or therapeutic claims about kava.
          Kava sale is regulated differently in different US jurisdictions, and we follow
          those rules — see our{" "}
          <a href="/policies/shipping">shipping policy</a> for current restrictions.
        </p>
      </div>
    </section>
  );
}
