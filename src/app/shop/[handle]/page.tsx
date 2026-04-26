import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ProductCard } from "@/components/shop/product-card";
import { ProductJsonLd } from "@/components/seo/json-ld";
import { commerce } from "@/lib/commerce";
import { formatMoney } from "@/lib/utils";

type Params = { handle: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = await commerce.getProduct(params.handle);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: product.subtitle,
    openGraph: {
      title: product.title,
      description: product.subtitle,
      images: product.images.map((i) => ({ url: i.url })),
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const product = await commerce.getProduct(params.handle);
  if (!product) notFound();

  const all = await commerce.listProducts({ sort: "popularity", limit: 6 });
  const related = all.filter((p) => p.id !== product.id).slice(0, 3);
  const variant = product.variants[0];

  return (
    <>
      <ProductJsonLd product={product} />

      <section className="container py-10 md:py-16">
        <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <div className="mt-6 grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-cream">
              {product.images[0] ? (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : null}
            </div>
            {product.images.length > 1 ? (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-cream">
                    <Image src={img.url} alt={img.alt} fill sizes="120px" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Buy box */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {product.badges?.map((b) => (
                <Badge key={b} variant="sunset">{b}</Badge>
              ))}
            </div>
            <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">{product.title}</h1>
            <p className="mt-3 text-lg text-ink-muted">{product.subtitle}</p>

            <div className="mt-6 flex items-end gap-3">
              <p className="font-display text-3xl text-ink">
                {formatMoney(variant.price.amount, variant.price.currencyCode)}
              </p>
              {variant.compareAtPrice ? (
                <p className="text-base text-ink-muted line-through">
                  {formatMoney(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)}
                </p>
              ) : null}
            </div>

            <div className="mt-6">
              <AddToCartButton
                variantId={variant.id}
                productHandle={product.handle}
                productTitle={product.title}
              />
            </div>

            <p className="mt-6 text-base leading-relaxed text-ink">{product.description}</p>

            {/* Specs */}
            {product.specs?.length ? (
              <dl className="mt-8 grid grid-cols-2 gap-y-3 border-t border-ink/10 pt-6 text-sm">
                {product.specs.map((s) => (
                  <div key={s.label} className="contents">
                    <dt className="text-ink-muted">{s.label}</dt>
                    <dd className="font-medium text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {/* How to use */}
            <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
              <h2 className="font-display text-xl text-ink">How to use a Sol pouch</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink-muted">
                <li>Tuck a pouch between your upper lip and gum.</li>
                <li>Leave it for 15&ndash;30 minutes — sip water as you go.</li>
                <li>Toss it. Start with one. Pace yourself.</li>
              </ol>
              <p className="mt-3 text-xs text-ink-muted">
                For adults 21+. Don&rsquo;t mix with alcohol. New to kava? Read{" "}
                <Link href="/kava-101" className="underline">Kava 101</Link>.
              </p>
            </div>

            {/* Ingredients */}
            {product.ingredients?.length ? (
              <div className="mt-6">
                <h2 className="font-display text-xl text-ink">Ingredients</h2>
                <p className="mt-2 text-sm text-ink-muted">{product.ingredients.join(" · ")}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length ? (
        <section className="container pb-24">
          <h2 className="font-display text-3xl text-ink">More Sol</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      ) : null}
    </>
  );
}

export async function generateStaticParams() {
  const products = await commerce.listProducts();
  return products.map((p) => ({ handle: p.handle }));
}
