/**
 * Top-of-page announcement bar. Edit copy here.
 * Hidden via the `announcementBar` feature flag in config/features.ts.
 */
export function AnnouncementBar() {
  return (
    <div className="hero-gradient text-white">
      <div className="container flex h-9 items-center justify-center text-xs font-medium tracking-wide sm:text-sm">
        {/* TODO: rotate copy seasonally — launch promo, free shipping over $X, etc. */}
        Free shipping on multipacks · Made in the USA · Wholesale orders shipping now
      </div>
    </div>
  );
}
