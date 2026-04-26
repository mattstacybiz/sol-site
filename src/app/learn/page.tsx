import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, HelpCircle, MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SunMark } from "@/components/decor/sun-mark";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Everything to get up to speed on Sol — what kava is, how the brand started, where to find Sol in the wild, and answers to common questions.",
  alternates: { canonical: "/learn" },
};

const TOPICS = [
  {
    href: "/kava-101",
    label: "Kava 101",
    icon: BookOpen,
    summary:
      "What kava is, where it comes from, what it feels like, and how a Sol pouch fits in. The basics for anyone new to the plant.",
    bullets: [
      "What kava is and where it comes from",
      "What kava feels like (and what it doesn't)",
      "Why a pouch versus a bowl",
      "Safety basics for adults 18+",
    ],
  },
  {
    href: "/about",
    label: "About Sol",
    icon: Sparkles,
    summary:
      "Why Sol exists, who it's built for, what's inside the pouch, and how it's made.",
    bullets: [
      "Why we built Sol",
      "What's in a Sol pouch",
      "Sourcing &amp; manufacturing",
      "Compliance, in plain English",
    ],
  },
  {
    href: "/find-us",
    label: "Store Locator",
    icon: MapPin,
    summary:
      "Find a kava bar or shop carrying Sol near you. New locations get added as they come online.",
    bullets: [
      "Search by city",
      "Bars + shops carrying Sol",
      "Direct website + map links",
    ],
  },
  {
    href: "/learn/faq",
    label: "FAQ",
    icon: HelpCircle,
    summary:
      "Quick answers to common questions about the product, shipping, kava itself, and ordering.",
    bullets: [
      "Product + ingredients",
      "Shipping + returns",
      "Kava effects + safety",
      "Wholesale + accounts",
    ],
  },
];

export default function LearnPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient-soft relative isolate overflow-hidden">
        <SunMark className="absolute -right-24 -top-24 h-[420px] w-[420px] text-sunset/30 hidden md:block" />
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <Badge variant="ocean">Learn</Badge>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
              Everything Sol, <span className="italic text-sunset">in one place.</span>
            </h1>
            <p className="mt-6 text-lg text-ink-muted">
              Pick a topic. Each one expands here, or you can jump straight to the
              full page for the long read.
            </p>
          </div>
        </div>
      </section>

      {/* Expandable topics */}
      <section className="container py-16 md:py-24">
        <Accordion
          type="multiple"
          defaultValue={TOPICS.map((t) => t.href)}
          className="mx-auto max-w-3xl"
        >
          {TOPICS.map(({ href, label, icon: Icon, summary, bullets }) => (
            <AccordionItem key={href} value={href}>
              <AccordionTrigger>
                <span className="flex items-center gap-3 text-left">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sunset/10 text-sunset">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="font-display text-xl text-ink">{label}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-12">
                  <p className="text-ink-muted">{summary}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-ink/85">
                    {bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sunset" />
                        <span dangerouslySetInnerHTML={{ __html: b }} />
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-sunset hover:underline"
                  >
                    Open {label} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
