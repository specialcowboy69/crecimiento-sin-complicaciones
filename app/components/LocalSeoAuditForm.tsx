"use client";

import { FormEvent, useRef, useState } from "react";
import { FormPrivacyNotice } from "./FormPrivacyNotice";
import { ContactOptions } from "./ContactOptions";
import { LeadSuccess } from "./LeadSuccess";
import { submitLead } from "./submitLead";
import { validateContactFields } from "../lib/leadContact";

type FormState = {
  name: string;
  phone: string;
  email: string;
  business: string;
  link: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  business: "",
  link: "",
};

function validate(values: FormState) {
  const errors: Errors = {};
  const optionalLink = values.link.trim();

  if (values.name.trim().length < 2) {
    errors.name = "Indica tu nombre.";
  }

  if (values.business.trim().length < 2) {
    errors.business = "Indica el nombre de tu negocio.";
  }

  if (optionalLink && (optionalLink.length < 4 || /\s/.test(optionalLink))) {
    errors.link = "Revisa el enlace o deja este campo vacío.";
  }

  return { ...errors, ...validateContactFields(values) };
}

export function LocalSeoAuditForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const businessRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

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
      const firstError = Object.keys(nextErrors)[0] as keyof FormState | undefined;
      switch (firstError) {
        case "name":
          nameRef.current?.focus();
          break;
        case "email":
          emailRef.current?.focus();
          break;
        case "business":
          businessRef.current?.focus();
          break;
        case "phone":
          phoneRef.current?.focus();
          break;
        case "link":
          linkRef.current?.focus();
          break;
      }
      return;
    }

    setStatus("sending");
    try {
      await submitLead({
        sourcePage: "SEO local",
        sourcePath: window.location.pathname,
        formType: "Auditoría gratuita",
        name: values.name,
        phone: values.phone,
        email: values.email,
        company: values.business,
        interestedService: "SEO local",
        message: [
          values.link.trim() ? `Web, perfil de Google o red social: ${values.link.trim()}` : "Sin enlace compartido.",
        ].join("\n"),
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
      <LeadSuccess>Revisaremos la información de tu negocio y te contactaremos con los siguientes pasos.</LeadSuccess>
    ) : (
    <form
      className="seo-audit-form grid gap-5 rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 sm:grid-cols-2"
      onSubmit={onSubmit}
      noValidate
    >
      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="local-seo-name">
        Nombre*
        <input
          ref={nameRef}
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="local-seo-name"
          name="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "local-seo-name-error" : undefined}
          aria-required="true"
          autoComplete="name"
        />
        {errors.name ? <span className="text-sm font-semibold text-red-300" id="local-seo-name-error">{errors.name}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="local-seo-phone">
        Móvil*
        <input
          ref={phoneRef}
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="local-seo-phone"
          name="phone"
          required
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "local-seo-phone-error" : undefined}
          aria-required="true"
          autoComplete="tel"
        />
        {errors.phone ? <span className="text-sm font-semibold text-red-300" id="local-seo-phone-error">{errors.phone}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="local-seo-email">
        Email (opcional)
        <input
          ref={emailRef}
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="local-seo-email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "local-seo-email-error" : undefined}
          autoComplete="email"
        />
        {errors.email ? <span className="text-sm font-semibold text-red-300" id="local-seo-email-error">{errors.email}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="local-seo-business">
        Nombre del negocio*
        <input
          ref={businessRef}
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="local-seo-business"
          name="business"
          value={values.business}
          onChange={(event) => updateField("business", event.target.value)}
          aria-invalid={Boolean(errors.business)}
          aria-describedby={errors.business ? "local-seo-business-error" : undefined}
          aria-required="true"
          autoComplete="organization"
        />
        {errors.business ? <span className="text-sm font-semibold text-red-300" id="local-seo-business-error">{errors.business}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200 sm:col-span-2" htmlFor="local-seo-link">
        Web, perfil de Google o red social
        <input
          ref={linkRef}
          className="min-h-12 rounded-lg border border-slate-700 bg-slate-900 px-4 text-white focus-visible:ring-2 focus-visible:ring-blue-400"
          id="local-seo-link"
          name="link"
          value={values.link}
          onChange={(event) => updateField("link", event.target.value)}
          aria-invalid={Boolean(errors.link)}
          aria-describedby={errors.link ? "local-seo-link-error" : undefined}
          autoComplete="url"
          placeholder="https://..."
        />
        {errors.link ? <span className="text-sm font-semibold text-red-300" id="local-seo-link-error">{errors.link}</span> : null}
      </label>

      <FormPrivacyNotice className="text-slate-400 sm:col-span-2" />
      <button
        className="min-h-12 rounded-lg bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-950/40 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Enviando solicitud..." : "Solicitar auditoría gratuita"}
      </button>
      <div className="min-h-12 text-sm font-bold sm:col-span-2" role="status" aria-live="polite">
        {status === "failed" ? (
          <p className="text-red-300">
            No hemos podido enviar la solicitud. Tus datos siguen en el formulario. Inténtalo de nuevo.
          </p>
        ) : null}
      </div>
    </form>
    )}
    <ContactOptions />
    </div>
  );
}
