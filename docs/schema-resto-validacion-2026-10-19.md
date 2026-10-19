# Validación de schema: 21 páginas restantes

Fecha: 19 de octubre de 2026.

- Worktree: `C:/Users/USUARIO/.codex/worktrees/remaining-schema/pagina-agencia`.
- Rama: `codex/remaining-schema`.
- Base: `46bced2de1141623009ab2fabea59984ea207f1c`.
- Servidor de revisión: http://127.0.0.1:3005.
- Alcance de este informe: validación local previa a la publicación. La verificación de producción se registra por separado.

## Correcciones

- Eliminada la Organization duplicada de la portada y el ProfessionalService obsoleto de diseño web.
- Identidad estable con @id y url en 12 servicios; todos sus proveedores referencian la Organization global.
- Sustituido Service.makesOffer por ofertas vinculadas correctamente. Los planes comerciales de diseño y redes conservan sus nombres y no incluyen precios inventados.
- Separadas nueve auditorías gratuitas del servicio comercial, mediante el helper existente y sus anclas reales. El precio cero describe solo esas auditorías.
- En SEO técnico, eliminados Service.about y los sameAs de Wikipedia; la auditoría tiene entidad propia y su ancla real. No se declara gratuita porque la página no lo acredita.
- FAQ, breadcrumbs, canonicals, robots, contenido, metadatos y diseño conservados.

## Fechas

Los tres artículos registran únicamente publishedAt: 2026-10-08. Se mantiene ese día y no se añade hora, zona horaria ni dateModified. Las horas de los commits no demuestran cuándo se publicaron los artículos. Los archivos del blog no se han modificado.

La validación de Schema.org admite el día existente. No se afirma haber resuelto las advertencias opcionales sobre fecha/hora de Google observadas en la auditoría anterior; faltan datos reales para completarlas.

## Resultado

- Schema.org Validator: 21/21 páginas, cero errores y cero advertencias. Se introdujo el JSON-LD completo del HTML compilado mediante la opción de código.
- Playwright: 21/21 páginas en navegador; HTTP, JSON, referencias, canonicals, robots, ofertas, anclas, imágenes del blog, fechas y correspondencia de 64 preguntas/respuestas con el contenido visible.
- npm run lint: correcto.
- npm test: 153/153 pruebas correctas.
- npm run build -- --webpack: correcto, incluidos TypeScript y generación estática.
- git diff --check: correcto.

| Página | Schema.org: errores / advertencias | Navegador |
| --- | --- | --- |
| `/` | 0 / 0 | OK |
| `/sobre-nosotros` | 0 / 0 | OK |
| `/seo/madrid` | 0 / 0 | OK |
| `/seo/barcelona` | 0 / 0 | OK |
| `/seo/valencia` | 0 / 0 | OK |
| `/seo/sevilla` | 0 / 0 | OK |
| `/seo/alicante` | 0 / 0 | OK |
| `/seo/malaga` | 0 / 0 | OK |
| `/diseno-pagina-web-profesional` | 0 / 0 | OK |
| `/diseno-pagina-web-profesional/empresas` | 0 / 0 | OK |
| `/diseno-pagina-web-profesional/valencia` | 0 / 0 | OK |
| `/gestion-redes-sociales-empresas` | 0 / 0 | OK |
| `/soluciones-inteligencia-artificial-empresas` | 0 / 0 | OK |
| `/blog` | 0 / 0 | OK |
| `/blog/categoria/seo` | 0 / 0 | OK |
| `/blog/como-ampliar-tematica-web-sin-perder-foco-seo` | 0 / 0 | OK |
| `/blog/como-lanzar-una-web-nueva-sin-comprometer-seo` | 0 / 0 | OK |
| `/blog/domain-rating-como-evaluar-backlinks` | 0 / 0 | OK |
| `/agencia-marketing-digital/seo-tecnico-arquitectura-entidades` | 0 / 0 | OK |
| `/politica-de-cookies` | 0 / 0 | OK |
| `/politica-de-privacidad` | 0 / 0 | OK |

Se trata de validación del código local compilado. No se ha desplegado ni validado una nueva versión en producción, y no se ha repetido Google Rich Results Test en esta intervención.

## Preservación

- Comparación por AST de las 13 páginas modificadas: idénticas fuera de las importaciones y bloques de datos estructurados.
- No se han cambiado estilos, imágenes, componentes visuales, formularios ni archivos del chatbot.
- Checkout principal y worktree del chatbot: mismos HEAD, estados Git y huellas SHA-256 del conjunto de archivos versionados/no ignorados antes y después.

## Evidencia local

- `output/remaining-schema/rendered.json`: JSON-LD extraído de las 21 páginas compiladas.
- `output/remaining-schema/validation-results.json`: resultados y método de validación.
- `output/remaining-schema/scope-check.json`: comparación de las páginas fuera de schema.
- `output/remaining-schema/preservation.json`: huellas y estado de los checkouts preservados.
- `output/playwright/report/index.html`: informe de las 21 pruebas con JSON-LD adjunto.
- `tests/e2e/remaining-schema.spec.ts`: comprobaciones reproducibles.

Comandos para repetir la validación:

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build -- --webpack
npm.cmd run start -- --hostname 127.0.0.1 --port 3005
# En otra terminal:
$env:PLAYWRIGHT_BASE_URL = 'http://127.0.0.1:3005'
npx.cmd playwright test tests/e2e/remaining-schema.spec.ts
```
