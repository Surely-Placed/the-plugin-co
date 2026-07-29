import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../../lib/config";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _linkedin_data_partner_ids?: string[];
    clarity?: (...args: unknown[]) => void;
  }
}

function injectScript(id: string, src: string, inline?: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  if (src) script.src = src;
  if (inline) script.innerHTML = inline;
  script.async = true;
  document.head.appendChild(script);
}

export function AnalyticsScripts() {
  const location = useLocation();
  const { gtmId, ga4Id, clarityId, metaPixelId, linkedInPartnerId } =
    siteConfig.analytics;

  useEffect(() => {
    if (gtmId) {
      window.dataLayer = window.dataLayer || [];
      injectScript(
        "gtm",
        "",
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`
      );
    }

    if (ga4Id && !gtmId) {
      injectScript("ga4-lib", `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", ga4Id);
    }

    if (clarityId) {
      injectScript(
        "clarity",
        "",
        `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`
      );
    }

    if (metaPixelId) {
      injectScript(
        "meta-pixel",
        "",
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`
      );
    }

    if (linkedInPartnerId) {
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(linkedInPartnerId);
      injectScript("linkedin-insight", "https://snap.licdn.com/li.lms-analytics/insight.min.js");
    }
  }, [gtmId, ga4Id, clarityId, metaPixelId, linkedInPartnerId]);

  useEffect(() => {
    if (window.gtag && ga4Id) {
      window.gtag("config", ga4Id, { page_path: location.pathname });
    }
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location.pathname, ga4Id]);

  return null;
}
