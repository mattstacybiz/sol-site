/**
 * Resend adapter — clean transactional email.
 *
 * Requires: RESEND_API_KEY=re_xxx
 * Docs:     https://resend.com/docs
 *
 * NOTE: For marketing/newsletter we recommend Klaviyo. Resend is ideal for
 * triggered, transactional sends (contact form forwards, order receipts).
 */

import type { EmailAdapter } from "./types";

const RESEND_API = "https://api.resend.com/emails";

const FROM = "Sol <hello@solkava.com>";

async function send(to: string, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set.");
  await fetch(RESEND_API, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, text }),
  });
}

const dump = (o: unknown) => JSON.stringify(o, null, 2);

export const resendEmail: EmailAdapter = {
  async sendContactInquiry(input) {
    await send(
      process.env.EMAIL_CONTACT_INBOX ?? "hello@solkava.com",
      `New contact inquiry — ${input.name}`,
      `From: ${input.name} <${input.email}>\n\n${input.message}`,
    );
  },
  async sendWholesaleInquiry(input) {
    await send(
      process.env.EMAIL_WHOLESALE_INBOX ?? "wholesale@solkava.com",
      `New wholesale inquiry — ${input.businessName}`,
      dump(input),
    );
  },
  async subscribeToNewsletter() {
    // Resend isn't a list/marketing platform — wire Klaviyo or Mailchimp instead.
  },
  async sendOrderConfirmation(input) {
    await send(input.email, `Sol order confirmed — ${input.orderId}`, `Total: ${input.total}`);
  },
};
