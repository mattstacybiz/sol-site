import Link from "next/link";
import { Instagram, Music2 } from "lucide-react"; // Music2 stands in for TikTok

import { brand } from "@config/brand";
import { footerNav } from "@config/nav";
import { features } from "@config/features";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-white">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_3fr]">
          <div>
            <Logo className="text-4xl" />
            <p className="mt-4 max-w-xs text-sm text-ink-muted">
              {brand.shortDescription}
            </p>
            {features.newsletter ? (
              <div className="mt-8">
                <p className="text-sm font-medium text-ink">Get the drop list.</p>
                <p className="mt-1 text-xs text-ink-muted">
                  New SKUs, bar partners, and the occasional discount. No spam.
                </p>
                <div className="mt-3 max-w-sm">
                  <NewsletterForm source="footer" />
                </div>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h3 className="font-display text-base text-ink">{col.heading}</h3>
                <ul className="mt-4 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-sm text-ink-muted transition hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink">
              <span className="inline-block h-2 w-2 rounded-full bg-sunset" /> Made in the USA
            </span>
          </div>
          <div className="flex items-center gap-3">
            {brand.social.instagram ? (
              <a
                href={brand.social.instagram}
                aria-label="Instagram"
                className="rounded-full border border-ink/15 p-2 text-ink hover:bg-ink/5"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="h-4 w-4" />
              </a>
            ) : null}
            {brand.social.tiktok ? (
              <a
                href={brand.social.tiktok}
                aria-label="TikTok"
                className="rounded-full border border-ink/15 p-2 text-ink hover:bg-ink/5"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Music2 className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          Sol is for adults 18+. Sol does not make any health or therapeutic claims about kava.
          Kava sale is regulated differently in different US jurisdictions — see{" "}
          <Link href="/policies/shipping" className="underline">shipping policy</Link>.
        </p>
      </div>
    </footer>
  );
}
