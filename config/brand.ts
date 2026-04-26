/**
 * Sol — single source of truth for brand identity.
 *
 * Anything visible in the UI that is "brand-y" should live here, not be
 * hardcoded in components. Colors are mirrored as CSS variables in
 * src/app/globals.css so Tailwind can consume them.
 */

export const brand = {
  name: "Sol",
  legalName: "Sol Kava Co.",
  tagline: "The first kava oral pouch.",
  shortDescription:
    "A smoke-free, alcohol-free, sugar-free kava pouch. Tuck one in. Relax with friends. That's it.",
  founded: 2025,
  city: "Raleigh, NC",
  domain: "solkava.com",
  // Email inboxes consumed by /lib/email — split so wholesale can be triaged
  // separately from general inbound.
  inboxes: {
    general: "hello@solkava.com",
    wholesale: "wholesale@solkava.com",
    press: "press@solkava.com",
  },
  // Social handles — leave as `null` to hide a link in the footer.
  social: {
    instagram: "https://instagram.com/sol.kava",
    tiktok: "https://tiktok.com/@sol.kava",
    twitter: null as string | null,
    youtube: null as string | null,
  },
  // Color tokens — refer to these in CSS via the matching --vars in globals.css.
  // Values are HSL "H S L" strings (no "hsl()" wrapper) so Tailwind can compose them.
  colors: {
    sunset: "16 100% 60%", //  #FF6B35-ish — primary
    sunsetDeep: "8 80% 48%",
    magenta: "330 81% 60%", // #EC4899-ish — accent
    ocean: "189 94% 43%", //  #06B6D4-ish — secondary
    cream: "36 100% 97%", //  #FFF8F0-ish — background
    ink: "243 47% 20%", //   #1E1B4B-ish — primary text
    inkMuted: "243 25% 40%",
    border: "30 30% 88%",
  },
  // Typography — actual font loading happens in src/app/layout.tsx.
  fonts: {
    display: "Fraunces",
    sans: "Inter",
  },
  // SEO defaults
  seo: {
    titleTemplate: "%s · Sol",
    defaultTitle: "Sol · The first kava oral pouch",
    description:
      "Sol is the first kava oral pouch. Smoke-free, alcohol-free, sugar-free. Real noble kava root, made in the USA. An adult alternative to alcohol and nicotine.",
    ogImage: "/images/og-default.jpg", // TODO: drop a 1200x630 OG image here
  },
} as const;

export type Brand = typeof brand;
