# Renovación de páginas comerciales

**Fecha:** 2026-10-06
**Estado:** aplicado
**Alcance:** home, SEO local, Google Ads nacional y Google Ads Alicante

## Contexto

Las páginas comerciales acumulaban patrones que reducían su claridad: gráficos decorativos que parecían datos reales, demasiadas cuadrículas de cards, textos separados de sus títulos, procesos más complejos que la experiencia real y mensajes genéricos que podían pertenecer a cualquier agencia.

La renovación busca que cada página explique con rapidez qué servicio ofrece, a quién se dirige, cómo se trabaja y cuál es el siguiente paso. El diseño debe sentirse editorial y profesional sin perder la función comercial.

Este documento registra las decisiones y su motivación. El copy exacto vive en los componentes de cada página; las reglas reutilizables viven en `docs/design.md` y `.agents/product-marketing.md`.

## Decisiones globales

### Diseño

- Priorizar fotografías editoriales que enseñen personas, trabajo, mercado o servicio real.
- Usar heroes de ancho completo cuando la imagen pueda sostener la propuesta principal con contraste suficiente.
- Alternar imágenes, listas numeradas, comparativas, carruseles y bloques editoriales para evitar una página compuesta solo por cards.
- Mantener radios moderados, padding suficiente y dimensiones estables en tarjetas, tablas y controles.
- Reservar los fondos gráficos de cards para reforzar su significado, no para decorar todas las superficies.
- Nombrar las columnas de las tablas y eliminar líneas o acentos cuya función no resulte evidente.
- Diseñar móvil como una lectura vertical propia, no como una reducción mecánica del escritorio.

### Copy

- El H1 posee la intención principal de la ruta; el texto de apoyo explica el mecanismo y el resultado esperado.
- Estructurar los mensajes como problema reconocible, acción concreta, resultado observable y siguiente paso.
- Mantener `Auditoría gratuita` como nombre estable de la oferta de entrada.
- Usar `Ver casos de éxito` cuando el destino sea la sección de casos.
- Evitar eslóganes genéricos, subtítulos redundantes y divisiones artificiales en pasos.
- No publicar cifras, plazos, precios, oficinas o resultados que no estén respaldados.
- Mantener los límites legales y comerciales como guardrails internos cuando no ayuden al usuario a decidir.

## Home `/`

### Problemas anteriores

- El hero separaba el copy y un gráfico de pipeline que podía interpretarse como resultado real.
- Las métricas `3-5%`, `90 días` y `Core Web Vitals` funcionaban como elementos decorativos sin contexto suficiente.
- La explicación del sistema, los servicios y el diagnóstico repetían estructuras de cards.
- El diagnóstico se dividía en cuatro pasos aunque la experiencia real es enviar el formulario, revisar la web y recibir una propuesta.

### Decisiones aplicadas

- Hero full-bleed con la fotografía `home-growth-collaboration.webp` y copy HTML superpuesto.
- Señal de categoría: `Agencia de crecimiento y marketing digital`.
- Promesa principal: `Convertimos tráfico en oportunidades comerciales.`
- CTA secundario cambiado a `Ver casos de éxito`.
- El problema de adquisición se explica mediante cuatro etapas visuales: captar, explicar, convertir y aprender.
- Los servicios usan paneles con imágenes y enlazan a rutas existentes: SEO, Google Ads, landing pages y automatizaciones con IA.
- Los casos se organizan para destacar reto, solución y resultado mediante navegación compacta.
- La auditoría se presenta como una propuesta sencilla, sin un proceso artificial de cuatro pasos.

## SEO local `/seo/local`

### Problemas anteriores

- Las explicaciones de las situaciones de compra aparecían en una columna separada de sus títulos.
- El diagrama de presencia local no explicaba suficientemente la relación entre perfil, web, reputación y medición.
- Las reseñas tenían pies de tarjeta con poco espacio interior.
- El plan ilustrativo no nombraba sus columnas y usaba una línea vertical decorativa sin función clara.
- La sección de método tenía un eyebrow y un título que repetían la misma idea.

### Decisiones aplicadas

- Cada explicación se coloca inmediatamente debajo de su título.
- El diagrama se sustituye por una imagen editorial de análisis de presencia local.
- Las reseñas mantienen padding consistente en contenido e identificación del cliente.
- El plan utiliza las columnas `Paso`, `Área de trabajo`, `Qué revisamos` y `Para qué sirve`.
- Se elimina el aviso defensivo del encabezado del plan; el contexto sigue describiéndolo como ejemplo ilustrativo.
- `Nuestro método` pasa a ser el único H2 de la sección, seguido por Analizar, Priorizar, Ejecutar y Medir.
- La página utiliza cuatro activos editoriales con encuadres adaptados a escritorio y móvil.

## Google Ads nacional `/agencia-marketing-digital/google-ads`

- La ruta pasa a poseer la intención nacional genérica de `Google Ads` y `agencia SEM`.
- El contenido explica estrategia, estructura de cuenta, anuncios, landing pages, medición y optimización sin métricas ficticias.
- Las fotografías `google-ads-national-analysis.webp` y `google-ads-national-audience.webp` sustituyen composiciones de cards repetitivas y aportan contexto de trabajo.
- La página enlaza al servicio local de Alicante como mercado relacionado, sin convertirlo en navegación global.

## Google Ads Alicante `/agencia-marketing-digital/google-ads/alicante`

- La nueva ruta posee únicamente intención local de Google Ads y SEM para Alicante ciudad y provincia.
- El servicio se presenta como remoto. El copy, las imágenes y el schema no implican oficina, sucursal ni dirección en Alicante.
- Las referencias geográficas describen cobertura de campaña, demanda y segmentación comercial.
- La composición combina hero editorial, contexto de mercado, proceso, sectores, cobertura geográfica, FAQ y formulario.
- El formulario conserva `sourcePage="Google Ads Alicante"` e `interestedService="Google Ads"`.

## Evidencia y límites

- Las fotografías apoyan el relato, pero no demuestran resultados por sí mismas.
- Las reseñas deben conservar su texto, empresa y rol aprobados.
- Los casos y cifras solo pueden reutilizarse como prueba cuando exista una fuente identificable y permiso para publicarlos.
- No se debe añadir `LocalBusiness`, dirección local, rating, precio o resultado a schema si no existe evidencia visible y verificable.
- Una landing local puede describir el mercado atendido sin afirmar presencia física.

## Validación del estado integrado

El estado final que contiene ambas renovaciones se validó durante la entrega de Google Ads:

- `npm test`: 72 pruebas superadas.
- `npm run lint`: sin errores.
- `npm run build`: 31 páginas generadas.
- `npm run test:e2e`: 28 pruebas superadas.
- Revisión en `1440x900` y `390x844`: sin errores de ejecución, imágenes rotas ni overflow horizontal.
- Checks de Vercel aprobados para los dos Pull Requests.

## Entrega

- [PR #11: Rediseño de SEO local y recorridos de la home](https://github.com/specialcowboy69/crecimiento-sin-complicaciones/pull/11), merge commit `d2a44a8`.
- [PR #12: Clúster de Google Ads y SEM Alicante](https://github.com/specialcowboy69/crecimiento-sin-complicaciones/pull/12), merge commit `7c2dfda`.

## Fuentes de verdad

- `docs/design.md`: reglas visuales, responsive, cards, fotografía y copy visible.
- `.agents/product-marketing.md`: oferta, mensajes aprobados, prueba y guardrails comerciales.
- `.agents/seo-context.md`: propiedad de intención y contexto operativo SEO.
- `docs/site-architecture.md`: rutas, enlaces internos, redirects y sitemap.
- `docs/forms-and-leads.md`: formularios, `sourcePage`, `interestedService` y privacidad.
