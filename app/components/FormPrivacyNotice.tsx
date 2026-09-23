import Link from "next/link";

export function FormPrivacyNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`form-privacy ${className}`.trim()}>
      Al enviar tu solicitud, trataremos tus datos para responderla. Consulta la{" "}
      <Link href="/politica-de-privacidad">Política de privacidad</Link>.
    </p>
  );
}
