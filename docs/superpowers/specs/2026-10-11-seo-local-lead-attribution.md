# Diseño: procedencia de leads y conversiones cualificadas de SEO local

**Estado:** propuesta para revisión, 2026-10-11. Este documento define dos entregas; no autoriza publicar ni activar una nueva conversión en Google Ads.

## Objetivo y alcance

Relacionar futuros formularios de /seo/local con un identificador de clic de Google Ads cuando exista consentimiento para medición publicitaria. Cuando una persona del equipo marque manualmente una solicitud como cualificada, comunicar ese hito a una acción de conversión offline distinta de la actual conversión de envío de formulario. El panel debe mostrar si la atribución es posible y si el hito se ha enviado.

La entrega A termina al guardar procedencia y consentimiento en el lead. Es útil por sí sola para la revisión interna. La entrega B añade la calificación y el envío automático. La B depende de la A y de acceso real a la cuenta de Google Ads.

No se importan formularios anteriores a la captura, no se infiere origen desde sourcePage, no se crea una lista Customer Match y no se suben nombre, correo, teléfono, empresa o mensaje a GA4, Vercel Analytics ni Data Manager. Google Ads decide si un identificador corresponde a un clic atribuible. Una lista de clientes y una conversión offline son usos distintos.

## Contrato existente que se conserva

- /seo/local envía lead_seo_local_submitted a GA4 únicamente tras guardar el formulario y cuando están concedidos analítica y publicidad/medición. Esa acción importada sigue siendo la señal principal de envío de formulario durante la validación.
- CookieConsent controla la carga de GA4; /admin no se mide. ad_personalization sigue denegado. No se activa remarketing.
- El formulario se guarda aunque falle la medición. sourcePage y sourcePath conservan su significado actual.
- El panel usa Firebase Data Connect. Las modificaciones de esquema deben ser aditivas y compatibles con leads antiguos.

## Entrega A: procedencia verificable

1. Solo con analítica y publicidad/medición concedidas, leer gclid, gbraid o wbraid de la URL de una página pública. Si hay varios, priorizar gclid, luego gbraid y luego wbraid. Conservar el valor exacto y el tipo, sin convertir mayúsculas ni interpretar el ID como nombre de campaña.
2. Mantener el identificador en sessionStorage para la navegación de la pestaña. Una visita nueva con ID válido reemplaza el anterior. Rechazo o revocación elimina el valor. No persistir ni enviar un ID cuando falta consentimiento; en /admin no se captura.
3. Al iniciar un envío desde /seo/local, asociar al payload el ID vigente y la elección de medición. El servidor vuelve a leer el cookie_consent y exige que sourcePath y el Referer de la petición señalen /seo/local en el mismo origen; si falta alguna condición, descarta el ID y guarda el formulario normalmente. La cookie y el Referer son señales del navegador, no pruebas inviolables de identidad.
4. Añadir campos opcionales al lead para tipo e identificador de clic y consentimiento de medición en el momento del envío desde /seo/local. Los leads antiguos y los de otras rutas quedan con valor desconocido, nunca se marcan retrospectivamente como consentidos. createdAt sigue siendo la hora del servidor.
5. El panel muestra una indicación de procedencia y consentimiento, sin exponer el identificador completo en la interfaz ni en registros. Un identificador guardado es evidencia de que la URL contenía un parámetro publicitario; no confirma atribución por Google Ads.

## Entrega B: lead cualificado

1. Añadir el estado manual qualified con una fecha qualifiedAt que no se reescribe al volver a guardar el mismo estado. La persona que opera el panel decide si el lead merece ese estado; closed conserva su significado actual.
2. Crear en Ads una acción separada de tipo cliente potencial cualificado, inicialmente secundaria. El envío de formulario de GA4 y la calificación son hitos diferentes. No cambiar la acción principal ni el objetivo de puja durante la validación.
3. Enviar solo leads de /seo/local con qualifiedAt, consentimiento publicitario registrado, identificador válido y sin exclusión de exportación. Usar el identificador de clic, qualifiedAt como hora del hito y un transactionId estable derivado del UUID del lead. No incluir datos personales del formulario. Enviar adUserData concedido y adPersonalization denegado, conforme a las preferencias registradas.
4. Un trabajo diario autenticado selecciona pendientes y usa Data Manager API. Guardar el estado de cada intento, marcar como enviado solo cuando Google acepte la ingesta y reintentar fallos transitorios con el mismo transactionId. Los rechazos permanentes quedan visibles para revisión y no se reintentan indefinidamente. El panel permite excluir un lead pendiente por una solicitud de privacidad; la eliminación de un lead también impide futuros envíos.
5. La aceptación técnica de la API no prueba atribución. Comprobar diagnósticos de datos offline y la acción secundaria en Google Ads antes de decidir cualquier cambio de puja. El volumen escaso limita el efecto de aprendizaje.

## Privacidad y publicación

- Antes de la entrega A pública, revisar y actualizar el texto de Publicidad y medición, la política de cookies, la política de privacidad y docs/analytics-and-consent.md para describir el ID de clic asociado al formulario y el posible hito offline. La redacción debe ser revisada por quien lleva privacidad/legal antes del despliegue.
- El control de cookies debe dejar de recoger nuevos IDs y limpiar sessionStorage al revocar. La revocación posterior al envío y la oposición a una exportación pendiente requieren un procedimiento visible y una exclusión operativa en el panel; el texto público no debe prometer una retirada automática de eventos ya enviados. La revisión de privacidad debe decidir expresamente si un cambio posterior de preferencias en este navegador requiere un mecanismo adicional para bloquear automáticamente el lead pendiente antes de publicar la entrega B.
- No publicar credenciales, IDs de cuenta ni IDs de conversión en el repositorio. Las credenciales de Data Manager y CRON_SECRET viven en variables protegidas de producción.
- Desplegar primero el esquema compatible de Firebase Data Connect, después la aplicación. Mantener apagado el envío real hasta verificar consentimiento, acceso a Ads, pruebas con validateOnly y acción secundaria.

## Criterios de aceptación

- Con consentimiento concedido, un clic de prueba seguido de un formulario nuevo guarda un ID y su tipo; sin consentimiento, no guarda ninguno.
- Rechazo, revocación, valores malformados, /admin, formularios de otras rutas y fallos de API no producen un ID atribuible ni una conversión cualificada.
- Un cambio manual a qualified fija qualifiedAt una sola vez. El mismo lead no genera dos conversiones al repetir el trabajo diario.
- El trabajo diario rechaza accesos no autorizados y funciona sin claves reales en pruebas mediante un cliente simulado.
- En producción se verifica por separado la persistencia del lead, el envío a Data Manager y la eventual atribución en Ads. Ninguna comprobación local se presenta como prueba de atribución.

## Referencias externas vigentes al redactar

- Google Ads, importación con GCLID: https://support.google.com/google-ads/answer/7012522?hl=es
- Google Ads, clientes potenciales cualificados: https://support.google.com/google-ads/answer/11459091?hl=es
- Data Manager API, eventos offline e identificadores: https://developers.google.com/data-manager/api/devguides/events/google-ads/offline/send-events
- Data Manager API, acceso: https://developers.google.com/data-manager/api/devguides/quickstart/set-up-access
- Firebase Data Connect, despliegue compatible: https://firebase.google.com/docs/sql-connect/manage-schemas-and-connectors?hl=es-419
- Vercel Cron, seguridad y frecuencia: https://vercel.com/docs/cron-jobs/manage-cron-jobs
