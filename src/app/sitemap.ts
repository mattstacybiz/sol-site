import type { MetadataRoute } from "next";

import { brand } from "@config/brand";
import { commerce } from "@/lib/commerce";

/**
 * Sitemap generator. Pulls product handles from the commerce adapter so it
 * stays correct whether we're on mock data or live Shopify.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = `https://${brand.domain}`;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/shop",
    "/kava-101",
    "/about",
    "/wholesale",
    "/contact",
    "/find-us",
    "/policies/shipping",
    "/policies/returns",
    "/policies/privacy",
    "/policies/terms",
    "/policies/accessibility",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await commerce.listProducts({});
    productRoutes = products.map((p) => ({
      url: `${base}/shop/${p.handle}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // If the commerce adapter is down at build time, ship the static routes.
  }

  return [...staticRoutes, ...productRoutes];
}
