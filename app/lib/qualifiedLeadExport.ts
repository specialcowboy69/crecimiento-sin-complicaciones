import { buildQualifiedLeadEvent, QualifiedLeadSendError, type AdsClickType, type QualifiedLeadEvent } from "./googleAdsQualifiedLead";

export type QualifiedLeadForExport = {
  id: string;
  sourcePath: string | null;
  status: string;
  adsClickType: string | null;
  adsClickId: string | null;
  adsMeasurementConsentAtSubmit: boolean | null;
  qualifiedAt: string | null;
  adsExportBlockedAt: string | null;
  adsExportClaimedAt: string | null;
  adsExportSubmittedAt: string | null;
  adsExportAttemptedAt: string | null;
  adsExportTerminalAt: string | null;
  adsExportLastErrorCode: string | null;
};

export type QualifiedLeadExportStore = {
  releaseStale: (before: string) => Promise<void>;
  listPending: () => Promise<QualifiedLeadForExport[]>;
  claim: (id: string) => Promise<boolean>;
  markSubmitted: (id: string) => Promise<void>;
  recordFailure: (id: string, code: string, terminal: boolean) => Promise<void>;
};

type ExportOptions = {
  store: QualifiedLeadExportStore;
  sender: (event: QualifiedLeadEvent) => Promise<{ accepted: boolean }>;
  enabled: boolean;
};

function eligible(lead: QualifiedLeadForExport) {
  return lead.sourcePath === "/seo/local" && lead.status === "qualified" &&
    lead.adsMeasurementConsentAtSubmit === true && lead.qualifiedAt !== null &&
    !lead.adsExportBlockedAt && !lead.adsExportClaimedAt && !lead.adsExportSubmittedAt && !lead.adsExportTerminalAt &&
    ["gclid", "gbraid", "wbraid"].includes(lead.adsClickType ?? "") && Boolean(lead.adsClickId);
}

export async function exportPendingQualifiedLeads({ store, sender, enabled }: ExportOptions) {
  const counts = { attempted: 0, submitted: 0, failed: 0 };
  if (!enabled) return counts;

  // A serverless process cannot still be sending after a full day. Recover a
  // claim left by a crash before selecting this run's pending leads.
  await store.releaseStale(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
  const leads = await store.listPending();
  for (const lead of leads) {
    if (!eligible(lead)) continue;
    // This conditional database update is the coordination point with the
    // admin's exclude/delete actions and with overlapping cron invocations.
    if (!(await store.claim(lead.id))) continue;
    counts.attempted++;
    try {
      const event = buildQualifiedLeadEvent({
        id: lead.id,
        adsClickType: lead.adsClickType as AdsClickType,
        adsClickId: lead.adsClickId!,
        qualifiedAt: lead.qualifiedAt!,
      });
      const result = await sender(event);
      if (!result.accepted) throw new QualifiedLeadSendError("PROVIDER_UNCONFIRMED", true);
      await store.markSubmitted(lead.id);
      counts.submitted++;
    } catch (error) {
      counts.failed++;
      const code = error instanceof QualifiedLeadSendError ? error.code : "EXPORT_ERROR";
      const terminal = error instanceof QualifiedLeadSendError && !error.retryable;
      try {
        await store.recordFailure(lead.id, code, terminal);
      } catch {
        // A failed status write leaves this lead pending with the same transaction ID.
      }
    }
  }
  return counts;
}
