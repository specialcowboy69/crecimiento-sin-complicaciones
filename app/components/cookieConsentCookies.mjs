export const GA_COOKIE_ROOT_DOMAIN = "crecimientosincomplicaciones.com";
export const COOKIE_CONSENT_NAME = "cookie_consent";
export const SEO_LOCAL_LEAD_EVENT = "lead_seo_local_submitted";

const LEGACY_ACCEPTED_CONSENT = "v1:accepted";
const LEGACY_REJECTED_CONSENT = "v1:rejected";

export function parseCookieConsentPreferences(cookieValue) {
  if (cookieValue === LEGACY_ACCEPTED_CONSENT) {
    return { analytics: true, advertising: false };
  }

  if (cookieValue === LEGACY_REJECTED_CONSENT) {
    return { analytics: false, advertising: false };
  }

  if (!cookieValue?.startsWith("v2:")) {
    return { analytics: false, advertising: false };
  }

  const preferences = new URLSearchParams(cookieValue.slice(3));
  const analytics = preferences.get("analytics") === "granted";

  return {
    analytics,
    advertising: analytics && preferences.get("advertising") === "granted",
  };
}

export function serializeCookieConsentPreferences({ analytics, advertising }) {
  return `v2:analytics=${analytics ? "granted" : "denied"}&advertising=${analytics && advertising ? "granted" : "denied"}`;
}

export function getCookieConsentValue(cookieHeader) {
  const prefix = `${COOKIE_CONSENT_NAME}=`;
  return cookieHeader.split("; ").find((cookie) => cookie.startsWith(prefix))?.slice(prefix.length);
}

export function getCookieConsentSnapshot(cookieHeader) {
  return getCookieConsentValue(cookieHeader) ?? null;
}

export function isGoogleAdsSeoLocalLeadEligible({ cookieHeader, sourcePath, pathname = sourcePath }) {
  const preferences = parseCookieConsentPreferences(getCookieConsentValue(cookieHeader));

  return sourcePath === "/seo/local" && pathname !== "/admin" && !pathname.startsWith("/admin/") && preferences.analytics && preferences.advertising;
}

export function sendGoogleAdsSeoLocalLeadEvent({ cookieHeader, sourcePath, gtag, pathname = sourcePath }) {
  if (!isGoogleAdsSeoLocalLeadEligible({ cookieHeader, sourcePath, pathname }) || typeof gtag !== "function") {
    return false;
  }

  gtag("event", SEO_LOCAL_LEAD_EVENT);
  return true;
}

export function getGoogleAnalyticsCookieDomains(hostname) {
  const domains = [hostname];

  if (hostname === GA_COOKIE_ROOT_DOMAIN || hostname.endsWith("." + GA_COOKIE_ROOT_DOMAIN)) {
    domains.push(GA_COOKIE_ROOT_DOMAIN);
  }

  return [...new Set(domains)];
}
