# Analytics And Consent

**Last updated:** 2026-09-28

This document is the operational source of truth for visitor measurement and cookie-consent behavior in `pagina-agencia`. The public explanation remains in `/politica-de-cookies` and `/politica-de-privacidad`; update those pages whenever this implementation changes in a way that affects visitors.

## Measurement Inventory

| Tool | Purpose | Consent requirement | Scope |
| --- | --- | --- | --- |
| Vercel Analytics | Aggregate visits, page views and documented custom events | No: it is configured without cookies | Mounted globally, except `/admin` |
| Google Analytics 4 (`G-VECVHEZ2DN`) | Optional, more detailed usage measurement | Yes: explicit analytics acceptance | Loaded only after acceptance |

`app/layout.tsx` mounts `VercelAnalytics` and `CookieConsent` for the public application. The Vercel wrapper filters admin URLs before data is sent. Do not add another global analytics script or import GA4 directly in the layout: `CookieConsent` is the sole GA4 loading gate.

## Consent Rules

- The technical `cookie_consent` cookie stores either `v1:accepted` or `v1:rejected` for 12 months, with `Path=/`, `SameSite=Lax` and `Secure` on HTTPS.
- On a first visit, the banner offers **Rechazar**, **Aceptar analítica** and **Configurar**. After a decision, **Gestionar cookies** remains available so the visitor can change it.
- Rejection keeps Vercel Analytics available but must not download or configure GA4. The technical preference cookie is necessary to remember the rejection.
- Acceptance loads GA4 after the page becomes interactive. Google consent mode grants only `analytics_storage`; advertising storage, ad user data and ad personalization remain denied.
- Revoking a prior acceptance writes the rejected preference, removes accessible `_ga` and `_ga_*` cookies for the current host and the project root domain, updates GA consent to denied, and reloads without GA4.

The helper `app/components/cookieConsentCookies.mjs` defines the root domain used during GA-cookie cleanup. Update it and extend the tests before adding a public hostname or changing the canonical domain.

## Lead Conversion Measurement

`app/components/submitLead.ts` sends `lead_form_submitted` only after `/api/leads` responds successfully. The event may contain `source_page`, `source_path`, `form_type` and optional `interested_service`.

It must never contain names, email addresses, phone numbers, company names, messages, website/profile URLs or other personal/free-text lead fields. The lead API remains the only destination for the complete submitted payload. See `docs/forms-and-leads.md` for the payload contract and form taxonomy.

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

Then verify in a fresh browser profile on the production canonical host after deployment:

1. Before a choice, GA4 is not requested and no `_ga`/`_ga_*` cookie is created.
2. Rejecting preserves only the technical preference for this feature; GA4 remains absent.
3. Accepting loads GA4 and permits its analytics cookies.
4. Revoking through **Gestionar cookies** removes GA cookies for the active host and root domain, then reloads without GA4.
5. A successful lead submission produces one `lead_form_submitted` event with only the allow-listed properties; a failed submission produces none.
6. Vercel Analytics excludes `/admin`, and the Vercel project dashboard receives production traffic after Analytics has been enabled/confirmed there.

Local development is useful for behavior checks but does not confirm production analytics delivery. The Vercel dashboard and a production browser check are required to close that part of a release.
