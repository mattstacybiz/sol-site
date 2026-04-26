# `/lib/email`

Transactional + marketing email seam. Forms post via server actions that
call `email.sendXxx()` — they don't know which provider is wired underneath.

## Implementations

| File         | When to use                                                     |
| ------------ | --------------------------------------------------------------- |
| `console.ts` | Default. Logs payloads to the dev server console.               |
| `klaviyo.ts` | Recommended for DTC growth. Strong Shopify integration.         |
| `resend.ts`  | Best for triggered transactional sends (no list management).    |

The active implementation is selected by `EMAIL_PROVIDER`.

## Wholesale vs. contact

These are intentionally split:

- `sendContactInquiry` → general inbox, low priority.
- `sendWholesaleInquiry` → wholesale inbox, high priority.

Both inboxes are env vars (`EMAIL_CONTACT_INBOX`, `EMAIL_WHOLESALE_INBOX`) so
Matt can re-route without touching code.

## Adding Mailchimp

Drop `mailchimp.ts` exporting `EmailAdapter`, add a `case "mailchimp"` in
`index.ts`, and document the env vars in `.env.example`.
