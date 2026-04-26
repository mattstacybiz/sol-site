import type { Metadata } from "next";

import { restrictedStates } from "@config/restricted-states";

export const metadata: Metadata = {
  title: "Shipping policy",
  description: "Where Sol ships, how fast, and what to expect.",
};

export default function ShippingPolicyPage() {
  const isPlaceholder =
    restrictedStates.length === 1 && restrictedStates[0]?.code === "XX";

  return (
    <article>
      <h1>Shipping policy</h1>
      <p className="rounded-2xl border-2 border-dashed border-sunset/60 bg-sunset/5 p-4 text-sm text-ink">
        <strong>[REVIEW WITH LAWYER BEFORE LAUNCH]</strong> — This page is a working
        draft. Restricted-state list, carrier terms, and order-handling language must
        be confirmed with regulatory counsel.
      </p>

      <h2>Where we ship</h2>
      <p>
        Sol ships across most of the United States from our US fulfillment partner.
        Orders are typically processed within 1&ndash;2 business days. Standard
        ground shipping arrives in 3&ndash;7 business days depending on destination.
      </p>

      <h2>Order processing</h2>
      <p>
        Orders placed before 1pm ET on a business day generally ship the same day.
        Orders placed after that, on weekends, or on US holidays go out the next
        business day. You&rsquo;ll get a tracking email as soon as a label is generated.
      </p>

      <h2>Shipping rates</h2>
      <p>
        Live rates are calculated at checkout based on weight and destination.
        Promotional free-shipping thresholds, when active, are listed on the cart
        and checkout pages.
      </p>

      <h2>Restricted states</h2>
      <p>
        Kava sale is regulated differently in different US jurisdictions. We do not
        currently ship Sol to the following states or territories:
      </p>
      {isPlaceholder ? (
        <p className="rounded-xl bg-cream p-4 text-sm text-ink-muted">
          <em>
            The current restricted-state list is a placeholder. The final list will
            be confirmed with regulatory counsel before public launch.
          </em>
        </p>
      ) : (
        <ul>
          {restrictedStates.map((state) => (
            <li key={state.code}>
              <strong>{state.name}</strong> ({state.code}) &mdash; {state.reason}
            </li>
          ))}
        </ul>
      )}

      <h2>International shipping</h2>
      <p>
        Sol does not currently ship internationally. Wholesale partners outside the
        US should reach out via{" "}
        <a href="/wholesale">/wholesale</a>.
      </p>

      <h2>Lost or damaged shipments</h2>
      <p>
        If your order arrives damaged, or never arrives at all, email{" "}
        <a href="mailto:hello@solkava.com">hello@solkava.com</a> within 14 days of
        the carrier&rsquo;s delivery date and we&rsquo;ll make it right.
      </p>

      <h2>Age verification</h2>
      <p>
        Sol is for adults 18 and over. The carrier may request signature
        verification at delivery for kava shipments depending on destination state.
      </p>
    </article>
  );
}
