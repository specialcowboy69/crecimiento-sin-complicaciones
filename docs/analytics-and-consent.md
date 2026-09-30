# Analytics And Consent

**Last updated:** 2026-09-29

This document is the operational source of truth for visitor measurement and cookie-consent behavior in `pagina-agencia`. The public explanation remains in `/politica-de-cookies` and `/politica-de-privacidad`; update those pages whenever this implementation changes in a way that affects visitors.

## Measurement Inventory

| Tool | Purpose | Consent requirement | Scope |
| --- | --- | --- | --- |
| Vercel Analytics | Aggregate visits, page views and documented custom events | No: it is configured without cookies | Mounted globally, except `/admin` |
| Google Analytics 4 (`G-VECVHEZ2DN`) | Optional, more detailed usage measurement | Yes: explicit analytics acceptance | Loaded only after analytics consent |
| Google Ads conversion measurement | Attribute the successful SEO-local lead event imported from GA4 | Yes: analytics and advertising-measurement consent | `lead_seo_local_submitted` only after a successful `/seo/local` submission |

`app/layout.tsx` mounts `VercelAnalytics` and `CookieConsent` for the public application. The Vercel wrapper filters admin URLs before data is sent. Do not add another global analytics script or import GA4 directly in the layout: `CookieConsent` is the sole GA4 loading gate.

## Consent Rules

- The technical `cookie_consent` cookie stores the separate analytics and advertising-measurement choices for 12 months, with `Path=/`, `SameSite=Lax` and `Secure` on HTTPS. Existing `v1:accepted` choices migrate to analytics granted and advertising denied; no prior visitor is silently opted into advertising measurement.
- On a first visit, the banner offers **Rechazar**, **Aceptar todas** and **Configurar**. The configuration panel keeps technical cookies enabled, lets a visitor enable analytics, and exposes advertising measurement only together with analytics. After a choice, the non-floating **Cambiar configuración de cookies** control remains available in the public footer.
- Rejection keeps Vercel Analytics available but must not download or configure GA4. The technical preference cookie is necessary to remember the rejection.
- Analytics consent loads GA4 after the page becomes interactive and grants `analytics_storage`. Advertising-measurement consent additionally grants `ad_storage` and `ad_user_data` for the GA4-to-Google-Ads conversion flow. `ad_personalization` remains denied: this implementation has no remarketing or personalized advertising.
- Revoking analytics removes accessible `_ga`, `_ga_*` and `_gcl_*` cookies for the current host and project root domain, updates Google consent to denied, and reloads without GA4. Revoking only advertising measurement removes `_gcl_*` cookies and reloads with analytics still available.

The helper `app/components/cookieConsentCookies.mjs` defines consent serialization, the GA4/Ads lead-event guard, and the root domain used during Google-cookie cleanup. Update it and extend the tests before adding a public hostname or changing the canonical domain.

## Lead Conversion Measurement

`app/components/submitLead.ts` sends `lead_form_submitted` only after `/api/leads` responds successfully. The event may contain `source_page`, `source_path`, `form_type` and optional `interested_service`.

It must never contain names, email addresses, phone numbers, company names, messages, website/profile URLs or other personal/free-text lead fields. The lead API remains the only destination for the complete submitted payload. See `docs/forms-and-leads.md` for the payload contract and form taxonomy.

`lead_seo_local_submitted` is a parameter-free GA4 event emitted only after a successful `/seo/local` submission and only with both optional consents. Mark that event as a GA4 key event and import it as the primary, one-per-click Google Ads conversion for the initial SEO-local campaign. The account link and Google Ads auto-tagging are dashboard configuration and remain outside this repository.

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

1. Before a choice, GA4 is not requested and no `_ga`/`_ga_*` or `_gcl_*` cookie is created.
2. Rejecting preserves only the technical preference for this feature; GA4 and advertising measurement remain absent.
3. Accepting analytics loads GA4 with analytics storage granted and advertising storage denied.
4. Accepting analytics plus advertising measurement grants `ad_storage` and `ad_user_data`, while `ad_personalization` remains denied.
5. Revoking through **Cambiar configuración de cookies** in the public footer removes the relevant Google cookies for the active host and root domain, then reloads with the new settings.
6. A successful `/seo/local` lead with both consents produces one parameter-free `lead_seo_local_submitted` GA4 event. A failed lead, another route, or either missing consent produces none.
7. Vercel Analytics excludes `/admin`, and the Vercel project dashboard receives production traffic after Analytics has been enabled/confirmed there.

Local development is useful for behavior checks but does not confirm production analytics delivery. The Vercel dashboard and a production browser check are required to close that part of a release.
