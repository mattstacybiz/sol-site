import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { SunMark } from "@/components/decor/sun-mark";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Sol — the product, kava itself, shipping, returns, and how to get in touch.",
  alternates: { canonical: "/learn/faq" },
};

const SECTIONS: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "Product",
    items: [
      {
        q: "What is a Sol pouch?",
        a: "A small, soft pouch you tuck under your lip — like a nicotine pouch, but filled with concentrated noble kava root extract instead. No smoke, no nicotine, no alcohol, no sugar.",
      },
      {
        q: "How many pouches are in a tin?",
        a: "Twenty pouches per tin. Most people pace one pouch per session.",
      },
      {
        q: "How is Sol sold?",
        a: "By the sleeve — five tins of twenty pouches each, one hundred pouches total. We don't sell single tins on the site. Free shipping in the US.",
      },
      {
        q: "What flavors are available?",
        a: "Cool mint at launch. More flavors are in development.",
      },
      {
        q: "What's in a Sol pouch?",
        a: "Noble kava root extract, food-grade carrier (microcrystalline cellulose), natural mint flavor, and xanthan gum for texture. That's it. No nicotine, caffeine, sugar, or alcohol.",
      },
      {
        q: "How long does a pouch last?",
        a: "About 15–30 minutes under your lip. Effects come on during that window and ease off over an hour or two.",
      },
      {
        q: "Where is Sol made?",
        a: "Sol is manufactured in the United States by an experienced oral-format contract partner. Our kava root is sourced from established Pacific Island suppliers and tested before it ships.",
      },
    ],
  },
  {
    heading: "Kava",
    items: [
      {
        q: "What is kava?",
        a: "Kava is the root of a Pacific Island plant (Piper methysticum) that has been consumed socially for centuries. Traditionally it's prepared as a thick beverage and shared from a bowl — that's the basis of the modern kava bar scene.",
      },
      {
        q: "What does kava feel like?",
        a: "Most people describe kava as relaxing, social, and clear-headed. It's not sleepy, not euphoric, and not impairing in the way alcohol is. Effects are usually noticed within 15–30 minutes.",
      },
      {
        q: "Is kava the same as kratom or CBD?",
        a: "No. Kava, kratom, and CBD are three different plants with three different effects. Sol contains kava only — no kratom, no CBD, no nicotine, no caffeine.",
      },
      {
        q: "Is kava safe?",
        a: "Kava has a long traditional history. As with anything, moderation matters: don't mix with alcohol, don't drive after using, and start with one pouch to see how you feel. Sol is for adults 18+. If you're pregnant, nursing, or on medication, talk to your doctor first.",
      },
    ],
  },
  {
    heading: "Shipping + orders",
    items: [
      {
        q: "Where do orders ship from?",
        a: "Orders ship from our US fulfillment partner. Most orders go out within 1–2 business days.",
      },
      {
        q: "Do you ship to my state?",
        a: "Sol ships across most of the US. A handful of states regulate kava sale differently — see our shipping policy for the current list.",
      },
      {
        q: "How long does shipping take?",
        a: "Standard ground shipping arrives in 3–7 business days depending on destination. Tracking goes out as soon as a label is generated.",
      },
      {
        q: "Can I return a tin?",
        a: "Unopened tins can be returned within 30 days of delivery. Damaged shipments are replaced or refunded — see our returns policy for details.",
      },
    ],
  },
  {
    heading: "Brand + wholesale",
    items: [
      {
        q: "I run a kava bar / shop. Can I carry Sol?",
        a: "Yes — head over to /wholesale and fill out the form. A real human will be in touch within 1–2 business days.",
      },
      {
        q: "Are you hiring or open to brand partnerships?",
        a: "Use the contact form and pick the relevant topic. We read everything.",
      },
      {
        q: "Press inquiries?",
        a: "Email press@solkava.com or use the contact form.",
      },
    ],
  },
];

// Flatten for JSON-LD (search engines like one big list).
const FLAT_FAQ = SECTIONS.flatMap((s) => s.items);

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={FLAT_FAQ} />

      {/* Hero */}
      <section className="hero-gradient-soft relative isolate overflow-hidden">
        <SunMark className="absolute -right-24 -top-24 h-[420px] w-[420px] text-sunset/30 hidden md:block" />
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <Badge variant="ocean">FAQ</Badge>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
              Common <span className="italic text-sunset">questions.</span>
            </h1>
            <p className="mt-6 text-lg text-ink-muted">
              Quick answers about the product, kava itself, shipping, and how to
              get in touch. Can&rsquo;t find what you&rsquo;re looking for?{" "}
              <Link href="/contact" className="text-sunset underline">
                Send us a note.
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="mx-auto grid max-w-3xl gap-12">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-2xl text-ink">{section.heading}</h2>
              <Accordion type="single" collapsible className="mt-4">
                {section.items.map((item, idx) => (
                  <AccordionItem key={item.q} value={`${section.heading}-${idx}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="mt-4 rounded-3xl bg-cream-card p-8 text-center ring-1 ring-ink/10">
            <p className="font-display text-2xl text-ink">Still stuck?</p>
            <p className="mt-2 text-ink-muted">
              Email <a className="text-sunset underline" href="mailto:hello@solkava.com">hello@solkava.com</a>{" "}
              or use the contact form.
            </p>
            <Button asChild variant="sunset" className="mt-5">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
