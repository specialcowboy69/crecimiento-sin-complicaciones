# Restaurar Home Live Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recuperar en local la estructura visual de la home anterior publicada en GitHub/live, descartando los cambios recientes de la home sin borrar trabajo local no relacionado.

**Architecture:** Usar el commit `e78c6454cfcc161c059f0c866e3a6e8d36c96432` como fuente de verdad porque coincide con `HEAD` local y con `origin/main`. Restaurar primero `app/page.tsx`, conservar componentes compartidos actuales cuando son compatibles y corrigen reglas documentadas, y tocar `app/globals.css` solo si la comparativa visual demuestra que hace falta. No usar `git reset --hard` ni restauraciones globales del repo.

**Tech Stack:** Next.js `16.2.4`, React `19.2.4`, TypeScript, App Router, CSS global en `app/globals.css`, ESLint con `npm run lint`.

**Spec:** Solicitud del usuario en esta conversación, más reglas de `docs/design.md`, `docs/navigation.md`, `docs/site-architecture.md`, `docs/forms-and-leads.md`, `.agents/product-marketing.md`, `.agents/seo-context.md` y `.agents/seo-technical-principles.md`.

## Global Constraints

- `/` es la entrada de diagnóstico según la arquitectura actual; si se restaura la home comercial exacta anterior, documentar la decisión como excepción explícita del usuario.
- No cambiar rutas, sitemap, redirects, canonicals ni enlaces internos salvo que la verificación muestre una rotura directa causada por la restauración.
- No inventar enlaces internos; verificar cada `href` contra `app/`, `app/sitemap.ts` o redirects de `next.config.ts`.
- Mantener URLs sin trailing slash.
- No restaurar el campo `Inversión mensual estimada` en formularios.
- Mantener `formType: "Auditoría gratuita"` en formularios comerciales y `formType: "Diagnóstico inicial"` solo para el formulario específico de home si se conserva.
- Mantener copy visible en español correcto cuando el cambio no altere la intención visual solicitada.
- Ejecutar `npm run lint` después de tocar código.
- Ejecutar `npm run build` porque el cambio afecta la ruta `/`, metadata posible, navegación visual y componentes compartidos.

---

### Task 1: Baseline And Safety Snapshot

**Files:**
- Create: `output/home-restore-before.patch`
- Create: `output/live-home-page.tsx`
- Create: `output/live-home-globals.css`
- Modify: none

**Interfaces:**
- Consumes: git working tree actual y commit live `e78c6454cfcc161c059f0c866e3a6e8d36c96432`.
- Produces: patch de recuperación y fuentes live para comparar sin tocar código.

- [ ] **Step 1: Confirmar estado local y remoto**

Run:

```powershell
git status --short
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

Expected:

```text
HEAD local: e78c6454cfcc161c059f0c866e3a6e8d36c96432
origin/main: e78c6454cfcc161c059f0c866e3a6e8d36c96432
```

- [ ] **Step 2: Guardar un patch de seguridad de la superficie de home**

Run:

```powershell
New-Item -ItemType Directory -Force -Path output | Out-Null
git diff --binary -- app/page.tsx app/globals.css app/components/HomeDiagnosticForm.tsx app/components/LeadForm.tsx app/components/CaseCarousel.tsx app/components/PricingToggle.tsx > output/home-restore-before.patch
```

Expected: `output/home-restore-before.patch` existe y permite recuperar el estado actual de la home si hace falta.

- [ ] **Step 3: Extraer referencias live sin modificar la app**

Run:

```powershell
git show e78c6454cfcc161c059f0c866e3a6e8d36c96432:app/page.tsx > output/live-home-page.tsx
git show e78c6454cfcc161c059f0c866e3a6e8d36c96432:app/globals.css > output/live-home-globals.css
```

Expected: ambos archivos se crean en `output/` para comparación manual y visual.

- [ ] **Step 4: Registrar baseline de lint**

Run:

```powershell
npm run lint
```

Expected: PASS. Si falla antes de tocar la home, registrar los errores como baseline y no atribuirlos a la restauración.

---

### Task 2: Restore Previous Home Structure

**Files:**
- Modify: `app/page.tsx`
- Potentially delete: `app/components/HomeDiagnosticForm.tsx`
- Keep: `app/components/LeadForm.tsx`
- Keep: `app/components/CaseCarousel.tsx`
- Keep: `app/components/PricingToggle.tsx`

**Interfaces:**
- Consumes: exports actuales `LeadForm`, `CaseCarousel`, `PricingToggle` y `Logo`.
- Produces: `/` vuelve a renderizar la home anterior con hero, servicios, casos, precios, diagnóstico y formulario de auditoría.

- [ ] **Step 1: Restaurar solo el archivo de la ruta home desde live**

Run:

```powershell
git restore --source=e78c6454cfcc161c059f0c866e3a6e8d36c96432 -- app/page.tsx
```

Expected: `app/page.tsx` vuelve a importar `CaseCarousel`, `LeadForm`, `PricingToggle`, `Logo`, `ClipboardList`, `Palette`, `Rocket`, `Zap` y `Link`.

- [ ] **Step 2: Mantener los componentes compartidos actuales**

Run:

```powershell
git diff -- app/components/LeadForm.tsx app/components/CaseCarousel.tsx app/components/PricingToggle.tsx
```

Expected:

```text
LeadForm mantiene props compatibles y formType "Auditoría gratuita".
LeadForm no reintroduce el campo "Inversión mensual estimada".
CaseCarousel y PricingToggle solo conservan mejoras de acentos/copy.
```

- [ ] **Step 3: Eliminar el formulario nuevo de home solo si queda sin referencias**

Run:

```powershell
$refs = rg -n "HomeDiagnosticForm" app | Where-Object { $_ -notmatch 'app\\components\\HomeDiagnosticForm.tsx' }
if (-not $refs) { Remove-Item -LiteralPath app\components\HomeDiagnosticForm.tsx }
```

Expected: si `HomeDiagnosticForm` ya no se usa, el archivo se elimina; si aparece en otra página, se conserva.

- [ ] **Step 4: Verificar que la home compila a nivel de TypeScript/ESLint**

Run:

```powershell
npm run lint
```

Expected: PASS o solo errores ya presentes en el baseline de Task 1 Step 4.

---

### Task 3: CSS Reconciliation

**Files:**
- Modify only if needed: `app/globals.css`

**Interfaces:**
- Consumes: selector set de la home antigua y CSS actual.
- Produces: visual de home anterior sin romper estilos añadidos para páginas SEO y landings nuevas.

- [ ] **Step 1: No restaurar `app/globals.css` completo de entrada**

Run:

```powershell
git diff --stat -- app/globals.css
```

Expected: confirmar que el diff de CSS tiene muchas adiciones locales. El comportamiento buscado es conservar esas adiciones salvo que interfieran con la home restaurada.

- [ ] **Step 2: Revisar los selectores que usa la home restaurada**

Run:

```powershell
rg -n "site-header|nav|hero|proof-strip|hero-visual|service-grid|service-card|case-section|pricing-grid|diagnostic-section|diagnostic-process|faq-section|contact-section|footer" app/page.tsx app/globals.css
```

Expected: los selectores usados por `app/page.tsx` existen en `app/globals.css`.

- [ ] **Step 3: Parchear CSS solo si falta un selector o hay regresión visual**

Action: si el paso anterior o la revisión visual muestran que falta un bloque de la home anterior, copiar desde `output/live-home-globals.css` únicamente estos bloques relacionados con la home:

```text
.site-header
.nav
.logo-link
.nav-links
.nav-actions
.nav-ai-cta
.button
.hero
.hero-copy
.eyebrow
.hero-actions
.proof-strip
.hero-visual
.visual-toolbar
.score-card
.chart
.signal-grid
.section
.problem-section
.section-heading
.split-copy
.service-grid
.service-card
.case-section
.case-carousel
.pricing-grid
.diagnostic-section
.diagnostic-process
.diagnostic-step
.faq-section
.faq-list
.contact-section
.lead-form
.footer
```

Expected: `git diff -- app/globals.css` muestra cambios limitados a selectores usados por la home restaurada.

- [ ] **Step 4: Confirmar que no se ha eliminado CSS de landings nuevas**

Run:

```powershell
rg -n "landing-light|landing-services|page-links-nav|nav-services-menu|nav-services-dropdown|local-seo|seo-|web-design|ai-|social-" app/globals.css
```

Expected: los selectores compartidos para navegación nueva, SEO pages y landings siguen existiendo.

---

### Task 4: Visual And Functional Verification

**Files:**
- Modify: none, unless verification reveals a small CSS fix required by Task 3.

**Interfaces:**
- Consumes: app restaurada.
- Produces: evidencia de que la home vuelve a la versión deseada y el proyecto sigue construyendo.

- [ ] **Step 1: Levantar servidor local**

Run:

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Expected: la app sirve en `http://127.0.0.1:3000`. Si el puerto está ocupado, usar `3001`.

- [ ] **Step 2: Revisar `/` en desktop y móvil**

Check:

```text
Desktop 1280px: header, hero, visual panel, servicios, casos, precios, diagnóstico, FAQ y formulario.
Mobile 375px: header sin desbordes, botones dentro de contenedor, carrusel usable, tabla de precios legible, formulario a una columna.
```

Expected: la home se parece a la versión anterior live y no hay solapes ni textos fuera de contenedor.

- [ ] **Step 3: Probar formulario de home con validación inválida**

Action: enviar el formulario vacío.

Expected:

```text
Se muestran errores visibles.
No se llama con éxito a /api/leads.
No aparece el campo "Inversión mensual estimada".
```

- [ ] **Step 4: Verificar rutas nuevas que podrían depender de CSS compartido**

Open:

```text
http://127.0.0.1:3000/agencia-marketing-digital
http://127.0.0.1:3000/seo
http://127.0.0.1:3000/diseno-pagina-web-profesional
```

Expected: headers, dropdown `Más servicios`, CTAs y secciones principales siguen renderizando sin roturas obvias.

- [ ] **Step 5: Ejecutar cierre técnico**

Run:

```powershell
npm run lint
npm run build
```

Expected: ambos comandos pasan. Si `npm run build` falla por el backend de Firebase/Data Connect u otra dependencia externa, reportar el error exacto y separar si fue causado por la home o por baseline externo.

---

### Task 5: Review And Handoff

**Files:**
- Modify: none

**Interfaces:**
- Consumes: diff final y resultados de verificación.
- Produces: resumen claro de archivos tocados y riesgos residuales.

- [ ] **Step 1: Revisar diff final**

Run:

```powershell
git diff -- app/page.tsx app/globals.css app/components/HomeDiagnosticForm.tsx app/components/LeadForm.tsx app/components/CaseCarousel.tsx app/components/PricingToggle.tsx
```

Expected: el diff muestra la restauración de la home y no incluye cambios accidentales en rutas, sitemap, redirects, layout global o formularios compartidos no relacionados.

- [ ] **Step 2: Revisar archivos modificados**

Run:

```powershell
git status --short
```

Expected: aparecen solo los archivos esperados para esta restauración y los cambios locales preexistentes siguen presentes.

- [ ] **Step 3: Preparar resumen**

Include:

```text
Restaurada la estructura anterior de app/page.tsx desde e78c6454cfcc161c059f0c866e3a6e8d36c96432.
Conservadas las mejoras compatibles de LeadForm/CaseCarousel/PricingToggle cuando no rompen el diseño.
CSS global tocado solo si fue necesario para igualar la home.
Lint/build: resultado exacto.
Riesgo residual: diferencia intencionada entre "home live exacta" y "home anterior con formularios/copy corregidos", si aplica.
```

---

## Exact Live Variant

Si el usuario pide una restauración literal 1:1 de GitHub/live aunque reintroduzca reglas antiguas, sustituir Task 2 Step 1 por:

```powershell
git restore --source=e78c6454cfcc161c059f0c866e3a6e8d36c96432 -- app/page.tsx app/components/CaseCarousel.tsx app/components/LeadForm.tsx app/components/PricingToggle.tsx app/globals.css
```

Then run:

```powershell
npm run lint
npm run build
```

Expected risk: esta variante puede romper páginas locales nuevas que usan props de `LeadForm`, puede reintroducir `formType: "Auditoria gratuita"` sin tilde y puede eliminar CSS usado por landings creadas después del live anterior.

## Self-Review

**Spec coverage:** El plan cubre restauración desde GitHub/live, preservación de cambios no relacionados, protección con patch, componentes compartidos, CSS, formularios, navegación, lint/build y revisión visual.

**Placeholder scan:** No hay pasos con `TBD`, `TODO`, `implement later`, `fill in details`, `similar to`, ni instrucciones sin comandos o criterios de aceptación.

**Type consistency:** `LeadForm`, `CaseCarousel`, `PricingToggle` y `Logo` se consumen con los exports existentes. `LeadForm` conserva compatibilidad con uso sin props desde la home antigua y con props desde páginas nuevas.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-01-restaurar-home-live.md`. Two execution options:

**1. Subagent-Driven (recommended)** - Dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
