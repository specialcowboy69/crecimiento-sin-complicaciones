"use client";

import { FormEvent, useState } from "react";
import { FormPrivacyNotice } from "./FormPrivacyNotice";
import { submitLead } from "./submitLead";

type SeoGoal = "trafico" | "leads" | "tecnico" | "local" | "no-se";

type FormState = {
  name: string;
  contact: string;
  company: string;
  website: string;
  goal: "" | SeoGoal;
  context: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type SeoAuditFormProps = {
  sourcePage?: string;
  defaultService?: string;
};

const initialState: FormState = {
  name: "",
  contact: "",
  company: "",
  website: "",
  goal: "",
  context: "",
};

function validate(values: FormState) {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Indica tu nombre para saber con quién hablamos.";
  }

  if (values.contact.trim().length < 6) {
    errors.contact = "Introduce un email o teléfono válido.";
  }

  if (values.website.trim().length < 4) {
    errors.website = "Indica la web que quieres que revisemos.";
  }

  return errors;
}

export function SeoAuditForm({ sourcePage = "Agencia SEO", defaultService = "SEO" }: SeoAuditFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  function updateField(field: keyof FormState, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);

    if (Object.keys(errors).length > 0) {
      setErrors(validate(next));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      await submitLead({
        sourcePage,
        sourcePath: window.location.pathname,
        formType: "Auditoría gratuita",
        name: values.name,
        contact: values.contact,
        company: values.company,
        interestedService: values.goal || defaultService,
        message: [
          `Web a auditar: ${values.website}`,
          values.context ? `Contexto: ${values.context}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      });
      setStatus("sent");
      setValues(initialState);
      setErrors({});
    } catch {
      setStatus("failed");
    }
  }

  return (
    <form className="seo-audit-form grid gap-5 rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="seo-name">
        Nombre y apellidos
        <input
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="seo-name"
          name="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "seo-name-error" : undefined}
          autoComplete="name"
        />
        {errors.name ? <span className="text-sm font-semibold text-red-300" id="seo-name-error">{errors.name}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="seo-contact">
        Email o teléfono
        <input
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="seo-contact"
          name="contact"
          value={values.contact}
          onChange={(event) => updateField("contact", event.target.value)}
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? "seo-contact-error" : undefined}
          autoComplete="email"
        />
        {errors.contact ? <span className="text-sm font-semibold text-red-300" id="seo-contact-error">{errors.contact}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="seo-company">
        Empresa
        <input
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="seo-company"
          name="company"
          value={values.company}
          onChange={(event) => updateField("company", event.target.value)}
          autoComplete="organization"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="seo-website">
        Web a auditar
        <input
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="seo-website"
          name="website"
          value={values.website}
          onChange={(event) => updateField("website", event.target.value)}
          aria-invalid={Boolean(errors.website)}
          aria-describedby={errors.website ? "seo-website-error" : undefined}
          autoComplete="url"
          placeholder="https://..."
        />
        {errors.website ? <span className="text-sm font-semibold text-red-300" id="seo-website-error">{errors.website}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200 sm:col-span-2" htmlFor="seo-goal">
        Qué quieres mejorar primero
        <select
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="seo-goal"
          name="goal"
          value={values.goal}
          onChange={(event) => updateField("goal", event.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="leads">Más leads cualificados desde Google</option>
          <option value="trafico">Más tráfico orgánico relevante</option>
          <option value="tecnico">Revisar problemas de SEO técnico</option>
          <option value="local">Trabajar SEO local por ciudad</option>
          <option value="no-se">No lo sé todavía</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200 sm:col-span-2" htmlFor="seo-context">
        Contexto o problema principal
        <textarea
          className="min-h-28 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="seo-context"
          name="context"
          value={values.context}
          onChange={(event) => updateField("context", event.target.value)}
          placeholder="Ej.: tenemos tráfico pero no llegan formularios, queremos reducir dependencia de Ads..."
        />
      </label>

      <FormPrivacyNotice className="text-slate-400 sm:col-span-2" />
      <button
        className="min-h-12 rounded-lg bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-950/40 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Enviando..." : "Solicitar auditoría SEO gratuita"}
      </button>
      <p className="min-h-6 text-sm font-bold text-emerald-300 sm:col-span-2" role="status" aria-live="polite">
        {status === "sent" ? "Solicitud registrada. Te responderemos con los siguientes pasos." : ""}
        {status === "failed" ? "No se pudo enviar. Inténtalo de nuevo en unos segundos." : ""}
      </p>
    </form>
  );
}
