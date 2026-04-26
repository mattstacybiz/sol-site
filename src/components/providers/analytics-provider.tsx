"use client";

import * as React from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

import { analytics, getProviderList } from "@/lib/analytics";

/**
 * Tracks page_view on every route change.
 *
 * Split out from AnalyticsProvider so it can be wrapped in <Suspense>;
 * `useSearchParams` opts the entire component subtree out of static
 * prerendering otherwise.
 */
function PageViewTracker() {
  const pathname = usePathname();
  const search = useSearchParams();

  React.useEffect(() => {
    if (!pathname) return;
    const url = pathname + (search?.toString() ? `?${search}` : "");
    analytics.page(url);
    analytics.track("page_view", { path: url });
  }, [pathname, search]);

  return null;
}

/**
 * Loads third-party pixel/analytics scripts based on
 * NEXT_PUBLIC_ANALYTICS_PROVIDERS, then fires `page_view` on every route change.
 *
 * Adding a new provider: drop a script-loader case in the switch + add the
 * adapter in /lib/analytics.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const providers = getProviderList();

  return (
    <>
      <React.Suspense fallback={null}>
        <PageViewTracker />
      </React.Suspense>
      {providers.includes("ga4") && process.env.NEXT_PUBLIC_GA4_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');`}
          </Script>
        </>
      ) : null}

      {providers.includes("meta") && process.env.NEXT_PUBLIC_META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}

      {providers.includes("tiktok") && process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ? (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function (w, d, t) { w.TiktokAnalyticsObject=t; var ttq=w[t]=w[t]||[]; ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"]; ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}; for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]); ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e}; ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)}; ttq.load('${process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID}'); ttq.page(); }(window, document, 'ttq');`}
        </Script>
      ) : null}

      {providers.includes("posthog") && process.env.NEXT_PUBLIC_POSTHOG_KEY ? (
        <Script id="posthog-init" strategy="afterInteractive">
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}',{api_host:'${process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com"}'});`}
        </Script>
      ) : null}

      {children}
    </>
  );
}
