import type { Metadata } from "next";

import { brand } from "@config/brand";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that govern your use of solkava.com.",
};

export default function TermsPolicyPage() {
  return (
    <article>
      <h1>Terms of service</h1>
      <p className="rounded-2xl border-2 border-dashed border-sunset/60 bg-sunset/5 p-4 text-sm text-ink">
        <strong>[REVIEW WITH LAWYER BEFORE LAUNCH]</strong> — Boilerplate terms.
        Counsel must finalize, especially the limitation of liability, dispute
        resolution, and choice-of-law sections.
      </p>

      <h2>About these terms</h2>
      <p>
        These terms govern your use of <strong>{brand.domain}</strong>, operated by{" "}
        {brand.legalName}. By using the site or buying our products, you agree to
        these terms.
      </p>

      <h2>Eligibility</h2>
      <p>
        Sol products are sold to adults 21 and over only. By placing an order, you
        confirm that you meet that age requirement.
      </p>

      <h2>No medical claims</h2>
      <p>
        Sol products are not drugs. We do not claim that Sol diagnoses, treats,
        cures, or prevents any disease, and nothing on this site should be read
        that way. Statements about Sol have not been evaluated by the FDA. If you
        are pregnant, nursing, on medication, or have a medical condition, talk to
        a healthcare professional before consuming kava.
      </p>

      <h2>Use of the site</h2>
      <p>
        Don&rsquo;t use the site to break the law, infringe anyone&rsquo;s rights,
        scrape at high volume, or bypass security measures. We may suspend access
        for violations.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Sol brand, logo, copy, photography, and design are owned by{" "}
        {brand.legalName} and may not be reused without written permission.
      </p>

      <h2>Pricing + product</h2>
      <p>
        Prices and availability are subject to change. We may correct pricing
        errors and cancel affected orders with a full refund. Product photography
        is illustrative; actual product appearance may vary slightly.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent allowed by law, {brand.legalName} is not liable for
        indirect, incidental, or consequential damages arising from your use of
        the site or products. Total liability is capped at the amount you paid for
        the order in question.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of North Carolina,
        without regard to conflict-of-law rules.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${brand.inboxes.general}`}>{brand.inboxes.general}</a>.
      </p>
    </article>
  );
}
