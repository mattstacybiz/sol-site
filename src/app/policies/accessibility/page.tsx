import type { Metadata } from "next";

import { brand } from "@config/brand";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description: "How Sol approaches accessibility on the web.",
};

export default function AccessibilityPolicyPage() {
  return (
    <article>
      <h1>Accessibility</h1>
      <p>
        Sol is committed to making <strong>{brand.domain}</strong> usable for the
        widest possible audience, including people with disabilities. We aim to
        meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1
        Level AA.
      </p>

      <h2>What we do</h2>
      <ul>
        <li>Build with semantic HTML and accessible component primitives.</li>
        <li>Maintain color contrast that meets WCAG AA on all body text.</li>
        <li>Keep the entire site keyboard-navigable.</li>
        <li>Provide descriptive alt text on imagery.</li>
        <li>
          Honor <code>prefers-reduced-motion</code> &mdash; animations are disabled
          or minimized for visitors who request it.
        </li>
        <li>Use clear, plain language in product copy and policies.</li>
      </ul>

      <h2>Where we&rsquo;re still improving</h2>
      <p>
        We&rsquo;re a small team and we know accessibility is never &ldquo;done.&rdquo;
        If you hit a barrier on this site &mdash; a form that doesn&rsquo;t announce
        properly, an image without alt text, a contrast issue &mdash; please tell us
        and we&rsquo;ll fix it.
      </p>

      <h2>Contact</h2>
      <p>
        Email <a href={`mailto:${brand.inboxes.general}`}>{brand.inboxes.general}</a> with
        the page and the issue. We respond to accessibility reports within two
        business days.
      </p>
    </article>
  );
}
