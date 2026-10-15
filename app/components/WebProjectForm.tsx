"use client";

import { FormEvent, useState } from "react";
import { FormPrivacyNotice } from "./FormPrivacyNotice";
import { ContactOptions } from "./ContactOptions";
import { LeadSuccess } from "./LeadSuccess";
import { submitLead } from "./submitLead";
import { validateContactFields } from "../lib/leadContact";

type SiteType = "corporativa" | "tienda" | "rediseno" | "no-se";

type FormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  siteType: "" | SiteType;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  siteType: "",
};

function validate(values: FormState) {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Indica tu nombre para saber con quién hablamos.";
  }

  if (!values.siteType) {
    errors.siteType = "Selecciona el tipo de web que necesitas.";
  }

  return { ...errors, ...validateContactFields(values) };
}

export function WebProjectForm() {
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
        sourcePage: "Diseño web",
        sourcePath: window.location.pathname,
        formType: "Auditoría gratuita",
        name: values.name,
        phone: values.phone,
        email: values.email,
        company: values.company,
        interestedService: values.siteType,
        message: `Tipo de sitio web: ${values.siteType}`,
      });
      setStatus("sent");
      setValues(initialState);
      setErrors({});
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className="audit-form-shell" id="audit-request">
    {status === "sent" ? (
      <LeadSuccess>Hemos recibido tu solicitud. Te responderemos con los siguientes pasos.</LeadSuccess>
    ) : (
    <form className="web-design-form grid gap-5 rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="web-name">
        Nombre y apellidos
        <input
          id="web-name"
          name="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "web-name-error" : undefined}
          autoComplete="name"
        />
        {errors.name ? <span className="text-sm font-semibold text-red-300" id="web-name-error">{errors.name}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="web-phone">
        Móvil*
        <input
          id="web-phone"
          name="phone"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "web-phone-error" : undefined}
          type="tel"
          inputMode="tel"
          required
          aria-required="true"
          autoComplete="tel"
        />
        {errors.phone ? <span className="text-sm font-semibold text-red-300" id="web-phone-error">{errors.phone}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="web-email">
        Email (opcional)
        <input
          id="web-email"
          name="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "web-email-error" : undefined}
          type="email"
          autoComplete="email"
        />
        {errors.email ? <span className="text-sm font-semibold text-red-300" id="web-email-error">{errors.email}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="web-company">
        Empresa o web actual
        <input
          id="web-company"
          name="company"
          value={values.company}
          onChange={(event) => updateField("company", event.target.value)}
          autoComplete="organization"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="web-type">
        Tipo de sitio web
        <select
          id="web-type"
          name="siteType"
          value={values.siteType}
          onChange={(event) => updateField("siteType", event.target.value)}
          aria-invalid={Boolean(errors.siteType)}
          aria-describedby={errors.siteType ? "web-type-error" : undefined}
        >
          <option value="">Selecciona una opción</option>
          <option value="corporativa">Web corporativa</option>
          <option value="tienda">Tienda online</option>
          <option value="rediseno">Rediseño de web actual</option>
          <option value="no-se">No lo sé todavía</option>
        </select>
        {errors.siteType ? <span className="text-sm font-semibold text-red-300" id="web-type-error">{errors.siteType}</span> : null}
      </label>

      <FormPrivacyNotice className="text-slate-400 sm:col-span-2" />
      <button className="min-h-12 rounded-lg bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-950/40 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Solicitar auditoría gratuita"}
      </button>
      <p className="min-h-6 text-sm font-bold text-emerald-300 sm:col-span-2" role="status" aria-live="polite">
        {status === "failed" ? "No se pudo enviar. Inténtalo de nuevo en unos segundos." : ""}
      </p>
    </form>
    )}
    <ContactOptions dark />
    </div>
  );
}
