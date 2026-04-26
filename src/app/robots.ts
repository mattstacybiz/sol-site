import type { MetadataRoute } from "next";

import { brand } from "@config/brand";

export default function robots(): MetadataRoute.Robots {
  const base = `https://${brand.domain}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Don't index the API surface or internal-only routes.
        disallow: ["/api/", "/actions/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
