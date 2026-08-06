"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  process: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  process: "",
};

function validate(values: FormState) {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Indica tu nombre para poder contactarte.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Introduce un email corporativo valido.";
  }

  if (values.phone.trim().length < 6) {
    errors.phone = "Indica un telefono o WhatsApp valido.";
  }

  if (values.company.trim().length < 2) {
    errors.company = "Indica tu empresa o sitio web.";
  }

  if (values.process.trim().length < 20) {
    errors.process = "Cuéntanos brevemente que proceso te gustaria automatizar.";
  }

  return errors;
}

export function AiDiagnosticForm() {
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
    <form className="grid gap-5 rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="ai-name">
        Nombre y apellido
        <input
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="ai-name"
          name="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "ai-name-error" : undefined}
          autoComplete="name"
        />
        {errors.name ? <span className="text-sm font-semibold text-red-300" id="ai-name-error">{errors.name}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="ai-email">
        Email corporativo
        <input
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="ai-email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "ai-email-error" : undefined}
          autoComplete="email"
        />
        {errors.email ? <span className="text-sm font-semibold text-red-300" id="ai-email-error">{errors.email}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="ai-phone">
        Telefono o WhatsApp
        <input
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="ai-phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "ai-phone-error" : undefined}
          autoComplete="tel"
        />
        {errors.phone ? <span className="text-sm font-semibold text-red-300" id="ai-phone-error">{errors.phone}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="ai-company">
        Empresa o sitio web
        <input
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="ai-company"
          name="company"
          value={values.company}
          onChange={(event) => updateField("company", event.target.value)}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "ai-company-error" : undefined}
          autoComplete="organization"
        />
        {errors.company ? <span className="text-sm font-semibold text-red-300" id="ai-company-error">{errors.company}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200 sm:col-span-2" htmlFor="ai-process">
        Proceso que te gustaria automatizar
        <textarea
          className="min-h-32 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="ai-process"
          name="process"
          value={values.process}
          onChange={(event) => updateField("process", event.target.value)}
          aria-invalid={Boolean(errors.process)}
          aria-describedby={errors.process ? "ai-process-error" : undefined}
        />
        {errors.process ? <span className="text-sm font-semibold text-red-300" id="ai-process-error">{errors.process}</span> : null}
      </label>

      <button
        className="min-h-12 rounded-lg bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-950/40 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Enviando..." : "Solicitar diagnostico estrategico"}
      </button>
      <p className="min-h-6 text-sm font-bold text-emerald-300 sm:col-span-2" role="status" aria-live="polite">
        {status === "sent" ? "Solicitud registrada. Te responderemos con los siguientes pasos." : ""}
      </p>
    </form>
  );
}
