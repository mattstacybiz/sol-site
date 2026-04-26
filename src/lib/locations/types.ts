/**
 * Locations adapter types — store locator.
 * "Where can I buy Sol in person?" → kava bars, smoke shops, etc.
 */

export type Location = {
  id: string;
  slug: string;
  name: string;
  /** "kava-bar" | "smoke-shop" | "retail" | "other" */
  type: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  lat?: number;
  lng?: number;
  /** Optional public-facing site / Instagram. */
  website?: string;
  instagram?: string;
};

export type LocationFilter = {
  state?: string;
  city?: string;
  type?: string;
  /** Free-text search over name + city. */
  q?: string;
};

export interface LocationsAdapter {
  listLocations(filter?: LocationFilter): Promise<Location[]>;
  getLocation(slug: string): Promise<Location | null>;
}
