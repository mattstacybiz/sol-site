/**
 * CMS adapter selector.
 */

import { localCms } from "./local";
import type { CmsAdapter } from "./types";

const provider = (process.env.CMS_PROVIDER ?? "local").toLowerCase();

export const cms: CmsAdapter = (() => {
  switch (provider) {
    // case "sanity":             return sanityCms;
    // case "contentful":         return contentfulCms;
    // case "shopify_metaobject": return shopifyMetaobjectCms;
    default:
      return localCms;
  }
})();

export type { CmsPage, CmsPost } from "./types";
