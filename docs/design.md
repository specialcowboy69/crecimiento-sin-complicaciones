# Directrices de diseño e identidad

Guía de referencia para mantener coherente la web de **Crecimiento sin complicaciones** y sus landings. Este documento debe consultarse antes de tocar páginas, formularios, navegación, CTAs o estilos globales.

## Esencia de marca

La marca debe sentirse clara, directa y experta. El objetivo visual no es parecer una agencia creativa genérica, sino una agencia de crecimiento que simplifica decisiones complejas: SEO, paid media, CRO, analítica, automatización e IA.

Principios:

- Claridad antes que decoración.
- Confianza antes que espectáculo.
- Sensación operativa, medible y comercial.
- Lenguaje sencillo, con foco en resultados.
- Diseño limpio, pero no vacío.

## Paleta

La home marca la dirección visual del proyecto: fondo claro, mucho aire, azul como color de acción y verde/teal como acento de crecimiento y confianza.

Colores base actuales:

- Azul principal: `#2563eb`
- Azul hover/profundidad: `#1d4ed8`
- Verde acento: `#0f766e`
- Texto principal: tonos navy/slate oscuros.
- Fondos: blancos, grises muy claros y degradados suaves.
- Bordes: grises azulados suaves.

Uso recomendado:

- Azul para CTAs principales, barras, estados activos y elementos de conversión.
- Verde/teal para etiquetas, métricas positivas, acentos de storytelling y señales de crecimiento.
- Fondos claros para la mayoría de secciones.
- Degradados azul-verde solo en elementos de datos o énfasis, no como recurso decorativo excesivo.

Evitar:

- Landings demasiado oscuras si rompen con la home.
- Paletas monocromáticas dominadas solo por azul.
- Morados, arenas, marrones o fondos excesivamente corporativos sin relación con la identidad actual.
- Decoración abstracta sin función.

## Tipografía y jerarquía

La home usa titulares grandes, aireados y directos. Esa escala funciona bien en el hero, pero no debe trasladarse a todos los componentes.

Reglas:

- H1 grande solo en heroes principales.
- En cards, formularios, tablas y navegación, usar tamaños contenidos y muy legibles.
- No usar letter-spacing negativo.
- Los textos de botones deben caber siempre en móvil.
- Los subtítulos deben explicar el valor, no repetir el titular.

Piloto de legibilidad en `/seo/local`: los textos explicativos de la página usan 16 px como mínimo, interlineado cercano a 1,7 y tonos slate oscuros sobre superficies claras. Sus introducciones de 18 px, titulares, etiquetas y controles conservan la escala existente. Los ajustes viven en el módulo CSS de esa página para no alterar otras landings.

El tono debe ser profesional, cercano y concreto. Mejor "atraen tráfico cualificado y convierten visitas en conversaciones comerciales" que frases vagas como "llevamos tu negocio al siguiente nivel".

## Navegación

El header debe equilibrar claridad y densidad. No debe parecer vacío, pero tampoco saturado.

Estructura actual recomendada:

- Logo a la izquierda.
- Enlaces directos centrales:
  - `Servicios`
  - `Casos de éxito`
  - `Precios`
- Acción secundaria a la derecha:
  - `Más servicios`, con desplegable hacia landings específicas.

Reglas:

- No incluir `Auditoría gratuita` en el header de la home.
- La home usa `Auditoría gratuita` como oferta de conversión en hero/secciones/formulario, pero no como CTA visible en el header.
- En móvil, el header de la home debe quedarse en logo + desplegable de servicios cuando los enlaces directos no quepan con comodidad.
- El CTA principal debe vivir en el hero y en secciones de conversión.
- Los enlaces centrales deben tener peso visual suficiente.
- En móvil, priorizar claridad y evitar que el header ocupe demasiado alto.

En landings de servicio:

- Mantener `Auditoría gratuita` visible en el header.
- Usar `Más servicios` como desplegable secundario antes del CTA.
- Evitar una segunda barra de navegación encima del hero salvo que sea imprescindible.
- Los enlaces internos de la landing deben quedarse en el header principal cuando haya espacio.

## CTAs y oferta

Nombre oficial de la oferta:

**Auditoría gratuita**

Usar siempre esta forma en páginas comerciales, con tilde y sin variantes como:

- Auditoria gratis
- Auditoría gratis
- Diagnóstico gratuito

La home también usa `Auditoría gratuita`; mantener el CTA fuera del header y ubicarlo en hero, diagnóstico/sección de proceso y formulario.

CTAs recomendados:

- `Solicitar auditoría gratuita`
- `Quiero mi auditoría gratuita`
- `Ver casos de éxito`
- `Ver precios`

Reglas:

- Un CTA principal por bloque.
- Azul para CTA primario.
- Botones secundarios con fondo blanco, borde suave y texto oscuro.
- No esconder el CTA principal solo en el header.

## Landings

Las landings deben parecer parte de la misma familia visual que la home. Pueden tener personalidad propia, pero no deben sentirse como microsites desconectados.

Reglas:

- Usar la capa visual clara `landing-light` cuando una landing venga de un diseño oscuro.
- Mantener fondos claros, cards blancas y bordes suaves.
- Reutilizar azul principal y verde acento.
- Mantener el logo y la navegación alineados con la home.
- Evitar bloques demasiado densos en móvil.
- Mostrar pronto solo pruebas, reseñas o resultados que estén respaldados y puedan atribuirse con precisión.

Cada landing debe responder rápido a:

- Qué se ofrece.
- Para quién es.
- Qué resultado promete.
- Por qué confiar.
- Qué hacer después.

## Fotografía y composición editorial

La fotografía debe mostrar el servicio, el contexto de trabajo o el mercado al que se dirige la página. No debe funcionar como relleno atmosférico.

Patrones aprobados:

- Hero de ancho completo con fotografía editorial, overlay suficiente y copy legible sobre la imagen.
- Composiciones de imagen y texto que alternen el ritmo de la página.
- Imágenes de fondo en paneles de servicio cuando ayuden a reconocer el tema antes de leer.
- Piezas visuales distintas para explicar problema, método, alcance y prueba; no repetir la misma cuadrícula de cards en todas las secciones.
- Figcaption breve cuando la imagen necesite contexto comercial o geográfico.

Evitar:

- Gráficos, dashboards o métricas ficticias que puedan interpretarse como resultados reales.
- Collages decorativos, blobs y fondos abstractos sin función.
- Texto incrustado en la propia imagen cuando pueda mantenerse como HTML accesible.
- Recortes que oculten el producto, la persona o el lugar que la imagen pretende mostrar.

Las imágenes principales deben declarar dimensiones o una relación de aspecto estable, usar `next/image` y conservar un encuadre útil en escritorio y móvil.

## Formularios

Los formularios deben reducir fricción. Pedir solo lo necesario para iniciar una conversación comercial.

Campos recomendados:

- Nombre
- Email
- Empresa
- Web o redes, cuando aplique
- Mensaje/contexto

No incluir:

- `Inversión mensual estimada`

Reglas:

- El formulario debe usar `Auditoría gratuita` como `formType` cuando corresponda.
- Labels claros y con acentos correctos.
- Errores visibles y fáciles de entender.
- En móvil, campos a una columna.
- No pedir información sensible o prematura.

## Cards y componentes

El estilo general debe ser funcional, escaneable y limpio.

Reglas:

- Cards con radio moderado, alrededor de `8px`.
- Bordes suaves y sombras discretas.
- No meter cards dentro de cards salvo que sea imprescindible.
- Métricas grandes y claras cuando procedan de datos respaldados.
- Iconos solo cuando ayuden a reconocer una acción o categoría.
- Evitar secciones que parezcan landing genérica de SaaS si la página necesita información operativa.
- Mantener suficiente padding alrededor de títulos, descripciones y pies de tarjeta; ningún texto debe quedar pegado al borde.
- Las tarjetas con imagen de fondo necesitan overlay, contraste comprobado y un área de texto estable.
- Reservar las cards para servicios, casos, controles o elementos repetidos; una sección completa no debe parecer una tarjeta flotante.
- Las tablas y comparativas deben nombrar sus columnas. No usar líneas de color u otros acentos si su función no es evidente.

## Mobile

La versión móvil no debe ser una copia comprimida de escritorio. Debe sentirse diseñada para lectura vertical.

Reglas:

- Botones de ancho completo cuando mejore el tap.
- Textos largos divididos en líneas naturales.
- Evitar navegación horizontal apretada.
- No superponer texto sobre cards o gráficos.
- Priorizar hero, CTA y prueba rápida.
- Revisar siempre que botones y chips no se salgan del contenedor.
- En carruseles horizontales, conservar el scroll vertical nativo de la página al deslizar desde una card. El carrusel de casos usa `overflow-x: auto` y `scroll-snap-type: x mandatory` sin sobrescribir `touch-action`; evitar `touch-action: none`, valores solo horizontales como `pan-x` y `preventDefault()` en gestos táctiles salvo necesidad justificada.
- Comprobar en un móvil real que un gesto vertical iniciado sobre una card desplaza la página, que el gesto horizontal cambia de caso y que funcionan los botones. `node --test tests/mobile-scroll.test.mjs` (incluido en `npm test`) es una protección estática, no una prueba de interacción táctil en navegador o dispositivo.

## Copy y acentos

Todo el copy visible debe estar en español correcto.

Estructura recomendada para el copy comercial:

1. Nombrar el servicio, categoría o mercado de forma literal.
2. Exponer un problema reconocible sin dramatización genérica.
3. Explicar el mecanismo de trabajo con acciones concretas.
4. Describir un resultado observable sin prometer cifras no verificadas.
5. Cerrar con un CTA coherente con el siguiente paso real.

El H1 debe poseer la intención principal de la ruta. Los subtítulos desarrollan la propuesta y no deben competir con el título mediante etiquetas, claims o eslóganes redundantes.

Evitar:

- Frases intercambiables entre agencias como `llevamos tu negocio al siguiente nivel`.
- Cadenas de sustantivos abstractos sin explicar qué se hace.
- Procesos artificialmente divididos en pasos cuando la experiencia real es más sencilla.
- Métricas, plazos, precios, oficinas o resultados que no estén respaldados.
- Notas defensivas en el copy visible cuando corresponden a un guardrail interno.

Palabras y formas preferidas:

- `Auditoría gratuita`
- `Casos de éxito`
- `Diseño web`
- `Gestión de redes sociales`
- `IA empresas`
- `tráfico cualificado`
- `conversión`

Evitar inconsistencias de acentos:

- auditoria -> auditoría
- trafico -> tráfico
- gestion -> gestión
- conversion -> conversión
- proximos -> próximos
- diagnostico -> diagnóstico

## Antes de cerrar un cambio visual

Checklist mínimo:

- La home y las landings siguen pareciendo la misma marca.
- El hero muestra con claridad el servicio o contexto real y mantiene contraste suficiente.
- El header no está saturado ni vacío.
- El CTA principal sigue siendo claro.
- No hay variantes incorrectas de `Auditoría gratuita`.
- Los formularios no piden inversión mensual estimada.
- Las tablas tienen encabezados comprensibles y las cards conservan padding suficiente.
- No se presentan gráficos o métricas ficticias como prueba comercial.
- Mobile no tiene botones, chips o textos desbordados.
- El scroll vertical sigue funcionando sobre los carruseles móviles y sus gestos horizontales y controles responden.
- Se revisan como mínimo los breakpoints de `1440x900` y `390x844` cuando cambia la composición visual.
- `npm run lint` y `npm run build` pasan si se ha tocado código.
