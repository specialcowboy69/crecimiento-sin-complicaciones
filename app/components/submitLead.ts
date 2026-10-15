import { track } from "@vercel/analytics";
import { getCookieConsentValue, isGoogleAdsSeoLocalLeadEligible, parseCookieConsentPreferences } from "./cookieConsentCookies.mjs";
import { readAdsClick } from "./adsClickAttribution.mjs";
import { deliverGoogleAdsSeoLocalLeadEvent } from "./googleLeadDelivery.mjs";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type LeadSubmission = {
  sourcePage: string;
  sourcePath: string;
  formType: string;
  name: string;
  contact?: string;
  phone?: string;
  email?: string;
  company?: string;
  message?: string;
  interestedService?: string;
};

export async function submitLead(payload: LeadSubmission) {
  let googleLeadEligibleAtSubmit = false;
  let adsClick: { type: string; value: string } | null = null;
  try {
    googleLeadEligibleAtSubmit = isGoogleAdsSeoLocalLeadEligible({
      cookieHeader: document.cookie,
      sourcePath: payload.sourcePath,
      pathname: window.location.pathname,
    });
    if (googleLeadEligibleAtSubmit) {
      adsClick = readAdsClick({
        pathname: window.location.pathname,
        preferences: parseCookieConsentPreferences(getCookieConsentValue(document.cookie)),
        storage: window.sessionStorage,
      });
    }
  } catch {
    // Optional measurement must not prevent the lead request.
  }

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      ...(adsClick ? { adsClickType: adsClick.type, adsClickId: adsClick.value } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error("Lead submission failed");
  }

  try {
    track("lead_form_submitted", {
      source_page: payload.sourcePage,
      source_path: payload.sourcePath,
      form_type: payload.formType,
      ...(payload.interestedService ? { interested_service: payload.interestedService } : {}),
    });
  } catch {
    // The API already stored this lead; provider failures cannot show a form error.
  }

  try {
    if (googleLeadEligibleAtSubmit) deliverGoogleAdsSeoLocalLeadEvent(payload.sourcePath);
  } catch {
    // Google measurement is independent of the successful lead response.
  }
}
