"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  monthlySpend: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  monthlySpend: "",
};

function validate(values: FormState) {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Necesitamos tu nombre para preparar la calculadora.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Introduce un email valido para enviarte la plantilla.";
  }

  const spend = Number(values.monthlySpend.replace(",", "."));
  if (!values.monthlySpend || Number.isNaN(spend) || spend <= 0) {
    errors.monthlySpend = "Indica tu gasto mensual actual para segmentar bien el recurso.";
  }

  return errors;
}

export function PaidGrowthCalculatorForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function updateField(field: keyof FormState, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    setErrors(validate(next));
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
    }, 700);
  }

  function onSpendInput(event: ChangeEvent<HTMLInputElement>) {
    updateField("monthlySpend", event.target.value);
  }

  return (
    <form className="paid-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="paid-name">Nombre</label>
        <input
          id="paid-name"
          name="paid-name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "paid-name-error" : undefined}
          autoComplete="name"
        />
        {errors.name ? (
          <p id="paid-name-error" className="error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="paid-email">Email</label>
        <input
          id="paid-email"
          name="paid-email"
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "paid-email-error" : undefined}
          autoComplete="email"
        />
        {errors.email ? (
          <p id="paid-email-error" className="error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="field paid-form-wide">
        <label htmlFor="monthly-spend">Gasto mensual actual</label>
        <input
          id="monthly-spend"
          name="monthly-spend"
          inputMode="decimal"
          placeholder="Ej. 3500"
          value={values.monthlySpend}
          onChange={onSpendInput}
          aria-invalid={Boolean(errors.monthlySpend)}
          aria-describedby={errors.monthlySpend ? "monthly-spend-error" : "monthly-spend-help"}
        />
        <p id="monthly-spend-help" className="paid-help">
          Usamos este dato para entregarte una calculadora de Unit Economics mas afinada.
        </p>
        {errors.monthlySpend ? (
          <p id="monthly-spend-error" className="error">
            {errors.monthlySpend}
          </p>
        ) : null}
      </div>

      <button className="button primary paid-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Preparando..." : "Descargar plantilla"}
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status === "sent" ? "Listo. Tu plantilla de Unit Economics ya esta en cola para enviarse." : ""}
      </p>
    </form>
  );
}
