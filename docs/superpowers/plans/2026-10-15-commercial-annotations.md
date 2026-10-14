# Implementación de las 45 anotaciones comerciales

Fecha: 2026-10-15. Repositorio: pagina-agencia. Worktree: C:/Users/USUARIO/.codex/worktrees/commercial-annotations/pagina-agencia. Base: 8e1592b. Rama: codex/commercial-annotations.

## Especificación y límites

La especificación es el conjunto de 45 anotaciones del usuario y el enfoque aprobado en esta conversación. Entrega local con servidor; no publicar, push ni merge. Todo el trabajo se hace en este worktree nuevo. Preservar rutas, canonicals, intención SEO, sourcePage, sourcePath, formType, interestedService y el contrato de consentimiento/conversiones. No inventar resultados, testimonios, oficinas, precios ni plazos. Copy claro con una idea por frase; evitar enumeraciones de sustantivos como sustituto de una explicación. Mantener navegación móvil con servicios y auditoría a #audit-request. Usar imágenes locales existentes y Next Image. Cambios visuales adaptados a móvil y escritorio; comprobar colores renderizados frente a landing-light. Las skills no autorizan publicar. No spawn de subagentes por parte de implementadores o revisores.

## Task 1: Formularios públicos y contacto (43, 44, 45)

Lee AGENTS.md, docs/forms-and-leads.md, docs/design.md y la documentación local Next relevante antes de modificar. Trabaja solo en el worktree indicado arriba. Eres el único implementador activo; el controlador prepara documentación y QA, sin editar tus archivos.

- Actualizar TODOS los formularios públicos activos: LeadForm, LocalSeoAuditForm, SeoAuditForm, WebProjectForm, SocialMediaForm, AiDiagnosticForm. Verificar usos reales para que todas las páginas reciban el cambio. El calculador legacy no enrutado no es objetivo.
- Anotación 43: nombre según contrato actual, campo Móvil* obligatorio, Email (opcional) separado; validar email solo si se informa. Eliminar localidad de LocalSeoAuditForm y su payload/mensaje. Teclado tel, autocomplete tel, errores accesibles y valores preservados ante fallo. Normalizar separadores habituales, aceptar prefijo internacional; no aceptar letras/número incompleto. No usar una validación solo de longitud arbitraria.
- Conservar Firebase Data Connect existente. Se puede añadir phone/email al payload HTTP y validarlos en servidor para componer el campo persistido contact, sin migración de BD. Compatibilidad con contact antiguo para pestañas antiguas y registros previos; cuando se envían phone/email la ruta debe validar móvil obligatorio/email opcional, nunca degradar a legacy por un valor inválido. Contacto guardado identificable y sin perder email opcional. Centralizar validación/formato necesarios sin refactor masivo.
- Mantener sourcePage/sourcePath/formType/interestedService. Mantener eventos tras éxito real de API, sin datos personales ni duplicaciones ni alteración de consentimiento. No cambiar exportador Ads ni el alcance de eventos.
- Corregir confirmaciones que prometen responder por email cuando este es opcional.
- Anotación 44: quitar texto de ayuda de web/perfil en LocalSeoAuditForm y referencia aria-describedby a ayuda eliminada; enlace sigue opcional.
- Anotación 45: corregir variante oscura usada en contacto directo de SEO local sobre fondo claro, comprobar ancho del email en móvil. No cambiar teléfono/email públicos. Preservar FormPrivacyNotice estándar; el texto repetido de la anotación 42 lo quita Task 2.
- Archivos permitidos: componentes Form nombrados, helpers mínimos nuevos, submitLead types si necesario, app/api/leads/route.ts, ContactOptions/CSS muy localizado solo si necesario, docs/forms-and-leads.md, tests de formularios/API y fixtures E2E dependientes. No editar páginas de servicio ni CSS de las páginas.
- Leer pruebas existentes y adaptar expectativas obsoletas sin borrar protección válida. Añadir tests de comportamiento para móvil vacío/inválido, email vacío/válido/inválido, serialización contacto, fallo API y conservación del origen cuando corresponda. No tests espejo de JSX para cada etiqueta. Ejecutar tests relevantes y lint. Dejar build/E2E globales para el controlador.
- Commit local solo de archivos propios. Reporte completo en el report file indicado por el controlador, con pruebas/comandos, archivos y estado. No subagentes.

## Task 2: Correcciones de cuatro páginas (1–20, 24–42)

Leer AGENTS.md, .agents/product-marketing.md, .agents/seo-context.md, .agents/seo-technical-principles.md, docs/design.md, docs/navigation.md, docs/site-architecture.md y guía Next local relevante. Aplicar skill copywriting C:/Users/USUARIO/.codex/skills/copywriting/SKILL.md. Trabajar solo en este worktree. No modificar formularios compartidos (Task 1), ni páginas de Task 3.

Google Ads nacional:
1. Cambiar a «Sin una configuración adecuada de los eventos de conversión, falta información para decidir dónde invertir.»
2. Sustituir «una oferta genérica» por «otra cosa», ajustando gramática.
3. Explicar con sencillez que el anuncio y página ayudan al visitante a contactar y que se revisan consultas para decidir inversión. Ejemplo aprobado: «Preparamos los anuncios y la página para que quien busca tu servicio pueda contactar contigo. Después revisamos qué campañas generan consultas para decidir dónde invertir.»
4. Corregir legibilidad visual de «Keywords comerciales…» (contraste renderizado/tamaño/interlineado). Simplificar a «Mostramos tus anuncios a quienes buscan los servicios que ofreces.»
5. Reformular «Conversiones comprobadas…» como «Revisamos qué búsquedas generan consultas y si esas consultas encajan con tu negocio para mejorar las campañas.»

Google Ads Alicante:
6. Borrar párrafo «Priorizamos búsquedas con intención comercial…» del hero.
7. Quitar PageLinksNav de esta página (barra secundaria escritorio), preservando header/dropdown/CTA.
8. Borrar caption «Campañas conectadas con búsqueda…».
9. Imagen existente de hero como fondo ancho completo con texto HTML encima, overlay legible y encuadre móvil; ya no figura aislada apilada antes/después. Mantener heading/CTA visible y estable, Next Image.
10. Borrar «Una búsqueda informativa no vale lo mismo que una solicitud de presupuesto. Antes de ampliar tráfico,» y reparar frase restante.
11. Borrar explicación SEM/Google Ads/Meta Ads que distrae.
12. Reescribir «Separamos intención comercial…» explicando seleccionar búsquedas de posibles clientes y excluir ajenas al servicio.
13. «La persona que hace clic debe encontrar en la página lo que le ha interesado del anuncio.»
14. Sustituir nota defensiva «Son escenarios…» por explicación sencilla: «Así adaptamos las campañas a lo que busca el cliente en cada sector.» Mantener títulos que identifiquen ejemplos, no clientes/resultados.
15. Sector inmobiliario: explicar que quien compra y quien vende necesita anuncios distintos; evitar enumeración.
16. Sector salud: explicar cómo el anuncio ayuda a reconocer que el centro trata lo que necesita la persona, sin enumerar confianza/especialidad/proximidad.
17. Reformas/servicios: explicar distinguir una urgencia de una obra planificada y orientar consultas atendibles, sin lista de atributos.
18. Formación: explicar mostrar curso a quien puede matricularse y necesita saber si encaja, sin lista modalidad/calendario/nivel/ubicación.
19. B2B: explicar mostrar cómo resuelve un problema concreto de la empresa, sin solución/sector/rol/ciclo.
20. Borrar caption «Alicante ciudad y provincia como mercado de captación».

Landing pages:
24. Borrar «medibles» del hero y ajustar puntuación.
25. Corregir legibilidad visual de «Sin medición, las mejoras se deciden por intuición».
26. Sustituir «señales para mejorar con criterio» por explicación concreta de saber qué cambiar para recibir consultas; reparar frase completa, evitando enumeración.
27. «Comprobamos qué visitas terminan en una consulta para detectar dónde puede mejorar la página.»
28. Título «¿Para quién es?».
29. Sustituir obviedad responsive/carga por «Un diseño que ayuda a entender tu oferta y facilita el contacto.»
30. Sustituir enumeración campos/validación/confirmación por «Un formulario sencillo para que el visitante pueda pedir información.»

SEO local:
31. H1 «Agencia de SEO local para negocios» algo mayor, responsive sin overflow ni romper hero.
32. Usar «aparecen antes que tú en Maps o Google».
33. Quitar iconos en bloque de seis servicios y usar solo blanco y azul de marca para superficies. Color por tarjeta en orden de lectura, adecuado cuando se apilan en móvil; buen contraste. Números pueden mantenerse. Evitar checkerboard que dependa de coordenadas de desktop.
34. Borrar caption «Visibilidad local observada por servicio y zona».
35. Dar color al bloque Relevancia/Distancia/Prominencia usando blanco y azul con contraste explícito y buena composición móvil.
36. «Sitio público» -> «Página web».
37. «del sitio público» -> «de la web» en el bloque señalado; limpiar usos visibles equivalentes en la página.
38. Explicar medir si el negocio aparece mejor en Google y recibe más consultas, sin jerga abstracta.
39. Hablar de gestión continua: «Seguimos trabajando en tu posicionamiento y ajustamos las acciones según evolucione tu negocio.» Eliminar promesa de frecuencia definida por escrito.
40. Quitar bloque obvio «Tu negocio sigue bajo tu control…» y ajustar disposición restante.
41. Borrar párrafo largo que empieza «Cuéntanos qué negocio tienes…» junto al formulario.
42. Borrar texto/elemento repetido «Usaremos estos datos…» junto al formulario; conservar aviso estándar dentro del formulario.

Archivos: cuatro page.tsx y sus módulos CSS, docs/navigation.md y docs/design.md donde proceda, tests existentes afectados por contrato/copy. No global CSS salvo necesidad concreta documentada. No modificar rutas, canonicals, sourcePage, sourcePath, formType, interesados, metadatos ajenos. FAQs visibles/schema siempre coherentes. Ejecutar lint/pruebas de alcance relevantes y commit local. No build en paralelo con servidor o con controlador. Reporte por anotación y evidencia. No subagentes.

## Task 3: Dos rediseños completos con copywriting (21, 22, 23)

Worktree indicado; leer AGENTS y documentos de producto/SEO/diseño/navegación/arquitectura, guías locales de Next. Aplicar C:/Users/USUARIO/.codex/skills/copywriting/SKILL.md y copy-editing/SKILL.md. Revisión editorial documentada breve con objetivo, público, mensaje y decisiones; no relleno burocrático ni claims inventados.

21. Rediseñar toda /agencia-marketing-digital, no solo hero. Mantener función de hub comercial con enlaces a servicios existentes. Presentar servicio/marca de forma literal, ayudar a encontrar servicio según necesidad, explicar cómo empezamos y auditoría gratuita. Sustituir enumeraciones de canales en cada párrafo y términos abstractos repetidos. Escribir lenguaje de propietario de empresa, claro y concreto. Dar ritmo con fotografía existente, composiciones con aire, bloques de servicio variados; evitar otra página de cuadrícula repetitiva de iconos. Familias visuales actuales: azul #2563eb acción, teal #0f766e acento, blanco/fondos claros, navy textos. No agregar metricas o casos sin evidencia. Preservar navegación móvil y auditoría local. Reutilizar LeadForm con origen «Agencia de marketing digital».
22. Borrar continuación «: revisamos la parte técnica, ordenamos tus páginas, elegimos keywords con intención comercial y priorizamos acciones que puedan traer contactos reales.» del hero SEO pymes. Se puede reescribir el hero entero conforme #23, no reintroducir enumeración.
23. Rediseñar toda /seo-para-pymes con copywriting, contenido centrado en decisiones y necesidades reales de pequeña empresa, y función intermedia del cluster (no clonar /seo). Quitar comparación de paja de informes vs clientes y mejorar claridad. H1 literal con SEO para pymes; propuesta corta, situaciones donde ayuda, ejemplos comprensibles del trabajo, cómo empieza el servicio, preguntas frecuentes útiles y auditoría. Mantener enlaces relevantes existentes al cluster/ciudades con contexto, sin listas invasivas. Reutilizar SeoAuditForm con sourcePage «SEO para pymes». Colores marca y hero fotográfico existente si útil. Composición móvil específica, no desktop comprimido.

Ambas: páginas Server salvo interacción existente; Image para fotos, títulos y CTA HTML; una H1; FAQ JSON-LD exactamente acorde a FAQs visibles; mantener canonical/robots/rutas/intenciones; metadatos se pueden pulir al copy sin alterar host. No cambiar formularios/components compartidos ni las cuatro páginas Task 2. Crear módulos CSS por página; no nuevos frameworks/dependencias. Documentar criterios de copy/rediseño en docs/decisions/2026-10-15-commercial-annotations.md (controlador completará matriz). Pruebas de SEO existentes que dependen de copy deben actualizarse solo si requisito legítimamente cambiado. Ejecutar lint/pruebas enfocadas; commit local. No subagentes. No build ni servidor: controlador hace validación integrada y arranque.

## Verificación integrada del controlador

Revisión de tarea por diff y revisión final. npm run lint, npm test, npm run build (webpack si necesario por estabilidad). Servidor de producción local del nuevo worktree en puerto libre. QA navegador en las seis páginas a 390px y 1440px, encabezados/formularios también 320px cuando cambie ancho. Verificar 45 puntos, ausencia de overflow, colores/contraste, enlaces/cabeceras/CTA, hero fondo Alicante. Formularios: móvil obligatorio, email opcional y válido si presente, API failure/success con mocks sin enviar leads ficticios a producción, conversión una vez tras éxito con consentimiento. No afirmar escritura real a Firebase ni cuenta Ads/GA4 verificada mediante tests locales. Entregar URLs y servidor persistente local. No publicar.
