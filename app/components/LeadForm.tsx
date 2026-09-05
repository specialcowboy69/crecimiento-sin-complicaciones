"use client";

import { FormEvent, useState } from "react";
import { submitLead } from "./submitLead";

type FormState = {
  name: string;
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
  email: "",
  company: "",
  challenge: "",
};

function validate(values: FormState) {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Indica tu nombre para saber con quien hablamos.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Por favor, introduce un email corporativo válido.";
  }

  if (values.company.trim().length < 2) {
    errors.company = "Cuéntanos la empresa o proyecto que quieres hacer crecer.";
  }

  return errors;
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
        contact: values.email,
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
      </div>

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
          <label htmlFor="email">Email corporativo*</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-required="true"
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
          />
          {errors.email ? <p id="email-error" className="error">{errors.email}</p> : null}
        </div>

        <div className="field full">
          <label htmlFor="company">Empresa*</label>
          <input
            id="company"
            name="company"
            required
            value={values.company}
            onChange={(event) => updateField("company", event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-required="true"
            aria-describedby={errors.company ? "company-error" : undefined}
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

        <button className="button primary form-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : buttonLabel}
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {status === "sent" ? "Enviado con éxito. Te responderemos con los siguientes pasos." : ""}
          {status === "failed" ? "No se pudo enviar. Inténtalo de nuevo en unos segundos." : ""}
        </p>
      </form>
    </section>
  );
}
