import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { SunMark } from "@/components/decor/sun-mark";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kava 101 — what kava is, what to expect, and why pouches",
  description:
    "What is kava? Where does it come from? What does it feel like, and is it safe? A plain-English guide for adults 18+, from Sol — the first kava oral pouch.",
  keywords: ["what is kava", "kava pouch", "kava vs alcohol", "is kava safe", "kava bar"],
  alternates: { canonical: "/kava-101" },
};

const FAQ = [
  {
    q: "What is kava?",
    a: "Kava is the root of a Pacific Island plant (Piper methysticum) that has been consumed socially for centuries. Traditionally it's prepared as a thick beverage and shared from a bowl — that's the basis of the modern kava bar scene.",
  },
  {
    q: "What does kava feel like?",
    a: "People describe kava as relaxing, social, and clear-headed. It's not sleepy, not euphoric, and not impairing in the way alcohol is. Effects are usually noticed within 15–30 minutes and ease off over an hour or two.",
  },
  {
    q: "Is kava the same as kratom or CBD?",
    a: "No. Kava, kratom, and CBD are three different plants with three different effects. Sol contains kava only — no kratom, no CBD, no nicotine, no caffeine.",
  },
  {
    q: "How is a Sol pouch different from drinking kava?",
    a: "Same plant, different format. A Sol pouch goes under your lip, like a nicotine pouch, and delivers a measured amount of kava root extract over 15–30 minutes. No prep, no bowl, no muddy taste.",
  },
  {
    q: "Is kava safe?",
    a: "Kava has a long traditional history. As with anything, moderation matters: don't mix with alcohol, don't drive after using, and start with one pouch to see how you feel. Sol is for adults 18+.",
  },
  {
    q: "Where does Sol ship?",
    a: "Sol ships across most of the US. Some states regulate kava sale differently — see our shipping policy for the current list.",
  },
];

export default function Kava101Page() {
  return (
    <>
      <FaqJsonLd items={FAQ} />

      <section className="hero-gradient-soft relative isolate overflow-hidden">
        <SunMark className="absolute -right-24 -top-24 h-[420px] w-[420px] text-sunset/30 hidden md:block" />
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <Badge variant="ocean">Kava 101</Badge>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
              New to kava? <span className="italic text-sunset">Read this first.</span>
            </h1>
            <p className="mt-6 text-lg text-ink-muted">
              Most people in the US have never heard of kava. That&rsquo;s changing — kava bars are
              opening in every major city — but it&rsquo;s still new ground. Here&rsquo;s what it is,
              what it isn&rsquo;t, and why we put it in a pouch.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">

        <div className="mx-auto mt-16 max-w-3xl prose-sol">
          <h2>What kava actually is</h2>
          <p>
            Kava (<em>Piper methysticum</em>) is a plant native to the Pacific Islands. Its roots
            contain compounds called <strong>kavalactones</strong> that produce a calm, social
            feeling. It has been consumed for centuries in Fiji, Vanuatu, Tonga, Samoa, and Hawaii
            — almost always in a group, almost always from a shared bowl.
          </p>
          <p>
            In the US, kava is the centerpiece of a growing kava bar scene. Tampa, FL alone has
            more kava bars per capita than any other US city. They&rsquo;re bars without alcohol —
            quiet rooms, conversation, a fresh round every twenty minutes or so.
          </p>

          <h2>What it feels like</h2>
          <p>
            Most people describe kava as relaxing and a little social — like the first sip of a
            beer minus the rest of the buzz. You&rsquo;re still you. You can still drive a
            conversation. You&rsquo;re just less wound up.
          </p>
          <p>
            Effects come on in about 15&ndash;30 minutes, peak around the 45-minute mark, and ease
            off over an hour or two.
          </p>

          <h2>Why a pouch?</h2>
          <p>
            Brewed kava is great in a bar. It&rsquo;s less great when you&rsquo;re traveling, at a
            tailgate, on a hike, or just don&rsquo;t want to dirty a glass. We packed concentrated
            noble kava root extract into a soft pouch you tuck under your lip — same compounds,
            measured dose, no prep. Twenty per can.
          </p>

          <h2>Safety basics</h2>
          <ul>
            <li>Adults 18+ only.</li>
            <li>Don&rsquo;t mix with alcohol.</li>
            <li>Don&rsquo;t drive after using.</li>
            <li>Start with one pouch. See how you feel.</li>
            <li>If you&rsquo;re pregnant, nursing, or on medication, talk to your doctor first.</li>
          </ul>
          <p>
            Sol does not make health or therapeutic claims. We make kava pouches.
          </p>
        </div>

        {/* Stat band — replaces the stock photo break with on-brand content. */}
        <div className="mx-auto my-16 grid max-w-5xl gap-4 md:my-24 md:grid-cols-3">
          <div className="rounded-3xl bg-ink p-8 text-cream">
            <p className="font-display text-5xl">15–30</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-cream/70">Minutes to onset</p>
          </div>
          <div className="rounded-3xl bg-sunset p-8 text-white">
            <p className="font-display text-5xl">~2hr</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/80">Effect duration</p>
          </div>
          <div className="rounded-3xl bg-ocean p-8 text-white">
            <p className="font-display text-5xl">20</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/85">Pouches per can</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-ink">FAQ</h2>
          <Accordion type="single" collapsible className="mt-6">
            {FAQ.map((item, idx) => (
              <AccordionItem key={item.q} value={`item-${idx}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <Button asChild size="lg" variant="sunset">
            <Link href="/shop/sol-mint-sleeve">Shop the mint sleeve</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
