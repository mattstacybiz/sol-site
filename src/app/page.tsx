import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Beer, Cigarette, Flag, Leaf } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-card";
import { SunMark } from "@/components/decor/sun-mark";
import { Marquee } from "@/components/decor/marquee";
import { commerce } from "@/lib/commerce";

export default async function HomePage() {
  const featured = await commerce.listProducts({ sort: "popularity", limit: 3 });

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative isolate overflow-hidden">
        <div className="hero-gradient absolute inset-0 -z-10" />
        <div className="grain-overlay" />
        {/* glowing sun behind the can */}
        <div
          aria-hidden
          className="absolute -right-24 top-12 -z-10 hidden h-[520px] w-[520px] rounded-full bg-white/30 blur-3xl md:block"
        />
        <SunMark
          className="absolute -right-32 -top-16 -z-10 hidden h-[420px] w-[420px] text-white/40 md:block"
        />

        <div className="container grid gap-12 py-20 text-white md:grid-cols-[1.1fr_1fr] md:py-28 lg:py-32">
          <div className="flex flex-col justify-center">
            <Badge className="self-start bg-white/15 text-white backdrop-blur">
              Now shipping · 18+
            </Badge>
            <h1 className="mt-6 font-display text-[3.25rem] leading-[0.95] tracking-tight sm:text-7xl md:text-[5.5rem] lg:text-[6.25rem]">
              The first kava
              <br />
              <span className="italic text-white/95">oral pouch.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/90">
              Tuck one in. Wind down with friends. <strong className="font-semibold text-white">No smoke, no nicotine, no booze, no sugar.</strong>{" "}
              Real noble kava root, made in the USA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="primary" className="bg-white text-ink hover:bg-white/90">
                <Link href="/shop/sol-mint-sleeve">Shop the mint sleeve · $108</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
                <Link href="/kava-101">
                  New to kava? Start here <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-md">
              {/* halo */}
              <div className="absolute inset-6 rounded-full bg-white/15 blur-2xl" />
              <Image
                src="/images/products/sol-original-5pack.svg"
                alt="A sleeve of five Sol Mint tins."
                fill
                sizes="(min-width: 768px) 480px, 90vw"
                className="object-contain drop-shadow-[0_30px_40px_rgba(20,10,40,0.35)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE STRIP ---------- */}
      <section className="border-y border-ink/10 bg-ink text-cream">
        <Marquee
          items={[
            "NO SMOKE",
            "NO NICOTINE",
            "NO ALCOHOL",
            "NO SUGAR",
            "REAL NOBLE KAVA",
            "MADE IN THE USA",
            "FREE US SHIPPING",
            "18+ ONLY",
          ]}
        />
      </section>

      {/* ---------- VALUE PROPS — colored cards instead of all-white ---------- */}
      <section className="container py-16 md:py-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Beer, label: "Alcohol-free", tone: "bg-sunset/10 text-sunset border-sunset/20" },
            { icon: Cigarette, label: "Nicotine-free", tone: "bg-magenta/10 text-magenta-600 border-magenta/20" },
            { icon: Flag, label: "Made in USA", tone: "bg-ocean/10 text-ocean-600 border-ocean/20" },
            { icon: Leaf, label: "Real noble kava", tone: "bg-ink/5 text-ink border-ink/15" },
          ].map(({ icon: Icon, label, tone }) => (
            <li
              key={label}
              className={`flex items-center gap-4 rounded-2xl border p-5 ${tone}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/70">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-display text-lg text-ink">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- WHAT IS A KAVA POUCH — deep ink section ---------- */}
      <section className="bg-ink-deep relative overflow-hidden text-cream">
        <div className="grain-overlay" />
        <SunMark
          className="absolute -bottom-32 -left-24 h-[420px] w-[420px] text-cream/15"
          spin={false}
        />
        <div className="container relative grid items-center gap-12 py-20 md:grid-cols-[1fr_1.1fr] md:py-28">
          <div className="relative aspect-[4/5] mx-auto w-full max-w-md">
            <Image
              src="/images/products/sol-original-detail.svg"
              alt="Open Sol tin showing kava pouches inside."
              fill
              sizes="(min-width: 768px) 50vw, 90vw"
              className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.4)]"
            />
          </div>
          <div>
            <Badge className="bg-cream/15 text-cream">What is a kava pouch?</Badge>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
              The kava experience,
              <br />
              <span className="italic text-sunset">in your pocket.</span>
            </h2>
            <p className="mt-5 text-lg text-cream/85">
              Kava is a Pacific Island root traditionally drunk for relaxation and
              conversation — the basis of the growing US kava bar scene. Sol takes
              that experience out of the bowl and into a soft pouch you tuck under
              your lip.
            </p>
            <p className="mt-3 text-cream/70">
              Twenty per can. No prep, no mess. Calm, social, clear-headed.
            </p>
            <Button asChild size="lg" variant="primary" className="mt-8 bg-cream text-ink hover:bg-cream/90">
              <Link href="/kava-101">Read Kava 101 <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- PULL QUOTE ---------- */}
      <section className="container py-20 md:py-28">
        <p className="pull-quote mx-auto max-w-5xl text-center text-ink">
          &ldquo;Calm. Social.{" "}
          <span className="italic text-sunset">Clear-headed.</span>&rdquo;
        </p>
        <p className="mt-6 text-center text-sm uppercase tracking-[0.3em] text-ink-muted">
          What kava actually feels like
        </p>
      </section>

      {/* ---------- FEATURED PRODUCTS — sunset wash ---------- */}
      <section className="bg-sunset-wash">
        <div className="container py-20 md:py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Badge variant="sunset">Shop</Badge>
              <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
                One sleeve. One hundred pouches.
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-medium text-ink hover:text-sunset md:inline-flex"
            >
              Shop now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHOLESALE TEASER ---------- */}
      <section className="container py-16 md:py-20">
        <div className="hero-gradient relative isolate overflow-hidden rounded-[2.5rem] px-8 py-14 text-white md:px-14 md:py-20">
          <div className="grain-overlay" />
          <SunMark className="absolute -right-16 -top-16 h-72 w-72 text-white/25" />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <Badge className="bg-white/15 text-white backdrop-blur">Kava bars + retailers</Badge>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Stock Sol at your bar.
              </h2>
              <p className="mt-4 max-w-xl text-white/90">
                Take-home product your customers will buy on the way out.
                Case pricing, fast lead times, and a real human on the other end.
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

      {/* ---------- SOCIAL PROOF — alternating tinted cards ---------- */}
      <section className="container py-16 md:py-20">
        <div className="mb-10 flex items-center justify-between gap-6">
          <Badge variant="ink">Heard from the bar</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "Customers grab one on the way out. Easiest add-on we've stocked in years.",
              attribution: "Owner — Tampa kava bar",
              tone: "bg-ink text-cream",
              accent: "text-sunset",
            },
            {
              quote:
                "I keep a can in the truck. It's the move when you don't want a beer.",
              attribution: "Sol customer, Raleigh",
              tone: "bg-cream-card text-ink ring-1 ring-ink/10",
              accent: "text-magenta-600",
            },
            {
              quote: "Finally, kava you can actually take to a tailgate.",
              attribution: "Sol customer, Austin",
              tone: "bg-ocean/10 text-ink ring-1 ring-ocean/20",
              accent: "text-ocean-600",
            },
          ].map((t, i) => (
            <figure key={t.attribution} className={`relative overflow-hidden rounded-3xl p-8 ${t.tone}`}>
              <span className={`font-display text-7xl leading-none ${t.accent}`}>&ldquo;</span>
              <blockquote className="mt-2 font-display text-xl leading-snug">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm opacity-80">— {t.attribution}</figcaption>
              {i === 0 ? (
                <SunMark className="absolute -bottom-12 -right-12 h-40 w-40 text-cream/10" />
              ) : null}
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER CTA ---------- */}
      <section className="container pb-24 pt-8">
        <div className="bg-ink-deep relative isolate overflow-hidden rounded-[2.5rem] px-8 py-16 text-center text-cream md:px-16 md:py-20">
          <div className="grain-overlay" />
          <SunMark className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 text-cream/10" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              Stock up. <span className="italic text-sunset">Wind down.</span>
            </h2>
            <p className="mt-5 text-cream/85">
              One sleeve, five tins, one hundred pouches of cool mint. Free
              shipping in the US.
            </p>
            <Button asChild size="lg" variant="sunset" className="mt-8">
              <Link href="/shop/sol-mint-sleeve">Shop the mint sleeve</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
