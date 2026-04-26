import type { Metadata } from "next";
import Image from "next/image";
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

export const metadata: Metadata = {
  title: "Kava 101 — what kava is, what to expect, and why pouches",
  description:
    "What is kava? Where does it come from? What does it feel like, and is it safe? A plain-English guide for adults 21+, from Sol — the first kava oral pouch.",
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
    a: "Kava has a long traditional history. As with anything, moderation matters: don't mix with alcohol, don't drive after using, and start with one pouch to see how you feel. Sol is for adults 21+.",
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

      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Badge variant="ocean">Kava 101</Badge>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
            New to kava? Read this first.
          </h1>
          <p className="mt-5 text-lg text-ink-muted">
            Most people in the US have never heard of kava. That&rsquo;s changing — kava bars are
            opening in every major city — but it&rsquo;s still new ground. Here&rsquo;s what it is,
            what it isn&rsquo;t, and why we put it in a pouch.
          </p>
        </div>

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
            off over an hour or two. {/* TODO: refine if Daily Manufacturing tightens the curve */}
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
            <li>Adults 21+ only.</li>
            <li>Don&rsquo;t mix with alcohol.</li>
            <li>Don&rsquo;t drive after using.</li>
            <li>Start with one pouch. See how you feel.</li>
            <li>If you&rsquo;re pregnant, nursing, or on medication, talk to your doctor first.</li>
          </ul>
          <p>
            Sol does not make health or therapeutic claims. We make kava pouches.
          </p>
        </div>

        {/* Hero photo break */}
        <div className="container my-16 md:my-24">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-cream">
            <Image
              src="https://images.unsplash.com/photo-1540202404-1b927e27fa8b?auto=format&fit=crop&w=1600&q=80"
              alt="A kava bar at dusk."
              fill
              sizes="100vw"
              className="object-cover"
            />
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
            <Link href="/shop/sol-sample-pack">Try a sample pack</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
