/**
 * Mock locations adapter — returns an empty list. The /find-us page renders
 * a "coming soon" state when nothing comes back.
 *
 * !! TODO: As wholesale accounts close (lead market: Tampa / St. Pete kava
 *    bars), seed real entries here, OR swap LOCATIONS_PROVIDER to a Shopify
 *    Metaobject / CSV / Google Places implementation.
 */

import type { LocationsAdapter } from "./types";

export const mockLocations: LocationsAdapter = {
  async listLocations() {
    return [];
  },
  async getLocation() {
    return null;
  },
};
