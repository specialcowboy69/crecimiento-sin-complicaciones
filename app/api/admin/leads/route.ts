import { NextResponse } from "next/server";
import { getLeadsDataConnect } from "@/app/lib/firebaseDataConnect";

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
  createdAt: string;
  updatedAt: string | null;
};

const allowedStatuses = new Set(["new", "contacted", "closed"]);

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
    const { id, status } = await request.json();

    if (typeof id !== "string" || !allowedStatuses.has(status)) {
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

    await getLeadsDataConnect().executeMutation("DeleteLead", { id });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead delete failed", error);
    return NextResponse.json({ error: "No se pudo eliminar el lead." }, { status: 500 });
  }
}
