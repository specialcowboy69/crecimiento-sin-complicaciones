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
}
