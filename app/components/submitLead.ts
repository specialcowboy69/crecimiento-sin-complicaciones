import { track } from "@vercel/analytics";

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
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Lead submission failed");
  }

  track("lead_form_submitted", {
    source_page: payload.sourcePage,
    source_path: payload.sourcePath,
    form_type: payload.formType,
    ...(payload.interestedService ? { interested_service: payload.interestedService } : {}),
  });
}
