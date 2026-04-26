import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns + refunds",
  description: "Our returns policy for Sol kava pouches.",
};

export default function ReturnsPolicyPage() {
  return (
    <article>
      <h1>Returns &amp; refunds</h1>
      <p className="rounded-2xl border-2 border-dashed border-sunset/60 bg-sunset/5 p-4 text-sm text-ink">
        <strong>[REVIEW WITH LAWYER BEFORE LAUNCH]</strong> — Final returns policy
        must be confirmed with counsel and aligned with applicable consumer
        protection law in each shipping jurisdiction.
      </p>

      <h2>Unopened product</h2>
      <p>
        Because Sol is an ingestible product, we can only accept returns of{" "}
        <strong>unopened, unused</strong> sleeves (with all five tins still
        sealed) within 30 days of delivery. Email{" "}
        <a href="mailto:hello@solkava.com">hello@solkava.com</a> with your order
        number and we&rsquo;ll send a return label. Once we receive the product,
        we&rsquo;ll refund the original payment method within 5&ndash;7 business days.
      </p>

      <h2>Damaged or defective</h2>
      <p>
        If a Sol product arrives damaged, leaks, or has a quality issue, send a
        photo to <a href="mailto:hello@solkava.com">hello@solkava.com</a> within
        14 days of delivery and we&rsquo;ll replace it at no charge or refund in
        full &mdash; your call.
      </p>

      <h2>Wrong item shipped</h2>
      <p>
        If your order arrives with the wrong product, we&rsquo;ll ship the correct
        item immediately and cover return shipping for the original.
      </p>

      <h2>Wholesale orders</h2>
      <p>
        Wholesale return terms are governed by your account&rsquo;s individual
        terms sheet. Contact your Sol rep or email{" "}
        <a href="mailto:wholesale@solkava.com">wholesale@solkava.com</a>.
      </p>
    </article>
  );
}
