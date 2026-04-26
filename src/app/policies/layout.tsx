import Link from "next/link";

import { Badge } from "@/components/ui/badge";

const POLICY_LINKS = [
  { href: "/policies/shipping", label: "Shipping" },
  { href: "/policies/returns", label: "Returns" },
  { href: "/policies/privacy", label: "Privacy" },
  { href: "/policies/terms", label: "Terms" },
  { href: "/policies/accessibility", label: "Accessibility" },
];

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-[220px_1fr] md:gap-16">
        <aside className="md:sticky md:top-24 md:self-start">
          <Badge variant="ink">Policies</Badge>
          <nav className="mt-4 grid gap-2 text-sm">
            {POLICY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink-muted hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mt-8 text-xs text-ink-muted">
            Last updated regularly. Questions? Email{" "}
            <a href="mailto:hello@solkava.com" className="underline">hello@solkava.com</a>.
          </p>
        </aside>
        <div className="prose-sol max-w-none">{children}</div>
      </div>
    </section>
  );
}
