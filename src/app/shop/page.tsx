import type { Metadata } from "next";

import { ProductCard } from "@/components/shop/product-card";
import { Badge } from "@/components/ui/badge";
import { SunMark } from "@/components/decor/sun-mark";
import { commerce } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Sol kava pouches — sleeves of mint. Five tins, one hundred pouches. Made in the USA, shipped fast.",
};

export default async function ShopPage() {
  const products = await commerce.listProducts({ sort: "popularity" });

  return (
    <>
      <section className="hero-gradient-soft relative isolate overflow-hidden border-b border-ink/10">
        <SunMark className="absolute -right-24 -top-32 h-[420px] w-[420px] text-sunset/30 hidden md:block" />
        <div className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <Badge variant="sunset">Shop</Badge>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
              Shop <span className="italic text-sunset">Sol.</span>
            </h1>
            <p className="mt-4 text-ink-muted">
              Noble kava root extract, tucked into a soft pouch. Made in the USA, shipped fast. Adults 18+ only.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 ? (
            <p className="col-span-full text-ink-muted">Nothing in stock right now — check back soon.</p>
          ) : (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </section>
    </>
  );
}
