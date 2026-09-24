import type { Metadata } from "next";
import Link from "next/link";

const pagePath = "/politica-de-privacidad";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Información sobre el tratamiento de datos personales en Crecimiento sin complicaciones.",
  alternates: {
    canonical: pagePath,
  },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="policy-page">
      <article className="policy-content">
        <Link className="policy-back-link" href="/">
          Volver al inicio
        </Link>
        <p className="eyebrow">Información legal</p>
        <h1>Política de privacidad</h1>

        <h2>Responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento es <strong>Crecimiento sin complicaciones S.U.</strong>, con NIF{" "}
          <strong>51092147-W</strong>. Para cualquier consulta sobre privacidad puedes escribir a{" "}
          <a href="mailto:info@crecimientosincomplicaciones.com">info@crecimientosincomplicaciones.com</a>.
        </p>

        <h2>Datos y finalidad</h2>
        <p>
          Cuando envías un formulario podemos tratar tu nombre, email o teléfono, empresa, sitio web o perfil
          profesional, servicio de interés y la información que decidas incluir en el mensaje. Los usamos únicamente
          para responder a tu solicitud y valorar la conversación comercial que has iniciado.
        </p>

        <h2>Conservación</h2>
        <p>
          Conservamos los datos de una solicitud durante 12 meses desde la última interacción, salvo que solicites
          antes su supresión o exista una obligación aplicable que requiera conservarlos durante más tiempo.
        </p>

        <h2>Proveedores y analítica</h2>
        <p>
          Los formularios se almacenan mediante Firebase Data Connect. Vercel Analytics se utiliza para la medición
          agregada de visitas. Google Analytics solo se activa si aceptas la categoría de analítica desde el aviso o
          el panel de cookies.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad de tus datos
          escribiendo a{" "}
          <a href="mailto:info@crecimientosincomplicaciones.com">info@crecimientosincomplicaciones.com</a>.
        </p>

        <p>
          Para conocer el funcionamiento de la medición y modificar tus preferencias, consulta la{" "}
          <Link href="/politica-de-cookies">Política de cookies</Link>.
        </p>
      </article>
    </main>
  );
}
