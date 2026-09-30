import type { Metadata } from "next";
import Link from "next/link";

const pagePath = "/politica-de-cookies";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Información sobre las cookies y la medición analítica de Crecimiento sin complicaciones.",
  alternates: {
    canonical: pagePath,
  },
  robots: { index: false, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <main className="policy-page">
      <article className="policy-content">
        <Link className="policy-back-link" href="/">
          Volver al inicio
        </Link>
        <p className="eyebrow">Información legal</p>
        <h1>Política de cookies</h1>
        <p>
          Esta web utiliza la cookie técnica <code>cookie_consent</code> para recordar tu elección sobre analítica y
          medición publicitaria. Dura 12 meses y tiene la finalidad exclusiva de conservar esas preferencias.
        </p>

        <h2>Medición de visitas</h2>
        <p>
          Usamos Vercel Analytics para conocer de forma agregada cómo se utiliza la web. Esta medición se configura
          sin cookies y no depende de que aceptes la analítica opcional.
        </p>
        <p>
          Google Analytics solo se carga cuando activas la categoría de analítica. Si la rechazas, no descargamos ni
          configuramos Google Analytics.
        </p>
        <p>
          Cuando aceptas, Google Analytics crea las cookies propias <code>_ga</code> y{" "}
          <code>_ga_VECVHEZ2DN</code>. Su duración predeterminada es de 2 años: la primera distingue visitantes y la
          segunda conserva el estado de la sesión.
        </p>

        <h2>Medición publicitaria</h2>
        <p>
          Si activas también la categoría <strong>Publicidad y medición</strong>, usamos las señales de consentimiento
          de Google para atribuir a Google Ads una solicitud enviada correctamente desde la página de SEO local. Esta
          medición no incluye el nombre, email, teléfono, empresa ni el mensaje del formulario.
        </p>
        <p>
          Esta configuración funciona sin personalización ni remarketing, y tampoco utiliza conversiones mejoradas. Si
          rechazas la categoría publicitaria, mantenemos esta medición desactivada.
        </p>

        <h2>Cómo cambiar tu elección</h2>
        <p>
          Puedes abrir <strong>Cambiar configuración de cookies</strong> en el pie de página en cualquier momento para cambiar tus preferencias. Si
          revocas una aceptación previa, eliminamos las cookies de Google Analytics y de medición publicitaria
          accesibles desde este sitio y recargamos la página con la nueva elección.
        </p>

        <h2>Más información</h2>
        <p>
          Consulta cómo tratamos los datos enviados mediante los formularios en nuestra{" "}
          <Link href="/politica-de-privacidad">Política de privacidad</Link>.
        </p>
      </article>
    </main>
  );
}
