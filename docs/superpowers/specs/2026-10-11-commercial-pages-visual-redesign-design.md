# Rediseño visual de SEO, Google Ads y landing pages

**Fecha:** 2026-10-11

**Repositorio:** `C:/Users/USUARIO/Downloads/pagina-agencia`

**Worktree de diseño:** `C:/Users/USUARIO/.codex/worktrees/commercial-visual-redesign/pagina-agencia`
**Rama:** `codex/commercial-visual-redesign`

## Propósito y criterio de éxito

El visitante debe reconocer el servicio, entender por qué le conviene y encontrar la auditoría gratuita sin atravesar filas de tarjetas intercambiables. Las tres páginas conservarán su intención comercial y su familia visual, pero cada bloque tendrá una composición apropiada a la información que comunica. El cambio debe sentirse notable, no como un mero ajuste de color o iconos.

En alcance: `/seo`, `/agencia-marketing-digital/google-ads` y `/diseno-landing-pages`, sus estilos específicos, los recursos visuales necesarios y pruebas de no regresión. Fuera de alcance: cambios en precios, formularios o payloads, rutas, canonicals, sitemap, textos de testimonios, métricas y diseño global de otras páginas. El trabajo activo de navegación móvil en otro chat no se incorporará ni se sobrescribirá.

## Dirección visual común

- Hero fotográfico de ancho completo en cada página, con titular, explicación y CTA en HTML sobre una zona de contraste verificado. La imagen muestra el trabajo o el producto real del servicio: análisis de campañas para Ads, investigación y arquitectura web para SEO, y una landing en uso para Landing Pages. No se usarán fondos abstractos, dashboards de resultados ficticios ni texto incrustado en la imagen.
- Tres imágenes distintas, con recorte útil en escritorio y móvil, dimensiones estables, `next/image`, prioridad de carga para la imagen principal y alternativa accesible cuando aporte información. Si la imagen es puramente ambiental, su texto alternativo será vacío.
- Heroes compactos: en `1440x900` y `390x844` debe asomar el siguiente bloque sin ocultar titular ni CTA. El header no tapa las migas ni los anclajes.
- Sistema visual claro: blanco y gris muy claro para lectura, azul para acciones y verde azulado como acento. Superficies oscuras solo donde cumplan una función narrativa y con contraste comprobado. No aplicar una capa de estilos correctivos globales a páginas ajenas.
- Ritmo alterno: bandas a ancho completo, composiciones editoriales, diagramas explicativos y listas alineadas. Reservar tarjetas para elementos que de verdad sean unidades independientes. No sustituir todas las tarjetas por el mismo patrón de foto más texto.

## Google Ads

Se retira `PageLinksNav` de esta página: el header, `Más servicios` y las migas ya permiten orientarse. No se alteran el menú compartido ni la navegación móvil en desarrollo.

El panel «Sistema Ads» sale del hero. Una foto editorial de trabajo con campañas ocupa el fondo completo; el copy existente se condensa para poder leerse sobre la imagen y mantiene «Agencia Google Ads» en el H1, auditoría gratuita y enlace al hub. Se evitan pantallas con datos aparentes o marcas ajenas identificables. Si la secuencia búsqueda → anuncio → landing → lead sigue aportando valor, se presenta más abajo como una línea de proceso accesible y mucho más breve, no como una tarjeta oscura gigante ni como prueba de resultados.

## SEO nacional

- El panel «Hoja de ruta SEO» y la banda de tres minitarjetas desaparecen del hero. Se incorpora una fotografía editorial de investigación y arquitectura SEO con titular y CTA legibles. Se elimina la insignia `24-48h` del panel, que no debe convertirse en una promesa de plazo por accidente.
- «El problema» y «Diferenciación» dejan de ser dos bloques con el mismo mensaje. Se combinan en una sección de diagnóstico editorial: *visibilidad*, *intención* y *contacto* son tres estados legibles de una misma trayectoria. El texto explica dónde se pierde la oportunidad sin fingir cifras ni resultados de cliente.
- Los cuatro pilares dejan de ser cuatro tarjetas idénticas. Se presentan como un sistema conectado de técnica, arquitectura, contenido y medición, con relaciones y entregables concretos; el texto sigue siendo accesible y no depende de una ilustración para entenderse.
- El proceso se convierte en una secuencia vertical con ritmo, número y salida tangible por etapa. Puede conservar cinco pasos si representan trabajo real, pero se revisará su copy para no inventar una experiencia rígida o plazos garantizados.
- «Para quién» pasa a situaciones de partida reconocibles (sin visibilidad, con tráfico sin contactos, equipo que necesita apoyo) en filas editoriales, no otra cuadrícula de tarjetas. `/seo-para-pymes` mantiene su intención propia: no se convierte esta página en otra money page para pymes.
- El enlace «Ver SEO técnico y arquitectura» permanece: su destino devolvió HTTP 200 y canonical `www` en producción el 2026-10-11. Se conserva en contexto dentro de «Qué incluye» y se vuelve a verificar tras el cambio.
- El contacto directo del formulario debe ser legible sobre el fondo real de `/seo`; la variante clara se aplicará solo donde corresponda, sin degradar las páginas locales que comparten `SeoAuditForm`.

## Diseño de landing pages

- La ilustración actualmente enmarcada sale del hero. Se usa una nueva imagen editorial de una landing en contexto como fondo completo; la ilustración existente podrá reubicarse más abajo si ayuda a comprender la solución.
- Los tres mensajes bajo el hero se distribuyen en bloques donde ya tienen sentido: campañas/servicios/lanzamientos en «Para quién», copy/formularios/analítica en «Qué trabajamos» y estructura para reducir fricción en «Solución». No se crea otra banda de tarjetas redundantes.
- Se elimina por completo «Sin permanencia obligatoria. Respuesta en menos de 24h.»; no se reemplaza por otra promesa temporal no verificada.
- «El problema» se convierte en una anatomía explicativa de una landing que pierde contactos: oferta poco clara, dudas sin respuesta, petición de datos prematura y medición ausente. El esquema será ilustrativo y accesible, no un caso real inventado.
- «La solución» responde a esa anatomía con una composición de tres momentos: mensaje, acción y aprendizaje. Los seis conceptos actuales se agrupan sin perder cobertura, y «Qué trabajamos» se depura para no repetir exactamente los mismos puntos en otra cuadrícula.
- Se retira `PageLinksNav` también aquí por coherencia con Google Ads; el header y las migas permanecen. Las otras páginas que usan ese componente quedan fuera de este cambio.

## Implementación y límites

Se prefieren estilos por página o módulo para las nuevas composiciones. No tocar `app/globals.css` mientras otro trabajo activo modifica ese archivo; si una regla global impide el resultado, se coordinará antes de editarla. Los componentes compartidos solo cambiarán si la variación queda explícita y no altera otras rutas. Se mantendrán IDs de secciones y destinos de CTA; los enlaces internos se comprobarán contra rutas existentes.

No se presentarán métricas, promesas, oficinas, testimonios ni interfaces de Google inventadas. Las imágenes deben tener derechos de uso claros o generarse expresamente para estas páginas. Los ejemplos visuales no se harán pasar por resultados de clientes.

## Verificación de aceptación

1. En escritorio y móvil, cada hero muestra el servicio, el CTA y una pista del siguiente bloque; el texto es legible sobre toda la zona que puede quedar detrás de él.
2. No quedan las tarjetas ni las frases señaladas por el usuario. Problema y diferenciación pueden compartir una sección de diagnóstico; solución, proceso y público usan composiciones distintas y no repiten el mismo copy.
3. El teléfono y el correo de `/seo` tienen contraste suficiente y conservan enlaces `tel:` y `mailto:`; los formularios y su confirmación no cambian de comportamiento.
4. Los enlaces de SEO técnico, auditoría y servicios funcionan; metadatos, canonical, breadcrumbs, schema y sitemap mantienen sus rutas actuales.
5. Las imágenes cargan, no desbordan ni ocultan texto en `1440x900`, `390x844` y un ancho intermedio; se comprueba LCP visual, foco de teclado, movimiento reducido y ausencia de desplazamiento horizontal.
6. Pasan `npm.cmd test`, `npm.cmd run lint`, `npm.cmd run build` y E2E relevantes. La inspección visual del navegador es obligatoria; un test estático no basta para aprobar composición o contraste.
