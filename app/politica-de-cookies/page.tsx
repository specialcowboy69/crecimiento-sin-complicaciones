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
          Esta web utiliza la cookie técnica <code>cookie_consent</code> para recordar tu elección sobre la analítica.
          Dura 12 meses, tiene la finalidad exclusiva de conservar esa preferencia y no se usa para publicidad.
        </p>

        <h2>Medición de visitas</h2>
        <p>
          Usamos Vercel Analytics para conocer de forma agregada cómo se utiliza la web. Esta medición se configura
          sin cookies y no depende de que aceptes la analítica opcional.
        </p>
        <p>
          Google Analytics solo se carga cuando eliges <strong>Aceptar analítica</strong> o activas la categoría de
          analítica en el panel de configuración. Si rechazas esta categoría, no descargamos ni configuramos Google
          Analytics.
        </p>

        <h2>Cómo cambiar tu elección</h2>
        <p>
          Puedes abrir <strong>Gestionar cookies</strong> en cualquier momento para aceptar o rechazar la analítica.
          Si revocas una aceptación previa, eliminamos las cookies de Google Analytics accesibles desde este sitio y
          recargamos la página sin activar la herramienta.
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
