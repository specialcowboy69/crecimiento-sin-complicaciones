"use client";

import { FormEvent, useState } from "react";

type FocusNetwork = "instagram" | "tiktok" | "linkedin" | "facebook" | "youtube" | "no-se";

type FormState = {
  name: string;
  contact: string;
  profile: string;
  focusNetwork: "" | FocusNetwork;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  contact: "",
  profile: "",
  focusNetwork: "",
};

function validate(values: FormState) {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Indica tu nombre para saber con quien hablamos.";
  }

  if (values.contact.trim().length < 6) {
    errors.contact = "Introduce un email o telefono valido.";
  }

  if (!values.focusNetwork) {
    errors.focusNetwork = "Selecciona la red social que quieres potenciar.";
  }

  return errors;
}

export function SocialMediaForm() {
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
    <form className="social-media-form grid gap-5 rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="social-name">
        Nombre y apellidos
        <input
          id="social-name"
          name="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "social-name-error" : undefined}
          autoComplete="name"
        />
        {errors.name ? <span className="text-sm font-semibold text-red-300" id="social-name-error">{errors.name}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="social-contact">
        Email o telefono
        <input
          id="social-contact"
          name="contact"
          value={values.contact}
          onChange={(event) => updateField("contact", event.target.value)}
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? "social-contact-error" : undefined}
          autoComplete="email"
        />
        {errors.contact ? <span className="text-sm font-semibold text-red-300" id="social-contact-error">{errors.contact}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="social-profile">
        Perfil de Instagram, TikTok, LinkedIn o web actual
        <input
          id="social-profile"
          name="profile"
          value={values.profile}
          onChange={(event) => updateField("profile", event.target.value)}
          autoComplete="url"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="social-network">
        Red social que quieres potenciar
        <select
          id="social-network"
          name="focusNetwork"
          value={values.focusNetwork}
          onChange={(event) => updateField("focusNetwork", event.target.value)}
          aria-invalid={Boolean(errors.focusNetwork)}
          aria-describedby={errors.focusNetwork ? "social-network-error" : undefined}
        >
          <option value="">Selecciona una opcion</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="linkedin">LinkedIn</option>
          <option value="facebook">Facebook</option>
          <option value="youtube">YouTube Shorts</option>
          <option value="no-se">No lo se todavia</option>
        </select>
        {errors.focusNetwork ? <span className="text-sm font-semibold text-red-300" id="social-network-error">{errors.focusNetwork}</span> : null}
      </label>

      <button className="min-h-12 rounded-lg bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-950/40 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Solicitar propuesta gratuita"}
      </button>
      <p className="min-h-6 text-sm font-bold text-emerald-300 sm:col-span-2" role="status" aria-live="polite">
        {status === "sent" ? "Solicitud registrada. Revisaremos tus perfiles y te responderemos en menos de 24 horas." : ""}
      </p>
    </form>
  );
}
