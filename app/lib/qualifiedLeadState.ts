export type AdminLeadState = {
  id: string;
  status: string;
  qualifiedAt: string | null;
  adsExportBlockedAt: string | null;
  adsExportClaimedAt: string | null;
  adsExportSubmittedAt: string | null;
};

export type LeadStateStore = {
  executeMutation: (name: string, variables: { id: string; status?: string }) => Promise<{ data: { updated?: number } }>;
  executeQuery: (name: string, variables: { id: string }) => Promise<{ data: { leads: AdminLeadState[] } }>;
};

async function readLead(store: LeadStateStore, id: string) {
  const response = await store.executeQuery("GetLeadForAdmin", { id });
  const lead = response.data.leads?.[0];
  if (!lead) throw new Error("Lead not found");
  return lead;
}

export async function qualifyLead(store: LeadStateStore, id: string) {
  await store.executeMutation("MarkLeadQualified", { id });
  let lead = await readLead(store, id);
  if (lead.qualifiedAt && lead.status !== "qualified") {
    await store.executeMutation("UpdateLeadStatus", { id, status: "qualified" });
    lead = await readLead(store, id);
  }
  if (!lead.qualifiedAt) throw new Error("Lead qualification was not recorded");
  return lead;
}

export async function blockLeadAdsExport(store: LeadStateStore, id: string) {
  await store.executeMutation("BlockLeadAdsExport", { id });
  return readLead(store, id);
}
