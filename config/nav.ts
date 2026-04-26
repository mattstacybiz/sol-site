/**
 * Header + footer nav as data, not hardcoded JSX.
 * Edit links here; components in src/components/layout/ render from this.
 */

import { features } from "./features";

export type NavLink = {
  label: string;
  href: string;
  /** If true, render with extra emphasis (e.g. wholesale CTA). */
  emphasis?: boolean;
};

export const headerNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Kava 101", href: "/kava-101" },
  { label: "About", href: "/about" },
  ...(features.locator ? [{ label: "Find Us", href: "/find-us" }] : []),
  ...(features.wholesale
    ? [{ label: "Wholesale", href: "/wholesale", emphasis: true as const }]
    : []),
];

export type FooterColumn = {
  heading: string;
  links: NavLink[];
};

export const footerNav: FooterColumn[] = [
  {
    heading: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Sample pack", href: "/shop/sol-sample-pack" },
      { label: "5-can multipack", href: "/shop/sol-original-5pack" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Kava 101", href: "/kava-101" },
      { label: "About Sol", href: "/about" },
      { label: "Find a kava bar", href: "/find-us" },
    ],
  },
  {
    heading: "Trade",
    links: [
      { label: "Wholesale", href: "/wholesale" },
      { label: "Press", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Shipping", href: "/policies/shipping" },
      { label: "Returns", href: "/policies/returns" },
      { label: "Privacy", href: "/policies/privacy" },
      { label: "Terms", href: "/policies/terms" },
      { label: "Accessibility", href: "/policies/accessibility" },
    ],
  },
];
