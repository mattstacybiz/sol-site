/**
 * Locations adapter selector.
 */

import { mockLocations } from "./mock";
import type { LocationsAdapter } from "./types";

const provider = (process.env.LOCATIONS_PROVIDER ?? "mock").toLowerCase();

export const locations: LocationsAdapter = (() => {
  switch (provider) {
    // case "shopify_metaobject": return shopifyMetaobjectLocations;
    // case "csv":                return csvLocations;
    // case "google_places":      return googlePlacesLocations;
    default:
      return mockLocations;
  }
})();

export type { Location, LocationFilter } from "./types";
