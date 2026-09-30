import { track } from "@vercel/analytics";
import { isGoogleAdsSeoLocalLeadEligible } from "./cookieConsentCookies.mjs";
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
  contact: string;
  company?: string;
  message?: string;
  interestedService?: string;
};

export async function submitLead(payload: LeadSubmission) {
  let googleLeadEligibleAtSubmit = false;
  try {
    googleLeadEligibleAtSubmit = isGoogleAdsSeoLocalLeadEligible({
      cookieHeader: document.cookie,
      sourcePath: payload.sourcePath,
      pathname: window.location.pathname,
    });
  } catch {
    // Optional measurement must not prevent the lead request.
  }

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
