import { NextResponse } from "next/server";
import { getLeadsDataConnect } from "@/app/lib/firebaseDataConnect";
import { blockLeadAdsExport, qualifyLead, type AdminLeadState, type LeadStateStore } from "@/app/lib/qualifiedLeadState";

export const runtime = "nodejs";

type Lead = {
  id: string;
  sourcePage: string;
  sourcePath: string | null;
  formType: string;
  name: string;
  contact: string;
  company: string | null;
  message: string | null;
  interestedService: string | null;
  status: string;
  adsClickType: string | null;
  adsMeasurementConsentAtSubmit: boolean | null;
  qualifiedAt: string | null;
  adsExportBlockedAt: string | null;
  adsExportClaimedAt: string | null;
  adsExportSubmittedAt: string | null;
  adsExportAttemptedAt: string | null;
  adsExportTerminalAt: string | null;
  adsExportLastErrorCode: string | null;
  createdAt: string;
  updatedAt: string | null;
};

const allowedStatuses = new Set(["new", "contacted", "closed"]);

function leadStateStore(): LeadStateStore {
  const dataConnect = getLeadsDataConnect();
  return {
    executeMutation: async (name, variables) => {
      const response = await dataConnect.executeMutation<{ updated?: number }, { id: string; status?: string }>(name, variables);
      return { data: response.data };
    },
    executeQuery: async (name, variables) => {
      const response = await dataConnect.executeQuery<{ leads: AdminLeadState[] }, { id: string }>(name, variables);
      return { data: response.data };
    },
  };
}

function isAuthorized(request: Request) {
  const key = process.env.ADMIN_ACCESS_KEY;
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();

  return Boolean(key && token && token === key);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const response = await getLeadsDataConnect().executeQuery<{ leads: Lead[] }>("ListLeads");
    return NextResponse.json({ leads: response.data.leads ?? [] });
  } catch (error) {
    console.error("Lead list failed", error);
    return NextResponse.json({ error: "No se pudieron cargar los leads." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const { id, status, action } = await request.json();

    if (typeof id !== "string" || id.length < 10) {
      return NextResponse.json({ error: "Lead no válido." }, { status: 400 });
    }
    if (status === "qualified") {
      const lead = await qualifyLead(leadStateStore(), id);
      return NextResponse.json({ ok: true, lead });
    }
    if (action === "blockAdsExport") {
      const lead = await blockLeadAdsExport(leadStateStore(), id);
      if (lead.adsExportSubmittedAt) {
        return NextResponse.json({ error: "El envío a Ads ya fue aceptado." }, { status: 409 });
      }
      if (!lead.adsExportBlockedAt) {
        return NextResponse.json({ error: "No se ha confirmado la exclusión. El envío puede estar en curso; actualiza el estado y reinténtalo." }, { status: 409 });
      }
      return NextResponse.json({ ok: true, lead });
    }
    if (!allowedStatuses.has(status)) {
      return NextResponse.json({ error: "Estado no valido." }, { status: 400 });
    }

    await getLeadsDataConnect().executeMutation("UpdateLeadStatus", { id, status });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead status update failed", error);
    return NextResponse.json({ error: "No se pudo actualizar el lead." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (typeof id !== "string" || id.length < 10) {
      return NextResponse.json({ error: "Lead no valido." }, { status: 400 });
    }

    const response = await getLeadsDataConnect().executeMutation<{ deleted: number }, { id: string }>("DeleteLeadIfNotExporting", { id });
    if (response.data.deleted !== 1) {
      return NextResponse.json({ error: "El lead no existe o tiene un envío a Ads en curso." }, { status: 409 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead delete failed", error);
    return NextResponse.json({ error: "No se pudo eliminar el lead." }, { status: 500 });
  }
}
