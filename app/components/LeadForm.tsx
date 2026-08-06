"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  company: string;
  budget: string;
  challenge: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  budget: "",
  challenge: "",
};

function validate(values: FormState) {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Indica tu nombre para saber con quien hablamos.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Por favor, introduce un email corporativo valido.";
  }

  if (values.company.trim().length < 2) {
    errors.company = "Cuéntanos la empresa o proyecto que quieres hacer crecer.";
  }

  if (!values.budget) {
    errors.budget = "Selecciona un rango para proponerte un plan realista.";
  }

  if (values.challenge.trim().length < 20) {
    errors.challenge = "Danos un poco mas de contexto: objetivo, bloqueo o canal prioritario.";
  }

  return errors;
}

export function LeadForm() {
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
    <section className="section contact-section" id="auditoria" aria-labelledby="contact-title">
      <div className="contact-copy">
        <p className="eyebrow">Auditoria gratuita</p>
        <h2 id="contact-title">Detectamos el cuello de botella antes de venderte nada</h2>
        <p>
          En 48 horas recibes una lectura clara de oportunidades SEO, fugas de conversion y prioridades de adquisicion.
        </p>
        <div className="contact-points" aria-label="Que incluye la auditoria">
          <span>Mapa de oportunidades</span>
          <span>3 quick wins</span>
          <span>Estimacion de impacto</span>
        </div>
      </div>

      <form className="lead-form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
          />
          {errors.name ? <p id="name-error" className="error">{errors.name}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="email">Email corporativo</label>
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

        <div className="field">
          <label htmlFor="company">Empresa</label>
          <input
            id="company"
            name="company"
            value={values.company}
            onChange={(event) => updateField("company", event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            autoComplete="organization"
          />
          {errors.company ? <p id="company-error" className="error">{errors.company}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="budget">Inversion mensual estimada</label>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(event) => updateField("budget", event.target.value)}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "budget-error" : undefined}
          >
            <option value="">Selecciona un rango</option>
            <option value="1500-3000">1.500 EUR - 3.000 EUR</option>
            <option value="3000-6000">3.000 EUR - 6.000 EUR</option>
            <option value="6000-plus">Mas de 6.000 EUR</option>
          </select>
          {errors.budget ? <p id="budget-error" className="error">{errors.budget}</p> : null}
        </div>

        <div className="field full">
          <label htmlFor="challenge">Que quieres mejorar</label>
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
          {status === "sending" ? "Enviando..." : "Quiero mi auditoria"}
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {status === "sent" ? "Enviado con exito. Te responderemos con los siguientes pasos." : ""}
        </p>
      </form>
    </section>
  );
}
