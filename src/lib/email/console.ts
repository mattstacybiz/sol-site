/**
 * Default email adapter — logs to the server console.
 *
 * Lets every form on the site work end-to-end without a real provider.
 * Swap to Klaviyo or Resend by changing EMAIL_PROVIDER in .env.local.
 */

import type { EmailAdapter } from "./types";

const log = (label: string, payload: unknown) => {
  // eslint-disable-next-line no-console
  console.log(`\n[email:console] ${label}\n` + JSON.stringify(payload, null, 2));
};

export const consoleEmail: EmailAdapter = {
  async sendContactInquiry(input) {
    log(`Contact inquiry → ${process.env.EMAIL_CONTACT_INBOX ?? "hello@solkava.com"}`, input);
  },
  async sendWholesaleInquiry(input) {
    log(
      `Wholesale inquiry → ${process.env.EMAIL_WHOLESALE_INBOX ?? "wholesale@solkava.com"}`,
      input,
    );
  },
  async subscribeToNewsletter(input) {
    log("Newsletter signup", input);
  },
  async sendOrderConfirmation(input) {
    log("Order confirmation", input);
  },
};
