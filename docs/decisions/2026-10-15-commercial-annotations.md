# Anotaciones comerciales: decisiones de diseño y copy

Fecha: 2026-10-15. Trabajo local sobre el plan aprobado de 45 anotaciones. Este documento recoge el criterio de los dos rediseños completos (21–23); el controlador incorpora la cobertura y verificación integrada.

## Objetivo y público

El hub `/agencia-marketing-digital` ayuda a un propietario de empresa a encontrar el servicio que responde a su necesidad. La acción principal es solicitar una auditoría gratuita. Los siete servicios existentes se agrupan por lo que la empresa necesita conseguir: que la encuentren, que entiendan su oferta y que el trabajo avance.

`/seo-para-pymes` responde a quien tiene una pequeña empresa y necesita decidir si invertir en SEO y por dónde empezar. Conserva su intención intermedia, con enlace al servicio SEO nacional. Explica situaciones y ejemplos del trabajo sin copiar la estructura de `/seo`.

## Composición

El hub abre con texto sobre blanco y una fotografía vertical. Después alterna tres necesidades, grupos de servicios con fotografía y enlaces, un método sobre teal, preguntas frecuentes y LeadForm a todo el ancho disponible. El catálogo tiene siete destinos existentes; no se han creado rutas.

Pymes utiliza un hero sobre teal muy claro con fotografía horizontal, tres situaciones reconocibles, ejemplos en una composición de cuatro módulos, una secuencia vertical de contratación y una sección de mercado local. Las ciudades están agrupadas dentro de esa explicación; los enlaces a Google Ads y diseño web aparecen en una decisión contextual, sin otra cuadrícula de servicios.

Ambas mantienen la navegación compartida y la auditoría móvil a `#audit-request`. La navegación de pymes cambia el enlace a la comparativa retirada por `SEO local`. En móvil, textos y fotos pasan a una secuencia vertical con botones amplios; cada página tiene su propio módulo CSS. Se declaran colores explícitos frente a las sobrescrituras globales de `landing-light`, incluido el rojo de errores del formulario.

Las imágenes locales fueron inspeccionadas visualmente antes de seleccionarlas. Las personas se describen como personas que revisan un proyecto, sin presentarlas como equipo o clientes reales. Las imágenes de interfaz y automatización se identifican como ilustraciones. Se usan Next Image, tamaños responsivos y contenedores de dimensiones estables.

## Mensaje y revisión editorial

Se aplicaron copywriting y copy-editing. El mensaje del hub es ayudar a que posibles clientes encuentren el negocio, entiendan su oferta y contacten. El mensaje de pymes es preparar la web para que quienes buscan el servicio puedan descubrirla y consultar.

La revisión recorrió claridad, voz, utilidad, prueba, concreción, identificación con la situación y fricción de la siguiente acción. Se sustituyeron cadenas de canales y términos abstractos por acciones. Se retiraron la comparación de informes frente a clientes, el panel de próximos 90 días y los plazos SEO genéricos sin respaldo. Los ejemplos de asesoría y reformas están presentados como ejemplos, sin métricas ni resultados atribuidos.

Los pasos distinguen la revisión inicial gratuita de la ejecución posterior a aceptar la propuesta. Las preguntas frecuentes resuelven alcance, presupuesto, web actual, participación del propietario y seguimiento. FAQ visible y schema se generan del mismo conjunto de preguntas y respuestas.

Alternativas editoriales consideradas: «Marketing digital para dar el siguiente paso» (menos literal para el hub) y «SEO para pequeñas empresas que quieren crecer» (menos concreta para pymes). Se eligieron H1 que nombran el servicio y una propuesta breve. El CTA mantiene la oferta conocida de auditoría gratuita; no introduce otro tipo de diagnóstico ni un compromiso de respuesta.

## Contratos preservados y comprobaciones

Se conservan rutas, canonicals autorreferentes, robots, destinos de servicio, fuentes de lead y servicios interesados. LeadForm mantiene `Agencia de marketing digital` / `Marketing digital`; SeoAuditForm mantiene `SEO para pymes` / `SEO para pymes`. La página pymes usa contacto sobre fondo claro. No se modifican formularios compartidos, API, consentimiento ni analítica.

El title del hub deja de repetir la marca, ya incluida por la plantilla del layout. Los tests E2E verifican un solo H1, canonical y robots, una sola marca en title, paridad FAQ/schema, destinos implementados, siete servicios del catálogo, ausencia de overflow a 320/390/768/1440, CTA bajo el header y atribución del formulario con email vacío. La API se intercepta: estas pruebas no acreditan escritura real en Firebase ni conversiones en proveedores.

Las capturas locales de revisión se generan en `output/playwright/review/marketing-digital-desktop.png`, `marketing-digital-mobile.png`, `seo-pymes-desktop.png` y `seo-pymes-mobile.png`. El controlador es responsable de build y validación integrada de producción local.
