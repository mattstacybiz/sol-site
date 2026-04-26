/**
 * Email adapter selector.
 *
 *   import { email } from "@/lib/email";
 *   await email.sendWholesaleInquiry({...});
 */

import { consoleEmail } from "./console";
import { klaviyoEmail } from "./klaviyo";
import { resendEmail } from "./resend";
import type { EmailAdapter } from "./types";

const provider = (process.env.EMAIL_PROVIDER ?? "console").toLowerCase();

export const email: EmailAdapter = (() => {
  switch (provider) {
    case "klaviyo":
      return klaviyoEmail;
    case "resend":
      return resendEmail;
    default:
      return consoleEmail;
  }
})();

export type {
  ContactInquiry,
  WholesaleInquiry,
  NewsletterSignup,
  OrderConfirmation,
} from "./types";
