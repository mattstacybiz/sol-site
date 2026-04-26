import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { brand } from "@config/brand";
import { features } from "@config/features";
import { AgeGate } from "@/components/layout/age-gate";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { AnalyticsProvider } from "@/components/providers/analytics-provider";
import { CartProvider } from "@/components/providers/cart-provider";

import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: brand.seo.defaultTitle,
    template: brand.seo.titleTemplate,
  },
  description: brand.seo.description,
  applicationName: brand.name,
  authors: [{ name: brand.legalName }],
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: brand.seo.defaultTitle,
    description: brand.seo.description,
    images: [{ url: brand.seo.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.seo.defaultTitle,
    description: brand.seo.description,
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream text-ink">
        <AnalyticsProvider>
          <CartProvider>
            {features.announcementBar ? <AnnouncementBar /> : null}
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            {features.ageGate ? <AgeGate /> : null}
          </CartProvider>
        </AnalyticsProvider>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
