# Validación de schema de las páginas comerciales

Fecha: 2026-10-19.
Rama: `codex/commercial-schema`.
Base: `48b8bd82ecf25ebb33953e7dfe173bef57ae0bf2` (`main` publicado).
Servidor de revisión: `http://127.0.0.1:3004`.

## Cambios

- Se elimina `makesOffer` de los cuatro servicios que lo usaban: marketing digital, SEO, SEO para pymes y Google Ads. Esta propiedad se conserva en `Organization`, donde sí corresponde.
- Cada auditoría gratuita de esas cuatro páginas se representa como un servicio independiente con `offers`, precio cero, moneda EUR y un enlace al formulario existente. El servicio principal no recibe ese precio.
- Los cinco servicios que carecían de identidad consistente reciben un `@id` estable, URL canónica y referencia al `@id` de la organización. Alicante y SEO local ya tenían esos enlaces y se validan sin modificar sus páginas.
- La organización compartida incorpora teléfono y correo públicos, usando las mismas constantes que el componente de contacto. También incorpora una versión SVG estática del símbolo de marca que ya utiliza el sitio, de 256 × 256.
- Se escapa `<` al serializar los tres bloques JSON-LD de landing pages, siguiendo la guía de Next.js.
- Se conservan las FAQ existentes. No se añade FAQPage a SEO local ni marcado LocalBusiness, Review o AggregateRating.

La ampliación de `Organization` se sirve desde el layout compartido y, por tanto, beneficia al resto del sitio. Los cambios de servicio y auditoría quedan acotados a las páginas indicadas.

## Validación de las siete páginas

El validador oficial de Schema.org recibió el código JSON-LD extraído del HTML servido por la compilación local. No se utilizó la versión antigua de producción para validar estos cambios.

| Página | HTTP local | Prueba Chromium | Errores Schema.org | Advertencias Schema.org | FAQ verificadas |
| --- | --- | --- | --- | --- | --- |
| `/agencia-marketing-digital` | 200 | OK | 0 | 0 | 5 |
| `/seo-para-pymes` | 200 | OK | 0 | 0 | 6 |
| `/agencia-marketing-digital/google-ads` | 200 | OK | 0 | 0 | 7 |
| `/agencia-marketing-digital/google-ads/alicante` | 200 | OK | 0 | 0 | 8 |
| `/diseno-landing-pages` | 200 | OK | 0 | 0 | 6 |
| `/seo` | 200 | OK | 0 | 0 | 6 |
| `/seo/local` | 200 | OK | 0 | 0 | 0 |

Las pruebas en Chromium comprueban JSON válido, referencias resueltas, identidad y proveedor del servicio, separación de la auditoría gratuita, contactos visibles, respuesta HTTP del logo, migas de pan y coincidencia de las 38 FAQ con sus preguntas y respuestas en el HTML.

### Google Rich Results Test

Prueba adicional por código de `/seo`: **3 elementos válidos** (rutas de exploración, organización y la categoría que Google denomina empresas locales).

Google muestra dos avisos **no críticos**: `address` e `image` opcionales. El tipo declarado sigue siendo `Organization`. Se conservan los datos reales y no se añade una dirección ni una fotografía sin verificar. El logo se declara mediante `logo`; no se utiliza como fotografía de una sede.

[Resultado de la prueba de Google](https://search.google.com/test/rich-results/result?id=Z6HUSsX9vIHxwxcEjDVdHw)

La prueba por código no acredita despliegue, rastreo del nuevo archivo de logo en producción ni aparición de resultados enriquecidos. Tras una futura publicación se deberá comprobar el recurso público y repetir la prueba por URL.

## Controles del proyecto

- `npm.cmd run lint`: correcto.
- `npm.cmd test`: 153 pruebas aprobadas.
- `npm.cmd run build -- --webpack`: correcto; 38 páginas generadas.
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3004 npm.cmd run test:e2e -- tests/e2e/commercial-schema.spec.ts`: 7 pruebas aprobadas.
- `git diff --check`: correcto.

## Preservación del trabajo

- Comparación AST de las funciones de las siete páginas y del componente de contacto contra la base: contenido visual idéntico al excluir los scripts JSON-LD.
- Ningún archivo CSS modificado. Sin cambios en textos comerciales, formularios, navegación, canonicals o rutas.
- Chatbot: HEAD, estado Git y SHA-256 de sus cinco archivos modificados idénticos a la instantánea tomada al comenzar.
- El servidor de diseño anterior en el puerto 3003 permanece independiente del nuevo servidor de schema.

## Evidencias locales

En `output/schema-review/` (directorio ignorado):

- `rendered-schemas.json`: JSON-LD de las siete respuestas locales.
- `schema-org-results.json`: resultados del validador oficial de las siete páginas.
- `google-results.json`: resultado de Google y avisos opcionales.
- `design-preservation.json` y `chatbot-preservation.json`: comprobaciones de preservación.
- `lint.log`, `unit-tests.log`, `build.log` y `e2e.log`: resultados de las verificaciones.

Este informe registra la validación previa a la publicación. La comprobación posterior del despliegue y las siete URL de producción se documenta en la PR de entrega.
