# `/lib/locations`

Store locator seam. Default `mock.ts` returns no results — the `/find-us`
page renders a "coming soon" state in that case.

## Suggested implementations

- **`shopify-metaobject.ts`** — model Locations as a Shopify Metaobject.
  Easiest to maintain alongside the product catalog.
- **`csv.ts`** — drop a CSV in `/content/locations.csv` and parse it.
  Good for early days when accounts are added one at a time.
- **`google-places.ts`** — fetch nearby kava bars within X miles of a query
  point (only useful once Sol-stocking bars are tagged in Google).
