/**
 * Klaviyo adapter — preferred for DTC growth (best Shopify integration).
 *
 * Uses Klaviyo's REST API directly (no SDK). Requires:
 *   KLAVIYO_PRIVATE_KEY=pk_xxx
 *   KLAVIYO_NEWSLETTER_LIST_ID=XYZ123
 *
 * Docs: https://developers.klaviyo.com/en/reference/api_overview
 */

import type { EmailAdapter } from "./types";

const KLAVIYO_API = "https://a.klaviyo.com/api";
const REVISION = "2024-10-15";

const headers = () => {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  if (!key) throw new Error("KLAVIYO_PRIVATE_KEY is not set.");
  return {
    Authorization: `Klaviyo-API-Key ${key}`,
    accept: "application/json",
    revision: REVISION,
    "content-type": "application/json",
  };
};

async function trackEvent(metric: string, email: string, properties: Record<string, unknown>) {
  await fetch(`${KLAVIYO_API}/events/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties,
          metric: { data: { type: "metric", attributes: { name: metric } } },
          profile: { data: { type: "profile", attributes: { email } } },
        },
      },
    }),
  });
}

async function subscribeProfile(email: string, listId: string) {
  await fetch(`${KLAVIYO_API}/profile-subscription-bulk-create-jobs/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                },
              },
            ],
          },
        },
        relationships: { list: { data: { type: "list", id: listId } } },
      },
    }),
  });
}

export const klaviyoEmail: EmailAdapter = {
  async sendContactInquiry(input) {
    await trackEvent("Contact Form Submitted", input.email, { ...input });
  },
  async sendWholesaleInquiry(input) {
    await trackEvent("Wholesale Inquiry Submitted", input.email, { ...input });
  },
  async subscribeToNewsletter(input) {
    const listId = process.env.KLAVIYO_NEWSLETTER_LIST_ID;
    if (!listId) throw new Error("KLAVIYO_NEWSLETTER_LIST_ID is not set.");
    await subscribeProfile(input.email, listId);
    await trackEvent("Newsletter Subscribed", input.email, { source: input.source });
  },
  async sendOrderConfirmation() {
    // Order confirmation usually flows from Shopify -> Klaviyo natively.
    // Intentionally a no-op here; flip to a transactional flow if needed.
  },
};
