# Revisión de las 19 anotaciones comerciales

Fecha: 2026-10-15. Base: `3139301` (PR #27, ya integrada en main).
Implementación local en la rama `codex/commercial-refinements`, worktree `commercial-refinements/pagina-agencia`.

## Alcance completado

| Anotación | Resultado |
| --- | --- |
| 1 | Hero de marketing con fotografía de fondo, copy HTML y sin cartela decorativa. La regla de no añadir texto a imágenes queda en `docs/design.md`. |
| 2 | Hero de SEO para pymes con fotografía de fondo, sin cartela. También retirada la frase superpuesta a la fotografía de ejemplos para aplicar la misma regla. |
| 3 | Retirado el párrafo secundario bajo el CTA de pymes. |
| 4 | Retirado el enlace redundante a agencia SEO del método de pymes. |
| 5 | Añadida la explicación de que se trabaja también con ciudades que no aparecen en la lista. |
| 6 | Texto explicativo sobre verde con color explícito claro, 18 px e interlineado 1,75. |
| 7 | Retirado el selector de objetivos de `SeoAuditForm`; `interestedService` conserva `defaultService`. Revisados los seis formularios activos: todos permiten compartir web/perfil o identificar el negocio en su campo contextual, sin duplicar campos. |
| 8 | Hero de Ads sin altura mínima ni alineación al pie que producían el hueco superior; margen directo de 24 px bajo el header en móvil. |
| 9 | Cuatro paneles sin numeración, en dos columnas en escritorio y una en móvil, con superficies claras y azules. |
| 10 | Añadida la cobertura de otras ciudades al bloque de Google Ads local. |
| 11 | Retirado el enlace nacional del hero de Alicante; conservado en servicios relacionados. |
| 12 | Imagen de demanda de Alicante importada estáticamente, con placeholder y tamaños ajustados al espacio real. Comprobada su carga y decodificación en móvil y escritorio. |
| 13 | Reducidas separaciones en demanda, servicio, cobertura y método de Alicante, especialmente en móvil. |
| 14 | Método de Alicante agrupado en Preparación, Puesta en marcha y Mejora continua; las cinco actividades originales siguen explicadas. |
| 15 | FAQ sustituida por una pregunta útil sobre segmentación por zonas. FAQ visible y JSON-LD siguen compartiendo la misma fuente. |
| 16 | `LeadForm` ofrece «Sitio web o nombre de la empresa», válido para nombre o web en Alicante y todas sus páginas consumidoras. |
| 17 | Reducido el espacio superior del hero de Landing Pages. |
| 18 | Autor de reseña más compacto, empresa a 16 px y datos a 14 px; retirada la sombra heredada. Testimonios y controles conservados. |
| 19 | Servicios relacionados de SEO local incluyen SEO, web, landing pages, Google Ads y automatizaciones con IA, con sus rutas existentes. |

## Imagen de Alicante

El fallo de la captura no se reprodujo en la versión base al revisar `currentSrc`: las variantes móvil y escritorio cargaron y se decodificaron. No se atribuye una causa sin evidencia. La nueva importación hace que un archivo ausente falle durante la compilación; los `sizes` ya no solicitan 125vw en móvil. Una prueba de navegador verifica `naturalWidth`, `complete`, HTTP 200 y tipo de contenido de la variante realmente elegida.

## Verificación

- Instalación con el lockfile propio (`npm ci`).
- Lint sin errores ni avisos; compilación webpack con 38 páginas generadas.
- 153 pruebas de código aprobadas.
- 45 pruebas de navegador aprobadas: formularios, errores y confirmaciones, atribución, móvil/escritorio, imágenes, enlaces y navegación.
- Envíos de formulario interceptados localmente; no se han creado leads de prueba en el proveedor.
- Revisión visual en 390×844 y 1440×900. Comprobaciones de desbordamiento también a 320 y 768 px en las suites existentes.
- Servidor de revisión separado: `http://127.0.0.1:3003`.
- Chatbot conservado: misma rama, HEAD, estado y hashes de los cinco archivos modificados, comprobados antes y después. Registros de verificación en `output/review/` (ignorados por Git).

La revisión quedó inicialmente disponible en local. El 2026-10-19 el usuario autorizó commit, PR y merge de estos cambios de diseño, conservando aparte el trabajo del chatbot.

## Dos anotaciones adicionales: tarjetas de SEO local y nacional

Aplicadas en el mismo worktree después de aprobar la propuesta visual:

- SEO local: tres tarjetas en escritorio con fondos azul claro y verde suave, número e icono en la cabecera; títulos de 26 px y texto de 18 px. En móvil se apilan con títulos de 24 px y altura natural.
- SEO nacional: superficies blanca y azul clara en las primeras preguntas; la última usa azul corporativo con texto blanco. Bordes suaves, sombra discreta y mayor espacio interior.
- Se conservan los textos. Estilos limitados a los módulos CSS de ambas páginas.
- Verificación de esta ampliación: lint y build webpack correctos; 3 pruebas existentes de navegador aprobadas; inspección visual en 1440×900 y 390×844, sin desbordamientos. Contraste del texto blanco sobre azul: 5,17:1.
- El servidor actualizado permanece en http://127.0.0.1:3003. La comparación de HEAD, estado y hashes del chatbot confirma que sigue intacto.

## 2026-10-19: continuidad visual del proceso SEO en móvil

El ajuste queda dentro de `@media (max-width: 767px)` en `app/seo/seo.module.css`. La sección usa un fondo claro, sus cinco tarjetas son blancas, los números e iconos son verdes y los entregables tienen una superficie verde suave. Se elimina la altura mínima de 18 rem y el margen automático anterior al entregable para que cada tarjeta siga la altura de su contenido. La composición y los colores de escritorio se mantienen.

Verificación: lint y build webpack correctos; 3 pruebas de navegador aprobadas (contraste, adaptación y recortes a 320/390/768/1440 px según cada prueba). Revisión visual en 390×844 y comparación de geometría y colores de 90 elementos del proceso en 1440×900 sin diferencias. Chatbot con HEAD, estado y hashes idénticos antes y después. Servidor actualizado en http://127.0.0.1:3003/seo#proceso.
