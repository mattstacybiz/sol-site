import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactForm } from "@/components/forms/contact-form";
import { brand } from "@config/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, press, partnership? Reach Sol — or jump straight to wholesale.",
};

const FAQ = [
  {
    q: "Where do orders ship from?",
    a: "Orders ship from our US fulfillment partner. Most orders go out within 1–2 business days.",
  },
  {
    q: "Do you ship to my state?",
    a: "Sol ships across most of the US. A handful of states regulate kava sale differently — see our shipping policy for the current list.",
  },
  {
    q: "I run a kava bar.",
    a: "You probably want the wholesale page — that routes to a dedicated inbox and gets a faster reply.",
  },
  {
    q: "Are you hiring / open to brand partnerships?",
    a: "Use the contact form below and pick the right topic. We read everything.",
  },
];

export default function ContactPage() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-16 md:grid-cols-[1.1fr_1fr] md:gap-20">
        <div>
          <Badge variant="ink">Contact</Badge>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
            Say hi.
          </h1>
          <p className="mt-5 text-lg text-ink-muted">
            Questions about a product, the brand, or working together? You&rsquo;re in the right
            place. Wholesale inquiries go through{" "}
            <Link href="/wholesale" className="underline">/wholesale</Link>.
          </p>

          <div className="mt-10 grid gap-3 text-sm">
            <p className="text-ink-muted">
              General: <a className="text-ink underline" href={`mailto:${brand.inboxes.general}`}>{brand.inboxes.general}</a>
            </p>
            <p className="text-ink-muted">
              Wholesale: <a className="text-ink underline" href={`mailto:${brand.inboxes.wholesale}`}>{brand.inboxes.wholesale}</a>
            </p>
            <p className="text-ink-muted">
              Press: <a className="text-ink underline" href={`mailto:${brand.inboxes.press}`}>{brand.inboxes.press}</a>
            </p>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl text-ink">FAQ</h2>
            <Accordion type="single" collapsible className="mt-4">
              {FAQ.map((item, idx) => (
                <AccordionItem key={item.q} value={`f-${idx}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-white p-8 md:p-10">
          <h2 className="font-display text-2xl text-ink">Send us a note</h2>
          <p className="mt-1 text-sm text-ink-muted">A real human reads everything.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
