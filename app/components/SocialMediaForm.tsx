"use client";

import { FormEvent, useState } from "react";
import { FormPrivacyNotice } from "./FormPrivacyNotice";
import { ContactOptions } from "./ContactOptions";
import { LeadSuccess } from "./LeadSuccess";
import { submitLead } from "./submitLead";
import { validateContactFields } from "../lib/leadContact";

type FocusNetwork = "instagram" | "tiktok" | "linkedin" | "facebook" | "youtube" | "no-se";

type FormState = {
  name: string;
  phone: string;
  email: string;
  profile: string;
  focusNetwork: "" | FocusNetwork;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  profile: "",
  focusNetwork: "",
};

function validate(values: FormState) {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Indica tu nombre para saber con quién hablamos.";
  }

  if (!values.focusNetwork) {
    errors.focusNetwork = "Selecciona la red social que quieres potenciar.";
  }

  return { ...errors, ...validateContactFields(values) };
}

export function SocialMediaForm() {
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
        sourcePage: "Gestión de redes sociales",
        sourcePath: window.location.pathname,
        formType: "Auditoría gratuita",
        name: values.name,
        phone: values.phone,
        email: values.email,
        company: values.profile,
        interestedService: values.focusNetwork,
        message: `Perfil o web actual: ${values.profile}\nRed prioritaria: ${values.focusNetwork}`,
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
      <LeadSuccess>Hemos recibido tu solicitud. Revisaremos tus perfiles y te responderemos con los siguientes pasos.</LeadSuccess>
    ) : (
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

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="social-phone">
        Móvil*
        <input
          id="social-phone"
          name="phone"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "social-phone-error" : undefined}
          type="tel"
          inputMode="tel"
          required
          aria-required="true"
          autoComplete="tel"
        />
        {errors.phone ? <span className="text-sm font-semibold text-red-300" id="social-phone-error">{errors.phone}</span> : null}
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-200" htmlFor="social-email">
        Email (opcional)
        <input
          id="social-email"
          name="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "social-email-error" : undefined}
          type="email"
          autoComplete="email"
        />
        {errors.email ? <span className="text-sm font-semibold text-red-300" id="social-email-error">{errors.email}</span> : null}
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
          <option value="">Selecciona una opción</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="linkedin">LinkedIn</option>
          <option value="facebook">Facebook</option>
          <option value="youtube">YouTube Shorts</option>
          <option value="no-se">No lo sé todavía</option>
        </select>
        {errors.focusNetwork ? <span className="text-sm font-semibold text-red-300" id="social-network-error">{errors.focusNetwork}</span> : null}
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
