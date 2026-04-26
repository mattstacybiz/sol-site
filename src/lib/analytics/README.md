# `/lib/analytics`

Event tracking seam. Components import the singleton `analytics` and call
`analytics.track("add_to_cart", { variantId })`. The list of active providers
is decided by the `NEXT_PUBLIC_ANALYTICS_PROVIDERS` env var (comma-separated).

## Wiring a new pixel / SDK

1. Set the relevant env vars (e.g. `NEXT_PUBLIC_GA4_ID=G-XXXX`).
2. Add the provider name (e.g. `ga4`) to `NEXT_PUBLIC_ANALYTICS_PROVIDERS`.
3. The `<AnalyticsProvider>` in `src/components/providers/analytics-provider.tsx`
   injects the loader script automatically. No code edits needed.

To bring in a brand-new vendor:

1. Drop `src/lib/analytics/<vendor>.ts` exporting an `AnalyticsAdapter`.
2. Add a case in `index.ts` switch.
3. Add a script-loader branch in `analytics-provider.tsx`.

## Events fired by the site

| Event              | Where                                        |
| ------------------ | -------------------------------------------- |
| `page_view`        | Every navigation (Provider listens)          |
| `add_to_cart`      | Add-to-cart action                           |
| `remove_from_cart` | Cart drawer line removal                     |
| `checkout_start`   | "Checkout" button on cart drawer             |
| `contact_submit`   | /contact form success                        |
| `wholesale_submit` | /wholesale form success                      |
| `newsletter_submit`| Footer newsletter signup                     |
| `age_gate_pass`    | User confirms 18+                            |
| `age_gate_fail`    | User declines 18+                            |
