# `/lib/shipping`

Fulfillment + rate-quote seam. Default `stub.ts` returns flat USPS rates so
the cart UI works in dev. Implement against a real provider when launching.

## Recommended provider order

1. **Self-fulfill via Pirate Ship** — cheapest until you ship 50+/day.
2. **ShipBob** — clean API, predictable per-pick fees.
3. **Amazon MCF** — best margin once volume hits ~500/month, but you give up
   carrier choice and risk Amazon-branded packaging unless you opt out.

## Adding a real provider

1. Drop `<provider>.ts` exporting `ShippingAdapter`.
2. Add a switch case in `index.ts`.
3. Document env vars in `.env.example`.
