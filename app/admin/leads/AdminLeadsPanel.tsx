"use client";

import { FormEvent, useMemo, useState } from "react";

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
};

const statusLabels: Record<string, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  closed: "Cerrado",
};

const headingStyle = { color: "#ffffff", marginBottom: 0, maxWidth: "none" };

export function AdminLeadsPanel() {
  const [accessKey, setAccessKey] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const [message, setMessage] = useState("");
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);

  const groupedLeads = useMemo(() => {
    return leads.reduce<Record<string, Lead[]>>((groups, lead) => {
      groups[lead.sourcePage] = [...(groups[lead.sourcePage] ?? []), lead];
      return groups;
    }, {});
  }, [leads]);

  async function loadLeads(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/admin/leads", {
      headers: { Authorization: `Bearer ${accessKey}` },
      cache: "no-store",
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("No se pudieron cargar los leads. Revisa la clave interna.");
      return;
    }

    const data = await response.json();
    setLeads(data.leads ?? []);
    setStatus("loaded");
  }

  async function updateLeadStatus(id: string, nextStatus: string) {
    const response = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: nextStatus }),
    });

    if (!response.ok) {
      setMessage("No se pudo actualizar el estado.");
      return;
    }

    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status: nextStatus } : lead)));
  }

  async function deleteLead(id: string, name: string) {
    if (!window.confirm(`Eliminar el lead de ${name}? Esta accion no se puede deshacer.`)) {
      return;
    }

    setDeletingLeadId(id);
    setMessage("");

    const response = await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setDeletingLeadId(null);

    if (!response.ok) {
      setMessage("No se pudo eliminar el lead.");
      return;
    }

    setLeads((current) => current.filter((lead) => lead.id !== id));
  }

  return (
    <main className="admin-page min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-slate-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-400">Panel interno</p>
            <h1
              className="mt-3 font-black"
              style={{ ...headingStyle, fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1 }}
            >
              Mensajes de formularios
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-300">
              Leads organizados por la pagina desde la que llegan para priorizar web, IA, redes y la home sin mezclar conversaciones.
            </p>
          </div>

          <form className="flex w-full max-w-md gap-3" onSubmit={loadLeads}>
            <input
              className="min-h-12 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              type="password"
              placeholder="Clave interna"
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value)}
            />
            <button className="min-h-12 rounded-lg bg-blue-600 px-5 font-black text-white hover:bg-blue-500" type="submit">
              {status === "loading" ? "Cargando" : "Entrar"}
            </button>
          </form>
        </div>

        {message ? <p className="mt-6 rounded-lg bg-slate-900 p-4 font-semibold text-amber-200 ring-1 ring-slate-800">{message}</p> : null}

        <section className="mt-8 grid gap-6">
          {status === "loaded" && leads.length === 0 ? (
            <p className="rounded-lg bg-slate-900 p-6 text-slate-300 ring-1 ring-slate-800">Todavia no hay mensajes registrados.</p>
          ) : null}

          {Object.entries(groupedLeads).map(([sourcePage, sourceLeads]) => (
            <article className="rounded-lg bg-slate-900 p-5 ring-1 ring-slate-800" key={sourcePage}>
              <div className="flex flex-col gap-2 border-b border-slate-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-black" style={{ ...headingStyle, fontSize: "1.5rem", lineHeight: 1.2 }}>
                  {sourcePage}
                </h2>
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-black text-blue-300">
                  {sourceLeads.length} {sourceLeads.length === 1 ? "mensaje" : "mensajes"}
                </span>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {sourceLeads.map((lead) => (
                  <div className="rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800" key={lead.id}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-black" style={{ ...headingStyle, fontSize: "1.25rem", lineHeight: 1.25 }}>
                          {lead.name}
                        </h3>
                        <p className="mt-1 text-sm font-bold text-blue-300">{lead.contact}</p>
                      </div>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-black uppercase text-slate-200">
                        {statusLabels[lead.status] ?? lead.status}
                      </span>
                    </div>

                    <dl className="mt-4 grid gap-3 text-sm text-slate-300">
                      <div>
                        <dt className="font-black text-slate-100">Formulario</dt>
                        <dd>{lead.formType}</dd>
                      </div>
                      {lead.company ? (
                        <div>
                          <dt className="font-black text-slate-100">Empresa</dt>
                          <dd>{lead.company}</dd>
                        </div>
                      ) : null}
                      {lead.interestedService ? (
                        <div>
                          <dt className="font-black text-slate-100">Interes</dt>
                          <dd>{lead.interestedService}</dd>
                        </div>
                      ) : null}
                      {lead.message ? (
                        <div>
                          <dt className="font-black text-slate-100">Mensaje</dt>
                          <dd className="whitespace-pre-wrap leading-relaxed">{lead.message}</dd>
                        </div>
                      ) : null}
                    </dl>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
                      <time className="text-sm text-slate-400" dateTime={lead.createdAt}>
                        {new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lead.createdAt))}
                      </time>
                      <div className="flex gap-2">
                        {["new", "contacted", "closed"].map((nextStatus) => (
                          <button
                            className="rounded-md bg-slate-800 px-3 py-2 text-xs font-black text-slate-100 hover:bg-blue-600 disabled:opacity-50"
                            disabled={lead.status === nextStatus}
                            key={nextStatus}
                            type="button"
                            onClick={() => updateLeadStatus(lead.id, nextStatus)}
                          >
                            {statusLabels[nextStatus]}
                          </button>
                        ))}
                        <button
                          className="rounded-md bg-red-500/10 px-3 py-2 text-xs font-black text-red-200 ring-1 ring-red-400/20 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={deletingLeadId === lead.id}
                          type="button"
                          onClick={() => deleteLead(lead.id, lead.name)}
                        >
                          {deletingLeadId === lead.id ? "Eliminando" : "Eliminar"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
