import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib/utils";
import type { Product } from "@/lib/commerce/types";

export function ProductCard({ product }: { product: Product }) {
  const img = product.images[0];
  return (
    <Link
      href={`/shop/${product.handle}`}
      className="group block overflow-hidden rounded-2xl border border-ink/10 bg-white transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="hero-gradient-soft relative aspect-square overflow-hidden">
        {img ? (
          <Image
            src={img.url}
            alt={img.alt || product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 transition duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        {product.badges?.[0] ? (
          <Badge className="absolute left-3 top-3" variant="sunset">
            {product.badges[0]}
          </Badge>
        ) : null}
      </div>
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-lg leading-tight text-ink">{product.title}</h3>
          <p className="mt-1 text-sm text-ink-muted">{product.subtitle}</p>
        </div>
        <p className="shrink-0 font-display text-lg text-ink">
          {formatMoney(product.priceFrom.amount, product.priceFrom.currencyCode)}
        </p>
      </div>
    </Link>
  );
}
