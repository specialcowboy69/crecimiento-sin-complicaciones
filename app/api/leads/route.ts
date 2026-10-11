import { NextResponse } from "next/server";
import { getLeadsDataConnect } from "@/app/lib/firebaseDataConnect";
import { validateLeadAttribution } from "@/app/lib/leadAttribution";

export const runtime = "nodejs";

type LeadPayload = {
  sourcePage?: string;
  sourcePath?: string;
  formType?: string;
  name?: string;
  contact?: string;
  company?: string;
  message?: string;
  interestedService?: string;
  adsClickType?: unknown;
  adsClickId?: unknown;
};

function clean(value: unknown, maxLength = 4000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validate(payload: LeadPayload) {
  const sourcePage = clean(payload.sourcePage, 80);
  const sourcePath = clean(payload.sourcePath, 160);
  const formType = clean(payload.formType, 80);
  const name = clean(payload.name, 160);
  const contact = clean(payload.contact, 220);
  const company = clean(payload.company, 220);
  const message = clean(payload.message);
  const interestedService = clean(payload.interestedService, 140);

  if (sourcePage.length < 2 || formType.length < 2 || name.length < 2 || contact.length < 6) {
    return null;
  }

  return {
    sourcePage,
    sourcePath: sourcePath || null,
    formType,
    name,
    contact,
    company: company || null,
    message: message || null,
    interestedService: interestedService || null,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const payload = validate(body);

    if (!payload) {
      return NextResponse.json({ error: "Datos del formulario incompletos." }, { status: 400 });
    }

    const attribution = validateLeadAttribution({
      cookieHeader: request.headers.get("cookie") ?? "",
      sourcePath: payload.sourcePath ?? "",
      referer: request.headers.get("referer"),
      requestOrigin: new URL(request.url).origin,
      type: body.adsClickType,
      value: body.adsClickId,
    });

    await getLeadsDataConnect().executeMutation("CreateLead", { ...payload, ...attribution });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json({ error: "No se pudo registrar la solicitud." }, { status: 500 });
  }
}
