"use server";

import { z } from "zod";

import { email } from "@/lib/email";

// ---------------------------------------------------------------------------
// Schemas — also used client-side via @hookform/resolvers/zod.
// ---------------------------------------------------------------------------

export const contactSchema = z.object({
  name: z.string().min(1, "Your name is required."),
  email: z.string().email("Enter a valid email."),
  message: z.string().min(10, "A bit more detail, please."),
  topic: z.enum(["general", "press", "partnership"]).default("general"),
  // Honeypot — must remain blank.
  website: z.string().max(0).optional(),
});

export const wholesaleSchema = z.object({
  businessName: z.string().min(1, "Business name is required."),
  businessType: z.enum(["kava-bar", "smoke-shop", "retail", "other"]),
  city: z.string().min(1, "City is required."),
  state: z.string().min(2, "State is required."),
  contactName: z.string().min(1, "Your name is required."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().optional(),
  estimatedMonthlyVolume: z.string().min(1, "Estimated volume is required."),
  message: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot
});

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email."),
  source: z.string().optional(),
  website: z.string().max(0).optional(),
});

export type FormResult = { ok: true } | { ok: false; error: string };

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export async function submitContactAction(
  raw: z.input<typeof contactSchema>,
): Promise<FormResult> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };
  if (parsed.data.website) return { ok: true }; // silently drop bots
  await email.sendContactInquiry(parsed.data);
  return { ok: true };
}

export async function submitWholesaleAction(
  raw: z.input<typeof wholesaleSchema>,
): Promise<FormResult> {
  const parsed = wholesaleSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };
  if (parsed.data.website) return { ok: true };
  await email.sendWholesaleInquiry(parsed.data);
  return { ok: true };
}

export async function submitNewsletterAction(
  raw: z.input<typeof newsletterSchema>,
): Promise<FormResult> {
  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Enter a valid email." };
  if (parsed.data.website) return { ok: true };
  await email.subscribeToNewsletter(parsed.data);
  return { ok: true };
}
