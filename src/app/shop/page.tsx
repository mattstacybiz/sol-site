import type { Metadata } from "next";

import { ProductCard } from "@/components/shop/product-card";
import { Badge } from "@/components/ui/badge";
import { commerce } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Sol kava pouches — single can, multipack, and sample pack. Made in the USA, shipped fast.",
};

const SORT_OPTIONS = [
  { value: "popularity", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "single", label: "Cans" },
  { value: "multipack", label: "Multipacks" },
  { value: "sample", label: "Sample" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];
type CategoryValue = (typeof CATEGORIES)[number]["value"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { sort?: string; category?: string };
}) {
  const sort = (SORT_OPTIONS.find((o) => o.value === searchParams.sort)?.value ??
    "popularity") as SortValue;
  const category = (CATEGORIES.find((c) => c.value === searchParams.category)?.value ??
    "all") as CategoryValue;

  const products = await commerce.listProducts({
    sort,
    category: category === "all" ? undefined : (category as "single" | "multipack" | "sample"),
  });

  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-2xl">
        <Badge variant="sunset">Shop</Badge>
        <h1 className="mt-3 font-display text-5xl text-ink md:text-6xl">All Sol.</h1>
        <p className="mt-4 text-ink-muted">
          Three SKUs to start. More on the way as the formulation expands. Adults 21+ only.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-y border-ink/10 py-4 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Filter by category" className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => {
            const active = c.value === category;
            const params = new URLSearchParams();
            if (sort !== "popularity") params.set("sort", sort);
            if (c.value !== "all") params.set("category", c.value);
            const qs = params.toString();
            return (
              <a
                key={c.value}
                href={`/shop${qs ? `?${qs}` : ""}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-ink text-cream"
                    : "border border-ink/15 text-ink hover:bg-ink/5"
                }`}
              >
                {c.label}
              </a>
            );
          })}
        </nav>

        <form className="flex items-center gap-2 text-sm text-ink" method="get">
          {category !== "all" ? <input type="hidden" name="category" value={category} /> : null}
          <label htmlFor="sort" className="text-ink-muted">Sort</label>
          <select
            id="sort"
            name="sort"
            defaultValue={sort}
            // Native submit on change — no JS dependency.
            onChange={undefined}
            className="rounded-md border border-ink/15 bg-white px-3 py-2"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button type="submit" className="rounded-full border border-ink/15 px-3 py-2 hover:bg-ink/5">
            Apply
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 ? (
          <p className="col-span-full text-ink-muted">No products match those filters.</p>
        ) : (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </section>
  );
}
