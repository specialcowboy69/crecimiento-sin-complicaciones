# Forms And Leads

**Last updated:** 2026-09-05

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
| `contact` | Yes | Email or phone, minimum 6 characters. |
| `company` | No | Keep optional unless the form explicitly requires it. |
| `message` | No | Free context assembled from form fields. |
| `interestedService` | No | Service, goal or selected category. |

The API lives in `app/api/leads/route.ts`, stores through Firebase Data Connect and validates/sanitizes strings before writing.

Admin review lives in `app/admin/leads/AdminLeadsPanel.tsx` and groups leads by `sourcePage`.

## Approved `formType` Values

Use:

- `Diagnóstico inicial` for the home diagnostic form only.
- `Auditoría gratuita` for commercial service pages and SEO/web/social/IA forms.

Do not create near-duplicates such as:

- `Auditoría gratis`
- `Auditoria gratuita`
- `Diagnóstico gratuito`
- `Propuesta gratuita`

If a new funnel genuinely needs a new `formType`, document it here before implementing it.

## Current Forms

| Component | Primary Use | `formType` | Notes |
| --- | --- | --- | --- |
| `HomeDiagnosticForm` | Home `/` | `Diagnóstico inicial` | First-step diagnostic. Does not assume the user knows the service. |
| `LeadForm` | Generic commercial pages | `Auditoría gratuita` | Configurable `sourcePage`, `interestedService`, copy and anchor id. |
| `SeoAuditForm` | `/seo`, `/seo-para-pymes`, `/seo/{city}` | `Auditoría gratuita` | SEO-specific goals and `defaultService`. |
| `WebProjectForm` | Web design money/cluster pages | `Auditoría gratuita` | Service interest comes from selected site type. |
| `SocialMediaForm` | Social media management page | `Auditoría gratuita` | Service interest comes from selected network/focus. |
| `AiDiagnosticForm` | IA/automation page | `Auditoría gratuita` | Service interest is automation with IA. |
| `PaidGrowthCalculatorForm` | Legacy SEM/Paid Growth page | Not currently routed | Calculator-style form, review before reuse. |

## Home Diagnostic Form

The home is intentionally different from service pages.

Purpose:

- Help users who do not know whether SEO, Ads, CRO, web, social or IA should come first.
- Collect enough context to orient the next step.
- Avoid presenting the page as a service catalog.

Required visible fields:

- `Nombre*`
- `Empresa*`
- `Email*`
- `Web opcional`
- `¿Qué quieres conseguir?*`
- `¿Qué crees que está bloqueando la captación?*`

CTA:

- `Solicitar diagnóstico inicial` for header/hero/process links.
- `Quiero aclarar mi siguiente paso` for the form submit button.

Do not rename this funnel to `Auditoría gratuita`.

## Commercial Audit Forms

Service pages should use `Auditoría gratuita` as the offer.

Common CTA labels:

- `Solicitar auditoría gratuita`
- `Solicitar auditoría SEO gratuita`
- `Quiero mi auditoría gratuita`

Commercial forms should usually ask only for:

- Name.
- Email or phone.
- Company when useful.
- Website or relevant profile when useful.
- Brief context.

Do not ask for `Inversión mensual estimada` unless the user explicitly requests that field.

## Source Page Naming

Keep `sourcePage` stable because the admin panel groups by it.

Current examples:

- `Home`
- `Agencia SEO`
- `SEO para pymes`
- `SEO Madrid`
- `SEO Barcelona`
- `SEO Valencia`
- `SEO Sevilla`
- `SEO Alicante`
- `SEO Málaga`
- `Agencia de marketing digital`
- `Diseño de landing pages`
- `Diseño web`
- `Gestión de redes sociales`
- `Soluciones IA`

If a page changes title but not business source, prefer keeping the same `sourcePage` to avoid splitting admin reporting.

## Validation And UX Rules

- Use inline validation messages tied with `aria-describedby`.
- Use `aria-invalid` for invalid fields.
- Use `role="status"` and `aria-live="polite"` for submit status.
- Keep mobile forms to one column.
- Keep required fields minimal.
- Use privacy copy when the form asks for more context.
- Keep Spanish accents correct in labels, errors and success messages.

## QA Checklist

Before closing form changes:

- Submit invalid form and verify visible errors.
- Submit path still calls `/api/leads`.
- Payload includes correct `sourcePage`, `sourcePath`, `formType`, `name` and `contact`.
- Admin panel can still display `formType`, `company`, `interestedService` and `message`.
- Mobile fields do not overflow.
- `npm run lint` passes.
- Run `npm run build` when changing API routes, shared submit logic or form components used across multiple pages.
