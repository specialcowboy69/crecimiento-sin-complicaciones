# SEO local lead attribution and qualified conversions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Guardar la procedencia publicitaria consentida de futuros leads de SEO local y enviar a Google Ads únicamente el hito manual de lead cualificado.

**Architecture:** Una función de navegador captura IDs de clic solo tras consentimiento publicitario y los conserva en la sesión. El API verifica la preferencia al guardar campos opcionales en Firebase Data Connect. Un estado manual qualified fija la fecha del hito; un trabajo diario envía pendientes a una acción offline secundaria mediante Data Manager API, con ID estable y reintentos.

**Tech Stack:** Next.js 16.4 App Router, React 19, TypeScript/JavaScript, Firebase Data Connect, Node test runner, Playwright, Data Manager API, Vercel Cron.

**Spec:** docs/superpowers/specs/2026-10-11-seo-local-lead-attribution.md

## Global Constraints

- Repositorio objetivo: C:/Users/USUARIO/Downloads/pagina-agencia. El checkout actual, codex/form-contact-mobile-navigation, contiene cambios ajenos en formularios y documentación; ejecutar el código en un worktree aislado creado desde origin/main mediante superpowers:using-git-worktrees. Revalidar main y los cambios activos antes de escribir. Copiar al worktree solo este plan y su spec, que están sin seguimiento en el checkout actual, e incluirlos en el primer commit de la tarea.
- En el nuevo worktree ejecutar npm.cmd ci antes de dar por válidos build y pruebas; no reutilizar node_modules de otro checkout.
- Leer AGENTS.md, docs/forms-and-leads.md, docs/analytics-and-consent.md y docs/deployment.md en el worktree de ejecución. Antes de modificar código Next.js, leer la guía aplicable de node_modules/next/dist/docs/.
- Entrega A (Tasks 1-3) funciona y se puede publicar sin la B. Entrega B (Tasks 4-6) requiere la A y configuración de cuenta. No fusionar ambas entregas por inercia.
- Conservar lead_seo_local_submitted como evento GA4 sin parámetros, limitado a /seo/local y a ambas preferencias concedidas. No añadir PII a GA4 o Vercel Analytics ni habilitar ad_personalization, remarketing o Customer Match.
- No importar leads históricos, no interpretar sourcePage como canal y no escribir credenciales o IDs de cuenta reales en Git.
- Añadir campos de Data Connect opcionales; los registros anteriores permanecen sin atribución. Revisar el diff de SQL y desplegar esquema/conectores antes del código que los utiliza.
- Actualizar texto público y someterlo a revisión de privacidad antes de publicar la captura. Una retirada de consentimiento tras enviar un formulario exige bloquear exportaciones pendientes mediante el procedimiento operativo del panel.
- Cada cambio de código termina con npm.cmd run lint; los que afectan rutas, formularios, panel, esquema o integración terminan además con npm.cmd run build y las pruebas pertinentes.
- La nueva acción de Ads empieza como secundaria. Mantener la acción GA4 de envío de formulario como principal durante el período de validación; no activar la exportación real hasta verificar acceso, consentimiento y diagnósticos.

## Review Focus

- Rechazo, consentimiento solo analítico o revocación: el navegador borra el ID de sesión y el servidor nunca persiste un ID recibido sin permiso. Task 1 y Task 2 añaden pruebas para ambos lados.
- URL con varios IDs, valor vacío, control, espacio o más de 512 caracteres: elegir prioridad estable o descartar sin truncar un ID. Task 1 prueba estas entradas.
- Formulario de otra ruta o valor sourcePath manipulado: ningún ID entra en un lead no destinado a SEO local. Task 2 verifica el filtro.
- Doble pulsación en qualified, cron repetido o fallo al guardar el acuse tras una ingesta aceptada: qualifiedAt y transactionId permanecen estables y no se cuentan dos hitos. Task 4 y Task 6 prueban estos casos.
- API de Ads sin credenciales, respuesta parcial o permiso denegado: el lead queda guardado, el cambio de estado sigue válido, el trabajo registra fallo sin PII y puede reintentar. Task 5 y Task 6 lo prueban.

---

## Entrega A: procedencia y consentimiento

### Task 1: Capturar el ID de clic en una sesión consentida

**Files:**
- Carry into worktree: docs/superpowers/plans/2026-10-11-seo-local-lead-attribution.md
- Carry into worktree: docs/superpowers/specs/2026-10-11-seo-local-lead-attribution.md
- Create: app/components/adsClickAttribution.mjs
- Modify: app/components/CookieConsent.tsx
- Test: tests/ads-click-attribution.test.mjs
- Test: tests/e2e/consent.spec.ts

**Interfaces:**
- Produces: captureAdsClick({ pathname, search, preferences, storage }) -> { type, value } | null; readAdsClick({ pathname, preferences, storage }) -> { type, value } | null; clearAdsClick(storage) -> void.
- Consumes: parseCookieConsentPreferences from app/components/cookieConsentCookies.mjs; browser sessionStorage only after both preferences are true.
- The storage key is seo_local_ads_click_v1. type is gclid, gbraid or wbraid. Values are preserved verbatim, limited to 512 printable non-whitespace characters. Prefer gclid, then gbraid, then wbraid.

- [ ] **Step 1: Write failing unit tests** in tests/ads-click-attribution.test.mjs. Assert that captureAdsClick chooses gclid from a query containing all three types, preserves case, replaces an older session click, and returns null without both consents or on /admin. Assert that a blank, whitespace/control or 513-character value is discarded. Assert that clearAdsClick removes the key.
- [ ] **Step 2: Run** node --import tsx --test tests/ads-click-attribution.test.mjs. Expected: FAIL because the module does not exist.
- [ ] **Step 3: Implement** the three exports in app/components/adsClickAttribution.mjs. Do not write to cookies or localStorage. Catch sessionStorage access errors and return null without affecting navigation or forms.
- [ ] **Step 4: Integrate** captureAdsClick into CookieConsent on initial public render, route change and acceptance; call clearAdsClick on rejection/revocation and entry to /admin. Keep the existing GA4 load gate and four Consent Mode signals unchanged.
- [ ] **Step 5: Add browser checks** in tests/e2e/consent.spec.ts: with permission and ?gclid=AbC_123 the session key exists; after revocation it is absent; with rejection it was never written.
- [ ] **Step 6: Run** node --import tsx --test tests/ads-click-attribution.test.mjs, npm.cmd run test:e2e -- tests/e2e/consent.spec.ts, npm.cmd run lint, npm.cmd run build. Expected: all PASS.
- [ ] **Step 7: Commit** the four task files plus this plan and spec: git add -- app/components/adsClickAttribution.mjs app/components/CookieConsent.tsx tests/ads-click-attribution.test.mjs tests/e2e/consent.spec.ts docs/superpowers/plans/2026-10-11-seo-local-lead-attribution.md docs/superpowers/specs/2026-10-11-seo-local-lead-attribution.md; git commit -m "feat: capture consented ad click identifiers".

### Task 2: Guardar la procedencia en el lead sin confiar en el cliente

**Files:**
- Create: app/lib/leadAttribution.ts
- Modify: app/components/submitLead.ts
- Modify: app/api/leads/route.ts
- Modify: dataconnect/schema/schema.gql
- Modify: dataconnect/dataconnect.yaml
- Modify: dataconnect/leads/mutations.gql
- Modify: dataconnect/leads/queries.gql
- Modify: app/api/admin/leads/route.ts
- Modify: app/admin/leads/AdminLeadsPanel.tsx
- Test: tests/lead-attribution-persistence.test.mjs
- Test: tests/lead-analytics-delivery.test.mjs
- Test: tests/e2e/consent.spec.ts

**Interfaces:**
- Consumes: readAdsClick from Task 1.
- Produces: validateLeadAttribution(input: { cookieHeader: string; sourcePath: string; referer: string | null; requestOrigin: string; type?: unknown; value?: unknown }) -> { adsClickType: string | null; adsClickId: string | null; adsMeasurementConsentAtSubmit: boolean | null; adsConsentVersion: string | null }.
- The Lead table gains nullable adsClickType (varchar 16), adsClickId (varchar 512), adsMeasurementConsentAtSubmit (Boolean) and adsConsentVersion (varchar 16). For new /seo/local leads, record true or false from the server-side v2 cookie; legacy/unknown choice and other routes remain null. Never expose adsClickId through ListLeads.

- [ ] **Step 1: Write failing validation tests** in tests/lead-attribution-persistence.test.mjs. For /seo/local with a same-origin /seo/local Referer and both v2 permissions, assert exact ID and type plus true consent; for rejected/legacy choice, other route, missing or cross-origin Referer, malformed type/value or absent ID, assert no persisted ID. Assert the consent flag reflects the request cookie, not a client body flag.
- [ ] **Step 2: Run** node --import tsx --test tests/lead-attribution-persistence.test.mjs. Expected: FAIL because validateLeadAttribution does not exist.
- [ ] **Step 3: Implement** validateLeadAttribution in app/lib/leadAttribution.ts; call it from the POST Route Handler using request.headers.get("cookie"), request.headers.get("referer") and new URL(request.url).origin. Extend the JSON payload with optional adsClickType and adsClickId from readAdsClick at submission time; the server independently derives consent and discards disallowed IDs. Preserve success even if browser storage fails.
- [ ] **Step 4: Add nullable fields** to schema.gql and CreateLead mutation. Set schemaValidation to COMPATIBLE in dataconnect/dataconnect.yaml for the production SQL migration. Add adsClickType and adsMeasurementConsentAtSubmit to ListLeads and the admin API type; show "ID de anuncio disponible" or "Sin ID de anuncio" in AdminLeadsPanel without showing the raw value. Do not relabel sourcePage.
- [ ] **Step 5: Extend** tests/lead-analytics-delivery.test.mjs to assert that a successful form still emits exactly one parameter-free GA4 event and the existing allowlisted Vercel event, with no click ID in either event. In tests/e2e/consent.spec.ts intercept /api/leads and assert the browser payload includes the exact click type/ID only after consent and omits both after revocation.
- [ ] **Step 6: Run** node --import tsx --test tests/lead-attribution-persistence.test.mjs tests/lead-analytics-delivery.test.mjs, npm.cmd run test:e2e -- tests/e2e/consent.spec.ts, npm.cmd run lint, npm.cmd run build. Expected: all PASS. Review Firebase's SQL diff before any deployment; the generated migration must add nullable columns only.
- [ ] **Step 7: Commit** only the listed code and test files with message "feat: store consented lead click provenance".

### Task 3: Documentar y verificar la entrega A

**Files:**
- Modify: app/components/CookieConsent.tsx
- Modify: app/politica-de-privacidad/page.tsx
- Modify: app/politica-de-cookies/page.tsx
- Modify: docs/forms-and-leads.md
- Modify: docs/analytics-and-consent.md
- Test: tests/e2e/consent.spec.ts

**Interfaces:**
- Consumes: the actual capture and persistence behavior from Tasks 1-2.
- Produces: visitor-facing and internal wording describing that consented click IDs may be linked to a future SEO-local lead and later used for an offline qualified-lead event. The text must say that raw form contact fields are not sent to Google for this integration.

- [ ] **Step 1: Add a failing browser assertion** that the consent explanation and linked privacy/cookie pages describe click-ID association and a possible later qualified-lead event, without claiming personalized ads.
- [ ] **Step 2: Run** npm.cmd run test:e2e -- tests/e2e/consent.spec.ts. Expected: FAIL on the new text assertions.
- [ ] **Step 3: Update** the banner, legal pages and both operational docs to match the spec. Have the final public wording reviewed for privacy/legal accuracy before publication; if the existing consent scope is insufficient, hold Entrega A deployment and amend the choice flow first.
- [ ] **Step 4: Run** npm.cmd run test:e2e -- tests/e2e/consent.spec.ts, npm.cmd run lint, npm.cmd run build. Expected: all PASS.
- [ ] **Step 5: Commit** only the six listed files with message "docs: explain lead click attribution consent".

**Entrega A release gate:** Inspect Firebase services and run firebase dataconnect:sql:diff; review a compatible migration, then deploy schema and connector for service leads before deploying the application. In a fresh production browser, verify accepted/rejected/revoked paths and a controlled new /seo/local lead. Do not submit real personal data as a test. Document the stored type, consent state and the absence of PII in GA4 requests.

## Entrega B: calificación e importación secundaria

### Task 4: Marcar la primera calificación y permitir exclusión

**Files:**
- Modify: dataconnect/schema/schema.gql
- Modify: dataconnect/leads/mutations.gql
- Modify: dataconnect/leads/queries.gql
- Modify: app/api/admin/leads/route.ts
- Modify: app/admin/leads/AdminLeadsPanel.tsx
- Modify: docs/forms-and-leads.md
- Test: tests/qualified-lead-state.test.mjs

**Interfaces:**
- Produces: status qualified; immutable qualifiedAt Timestamp; nullable adsExportBlockedAt Timestamp. Add GetLeadForAdmin and MarkLeadQualified Data Connect operations so a repeated sequential PATCH reuses qualifiedAt; add BlockLeadAdsExport for pending leads. Existing new, contacted and closed remain valid. The server never calls Google from the PATCH.
- The qualified timestamp is the conversion event time; Lead.id is the source for a stable transactionId.

- [ ] **Step 1: Write failing state tests**: first new -> qualified sets qualifiedAt; repeated qualified preserves it; closed remains available; block export sets adsExportBlockedAt only while no export was submitted; unauthorized PATCH is rejected.
- [ ] **Step 2: Run** node --import tsx --test tests/qualified-lead-state.test.mjs. Expected: FAIL on the new state path.
- [ ] **Step 3: Add** nullable timestamps and the named Data Connect operations. Extend the admin API and panel with a deliberate "Cualificado" action and "Excluir de Ads" action. Preserve the first qualifiedAt on repeated requests; the later stable transactionId also protects against concurrent replays. Never display the raw click ID.
- [ ] **Step 4: Run** node --import tsx --test tests/qualified-lead-state.test.mjs, npm.cmd run lint, npm.cmd run build. Expected: all PASS. Review SQL diff for additive changes only.
- [ ] **Step 5: Commit** only the listed files with message "feat: qualify leads and block pending ads exports".

### Task 5: Preparar un evento offline sin datos de contacto

**Files:**
- Create: app/lib/googleAdsQualifiedLead.ts
- Modify: package.json
- Modify: package-lock.json
- Modify: .env.example
- Test: tests/google-ads-qualified-lead.test.mjs

**Interfaces:**
- Produces: buildQualifiedLeadEvent(lead: { id: string; adsClickType: "gclid" | "gbraid" | "wbraid"; adsClickId: string; qualifiedAt: string }) -> Data Manager Event; sendQualifiedLeadEvent(event, options: { validateOnly: boolean }) -> provider result.
- Event fields: adIdentifiers with the matching ID type; eventTimestamp = qualifiedAt; transactionId = "seo-local-qualified-" + Lead.id; eventSource = WEB. Request consent: adUserData = CONSENT_GRANTED and adPersonalization = CONSENT_DENIED. Omit userData, contact fields, value and currency until a separate approved decision.
- Configuration: GOOGLE_DATA_MANAGER_SERVICE_ACCOUNT_JSON, GOOGLE_ADS_OPERATING_ACCOUNT_ID, GOOGLE_ADS_QUALIFIED_ACTION_ID, GOOGLE_ADS_OFFLINE_ENABLED (default false), CRON_SECRET. Use a dedicated Google service account with Data Manager scope and access to the Ads account; never reuse the Firebase key.

- [ ] **Step 1: Write failing adapter tests**: gclid/gbraid/wbraid map to the matching field; no contact field appears in serialized JSON; the UUID gives a stable transactionId; validateOnly true makes no live ingestion; missing config or provider rejection returns a typed failure without logging lead data.
- [ ] **Step 2: Run** node --import tsx --test tests/google-ads-qualified-lead.test.mjs. Expected: FAIL because the adapter does not exist.
- [ ] **Step 3: Add** google-auth-library and implement the Data Manager API adapter using its official datamanager OAuth scope. Use the real Ads account and conversion-action IDs only from production environment variables. Tests inject the auth token and HTTP client; no network calls in unit tests.
- [ ] **Step 4: Run** node --import tsx --test tests/google-ads-qualified-lead.test.mjs, npm.cmd run lint, npm.cmd run build. Expected: all PASS.
- [ ] **Step 5: Commit** only the listed files with message "feat: prepare offline qualified lead events".

### Task 6: Exportar pendientes una vez al día y verificar la aceptación

**Files:**
- Create: app/api/cron/export-qualified-leads/route.ts
- Create: app/lib/qualifiedLeadExport.ts
- Create: vercel.json
- Modify: dataconnect/schema/schema.gql
- Modify: dataconnect/leads/queries.gql
- Modify: dataconnect/leads/mutations.gql
- Modify: docs/analytics-and-consent.md
- Modify: docs/deployment.md
- Test: tests/qualified-lead-export.test.mjs

**Interfaces:**
- Produces: exportPendingQualifiedLeads({ store, sender, enabled }) -> { attempted: number; submitted: number; failed: number }. Add ListQualifiedLeadsForAdsExport, MarkLeadAdsExportSubmitted and RecordLeadAdsExportFailure Data Connect operations. The server query returns id, sourcePath, consent, click type/ID, qualifiedAt, adsExportBlockedAt, adsExportSubmittedAt, adsExportAttemptedAt, adsExportTerminalAt and adsExportLastErrorCode; never contact fields. These last four export fields are nullable timestamps except adsExportLastErrorCode, a nullable varchar 80. Mark submitted only after provider acceptance; permanent failures set terminal time, transient failures remain retryable. Never store or log a raw provider payload.
- GET /api/cron/export-qualified-leads uses the Node.js runtime, requires Authorization: Bearer CRON_SECRET and returns counts only. vercel.json schedules it at 08:00 UTC daily (0 8 * * *); Vercel Hobby does not allow a higher frequency.

- [ ] **Step 1: Write failing exporter tests**: old leads, unconsented leads, leads without click ID, non-/seo/local leads, blocked leads, permanently rejected leads and already-submitted leads are skipped; two pending leads give independent results; repeating after a simulated marker-write failure uses the same transactionId; a transient failure remains retryable; missing CRON_SECRET or wrong header yields 401.
- [ ] **Step 2: Run** node --import tsx --test tests/qualified-lead-export.test.mjs. Expected: FAIL because the exporter and route do not exist.
- [ ] **Step 3: Add** additive export status fields/queries/mutations, implement filtering and per-lead provider calls in app/lib/qualifiedLeadExport.ts, then implement the authenticated Route Handler. Keep GOOGLE_ADS_OFFLINE_ENABLED false by default. Add a once-daily cron in vercel.json and document how to disable it.
- [ ] **Step 4: Update** operational docs with the privacy exclusion procedure, Firebase-before-Vercel deployment order, validateOnly run, Ads diagnostics check, retry behavior and kill switch. Do not describe accepted ingestion as an attributed conversion.
- [ ] **Step 5: Run** node --import tsx --test tests/qualified-lead-export.test.mjs tests/google-ads-qualified-lead.test.mjs, npm.cmd test, npm.cmd run lint, npm.cmd run build. Expected: all PASS. Review Firebase SQL diff and cron schedule.
- [ ] **Step 6: Commit** only the listed files with message "feat: export qualified leads to ads with retries".

**Entrega B release gate:** In Google Ads, confirm auto-tagging, create the separate qualified-lead action as secondary, note its real action ID, enable Data Manager API and grant the dedicated service account access. Review the consent/legal copy and specifically resolve how a later cookie-preference withdrawal affects a pending offline export. Deploy compatible Data Connect schema and connector first, configure protected Vercel secrets, run validateOnly against an approved test event, and inspect Data Manager diagnostics. Enable real sending for one controlled consented qualified lead; verify its ingestion and any Ads attribution separately. Keep the action secondary until there are enough genuine qualified leads to judge its value. Before any merge to main, run the project's Git Merge Preflight in docs/deployment.md and resolve earlier unmerged work with the user.
