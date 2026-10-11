import { Mail, Phone } from "lucide-react";

export const contactPhone = "+34604990651";
export const contactEmail = "info@crecimientosincomplicaciones.com";

export function ContactOptions({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`contact-options${dark ? " contact-options-dark" : ""}`} aria-label="Contacto directo">
      <p>¿Prefieres hablar directamente?</p>
      <div className="contact-options-links">
        <a href={`tel:${contactPhone}`}>
          <Phone size={18} aria-hidden="true" />
          <span>604 990 651</span>
        </a>
        <a href={`mailto:${contactEmail}`}>
          <Mail size={18} aria-hidden="true" />
          <span>{contactEmail}</span>
        </a>
      </div>
    </div>
  );
}
