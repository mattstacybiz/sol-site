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
  /**
   * Optional sub-links. If present, the header renders this item as a
   * dropdown on desktop and a nested list on mobile. The parent link is
   * still navigable to its own `href` (e.g. `/learn` is a real hub page).
   */
  children?: NavLink[];
};

export const headerNav: NavLink[] = [
  { label: "Shop", href: "/shop" },
  {
    label: "Learn",
    href: "/learn",
    children: [
      { label: "Kava 101", href: "/kava-101" },
      { label: "About Sol", href: "/about" },
      ...(features.locator
        ? [{ label: "Store Locator", href: "/find-us" }]
        : []),
      { label: "FAQ", href: "/learn/faq" },
    ],
  },
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
      { label: "Shop all", href: "/shop" },
      { label: "Mint sleeve", href: "/shop/sol-mint-sleeve" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Kava 101", href: "/kava-101" },
      { label: "About Sol", href: "/about" },
      { label: "Store Locator", href: "/find-us" },
      { label: "FAQ", href: "/learn/faq" },
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
