# Principios SEO técnicos para páginas nuevas

Guía operativa para crear o modificar páginas SEO en `pagina-agencia`. Debe consultarse antes de publicar money pages, páginas locales, páginas intermedias, colonias SEO o landings de servicio.

## Objetivo

Cada página debe ser indexable, rastreable, entendible para Google y útil para el usuario. El objetivo no es crear más URLs, sino crear páginas que puedan captar demanda, enlazar bien con el resto del sitio y convertir visitas en solicitudes de auditoría gratuita.

## Fuentes de Verdad

- Contexto de negocio: `.agents/product-marketing.md`
- Contexto SEO operativo: `.agents/seo-context.md`
- Arquitectura, rutas, redirects y clusters: `docs/site-architecture.md`
- Navegación y headers: `docs/navigation.md`
- Formularios y leads: `docs/forms-and-leads.md`
- Estrategia y mapa de keywords: `C:/Users/USUARIO/Downloads/seo-skills/companies/pagina-agencia`
- Identidad visual y copy visible: `docs/design.md`

## Checklist Antes de Crear una Página

- Definir una keyword principal y máximo 3-6 secundarias.
- Confirmar que la intención no está cubierta por otra URL.
- Definir el tipo de página: money page, página local, página intermedia, pregunta/colonia o landing de servicio.
- Definir el CTA principal. Por defecto: `Solicitar auditoría gratuita`.
- Definir a qué página superior enlaza y qué páginas inferiores o relacionadas enlazan hacia ella.
- Revisar si la página debe entrar en `app/sitemap.ts`.

## URL y Arquitectura

- Usar URLs cortas, descriptivas, en minúsculas y con guiones.
- Evitar parámetros para contenido indexable.
- Evitar slugs demasiado largos si existe una alternativa clara.
- Mantener una arquitectura simple:
  - Money pages nacionales: `/{servicio}/`
  - Páginas locales: `/{servicio}/{ciudad}/`
  - Intermedias: `/{servicio-o-intencion}/`
  - Preguntas: `/preguntas/{pregunta}/`
- No crear una URL nueva si solo cambia una palabra y la intención es la misma.
- Si se sustituye una URL existente, añadir redirect 301 y actualizar enlaces internos, sitemap y canonical.

## Metadata en Next.js

Cada página SEO debe exportar `metadata` desde su `page.tsx` o usar el mecanismo equivalente del proyecto.

Debe incluir:

- `title`
- `description`
- `alternates.canonical`
- `openGraph.title`
- `openGraph.description`
- `openGraph.url`
- `openGraph.type`
- `robots.index: true`
- `robots.follow: true`

Reglas:

- El title debe ser único.
- La keyword principal debe aparecer de forma natural, preferiblemente al inicio.
- Mantener titles orientados a clic, no a stuffing.
- La meta description debe ser única, clara y orientada a conversión.
- Usar la marca al final cuando encaje: `| Crecimiento sin complicaciones`.

Plantilla orientativa:

```ts
export const metadata: Metadata = {
  title: "Agencia SEO para empresas",
  description:
    "Agencia SEO para pymes y empresas. Auditoría SEO, estrategia de contenidos, SEO técnico y posicionamiento local para captar más clientes desde Google.",
  alternates: {
    canonical: "/seo",
  },
  openGraph: {
    title: "Agencia SEO para empresas",
    description:
      "Auditoría SEO, arquitectura web, contenidos y medición para captar tráfico cualificado desde Google.",
    url: "/seo",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

## Canonical

- Cada página indexable debe tener canonical autorreferente.
- El canonical debe coincidir con la URL final que aparece en sitemap.
- No canonicalizar páginas locales a la money page nacional si tienen contenido propio.
- No canonicalizar páginas duplicadas para "resolver" contenido fino. Si una página no tiene valor propio, no debe publicarse o debe fusionarse.
- Mantener consistencia con la política de trailing slash del proyecto.

## Sitemap

Actualizar `app/sitemap.ts` cuando se cree una página indexable.

Solo deben entrar en sitemap:

- URLs canónicas.
- URLs que devuelven 200.
- URLs que deben indexarse.
- Páginas con contenido suficiente y CTA claro.

No deben entrar:

- Admin.
- APIs.
- Páginas duplicadas.
- Páginas experimentales.
- URLs que redirigen.
- Variantes sin intención propia.

Usar prioridades de forma sobria:

- Home: `1`
- Money pages principales: `0.9`
- Páginas locales o intermedias importantes: `0.75` a `0.85`
- Preguntas/colonia: `0.5` a `0.7`

## Robots

- Revisar `app/robots.ts` si se añaden zonas no públicas.
- Las páginas SEO principales deben ser `index, follow`.
- No usar `noindex` como solución permanente para contenido duplicado que podría evitarse desde arquitectura.

## Schema y Datos Estructurados

Usar JSON-LD cuando aporte comprensión real. El schema debe representar contenido visible en la página.

Base recomendada:

- `Organization` en home o layout global si se implementa de forma centralizada.
- `WebSite` en home o layout global.
- `BreadcrumbList` en páginas internas con breadcrumbs.
- `FAQPage` solo cuando las FAQs sean visibles en la página.
- `Service` para páginas de servicio cuando el contenido describa claramente una oferta.
- `LocalBusiness` solo si hay datos locales reales y no induce a pensar que existe una oficina física donde no la hay.

Reglas:

- No marcar FAQs que no existen visualmente.
- No inventar reseñas, ratings, precios o direcciones.
- No usar `LocalBusiness` con ciudades si no hay sede, dirección o área de servicio justificada.
- Para páginas locales sin oficina física, preferir copy tipo "servicios para empresas de Madrid" antes que afirmar presencia física.
- Validar con Rich Results Test o Schema.org Validator cuando se añada o cambie schema.

## Headings y Contenido

- Una sola H1 por página.
- El H1 debe contener o reflejar la keyword principal de forma natural.
- Usar H2 para bloques de intención: problema, solución, proceso, servicio, localización, FAQs.
- No saltar jerarquías por estilo visual.
- La keyword debe aparecer en el primer bloque de contenido, sin forzar.
- Usar lenguaje de cliente: leads cualificados, auditoría gratuita, posicionamiento, captación, diseño web, Google Ads, SEO técnico.
- Evitar promesas garantizadas o absolutas.

## Enlazado Interno

Cada página nueva debe tener:

- Al menos un enlace interno entrante desde una página superior, footer, bloque relacionado o página de cluster.
- Al menos un enlace saliente hacia la money page o página superior que corresponda.
- Anchor text descriptivo, no `leer más` ni `haz clic aquí`.
- CTA principal hacia contacto/auditoría.

Patrón recomendado:

```text
Pregunta/colonia -> Página intermedia -> Página local o money page -> Auditoría gratuita
```

Ejemplos:

```text
/preguntas/cuanto-cuesta-una-agencia-seo-en-madrid/
  -> /seo-para-pymes/
    -> /seo/madrid/
      -> /seo/
```

```text
/preguntas/cuanto-cuesta-una-pagina-web-para-empresa-en-valencia/
  -> /diseno-pagina-web-profesional/empresas
    -> /diseno-pagina-web-profesional/valencia
      -> /diseno-pagina-web-profesional
```

## Páginas Locales

No crear páginas locales cambiando solo ciudad. Cada página local debe aportar contenido específico.

Debe incluir al menos 4 de estos elementos:

- Problemas habituales de empresas en esa ciudad o zona.
- Sectores locales relevantes.
- Cómo se adapta el servicio a ese mercado.
- FAQs específicas de la ciudad.
- Enlaces a servicios relacionados.
- Ejemplos, casos, supuestos o escenarios locales.
- CTA orientado a auditoría o revisión del sitio.

Evitar:

- "Somos la mejor agencia SEO en Madrid" sin prueba.
- "Agencia SEO en Madrid" si no hay presencia física.
- Listas masivas de ciudades sin contenido propio.
- Páginas casi idénticas entre ciudades.

## Imágenes y Assets

- Usar imágenes optimizadas y en formatos modernos cuando sea posible.
- Definir `alt` descriptivo en imágenes informativas.
- Usar `alt=""` en imágenes puramente decorativas.
- Evitar assets pesados que perjudiquen LCP.
- No depender de imágenes para comunicar texto esencial.

## Performance y Core Web Vitals

Objetivos:

- LCP menor de 2.5s.
- INP menor de 200ms.
- CLS menor de 0.1.

Reglas prácticas:

- Evitar JavaScript innecesario en páginas SEO.
- Preferir componentes server-side cuando no haya interacción real.
- No cargar formularios, carruseles o scripts pesados si no aportan a la conversión.
- Cuidar fuentes, imágenes hero y secciones above the fold.
- Revisar móvil antes de cerrar cambios.

## Conversión

Cada página SEO debe tener:

- CTA visible en el hero.
- CTA intermedio si la página supera 900-1200 palabras.
- CTA final.
- Mensaje claro de baja fricción: auditoría gratuita, revisión inicial o propuesta.
- Formularios simples, sin pedir inversión mensual estimada salvo que el usuario lo solicite.

El CTA principal debe mantener la nomenclatura de marca:

```text
Solicitar auditoría gratuita
```

## Calidad y Riesgos

No publicar una página si:

- No tiene intención de búsqueda clara.
- Canibaliza una página existente.
- No aporta valor único.
- No tiene enlaces internos.
- No tiene metadata propia.
- No está en sitemap pese a ser indexable.
- Tiene schema que no coincide con el contenido visible.
- Es una página local sin contenido local real.

## Checklist de Cierre

Antes de dar una página por terminada:

- Metadata única añadida.
- Canonical autorreferente correcto.
- H1 único y alineado con la keyword.
- Headings ordenados.
- CTA principal visible.
- Enlaces internos entrantes y salientes revisados.
- Schema añadido si aplica.
- Sitemap actualizado si la página debe indexarse.
- Robots/indexación coherentes.
- Mobile sin desbordes ni solapes.
- `npm run lint` ejecutado si se tocó código.
- `npm run build` ejecutado si el cambio afecta rutas, metadata o estructura.
