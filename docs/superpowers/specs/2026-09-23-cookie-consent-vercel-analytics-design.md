# Cookie consent and Vercel Analytics design

**Status:** Approved in chat on 2026-09-23

## Objective

Allow visitors to reject or accept optional Google Analytics 4 cookies while
preserving access to the site and lead forms. Add privacy-friendly Vercel Web
Analytics for aggregate traffic and a non-PII lead-submission event.

## Approved product decisions

- Vercel Web Analytics is always enabled because it is used for aggregate,
  cookie-free measurement.
- Google Analytics 4 (`G-VECVHEZ2DN`) is optional and must not be fetched or
  configured until the visitor accepts analytics.
- The first layer offers `Rechazar`, `Aceptar analítica`, and `Configurar`
  with equivalent visibility for the accept and reject actions.
- The only optional category today is Google Analytics. Advertising and
  marketing categories are out of scope.
- Lead data is kept for twelve months after the last interaction, unless the
  person requests deletion sooner.
- The responsible party shown in the privacy policy is `Crecimiento sin
  complicaciones S.U.`, NIF `51092147-W`, with
  `info@crecimientosincomplicaciones.com` as the privacy contact.

## Architecture

### Consent state

A client-side `CookieConsent` component owns the public preference UI. It
stores the first-party technical cookie `cookie_consent` as one of
`v1:accepted` or `v1:rejected`, using `Path=/`, `SameSite=Lax`, `Secure` in
production, and a twelve-month lifetime. The choice is not attached to leads
or used for marketing.

Until the component has read the cookie, the banner remains visually hidden to
avoid flashing on repeat visits. With no stored preference it appears as an
accessible, non-blocking consent region. It does not have an implicit dismiss
action, preselected option, or cookie wall.

`Configurar` opens a small accessible preference panel. Technical storage is
shown as necessary; Google Analytics is disabled by default. The same
component exposes a persistent `Gestionar cookies` button on every route.
Its mobile position leaves space for existing sticky conversion CTAs.

### Google Analytics 4

The unconditional `next/script` tags in the root layout are removed. A
client-side Google Analytics loader is rendered only when the stored choice is
`accepted`. It initializes Google Consent Mode with all relevant storage
states denied, updates only `analytics_storage` to granted after the explicit
analytics choice, and then loads and configures the existing GA4 measurement
ID. This prevents a GA4 download or analytics cookie from occurring before
acceptance.

When the visitor revokes consent, the component records the rejection, sends a
denied update if GA4 is active, removes the GA4 first-party cookies discovered
by the implementation audit, and reloads the page. The reloaded page has no
GA4 loader.

### Vercel Web Analytics

`@vercel/analytics` is added and its `Analytics` component is mounted once in
the root layout. A `beforeSend` filter excludes `/admin` routes and prevents
any private or administrative page from being measured. Vercel Analytics is
not coupled to the cookie preference because the intended deployment uses its
cookie-free aggregate measurement.

`submitLead` emits `lead_form_submitted` only after `/api/leads` returns a
successful response. Event metadata is restricted to existing non-identifying
context: source page, source path, form type, and selected service. It never
sends name, email, telephone, company name, free text, or form payloads.

## Public information and forms

Two non-indexed public routes are added:

- `/politica-de-cookies`: explains the technical preference cookie, optional
  GA4, cookie-free Vercel measurement, change/revocation mechanism, and the
  final verified cookie inventory.
- `/politica-de-privacidad`: identifies the responsible party, describes lead
  data, the purpose of responding to the request, the twelve-month retention
  period, service providers, and the contact channel for data-subject rights.

The new routes are deliberately omitted from the commercial sitemap. They are
linked directly by the consent UI and a reusable `FormPrivacyNotice` added to
each lead form. The notice says that the supplied data is used to answer the
request and links to the privacy policy. No extra checkbox changes lead form
submission or payload contracts.

## Files and boundaries

- `app/layout.tsx`: remove global GA4 tags; mount Vercel Analytics and the
  consent entry point.
- `app/components/`: add the isolated consent, GA4-loader, and form privacy
  components; update the existing lead forms to use the privacy notice.
- `app/components/submitLead.ts`: emit the safe Vercel conversion event after
  a successful API response.
- `app/politica-de-cookies/page.tsx` and
  `app/politica-de-privacidad/page.tsx`: public legal-information routes.
- `app/globals.css`: responsive banner, preference panel, settings button, and
  policy-page styles.
- `app/sitemap.ts`, `docs/site-architecture.md`, and
  `docs/forms-and-leads.md`: document the routes and public form notice while
  keeping legal pages out of the sitemap.
- `package.json` and `package-lock.json`: add `@vercel/analytics`.

## Verification

Automated source-level tests cover the public routes, absence of unconditional
GA4 in the root layout, consent choices, safe analytics-event fields, Vercel
mounting, policy links, and sitemap omission. Existing test suites remain
green.

Browser verification uses a fresh profile for these flows:

1. Reject: no GA4 script request or GA cookies; Vercel aggregate page view may
   still occur; navigation and lead forms keep working.
2. Accept: GA4 loads once and starts only after the explicit action.
3. Stored acceptance: GA4 starts after hydration on the next visit.
4. Revoke: GA cookies are removed and the reload starts without GA4.
5. Successful lead submit: one Vercel `lead_form_submitted` event contains no
   personal data.
6. Mobile and keyboard review: visible controls, no collision with sticky CTAs,
   logical focus, and equivalent accept/reject contrast.

After code changes, run the project tests, `npm run lint`, and `npm run build`.
Vercel Web Analytics must also be enabled in the relevant Vercel project
dashboard before production data can appear.

## Out of scope

- Google Ads, Meta Pixel, advertising audiences, and Consent Mode advertising
  signals.
- Newsletter subscriptions or follow-up marketing consent.
- A new CRM, lead-retention automation, or data-deletion workflow.
- Publishing or deploying the changes.
