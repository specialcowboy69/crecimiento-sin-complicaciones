"use client";

import { FormEvent, useState } from "react";

type SiteType = "corporativa" | "tienda" | "rediseno" | "no-se";

type FormState = {
  name: string;
  contact: string;
  company: string;
  siteType: "" | SiteType;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  contact: "",
  company: "",
  siteType: "",
};

function validate(values: FormState) {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Indica tu nombre para saber con quien hablamos.";
  }

  if (values.contact.trim().length < 6) {
    errors.contact = "Introduce un email o telefono valido.";
  }

  if (!values.siteType) {
    errors.siteType = "Selecciona el tipo de web que necesitas.";
  }

  return errors;
}

export function WebProjectForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function updateField(field: keyof FormState, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);

    if (Object.keys(errors).length > 0) {
      setErrors(validate(next));
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      setValues(initialState);
      setErrors({});
    }, 800);
  }

  return (
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

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="web-contact">
        Email o telefono
        <input
          id="web-contact"
          name="contact"
          value={values.contact}
          onChange={(event) => updateField("contact", event.target.value)}
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? "web-contact-error" : undefined}
          autoComplete="email"
        />
        {errors.contact ? <span className="text-sm font-semibold text-red-300" id="web-contact-error">{errors.contact}</span> : null}
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
          <option value="">Selecciona una opcion</option>
          <option value="corporativa">Web corporativa</option>
          <option value="tienda">Tienda online</option>
          <option value="rediseno">Rediseno de web actual</option>
          <option value="no-se">No lo se todavia</option>
        </select>
        {errors.siteType ? <span className="text-sm font-semibold text-red-300" id="web-type-error">{errors.siteType}</span> : null}
      </label>

      <button className="min-h-12 rounded-lg bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-950/40 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar y solicitar asesoria gratuita"}
      </button>
      <p className="min-h-6 text-sm font-bold text-emerald-300 sm:col-span-2" role="status" aria-live="polite">
        {status === "sent" ? "Solicitud registrada. Te responderemos en menos de 24 horas." : ""}
      </p>
    </form>
  );
}
