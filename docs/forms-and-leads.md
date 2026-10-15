# Forms And Leads

**Last updated:** 2026-10-15

This document defines lead form behavior, naming and payload conventions for `pagina-agencia`.

## Lead Pipeline

Client forms call `submitLead` in `app/components/submitLead.ts`.

Payload fields:

| Field | Required by API | Notes |
| --- | --- | --- |
| `sourcePage` | Yes | Human-readable page/source label. |
| `sourcePath` | No | Usually `window.location.pathname`. |
| `formType` | Yes | Use the approved taxonomy below. |
| `name` | Yes | Minimum 2 characters after trimming. |
| `phone` | Yes for current forms | Required mobile; Spain default, or explicit international prefix. Validated against numbering plans. |
| `email` | No | Separate optional email; validated when supplied. |
| `contact` | Legacy only | Accepted for older tabs without phone/email; existing records remain readable. |
| `company` | No | Keep optional unless the form explicitly requires it. |
| `message` | No | Free context assembled from form fields. |
| `interestedService` | No | Service, goal or selected category. |
| `adsClickType`, `adsClickId` | No | Only a consented `/seo/local` browser may supply a click ID. The server checks the v2 cookie, exact route and same-origin Referer before persisting it. Never infer campaign origin from `sourcePage`. |

The API composes persisted `contact` as `Móvil: +... | Email: ...` (omitting the email segment when empty) without a database migration. The complete normalized contact, including labels and separators, must fit the existing `varchar(220)` column; an overlong contact is rejected with an inline email error before persistence, without truncating new contact data. Supplying either new contact field selects strict validation; invalid phone/email never falls back to legacy `contact`. Numbering-plan validation establishes plausibility, not ownership or availability. Letters, extensions, incomplete numbers and fixed lines are rejected; spaces, parentheses, dots, hyphens and international `00` prefixes are normalized.

The API lives in `app/api/leads/route.ts`, stores through Firebase Data Connect and validates/sanitizes strings before writing.

Admin review lives in `app/admin/leads/AdminLeadsPanel.tsx` and groups leads by `sourcePage`.
For SEO-local leads it shows whether a consented ad click ID is available, without displaying the ID itself.
Older leads and leads from other routes have unknown measurement consent. The raw ID stays in Firebase Data Connect
for possible later qualified-lead attribution; it is not sent to GA4 or Vercel Analytics.

The admin may mark a lead `qualified` manually. The first `qualifiedAt` timestamp is preserved on repeated actions;
`closed` remains available. For a pending SEO-local lead, **Excluir de Ads** records `adsExportBlockedAt` and prevents
the later offline export. An already submitted lead cannot be excluded retroactively through this action; handle
privacy requests promptly and inspect its export status before promising an outcome. While an export is in progress,
the panel refuses both exclusion and deletion and shows that status; repeat the request after the attempt finishes.

## Approved `formType` Values

Use:

- `Auditoría gratuita` for the home and commercial service pages, including SEO/web/social/IA forms.
- `Diagnóstico inicial` only if a future dedicated diagnostic form is intentionally reintroduced and documented before implementation.

Do not create near-duplicates such as:

- `Auditoría gratis`
- `Auditoria gratuita`
- `Diagnóstico gratuito`
- `Propuesta gratuita`

If a new funnel genuinely needs a new `formType`, document it here before implementing it.

## Current Forms

| Component | Primary Use | `formType` | Notes |
| --- | --- | --- | --- |
| `LeadForm` | Home `/` and generic commercial pages | `Auditoría gratuita` | Configurable `sourcePage`, `interestedService`, copy and anchor id. Defaults to `sourcePage: "Home"`. |
| `LocalSeoAuditForm` | `/seo/local` | `Auditoría gratuita` | SEO-local specific form. Requires name, mobile and business; accepts optional email, web, Google profile or social link. |
| `SeoAuditForm` | `/seo`, `/seo-para-pymes`, `/seo/{city}` | `Auditoría gratuita` | SEO-specific goals and `defaultService`. |
| `WebProjectForm` | Web design money/cluster pages | `Auditoría gratuita` | Service interest comes from selected site type. |
| `SocialMediaForm` | Social media management page | `Auditoría gratuita` | Service interest comes from selected network/focus. |
| `AiDiagnosticForm` | IA/automation page | `Auditoría gratuita` | Service interest is automation with IA. |
| `PaidGrowthCalculatorForm` | Legacy SEM/Paid Growth page | Not currently routed | Calculator-style form, review before reuse. |

## Home Audit Form

The home is a commercial entry page with services, cases, pricing and a diagnostic section. Its conversion remains `Auditoría gratuita` through `LeadForm`.

Purpose:

- Capture users who are comparing growth, SEO, Ads, web, CRO, social or IA support.
- Let the page introduce the service catalog before sending the user to the audit form.
- Keep the home lead grouped as `sourcePage: "Home"` unless the form is intentionally replaced.

CTA:

- `Solicitar auditoría gratuita` for the hero and conversion links.
- Keep `Auditoría gratuita` as the form offer and `formType`.

## Commercial Audit Forms

Service pages should use `Auditoría gratuita` as the offer.

Common CTA labels:

- `Solicitar auditoría gratuita`
- `Solicitar auditoría SEO gratuita`
- `Quiero mi auditoría gratuita`

Commercial forms should usually ask only for:

- Name.
- Required mobile and separate optional email.
- Company when useful.
- Website or relevant profile when useful.
- Brief context.

Do not ask for `Inversión mensual estimada` unless the user explicitly requests that field.

## Source Page Naming

Keep `sourcePage` stable because the admin panel groups by it.

Current examples:

- `Home`
- `Agencia SEO`
- `SEO local`
- `SEO para pymes`
- `SEO Madrid`
- `SEO Barcelona`
- `SEO Valencia`
- `SEO Sevilla`
- `SEO Alicante`
- `SEO Málaga`
- `Agencia de marketing digital`
- `Agencia Google Ads`
- `Google Ads Alicante` (`LeadForm`, `formType: "Auditoría gratuita"`, `interestedService: "Google Ads"`)
- `Diseño de landing pages`
- `Diseño web`
- `Gestión de redes sociales`
- `Soluciones IA`

If a page changes title but not business source, prefer keeping the same `sourcePage` to avoid splitting admin reporting.

## Validation And UX Rules

- Use inline validation messages tied with `aria-describedby`.
- Use `aria-invalid` for invalid fields.
- Use `role="status"` and `aria-live="polite"` for submit status.
- After `/api/leads` succeeds, replace the form in place with a focused confirmation. Do not show the confirmation for validation or API failures; preserve the entered values and inline errors so the visitor can retry.
- Show direct contact alternatives alongside active audit forms: `tel:+34604990651` (604 990 651) and `mailto:info@crecimientosincomplicaciones.com`.
- Keep `#audit-request` on the form/confirmation container so each mobile header audit CTA lands at the form on its own page.
- Keep mobile forms to one column.
- Keep required fields minimal.
- Use privacy copy when the form asks for more context.
- Keep Spanish accents correct in labels, errors and success messages.

## Privacy Notice

Every active form in the Current Forms table must render `FormPrivacyNotice` immediately before its submit button. The shared notice explains that the submitted data is used to answer the request and links to `/politica-de-privacidad`. It does not add a required checkbox and must not alter the `submitLead` payload, `formType`, `sourcePage` or `sourcePath` conventions.

## Analytics Conversion Event

After `/api/leads` returns successfully, `submitLead` sends the Vercel Analytics event `lead_form_submitted`. It is a product-measurement event, not a copy of the lead payload.

Allowed event properties are:

- `source_page`
- `source_path`
- `form_type`
- `interested_service`, only when supplied

Never include `name`, `phone`, `email`, `contact`, `company`, `message`, website/profile URLs, or any other free-text or personal data in an analytics event. Keep the event after the successful response so failed submissions are not counted as leads. If the event name or its property inventory changes, update `docs/analytics-and-consent.md` in the same change.

When both optional analytics and advertising-measurement consent are granted, a successful submission from exactly `/seo/local` also sends the GA4 event `lead_seo_local_submitted`. It has no event parameters and is the only lead event intended to be imported into Google Ads for the SEO-local campaign. Do not emit it from another route, on validation, on a button click, or after a failed API response.

Both optional consents must be present when the submission begins and still be valid when measuring its success. A pending tag initialization may delay this event for up to 30 seconds in memory only; it must not replay leads submitted without consent. Revocation, entry into `/admin`, leaving the document or expiry cancels it. See `docs/analytics-and-consent.md` for the delivery contract.

Once the API has accepted a lead, failures or exceptions in Vercel Analytics or GA4 must not reject `submitLead` or show a false form failure. Analytics is not part of the lead-storage transaction, and the API payload and validation rules remain unchanged.

## QA Checklist

Before closing form changes:

- Submit invalid form and verify visible errors.
- Submit path still calls `/api/leads`.
- Payload includes correct `sourcePage`, `sourcePath`, `formType`, `name`, `phone` and optional `email`.
- A successful submission emits only the documented non-personal `lead_form_submitted` properties; a failed submission does not emit it.
- With both optional consents granted, a successful `/seo/local` lead emits one parameter-free `lead_seo_local_submitted` GA4 event; other forms do not.
- Admin panel can still display `formType`, `company`, `interestedService` and `message`.
- Mobile fields do not overflow.
- `npm run lint` passes.
- Run `npm run build` when changing API routes, shared submit logic or form components used across multiple pages.
