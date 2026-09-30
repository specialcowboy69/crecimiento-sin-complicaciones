# Analytics And Consent

**Last updated:** 2026-09-30

This document is the operational source of truth for visitor measurement and cookie-consent behavior in `pagina-agencia`. The public explanation remains in `/politica-de-cookies` and `/politica-de-privacidad`; update those pages whenever this implementation changes in a way that affects visitors.

## Measurement Inventory

| Tool | Purpose | Consent requirement | Scope |
| --- | --- | --- | --- |
| Vercel Analytics | Aggregate visits, page views and documented custom events | No: it is configured without cookies | Mounted globally, except `/admin` |
| Google Analytics 4 (`G-VECVHEZ2DN`) | Optional, more detailed usage measurement | Yes: explicit analytics acceptance | Public pages only, loaded after analytics consent; `/admin` and its descendants are excluded |
| Google Ads conversion measurement | Attribute the successful SEO-local lead event imported from GA4 | Yes: analytics and advertising-measurement consent | `lead_seo_local_submitted` only after a successful `/seo/local` submission |

`app/layout.tsx` mounts `VercelAnalytics` and `CookieConsent` for the public application. The Vercel wrapper filters admin URLs before data is sent. Do not add another global analytics script or import GA4 directly in the layout: `CookieConsent` is the sole GA4 loading gate.

## Consent Rules

- The technical `cookie_consent` cookie stores the separate analytics and advertising-measurement choices for 12 months, with `Path=/`, `SameSite=Lax` and `Secure` on HTTPS. Existing `v1:accepted` choices migrate to analytics granted and advertising denied; no prior visitor is silently opted into advertising measurement.
- On a first visit, the banner offers **Rechazar**, **Aceptar todas** and **Configurar**. The configuration panel keeps technical cookies enabled, lets a visitor enable analytics, and exposes advertising measurement only together with analytics. After a choice, the non-floating **Cambiar configuración de cookies** control remains available in the public footer.
- Rejection keeps Vercel Analytics available but must not download or configure GA4. The technical preference cookie is necessary to remember the rejection.
- Analytics consent loads GA4 after the page becomes interactive and grants `analytics_storage`. Advertising-measurement consent additionally grants `ad_storage` and `ad_user_data` for the GA4-to-Google-Ads conversion flow. `ad_personalization` remains denied: this implementation has no remarketing or personalized advertising.
- Revoking analytics removes accessible `_ga`, `_ga_*` and `_gcl_*` cookies for the current host and project root domain, updates Google consent to denied, and reloads without GA4. Revoking only advertising measurement removes `_gcl_*` cookies and reloads with analytics still available.

The helper `app/components/cookieConsentCookies.mjs` defines consent serialization, the GA4/Ads lead-event guard, and the root domain used during Google-cookie cleanup. Update it and extend the tests before adding a public hostname or changing the canonical domain.

### Basic Consent Mode And Admin Isolation

This integration uses **Basic Consent Mode**, not Advanced Consent Mode. Before analytics acceptance (or after rejection), the site does not load the Google tag or send Google measurement pings. When the tag is allowed, all four Google consent signals are defaulted to denied, then updated to the visitor's current choices before configuring GA4.

The administrator is not a measurement surface. A direct `/admin` visit must not initialize GA4, even with a previously accepted cookie. Client-side navigation into `/admin` must also disable an already loaded tag; merely hiding the banner or removing a script element is insufficient. Delayed tag loading must recheck the current route and consent before initialization. Returning to a public page may resume measurement only while analytics consent is still granted.

Keep `ad_personalization` denied. Enhanced conversions, user-provided-data collection, User-ID, Google Signals and remarketing are not introduced by this change. Do not enable account-side features or assert that all users consented in an attempt to clear a diagnostic warning.

## Lead Conversion Measurement

`app/components/submitLead.ts` sends `lead_form_submitted` only after `/api/leads` responds successfully. The event may contain `source_page`, `source_path`, `form_type` and optional `interested_service`.

It must never contain names, email addresses, phone numbers, company names, messages, website/profile URLs or other personal/free-text lead fields. The lead API remains the only destination for the complete submitted payload. See `docs/forms-and-leads.md` for the payload contract and form taxonomy.

`lead_seo_local_submitted` is a parameter-free GA4 event emitted only after a successful `/seo/local` submission and only with both optional consents. Mark that event as a GA4 key event and import it as the primary, one-per-click Google Ads conversion for the initial SEO-local campaign. The account link and Google Ads auto-tagging are dashboard configuration and remain outside this repository.

Analytics is best-effort and must never turn an already saved lead into a form error. The form's success is determined by `/api/leads`, not by the availability of either analytics provider.

If Google Analytics has not finished initializing, an eligible conversion may wait in memory for at most 30 seconds. It carries no lead fields, is not persisted to cookies or browser storage, and is attempted at most once when GA4 becomes ready. Both permissions must already be present when submitting and must still be present at delivery. A later acceptance must not replay a submission made without consent. Withdrawal of either permission, departure from the document, entry into the administrator or expiry cancels pending delivery. Browser blocking or departure can still prevent measurement; this is not a guaranteed-delivery system.

## Change Rules

- Before adding an analytics provider, script, tag manager, pixel or custom event, document its purpose, data categories, consent requirement and opt-out behavior here.
- Do not classify a provider as cookie-free without checking its current provider documentation and actual browser behavior.
- If a change adds, removes or changes cookies, update the public cookie policy and test all consent paths in the same change.
- Do not send personally identifiable data to Vercel Analytics, GA4 or any other analytics provider.

## Verification

Run the project checks after changing consent, analytics or the shared lead-submit path:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

The browser regression suite runs against a **local production build** on port 3001. Install the Chromium test browser once with `npx.cmd playwright install chromium`. Start the app in one terminal after building it:

```powershell
npm.cmd run start -- --port 3001
```

In another terminal, run:

```powershell
npm.cmd run test:e2e
```

The suite uses real page components, cookies, focus and network interception, with synthetic form data. It intercepts `/api/leads` so no lead is stored, stubs the external Google tag and blocks other external traffic. A local Chromium DNS override maps the canonical host to `127.0.0.1` for host/root-domain cookie cleanup tests; it does not exercise production DNS. Reports, screenshots and traces go to ignored `output/playwright/` and are also excluded from ESLint. These tests validate the application's integration contract, not the behavior of Google's live script or account ingestion.

Coverage includes first visit/rejection, both permission combinations, consent-command ordering, delayed initialization, one event per successful lead, cancellation/no-consent/error paths, footer focus and mobile access, cookie cleanup, direct admin visits and public/admin navigation. Small-screen footer spacing keeps cookie controls reachable above fixed audit CTAs used by several landings, including the tablet breakpoint on the landing-pages service.

Then verify in a fresh browser profile on the production canonical host after deployment:

1. Before a choice, GA4 is not requested and no `_ga`/`_ga_*` or `_gcl_*` cookie is created.
2. Rejecting preserves only the technical preference for this feature; GA4 and advertising measurement remain absent.
3. Accepting analytics loads GA4 with analytics storage granted and advertising storage denied.
4. Accepting analytics plus advertising measurement grants `ad_storage` and `ad_user_data`, while `ad_personalization` remains denied.
5. Revoking through **Cambiar configuración de cookies** in the public footer removes the relevant Google cookies for the active host and root domain, then reloads with the new settings.
6. A successful `/seo/local` lead with both consents produces one parameter-free `lead_seo_local_submitted` GA4 event. A failed lead, another route, or either missing consent produces none.
7. Neither GA4 nor Vercel Analytics measures `/admin`. Test a direct visit with saved consent and a client-side transition from an already measured public page. The Vercel project dashboard receives production traffic after Analytics has been enabled/confirmed there.
8. Tag Assistant shows the denied defaults followed by the selected state before GA4 configuration. Do not interpret an Analytics consent dashboard warning as proof that visitors refused cookies or that Advanced Consent Mode is required. Compare the deployed browser signals and account configuration before changing anything; account reporting can lag behind a code release.

Local development is useful for behavior checks but does not confirm production analytics delivery. The Vercel dashboard and a production browser check are required to close that part of a release.
