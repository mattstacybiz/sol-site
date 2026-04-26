# `/lib/commerce`

The commerce adapter. Everything the site knows about products, carts, and
checkout flows through this module. Pages and components import the singleton
`commerce` exported from `index.ts` — they NEVER import a vendor SDK directly.

## Implementations

| File          | When to use                                                    |
| ------------- | -------------------------------------------------------------- |
| `mock.ts`     | Default — in-memory catalog + cart, no network. Used in dev.   |
| `shopify.ts`  | Production — talks to Shopify Storefront API over GraphQL.     |

The active implementation is selected by the `COMMERCE_PROVIDER` env var.

## Switching to Shopify

1. Spin up a Shopify store (Basic plan is fine to start).
2. In admin: **Apps → Develop apps → Create an app → Storefront API access**.
   Enable read access for Products, Collections, and read/write for the Cart API.
3. Copy the Storefront API access token.
4. In `.env.local`:

   ```
   COMMERCE_PROVIDER=shopify
   SHOPIFY_STORE_DOMAIN=solkava.myshopify.com
   SHOPIFY_STOREFRONT_API_TOKEN=shpat_xxx
   SHOPIFY_API_VERSION=2024-10
   ```

5. Tag products in Shopify admin so the storefront can categorize / sort them:
   - `category:single` | `category:multipack` | `category:sample` | `category:merch`
   - `popularity:90` (any integer)
   - `subtitle:Stock the bar (and the glovebox).`
   - `badge:Bestseller` (one per badge — multiple allowed)

   This keeps the Shopify schema flat — no metafields needed for v1.

6. Restart `pnpm dev`. The site reads live products and uses Shop Pay checkout.

## Adding a new provider

1. Create `your-provider.ts` exporting a `CommerceAdapter` from `./types`.
2. Add a branch in `index.ts` keyed off `COMMERCE_PROVIDER`.
3. Document env vars in `.env.example`.

That's it — no page or component changes needed.
