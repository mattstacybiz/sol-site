import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Beer, Cigarette, Flag, Leaf } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-card";
import { commerce } from "@/lib/commerce";

export default async function HomePage() {
  const featured = await commerce.listProducts({ sort: "popularity", limit: 3 });

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative isolate overflow-hidden">
        <div className="hero-gradient absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 opacity-25 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
        <div className="container grid gap-12 py-20 text-white md:grid-cols-2 md:py-32">
          <div className="flex flex-col justify-center">
            <Badge className="self-start bg-white/15 text-white">Now shipping</Badge>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              The first kava oral pouch.
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/90">
              Tuck one in. Wind down with friends. No smoke, no nicotine, no booze, no sugar.
              Real noble kava root, made in the USA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="primary" className="bg-white text-ink hover:bg-white/90">
                <Link href="/shop/sol-sample-pack">Try a sample pack</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
                <Link href="/kava-101">
                  New to kava? Start here <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* TODO: swap with real product photography in /public/images/. */}
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/20">
              <Image
                src="https://images.unsplash.com/photo-1508162942367-e4dc15a138e1?auto=format&fit=crop&w=1200&q=80"
                alt="A can of Sol kava pouches at golden hour."
                fill
                sizes="(min-width: 768px) 480px, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- VALUE PROPS ---------- */}
      <section className="container py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Beer, label: "Alcohol-free" },
            { icon: Cigarette, label: "Nicotine-free" },
            { icon: Flag, label: "Made in the USA" },
            { icon: Leaf, label: "Real noble kava root" },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-sunset/10 text-sunset">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-medium text-ink">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- WHAT IS A KAVA POUCH ---------- */}
      <section className="container grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream">
          <Image
            src="https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=1200&q=80"
            alt="Friends at a kava bar, evening light."
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <Badge variant="ocean">What is a kava pouch?</Badge>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            The kava experience, in your pocket.
          </h2>
          <p className="mt-4 text-ink-muted">
            Kava is a Pacific Island root traditionally drunk for relaxation and conversation —
            the basis of the growing US kava bar scene. Sol takes that experience out of the
            bowl and into a soft pouch you tuck under your lip. Twenty per can. No prep, no mess.
          </p>
          <p className="mt-3 text-ink-muted">
            Think of it like the chill cousin of a nicotine pouch — same form factor, very
            different feeling. Calm. Social. Clear-headed. {/* TODO: swap with real copy */}
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/kava-101">Read Kava 101 <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* ---------- FEATURED PRODUCTS ---------- */}
      <section className="container py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Badge variant="sunset">Shop</Badge>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
              Three ways to start.
            </h2>
          </div>
          <Link href="/shop" className="hidden items-center gap-1 text-sm font-medium text-ink hover:text-sunset md:inline-flex">
            All products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ---------- WHOLESALE TEASER ---------- */}
      <section className="container py-16">
        <div className="hero-gradient relative overflow-hidden rounded-3xl px-8 py-14 text-white md:px-14 md:py-20">
          <div className="absolute inset-0 opacity-25 mix-blend-overlay [background-image:radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.5),transparent_60%)]" />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <Badge className="bg-white/15 text-white">Kava bars + retailers</Badge>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">
                Stock Sol at your bar.
              </h2>
              <p className="mt-4 max-w-xl text-white/90">
                Sol launches wholesale-first into kava bars and smoke shops. New revenue line,
                take-home product, and customers who come back. Tampa accounts get priority.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Button asChild size="lg" variant="primary" className="bg-white text-ink hover:bg-white/90">
                <Link href="/wholesale">Talk to wholesale</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SOCIAL PROOF SLOT ---------- */}
      <section className="container py-16">
        <div className="rounded-3xl border border-ink/10 bg-white p-10">
          <Badge variant="ink">Heard from the bar</Badge>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {/* TODO: replace placeholder testimonials with real bar-owner quotes once accounts close. */}
            {[
              {
                quote:
                  "Customers grab one on the way out. Easiest add-on we've stocked in years.",
                attribution: "Owner — Tampa kava bar",
              },
              {
                quote:
                  "I keep a can in the truck. It's the move when you don't want a beer.",
                attribution: "Sol customer, Raleigh",
              },
              {
                quote:
                  "Finally, kava you can actually take to a tailgate.",
                attribution: "Sol customer, Austin",
              },
            ].map((t) => (
              <figure key={t.attribution} className="space-y-3">
                <blockquote className="font-display text-xl leading-snug text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm text-ink-muted">— {t.attribution}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FOOTER CTA ---------- */}
      <section className="container pb-24 pt-8">
        <div className="rounded-3xl border border-ink/10 bg-cream p-10 text-center md:p-16">
          <h2 className="font-display text-4xl text-ink md:text-5xl">
            Try Sol for the price of two beers.
          </h2>
          <p className="mt-4 text-ink-muted">
            One can, one sticker. Twenty pouches to figure out where Sol fits in your night.
          </p>
          <Button asChild size="lg" variant="sunset" className="mt-6">
            <Link href="/shop/sol-sample-pack">Get the sample pack</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
