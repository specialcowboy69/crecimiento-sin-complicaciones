import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getLeadsDataConnect } from "@/app/lib/firebaseDataConnect";
import { sendQualifiedLeadEvent } from "@/app/lib/googleAdsQualifiedLead";
import { exportPendingQualifiedLeads, type QualifiedLeadExportStore, type QualifiedLeadForExport } from "@/app/lib/qualifiedLeadExport";

export const runtime = "nodejs";

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!secret || !token) return false;
  const actual = Buffer.from(token);
  const expected = Buffer.from(secret);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function exportStore(): QualifiedLeadExportStore {
  const dataConnect = getLeadsDataConnect();
  return {
    async releaseStale(before) {
      await dataConnect.executeMutation("ReleaseStaleLeadAdsExportClaims", { before });
    },
    async listPending() {
      const response = await dataConnect.executeQuery<{ leads: QualifiedLeadForExport[] }>("ListQualifiedLeadsForAdsExport");
      return response.data.leads ?? [];
    },
    async claim(id) {
      const response = await dataConnect.executeMutation<{ updated: number }, { id: string }>("ClaimLeadAdsExport", { id });
      return response.data.updated === 1;
    },
    async markSubmitted(id) {
      const response = await dataConnect.executeMutation<{ updated: number }, { id: string }>("MarkLeadAdsExportSubmitted", { id });
      if (response.data.updated !== 1) throw new Error("Ads export acknowledgment was not stored");
    },
    async recordFailure(id, code, terminal) {
      await dataConnect.executeMutation<{ updated: number }, { id: string; code: string; terminalAt: string | null }>(
        "RecordLeadAdsExportFailure",
        { id, code: /^[A-Z0-9_]{1,80}$/.test(code) ? code : "EXPORT_ERROR", terminalAt: terminal ? new Date().toISOString() : null },
      );
    },
  };
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  if (process.env.GOOGLE_ADS_OFFLINE_ENABLED !== "true") {
    return NextResponse.json({ attempted: 0, submitted: 0, failed: 0 });
  }
  try {
    const counts = await exportPendingQualifiedLeads({
      store: exportStore(),
      sender: (event) => sendQualifiedLeadEvent(event, { validateOnly: false }),
      enabled: true,
    });
    return NextResponse.json(counts);
  } catch {
    // Provider payloads and lead details must never reach logs or API responses.
    console.error("Qualified lead export failed");
    return NextResponse.json({ error: "No se pudo completar la exportación." }, { status: 500 });
  }
}
