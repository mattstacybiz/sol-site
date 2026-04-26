# Sol — solkava.com

Marketing + ecommerce site for **Sol**, the first kava oral pouch.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · shadcn/ui · Framer Motion · react-hook-form + zod
- **Package manager:** pnpm
- **Hosting target:** Vercel
- **Repo:** [mattstacybiz/sol-site](https://github.com/mattstacybiz/sol-site)

---

## Quick start

```bash
pnpm install
cp .env.example .env.local   # optional — site runs with no env at all
pnpm dev
```

Open <http://localhost:3000>.

The site is designed to run **with no credentials**. Every external integration
sits behind an adapter in `src/lib/` and defaults to a mock / console / noop
implementation. You add real vendors by setting env vars — see the checklists below.

---

## Project structure

```
config/                 brand, feature flags, nav, restricted states
content/pages/          markdown pages (consumed by lib/cms when CMS_PROVIDER=local)
src/app/                Next.js App Router routes
  actions/              server actions (cart, forms)
  api/                  internal route handlers
  policies/             shipping / returns / privacy / terms / accessibility
  shop/                 shop list + product detail
src/components/
  cart/                 cart drawer + add-to-cart button
  forms/                contact, wholesale, newsletter forms
  layout/               header, footer, announcement bar, age gate
  providers/            cart + analytics React contexts
  seo/                  JSON-LD components
  shop/                 product card
  ui/                   shadcn-style primitives (button, dialog, input, etc.)
src/lib/                ADAPTERS — see below
  analytics/            ga4, meta, tiktok, posthog, multi (composite), noop
  cms/                  local (markdown), sanity stub
  commerce/             mock (default), shopify
  email/                console (default), klaviyo, resend
  locations/            mock (default), airtable
  payments/             stub (Shopify checkout handles real payments)
  shipping/             mock (default), shipbob, amazon-mcf
```

---

## Adapter rule

> **No page or component imports a vendor SDK directly.**
> Pages import from `src/lib/<domain>` only. The lib decides which implementation
> to load based on env vars.

Adding a new vendor for an existing domain = a new file in that lib folder + a
case in its `index.ts`. Pages don't change.

---

## Swap-in checklists

### Commerce — Shopify

1. Create a Shopify store, add products with handles matching `sol-original`,
   `sol-original-5pack`, `sol-sample-pack` (or update the seed handles in
   `src/lib/commerce/mock.ts`).
2. In Shopify admin → Apps → Headless → create a **Storefront API** access token.
3. Set env:
   ```env
   COMMERCE_PROVIDER=shopify
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_API_TOKEN=...
   ```
4. Restart `pnpm dev`. The shop, PDP, cart, and `/api/cart` route all start
   pulling live data with zero code changes.

### Email — Klaviyo

1. Klaviyo → Account → API keys → create a **Private API key** with `events:write`
   and `lists:write` scope.
2. Create a Klaviyo list for newsletter and copy its list ID.
3. Set env:
   ```env
   EMAIL_PROVIDER=klaviyo
   KLAVIYO_API_KEY=pk_...
   KLAVIYO_NEWSLETTER_LIST_ID=ABC123
   ```
4. Newsletter signups subscribe to the list. Contact + wholesale form submissions
   fire as Klaviyo events for flow triggering.

### Email — Resend (alternative)

```env
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_...
RESEND_FROM=Sol <hello@solkava.com>
```

### Analytics

You can run **multiple pixels at once** — comma-separate them in the env var.

```env
NEXT_PUBLIC_ANALYTICS_PROVIDERS=ga4,meta,tiktok
NEXT_PUBLIC_GA4_ID=G-XXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=000000000000000
NEXT_PUBLIC_TIKTOK_PIXEL_ID=XXXXXXXXXXXXXXXXXXX
```

Add `posthog` to the list and set `NEXT_PUBLIC_POSTHOG_KEY` for product analytics.

### Shipping — ShipBob

```env
SHIPPING_PROVIDER=shipbob
SHIPBOB_API_KEY=...
SHIPBOB_CHANNEL_ID=...
```

### Shipping — Amazon MCF

```env
SHIPPING_PROVIDER=amazon-mcf
AMAZON_MCF_REGION=us-east-1
AMAZON_MCF_ACCESS_KEY_ID=...
AMAZON_MCF_SECRET_ACCESS_KEY=...
AMAZON_MCF_SELLER_ID=...
```

### Locations — Airtable (for /find-us)

```env
LOCATIONS_PROVIDER=airtable
AIRTABLE_API_KEY=key...
AIRTABLE_BASE_ID=app...
AIRTABLE_LOCATIONS_TABLE=Locations
```

### CMS — Sanity (optional)

By default we read markdown from `content/pages/`. To switch to Sanity:

```env
CMS_PROVIDER=sanity
SANITY_PROJECT_ID=...
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
```

---

## Feature flags

Flip these in `.env.local` (all are off-friendly defaults):

```env
NEXT_PUBLIC_FEATURE_AGE_GATE=false
NEXT_PUBLIC_FEATURE_NEWSLETTER=true
NEXT_PUBLIC_FEATURE_WHOLESALE=true
NEXT_PUBLIC_FEATURE_LOCATOR=true
NEXT_PUBLIC_FEATURE_ANNOUNCEMENT_BAR=true
```

---

## Compliance guardrails

- **No health claims, ever.** Copy says how the product feels and what it is. It
  never says it treats, prevents, or cures anything.
- **21+ everywhere.** Age gate is wired but feature-flagged off by default.
- **Restricted states list lives in `config/restricted-states.ts`** and is
  rendered on `/policies/shipping`. The current values are placeholders — they
  carry a `[REVIEW WITH LAWYER]` warning and **must** be confirmed with counsel
  before launch.
- All policy pages carry a `[REVIEW WITH LAWYER]` banner until counsel signs off.

---

## Brand source of truth

Edit `config/brand.ts` for name, tagline, inboxes, social, colors, fonts, SEO
defaults. Color tokens flow into `src/app/globals.css` as CSS variables and into
Tailwind via `tailwind.config.ts`.

---

## Deploy

Push to `main` → Vercel deploys. Production env vars are set in the Vercel
project dashboard, not committed. `.env.local` is gitignored.

---

## Scripts

| command | what |
| --- | --- |
| `pnpm dev` | Local dev server with hot reload |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | Next.js + TypeScript lint |
