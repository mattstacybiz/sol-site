/**
 * Mock locations adapter — returns an empty list. The /find-us page renders
 * a "coming soon" state when nothing comes back.
 *
 * !! TODO: Seed real entries here as locations come online, OR swap
 *    LOCATIONS_PROVIDER to a real backend (Shopify Metaobject / CSV /
 *    Google Places).
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
