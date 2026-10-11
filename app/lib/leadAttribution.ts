import { getCookieConsentValue, parseCookieConsentPreferences } from "../components/cookieConsentCookies.mjs";

type LeadAttributionInput = {
  cookieHeader: string;
  sourcePath: string;
  referer: string | null;
  requestOrigin: string;
  type?: unknown;
  value?: unknown;
};

type LeadAttribution = {
  adsClickType: string | null;
  adsClickId: string | null;
  adsMeasurementConsentAtSubmit: boolean | null;
  adsConsentVersion: string | null;
};

export function validateLeadAttribution(input: LeadAttributionInput): LeadAttribution {
  const result: LeadAttribution = {
    adsClickType: null,
    adsClickId: null,
    adsMeasurementConsentAtSubmit: null,
    adsConsentVersion: null,
  };
  if (input.sourcePath !== "/seo/local") return result;

  const cookieValue = getCookieConsentValue(input.cookieHeader);
  if (cookieValue?.startsWith("v2:")) {
    const preferences = parseCookieConsentPreferences(cookieValue);
    result.adsMeasurementConsentAtSubmit = preferences.analytics && preferences.advertising;
    result.adsConsentVersion = "v2";
  }

  if (!result.adsMeasurementConsentAtSubmit) return result;
  try {
    const referer = input.referer ? new URL(input.referer) : null;
    if (referer?.origin !== input.requestOrigin || referer.pathname !== "/seo/local") return result;
  } catch {
    return result;
  }
  if (!["gclid", "gbraid", "wbraid"].includes(String(input.type))) return result;
  if (typeof input.value !== "string" || input.value.length === 0 || input.value.length > 512 || !/^[\x21-\x7e]+$/.test(input.value)) return result;
  result.adsClickType = input.type as string;
  result.adsClickId = input.value;
  return result;
}
