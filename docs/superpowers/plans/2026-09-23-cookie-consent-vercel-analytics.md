# Cookie Consent and Vercel Analytics Implementation Plan

> **Status:** Archived initial plan — implemented and subsequently evolved in repository `main`. Production provider activation and event receipt require separate verification.
> **Do not execute this plan or use its snippets as the current consent contract.**
> **Current sources of truth:** `docs/analytics-and-consent.md`, `docs/forms-and-leads.md`, `app/components/CookieConsent.tsx`, `app/components/cookieConsentCookies.mjs` and the browser tests under `tests/e2e/`.
> **Implementation history:** Initial consent delivery merged through PR #2 (`af15aec`); lead measurement and documentation through PR #3 (`f731548`); consent stabilization through PR #4 (`788ea15`); footer access, admin isolation, resilient conversion delivery and browser coverage through PR #6 (`1a5a0bf`).
> **Superseded details:** The current implementation uses v2 granular analytics/advertising preferences, keeps `ad_personalization` denied, exposes preferences from the public footer and excludes `/admin`.
> **Historical instruction (superseded):** The original plan required agentic workers to use `superpowers:subagent-driven-development` or `superpowers:executing-plans` task by task. That instruction is preserved for context and must not be followed for completed work.

**Goal:** Let visitors accept or reject optional GA4 cookies, add cookie-free Vercel Web Analytics, and publish the supporting privacy information without disrupting lead capture.

**Architecture:** A root-mounted Vercel Analytics component records aggregate traffic independently of cookie consent. A dedicated client consent component persists a minimal first-party choice, conditionally mounts GA4 only after acceptance, and reloads without GA4 after revocation. Legal routes and a shared privacy notice make the treatment and visitor controls visible wherever data is collected.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, `next/script`, `@vercel/analytics`, CSS, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-23-cookie-consent-vercel-analytics-design.md`

## Global Constraints

- Keep `G-VECVHEZ2DN` optional: do not download or configure GA4 before an explicit analytics acceptance.
- Vercel Web Analytics is always enabled for aggregate, cookie-free traffic measurement and must exclude `/admin`.
- Use `cookie_consent` with values `v1:accepted` and `v1:rejected`, `Path=/`, `SameSite=Lax`, `Secure` in production, and a 12-month lifetime.
- Offer `Rechazar`, `Aceptar analítica`, and `Configurar`; acceptance and rejection must have equivalent visibility.
- Do not add advertising, marketing, newsletter, CRM, or lead-retention automation features.
- Send Vercel `lead_form_submitted` only after a successful `/api/leads` response and never include name, contact, company, message, or free text.
- Use `Crecimiento sin complicaciones S.U.`, NIF `51092147-W`, and `info@crecimientosincomplicaciones.com` in the privacy policy. State a 12-month retention period from the last interaction.
- Legal routes are public and `noindex`, and remain omitted from `app/sitemap.ts`.
- **Historical execution constraint (superseded):** Preserve the pre-existing untracked `docs/superpowers/plans/2026-09-21-entity-schema-sitemap.md` file; do not stage or alter it. This applied only during the original implementation and does not prohibit adding that archived plan in a later documentation-only change.
- Run `npm.cmd test`, `npm.cmd run lint`, and `npm.cmd run build` before completion. Do not deploy or publish.

## Review Focus

- A returning visitor with `v1:rejected` must never mount, preload, or request the GA4 source; Task 2 adds a source contract and a fresh-profile browser check.
- A visitor who revokes a prior acceptance must leave the current page without GA4 and without its first-party cookies; Task 2 implements denial, deletion, reload, and manual verification.
- Vercel event properties must remain a small allowlist even if `LeadSubmission` gains new personal fields; Task 1 tests the exact allowed mapping.
- `/admin` must not become visible in Vercel traffic simply because the root layout mounts analytics globally; Task 1 tests the `beforeSend` filter.
- The persistent preference control must not overlap existing mobile sticky CTAs or become inaccessible by keyboard; Task 2 adds responsive styles and Task 4 checks it at 320px and 375px.

---

### Task 1: Add safe Vercel Analytics and the lead-success event

**Files:**
- Create: `tests/cookie-consent-analytics.test.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `app/layout.tsx:1-62`
- Modify: `app/components/submitLead.ts:1-25`

**Interfaces:**
- Consumes: `LeadSubmission` from `app/components/submitLead.ts` and `BeforeSendEvent` / `Analytics` from `@vercel/analytics/next`.
- Produces: a root Vercel Analytics mount; `lead_form_submitted` with only `source_page`, `source_path`, `form_type`, and optional `interested_service` properties.

- [ ] **Step 1: Write the failing Vercel source contract**

Create `tests/cookie-consent-analytics.test.mjs` using the repository's existing `node:test`, `node:assert/strict`, and `readFile` pattern. Add this test before installing the package:

```js
test("Vercel analytics mounts globally but excludes admin routes", async () => {
  const packageJson = await read("package.json");
  const layout = await read("app/layout.tsx");

  assert.match(packageJson, /"@vercel\/analytics"/);
  assert.match(layout, /import \{ Analytics, type BeforeSendEvent \} from "@vercel\/analytics\/next"/);
  assert.match(layout, /function filterVercelAnalyticsEvent\(event: BeforeSendEvent\)/);
  assert.match(layout, /event\.url\.includes\("\/admin"\) \? null : event/);
  assert.match(layout, /<Analytics beforeSend=\{filterVercelAnalyticsEvent\} \/>/);
});

test("successful lead analytics uses a non-PII allowlist", async () => {
  const submitLead = await read("app/components/submitLead.ts");

  assert.match(submitLead, /track\("lead_form_submitted", \{/);
  assert.match(submitLead, /source_page: payload\.sourcePage/);
  assert.match(submitLead, /source_path: payload\.sourcePath/);
  assert.match(submitLead, /form_type: payload\.formType/);
  assert.match(submitLead, /interested_service: payload\.interestedService/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.name/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.contact/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.company/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.message/);
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test --test-name-pattern="Vercel|lead analytics" tests/cookie-consent-analytics.test.mjs`

Expected: FAIL because `@vercel/analytics`, the root mount, and the lead event are absent.

- [ ] **Step 3: Install the package and make the minimal Vercel integration**

Run: `npm.cmd install @vercel/analytics`

In `app/layout.tsx`, retain the existing metadata and JSON-LD. Add the Vercel import and filter, then mount it inside `<body>` after `{children}`:

```tsx
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

function filterVercelAnalyticsEvent(event: BeforeSendEvent) {
  return event.url.includes("/admin") ? null : event;
}

// Inside <body>, after {children}
<Analytics beforeSend={filterVercelAnalyticsEvent} />
```

In `app/components/submitLead.ts`, import `track` and call it only after the existing `if (!response.ok)` guard. Keep the allowlist explicit:

```ts
import { track } from "@vercel/analytics";

track("lead_form_submitted", {
  source_page: payload.sourcePage,
  source_path: payload.sourcePath,
  form_type: payload.formType,
  ...(payload.interestedService ? { interested_service: payload.interestedService } : {}),
});
```

Do not pass the request body or any form field that can identify a person.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `node --test --test-name-pattern="Vercel|lead analytics" tests/cookie-consent-analytics.test.mjs`

Expected: PASS for both Vercel tests.

- [ ] **Step 5: Commit the isolated deliverable**

```powershell
git add package.json package-lock.json app/layout.tsx app/components/submitLead.ts tests/cookie-consent-analytics.test.mjs
git commit -m "feat: add privacy-safe Vercel analytics"
```

### Task 2: Gate GA4 behind a reversible cookie preference

**Files:**
- Create: `app/components/CookieConsent.tsx`
- Modify: `app/layout.tsx:1-62`
- Modify: `app/globals.css:1290-1344, 2237-2525`
- Modify: `tests/cookie-consent-analytics.test.mjs`

**Interfaces:**
- Consumes: the `G-VECVHEZ2DN` GA4 measurement ID, `next/script`, `document.cookie`, and `window.location.reload()`.
- Produces: `<CookieConsent />`, a `cookie_consent` cookie, conditional GA4 loading, and a sitewide `Gestionar cookies` control.

- [ ] **Step 1: Write the failing consent/GA4 source contract**

Append these tests to `tests/cookie-consent-analytics.test.mjs`:

```js
test("GA4 is no longer mounted unconditionally in the root layout", async () => {
  const layout = await read("app/layout.tsx");

  assert.doesNotMatch(layout, /googletagmanager\.com\/gtag\/js/);
  assert.doesNotMatch(layout, /id="google-analytics"/);
  assert.match(layout, /import \{ CookieConsent \} from "\.\/components\/CookieConsent"/);
  assert.match(layout, /<CookieConsent \/>/);
});

test("cookie consent defaults GA4 off and exposes equal visitor choices", async () => {
  const consent = await read("app/components/CookieConsent.tsx");

  assert.match(consent, /const COOKIE_CONSENT_NAME = "cookie_consent"/);
  assert.match(consent, /const COOKIE_CONSENT_ACCEPTED = "v1:accepted"/);
  assert.match(consent, /const COOKIE_CONSENT_REJECTED = "v1:rejected"/);
  assert.match(consent, />Rechazar</);
  assert.match(consent, />Aceptar analítica</);
  assert.match(consent, />Configurar</);
  assert.match(consent, /analytics_storage: "denied"/);
  assert.match(consent, /analytics_storage: "granted"/);
  assert.match(consent, /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-VECVHEZ2DN/);
  assert.match(consent, />Gestionar cookies</);
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test --test-name-pattern="GA4|cookie consent" tests/cookie-consent-analytics.test.mjs`

Expected: FAIL because GA4 remains in the root layout and `CookieConsent.tsx` does not exist.

- [ ] **Step 3: Implement the client consent boundary**

Create `app/components/CookieConsent.tsx` as a client component. Keep all cookie parsing, writing, analytics loading, and preference UI in this file so other pages have no consent logic.

Use these constants and cookie-write behavior:

```ts
const COOKIE_CONSENT_NAME = "cookie_consent";
const COOKIE_CONSENT_ACCEPTED = "v1:accepted";
const COOKIE_CONSENT_REJECTED = "v1:rejected";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function persistConsent(value: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}
```

Initialise the React state as not ready. In an effect, read the cookie and set the state to `"accepted"`, `"rejected"`, or `null`; render the banner only after that read. Render the analytics `<Script>` only when state is `"accepted"`.

Before rendering the external script, prepare the local queue and default all Google storage states to denied. Once the visitor's accepted state has been established, update only `analytics_storage` to granted. Configure GA4 only inside the external script's `onLoad` callback:

```ts
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
});
gtag("consent", "update", { analytics_storage: "granted" });
```

Use one button style for both `Rechazar` and `Aceptar analítica`; `Configurar` opens a panel with a disabled technical row and an unchecked analytics checkbox. Saving the panel must use the same accept/reject functions as the first layer.

For revocation, write the rejected value, call the denied update when `window.gtag` exists, expire each current-domain cookie named `_ga` or beginning `_ga_` with `Path=/`, then call `window.location.reload()`. The reload is required so the already-loaded GA4 script cannot continue on the current page.

Mount `<CookieConsent />` inside `<body>` in `app/layout.tsx`, and remove the `next/script` import plus both unconditional GA4 `<Script>` elements. Keep the Vercel component and JSON-LD inside `<body>`.

Add focused CSS to `app/globals.css`:

```css
.cookie-consent {
  position: fixed;
  inset: auto 16px 16px;
  z-index: 50;
  max-width: 720px;
  margin-inline: auto;
}

.cookie-consent-actions,
.cookie-preferences-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cookie-preferences-button {
  position: fixed;
  right: 16px;
  bottom: 76px;
  z-index: 40;
}

@media (max-width: 680px) {
  .cookie-consent-actions > button { flex: 1 1 100%; }
  .cookie-preferences-button { bottom: 82px; }
}
```

Use the project's blue, white, slate, border-radius, and focus-visible conventions rather than introducing a new palette.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `node --test --test-name-pattern="GA4|cookie consent" tests/cookie-consent-analytics.test.mjs`

Expected: PASS for the GA4-layout and consent-contract tests.

- [ ] **Step 5: Commit the isolated deliverable**

```powershell
git add app/components/CookieConsent.tsx app/layout.tsx app/globals.css tests/cookie-consent-analytics.test.mjs
git commit -m "feat: gate analytics behind cookie consent"
```

### Task 3: Add public policy routes and privacy notices to every lead form

**Files:**
- Create: `app/components/FormPrivacyNotice.tsx`
- Create: `app/politica-de-cookies/page.tsx`
- Create: `app/politica-de-privacidad/page.tsx`
- Modify: `app/components/LeadForm.tsx`
- Modify: `app/components/LocalSeoAuditForm.tsx`
- Modify: `app/components/SeoAuditForm.tsx`
- Modify: `app/components/WebProjectForm.tsx`
- Modify: `app/components/SocialMediaForm.tsx`
- Modify: `app/components/AiDiagnosticForm.tsx`
- Modify: `app/globals.css`
- Modify: `docs/site-architecture.md`
- Modify: `docs/forms-and-leads.md`
- Modify: `tests/cookie-consent-analytics.test.mjs`

**Interfaces:**
- Consumes: Next `Link`, the policy routes, the existing six lead form components, and the contact details fixed in the approved spec.
- Produces: `<FormPrivacyNotice />`, two noindex policy routes, visible policy links, and documented sitemap/form conventions.

- [ ] **Step 1: Write the failing legal-route and form-notice contract**

Append this test to `tests/cookie-consent-analytics.test.mjs`:

```js
test("policy routes, form notices, and sitemap policy stay explicit", async () => {
  const cookiesPolicy = await read("app/politica-de-cookies/page.tsx");
  const privacyPolicy = await read("app/politica-de-privacidad/page.tsx");
  const notice = await read("app/components/FormPrivacyNotice.tsx");
  const sitemap = await read("app/sitemap.ts");

  assert.match(cookiesPolicy, /robots: \{ index: false, follow: true \}/);
  assert.match(cookiesPolicy, /cookie_consent/);
  assert.match(cookiesPolicy, /Google Analytics/);
  assert.match(cookiesPolicy, /Vercel Analytics/);
  assert.match(privacyPolicy, /Crecimiento sin complicaciones S\.U\./);
  assert.match(privacyPolicy, /51092147-W/);
  assert.match(privacyPolicy, /info@crecimientosincomplicaciones\.com/);
  assert.match(privacyPolicy, /12 meses/);
  assert.match(notice, /\/politica-de-privacidad/);
  assert.doesNotMatch(sitemap, /politica-de-cookies|politica-de-privacidad/);
});

test("every active lead form renders the shared privacy notice", async () => {
  for (const file of [
    "app/components/LeadForm.tsx",
    "app/components/LocalSeoAuditForm.tsx",
    "app/components/SeoAuditForm.tsx",
    "app/components/WebProjectForm.tsx",
    "app/components/SocialMediaForm.tsx",
    "app/components/AiDiagnosticForm.tsx",
  ]) {
    const source = await read(file);
    assert.match(source, /FormPrivacyNotice/, `${file} must render FormPrivacyNotice`);
  }
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test --test-name-pattern="policy routes|lead form" tests/cookie-consent-analytics.test.mjs`

Expected: FAIL because the routes and shared notice do not exist.

- [ ] **Step 3: Implement public policies and form notice**

Create `app/components/FormPrivacyNotice.tsx` using a compact paragraph and Next `Link`:

```tsx
import Link from "next/link";

export function FormPrivacyNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`form-privacy ${className}`.trim()}>
      Al enviar tu solicitud, trataremos tus datos para responderla. Consulta la{" "}
      <Link href="/politica-de-privacidad">Política de privacidad</Link>.
    </p>
  );
}
```

Render it directly before the submit button in all six listed lead forms. For Tailwind-styled dark forms, pass the existing readable muted-text and full-width grid classes while retaining the reusable component. Do not add a required checkbox or alter `submitLead` payloads.

Create the two policy pages with page-level `Metadata` using canonical paths and:

```ts
robots: { index: false, follow: true },
```

The cookie policy must state: the `cookie_consent` technical preference cookie lasts 12 months; Vercel provides aggregate cookie-free analytics; Google Analytics runs only after acceptance; the user can reopen `Gestionar cookies`; and the page links to the privacy policy.

The privacy policy must state: responsible party `Crecimiento sin complicaciones S.U.`, NIF `51092147-W`, contact `info@crecimientosincomplicaciones.com`; lead fields currently collected; purpose limited to responding to the request; a 12-month retention period from the last interaction; Firebase Data Connect as lead-storage provider; Vercel Analytics for aggregate measurement; Google Analytics only after acceptance; rights can be exercised through the stated email; and a link to the cookie policy. Do not assert a postal address, newsletter consent, advertising audience, or external transfer detail that has not been supplied or verified.

Add responsive, readable `.policy-page`, `.policy-content`, and `.form-privacy a` styles to `app/globals.css`. Keep the policy pages clear, light, and mobile-friendly, following `docs/design.md` rather than inheriting a dark service-landing treatment.

Update `docs/site-architecture.md` with the two public noindex legal routes and their deliberate sitemap exclusion. Update `docs/forms-and-leads.md` to make `FormPrivacyNotice` mandatory for each current form and state that it must not change payload or `formType` conventions. Do not modify `app/sitemap.ts`; the failing test explicitly pins the legal routes' omission.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `node --test --test-name-pattern="policy routes|lead form" tests/cookie-consent-analytics.test.mjs`

Expected: PASS for route metadata, policy content, sitemap omission, and all six form notices.

- [ ] **Step 5: Commit the isolated deliverable**

```powershell
git add app/components/FormPrivacyNotice.tsx app/politica-de-cookies/page.tsx app/politica-de-privacidad/page.tsx app/components/LeadForm.tsx app/components/LocalSeoAuditForm.tsx app/components/SeoAuditForm.tsx app/components/WebProjectForm.tsx app/components/SocialMediaForm.tsx app/components/AiDiagnosticForm.tsx app/globals.css docs/site-architecture.md docs/forms-and-leads.md tests/cookie-consent-analytics.test.mjs
git commit -m "feat: add cookie and privacy information"
```

### Task 4: Run complete verification and perform the browser consent audit

**Files:**
- Modify if browser verification reveals a reproducible defect: only the owning file from Tasks 1-3 and `tests/cookie-consent-analytics.test.mjs`.

**Interfaces:**
- Consumes: the completed Vercel, consent, GA4, policy, and form-notice interfaces from Tasks 1-3.
- Produces: complete automated verification and a browser-audited cookie inventory for the policy text.

- [ ] **Step 1: Run the complete automated suite**

Run: `npm.cmd test`

Expected: PASS, including the new cookie/analytics tests and all pre-existing test files.

- [ ] **Step 2: Run static quality checks**

Run: `npm.cmd run lint`

Expected: PASS with no ESLint errors.

Run: `npm.cmd run build`

Expected: PASS, including the two noindex policy routes and root-layout third-party components.

- [ ] **Step 3: Run browser checks in a fresh profile**

Start the production build locally and inspect browser storage and network requests for each case:

```powershell
npm.cmd run start
```

Check all of the following before stopping the server:

1. Open `/` with no cookies. Confirm the banner shows `Rechazar`, `Aceptar analítica`, and `Configurar`, and no request to `googletagmanager.com` occurs.
2. Click `Rechazar`, navigate to `/seo/local`, and confirm no `_ga` or `_ga_*` cookie exists while the form remains usable.
3. Clear site data, accept analytics, and confirm `gtag.js` loads once and the exact GA cookies written match the cookie-policy inventory.
4. Use `Gestionar cookies` to revoke. Confirm the GA cookies are expired and the reload contains no GA4 request.
5. Submit a valid lead against a controlled safe test environment or intercept the request before persistence. Confirm the Vercel event name is `lead_form_submitted` and inspect its properties for the four allowlisted values only.
6. At 320px and 375px, verify the banner and persistent preference button do not obscure sticky CTAs; tab through the controls and confirm visible focus.

Record any cookie-name or duration discrepancy by correcting the policy before release, then rerun the affected focused test plus this browser step.

- [ ] **Step 4: Confirm Vercel dashboard prerequisite without publishing**

In the intended Vercel project, confirm Web Analytics is enabled in the project dashboard. Do not deploy as part of this task; record it as a production prerequisite if dashboard access is unavailable.

- [ ] **Step 5: Stop on a browser-audit discrepancy and return it to its owning task**

Run `git status --short` after the audit. If the audit reveals a defect, do not create an empty or catch-all verification commit. Add a regression assertion to `tests/cookie-consent-analytics.test.mjs`, correct the owning Task 1, 2, or 3 file, rerun that task's focused test, then rerun this complete Task 4 verification. Stage only the explicitly named files in the owning task's commit command; during the original execution, never stage `docs/superpowers/plans/2026-09-21-entity-schema-sitemap.md`. **That staging restriction is historical and superseded for later documentation-only archival.**
