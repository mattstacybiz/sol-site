/**
 * Email adapter types. Provider-agnostic.
 *
 * Wholesale and contact are intentionally separate methods so we can route
 * them to different inboxes / Klaviyo lists / CRM segments later.
 */

export type ContactInquiry = {
  name: string;
  email: string;
  message: string;
  /** Optional — used for press / partnership tagging. */
  topic?: "general" | "press" | "partnership";
};

export type WholesaleInquiry = {
  businessName: string;
  businessType: "kava-bar" | "smoke-shop" | "retail" | "other";
  city: string;
  state: string;
  contactName: string;
  email: string;
  phone?: string;
  estimatedMonthlyVolume: string;
  message?: string;
};

export type NewsletterSignup = {
  email: string;
  /** Tag the source so we can attribute later (footer, popup, post-purchase). */
  source?: string;
};

export type OrderConfirmation = {
  orderId: string;
  email: string;
  total: string;
};

export interface EmailAdapter {
  sendContactInquiry(input: ContactInquiry): Promise<void>;
  sendWholesaleInquiry(input: WholesaleInquiry): Promise<void>;
  subscribeToNewsletter(input: NewsletterSignup): Promise<void>;
  sendOrderConfirmation(input: OrderConfirmation): Promise<void>;
}
