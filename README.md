# Crecimiento Sin Complicaciones

Sitio web comercial de la agencia Crecimiento Sin Complicaciones. Está construido con Next.js App Router y reúne la home, las páginas de servicios, los clústeres SEO, los formularios de captación, el panel interno de leads y la medición consentida.

La URL canónica de producción es `https://www.crecimientosincomplicaciones.com`. Las decisiones sobre dominios, redirecciones y despliegue se mantienen en `docs/deployment.md`.

## Desarrollo local

El repositorio usa `npm` y mantiene `package-lock.json` como archivo de bloqueo.

```powershell
npm.cmd install
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
npm.cmd run dev
```

Abre [http://localhost:3000](http://localhost:3000). Completa `.env.local` con credenciales locales o del proveedor autorizado y no confirmes secretos en Git.

Las variables documentadas en `.env.example` cubren el acceso al panel interno y la conexión del servidor con Firebase Data Connect. Los formularios públicos pueden renderizarse sin exponer esas credenciales al navegador, pero el guardado real de leads requiere una configuración válida del servidor.

## Comandos principales

```powershell
npm.cmd run dev
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

- `npm.cmd run dev`: inicia el servidor de desarrollo.
- `npm.cmd test`: ejecuta las pruebas estructurales y de regresión del repositorio.
- `npm.cmd run lint`: ejecuta ESLint.
- `npm.cmd run build`: genera y valida la compilación de producción.
- `npm.cmd run start`: sirve una compilación ya generada.

Para ejecutar las pruebas E2E contra una compilación local, inicia primero el servidor de producción en una terminal:

```powershell
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1 --port 3001
```

En otra terminal:

```powershell
$env:PLAYWRIGHT_BASE_URL='http://127.0.0.1:3001'
npm.cmd run test:e2e -- --project=chromium
```

No inicies otro servidor de Next.js en el mismo puerto mientras se ejecuta Playwright.

## Estructura principal

- `app/`: rutas públicas, metadata, APIs y panel interno.
- `app/components/`: navegación, formularios, consentimiento, analítica y componentes compartidos.
- `app/lib/`: configuración del sitio, datos estructurados e integración del servidor.
- `tests/`: pruebas estructurales y E2E.
- `.agents/`: contexto comercial y principios SEO que deben leerse antes de modificar páginas.
- `docs/`: arquitectura, diseño y procedimientos operativos.

## Documentación del proyecto

Las convenciones y los procedimientos operativos están organizados aquí:

- [`AGENTS.md`](./AGENTS.md): alcance del repositorio, coordinación y validaciones obligatorias.
- [`.agents/product-marketing.md`](./.agents/product-marketing.md): oferta, público, lenguaje, diferenciación y límites comerciales.
- [`.agents/seo-context.md`](./.agents/seo-context.md): contexto SEO, archivos operativos y pilares actuales.
- [`.agents/seo-technical-principles.md`](./.agents/seo-technical-principles.md): reglas técnicas para crear o modificar páginas SEO.
- [`docs/site-architecture.md`](./docs/site-architecture.md): rutas públicas, redirecciones, canonicals, sitemap y enlazado interno.
- [`docs/navigation.md`](./docs/navigation.md): cabeceras, menús, enlaces de página y footer compartido.
- [`docs/design.md`](./docs/design.md): sistema visual, legibilidad, responsive y convenciones de componentes.
- [`docs/forms-and-leads.md`](./docs/forms-and-leads.md): payloads, taxonomía de formularios, privacidad y eventos de conversión.
- [`docs/analytics-and-consent.md`](./docs/analytics-and-consent.md): Vercel Analytics, GA4 opcional, consentimiento y verificación.
- [`docs/deployment.md`](./docs/deployment.md): dominio de producción, Cloudflare, preflight de Git y comprobaciones posteriores al despliegue.

Lee el documento aplicable antes de cambiar su área. Las rutas, metadata, sitemap, redirecciones, navegación compartida y formularios requieren las validaciones descritas en `AGENTS.md` y en sus documentos específicos.

## Despliegue

El proyecto se publica mediante Vercel y usa Cloudflare para la configuración de dominio descrita en `docs/deployment.md`. Un build local o un preview correcto no demuestran por sí solos que producción, Analytics, GA4 o Google Ads estén recibiendo datos; realiza las comprobaciones externas documentadas después de cada cambio relacionado.

## Referencias del framework

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Playwright](https://playwright.dev/docs/intro)
