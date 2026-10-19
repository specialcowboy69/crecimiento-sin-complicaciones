"use client";

import { FormEvent, useState } from "react";
import { FormPrivacyNotice } from "./FormPrivacyNotice";
import { ContactOptions } from "./ContactOptions";
import { LeadSuccess } from "./LeadSuccess";
import { submitLead } from "./submitLead";
import { validateContactFields } from "../lib/leadContact";

type FormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  challenge: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type LeadFormProps = {
  sourcePage?: string;
  interestedService?: string;
  title?: string;
  description?: string;
  points?: string[];
  buttonLabel?: string;
  id?: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  challenge: "",
};

function validate(values: FormState) {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Indica tu nombre para saber con quién hablamos.";
  }

  if (values.company.trim().length < 2) {
    errors.company = "Indica tu sitio web o el nombre de tu empresa.";
  }

  return { ...errors, ...validateContactFields(values) };
}

export function LeadForm({
  sourcePage = "Home",
  interestedService = "Auditoría inicial",
  title = "Detectamos el cuello de botella antes de venderte nada",
  description = "En 48 horas recibes una lectura clara de oportunidades SEO, fugas de conversión y prioridades de adquisición.",
  points = ["Mapa de oportunidades", "3 quick wins", "Estimación de impacto"],
  buttonLabel = "Quiero mi auditoría",
  id = "auditoria",
}: LeadFormProps = {}) {
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
        phone: values.phone,
        email: values.email,
        company: values.company,
        interestedService,
        message: `Qué quiere mejorar:\n${values.challenge}`,
      });
      setStatus("sent");
      setValues(initialState);
      setErrors({});
    } catch {
      setStatus("failed");
    }
  }

  return (
    <section className="section contact-section" id={id} aria-labelledby="contact-title">
      <div className="contact-copy">
        <p className="eyebrow">Auditoría gratuita</p>
        <h2 id="contact-title">{title}</h2>
        <p>{description}</p>
        <div className="contact-points" aria-label="Qué incluye la auditoría">
          {points.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
        <ContactOptions />
      </div>

      <div className="audit-form-shell" id="audit-request">
      {status === "sent" ? (
        <LeadSuccess>Hemos recibido tu solicitud. Te responderemos con los siguientes pasos.</LeadSuccess>
      ) : (
      <form className="lead-form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Nombre*</label>
          <input
            id="name"
            name="name"
            required
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-required="true"
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
          />
          {errors.name ? <p id="name-error" className="error">{errors.name}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="phone">Móvil*</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-required="true"
            aria-describedby={errors.phone ? "phone-error" : undefined}
            autoComplete="tel"
          />
          {errors.phone ? <p id="phone-error" className="error">{errors.phone}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="email">Email (opcional)</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
          />
          {errors.email ? <p id="email-error" className="error">{errors.email}</p> : null}
        </div>

        <div className="field full">
          <label htmlFor="company">Sitio web o nombre de la empresa*</label>
          <input
            id="company"
            name="company"
            required
            value={values.company}
            onChange={(event) => updateField("company", event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-required="true"
            aria-describedby={errors.company ? "company-error" : undefined}
            placeholder="Ej.: tuempresa.es o el nombre de tu negocio"
            autoComplete="organization"
          />
          {errors.company ? <p id="company-error" className="error">{errors.company}</p> : null}
        </div>

        <div className="field full">
          <label htmlFor="challenge">Qué quieres mejorar</label>
          <textarea
            id="challenge"
            name="challenge"
            rows={5}
            value={values.challenge}
            onChange={(event) => updateField("challenge", event.target.value)}
            aria-invalid={Boolean(errors.challenge)}
            aria-describedby={errors.challenge ? "challenge-error" : undefined}
          />
          {errors.challenge ? <p id="challenge-error" className="error">{errors.challenge}</p> : null}
        </div>

        <FormPrivacyNotice />
        <button className="button primary form-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : buttonLabel}
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {status === "failed" ? "No se pudo enviar. Inténtalo de nuevo en unos segundos." : ""}
        </p>
      </form>
      )}
      </div>
    </section>
  );
}
