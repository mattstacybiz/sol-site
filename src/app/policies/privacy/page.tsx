import type { Metadata } from "next";

import { brand } from "@config/brand";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Sol collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <article>
      <h1>Privacy policy</h1>
      <p className="rounded-2xl border-2 border-dashed border-sunset/60 bg-sunset/5 p-4 text-sm text-ink">
        <strong>[REVIEW WITH LAWYER BEFORE LAUNCH]</strong> — This is a working
        draft. Final language must be reviewed by counsel familiar with CCPA,
        GDPR (if applicable), and state-level privacy law.
      </p>

      <h2>What we collect</h2>
      <p>
        When you visit <strong>{brand.domain}</strong>, place an order, or sign up
        for our list, we collect:
      </p>
      <ul>
        <li>Contact details you provide (name, email, shipping address, phone if given)</li>
        <li>Order history and payment confirmation (we never store full card numbers)</li>
        <li>Communications you send us (email, contact form)</li>
        <li>
          Standard analytics: pages viewed, device type, referring source,
          aggregated usage. See &ldquo;Analytics + advertising&rdquo; below.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To fulfill orders and provide customer service</li>
        <li>To send transactional email (order confirmations, shipping updates)</li>
        <li>To send marketing email if you opt in &mdash; you can unsubscribe at any time</li>
        <li>To improve the site and the product</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>Analytics + advertising</h2>
      <p>
        We use first- and third-party analytics tools to understand how the site
        is used and to measure ad performance. These may include Google Analytics,
        Meta (Facebook/Instagram), TikTok, and similar services. You can opt out
        of cross-site tracking via your browser&rsquo;s &ldquo;Do Not Track&rdquo;
        or &ldquo;Global Privacy Control&rdquo; signal, which we honor.
      </p>

      <h2>Sharing</h2>
      <p>
        We do not sell your personal information. We share data only with service
        providers who help us run the business (fulfillment, payment processing,
        email, analytics) and only to the extent they need it.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct,
        delete, or port your personal data, and to opt out of certain uses. Email{" "}
        <a href={`mailto:${brand.inboxes.general}`}>{brand.inboxes.general}</a> to
        exercise any of these rights.
      </p>

      <h2>Children</h2>
      <p>
        Sol is for adults 21 and over. We do not knowingly collect data from
        anyone under 21.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions: <a href={`mailto:${brand.inboxes.general}`}>{brand.inboxes.general}</a>.
      </p>
    </article>
  );
}
