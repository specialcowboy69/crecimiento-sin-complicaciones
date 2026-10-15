import { parsePhoneNumberFromString } from "libphonenumber-js/max";

export function normalizeMobile(value: unknown): string | null {
  if (typeof value !== "string" || !/^[+\d\s().-]+$/.test(value.trim())) return null;
  let input = value.trim().replace(/[\s().-]/g, "");
  if (input.startsWith("00")) input = `+${input.slice(2)}`;
  if (!/^\+?\d+$/.test(input)) return null;
  const phone = parsePhoneNumberFromString(input, "ES");
  if (!phone?.isValid() || !["MOBILE", "FIXED_LINE_OR_MOBILE"].includes(phone.getType() ?? "")) return null;
  return phone.number;
}

function composeContact(mobile: string, email: string) {
  return `Móvil: ${mobile}${email ? ` | Email: ${email}` : ""}`;
}

export function validateContactFields(values: { phone: unknown; email?: unknown }) {
  const errors: { phone?: string; email?: string } = {};
  const mobile = normalizeMobile(values.phone);
  if (!mobile) {
    errors.phone = "Introduce un móvil válido, con prefijo internacional si es de otro país.";
  }
  if (values.email !== undefined) {
    const email = typeof values.email === "string" ? values.email.trim() : null;
    if (email === null || (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254))) {
      errors.email = "Introduce un email válido o deja este campo vacío.";
    }
  }
  const email = typeof values.email === "string" ? values.email.trim() : "";
  if (mobile && !errors.email && composeContact(mobile, email).length > 220) {
    errors.email = "El email es demasiado largo para guardarlo junto al móvil. Usa uno más corto o deja este campo vacío.";
  }
  return errors;
}

export function resolveLeadContact(payload: { phone?: unknown; email?: unknown; contact?: unknown }): string | null {
  // Presence selects the new contract, even when a supplied value is empty or malformed.
  if (Object.hasOwn(payload, "phone") || Object.hasOwn(payload, "email")) {
    if (Object.keys(validateContactFields({ phone: payload.phone, email: payload.email })).length) return null;
    const mobile = normalizeMobile(payload.phone)!;
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    return composeContact(mobile, email);
  }
  const legacy = typeof payload.contact === "string" ? payload.contact.trim().slice(0, 220) : "";
  return legacy.length >= 6 ? legacy : null;
}
