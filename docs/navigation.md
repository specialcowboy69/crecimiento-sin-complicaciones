# Navigation Rules

**Last updated:** 2026-10-09

This document defines header, dropdown and mobile navigation behavior for `pagina-agencia`.

## Components

- `app/components/Logo.tsx`: shared logo.
- `app/components/LandingServicesMenu.tsx`: shared `Más servicios` dropdown.
- `app/blog/_components/BlogHeader.tsx`: shared blog, article and category header.
- `app/components/PageLinksNav.tsx`: secondary desktop-only page links strip.
- `app/components/SiteFooter.tsx`: global public footer with entity, legal and cookie-preference links.
- `app/globals.css`: shared responsive behavior for headers, dropdowns and mobile quick links.

## Global Rules

- Keep the logo visible in mobile headers.
- On mobile, pages with an in-page audit form show `Solicitar auditoría gratuita` in the header instead of the services dropdown. It links to the shared `#audit-request` anchor beside the live form or confirmation.
- On mobile, pages without an in-page form, including blog routes, keep the services dropdown. Do not link a mobile audit CTA to another page and imply the form is local.
- Remove direct quick links when they crowd the mobile header; the logo and primary header action take priority.
- Do not add links to planned routes. Verify the route exists first.
- Header dropdown labels should stay short.
- Desktop header should stay on one line and below 80px height.

## Global Footer

`SiteFooter` is mounted once in `app/layout.tsx` for public pages and is hidden on `/admin`.

Its current links and controls are:

- `/sobre-nosotros`
- `/blog`
- `/politica-de-cookies`
- `/politica-de-privacidad`
- `CookiePreferencesLink` for reopening consent settings.

Keep these links in the shared footer rather than duplicating page-specific footers. Legal routes remain reachable here even though they are intentionally omitted from the sitemap.

## Home Header

The home is the main commercial entry page. It can introduce the service catalog, show proof/cases, pricing and drive toward the audit form.

Desktop home header:

- Logo.
- Direct section anchors such as `Servicios`, `Casos`, `Precios` and `Diagnóstico`.
- A desktop link to the published `/blog`; the shared footer keeps it reachable on mobile.
- Services dropdown using `LandingServicesMenu`; the current home label can be `Nuestros servicios` or another short services label.
- No audit CTA in the desktop header; the audit CTA lives in the hero and conversion sections.

Mobile home header:

- Logo.
- Logo and `Solicitar auditoría gratuita` linked to `#audit-request`; the services dropdown remains on desktop.
- No direct section anchors if they make the header cramped.

The home `Más servicios` dropdown should show only principal services:

- `/agencia-marketing-digital`
- `/agencia-marketing-digital/google-ads`
- `/diseno-landing-pages`
- `/seo`
- `/seo-para-pymes`
- `/diseno-pagina-web-profesional`
- `/gestion-redes-sociales-empresas`
- `/soluciones-inteligencia-artificial-empresas`

Do not include every cluster/intermediate page in the home dropdown. `/seo-para-pymes` is the explicit intermediate exception because it is a main SEO entry for pyme intent, `/agencia-marketing-digital/google-ads` is included as the canonical principal Ads service, and `/diseno-landing-pages` is included as the canonical landing-page design service.

## Service And Landing Headers

Commercial landing pages can show:

- Logo.
- Direct page anchors when useful for the current page.
- `Más servicios` dropdown.
- Header CTA to the relevant form on desktop.

On mobile:

- Keep logo visible.
- On pages with an in-page form, use the shared mobile audit CTA linked directly to `#audit-request` and hide `Más servicios` in the header.
- On pages without an in-page form, keep `Más servicios` and do not show a misleading audit CTA.
- Hide direct page anchors when they crowd the primary action.

The direct anchors should be page-specific, for example:

- National SEO page `/seo`: `Servicio`, `Proceso`, `SEO local`, `FAQ`.
- Specialist SEO-local page `/seo/local`: `Qué incluye`, `Proceso`, `FAQ` on desktop; the mobile header prioritizes the in-page audit CTA.
- SEO para pymes: `Incluye`, `Método`, `Comparativa`, `FAQ`.
- City SEO pages under `/seo/{city}`: `Estrategia`, `Sectores`, `Método`, `FAQ`.
- Web design pages: `Incluye`, `Proceso`, `Precios`, `FAQ` only if those sections exist.
- Landing pages: `Solución`, `Incluye`, `Proceso`, `FAQ`.

Do not use a generic direct-link set on every page.

## `Más servicios` Dropdown

Default dropdown links in `LandingServicesMenu`:

- `/seo`
- `/seo-para-pymes`
- `/agencia-marketing-digital/google-ads`
- `/diseno-landing-pages`
- `/diseno-pagina-web-profesional`
- `/gestion-redes-sociales-empresas`
- `/soluciones-inteligencia-artificial-empresas`
- `/agencia-marketing-digital`

The component filters out the current page via `currentPath`.

Pages with an in-page audit form pass `mobileAuditHref="#audit-request"`. The component then shows the audit CTA only below 768 px and hides its dropdown at that width; desktop still shows the services dropdown. Each active form or confirmation keeps the stable `#audit-request` anchor. Do not pass this prop until a real local form exists.

The panel uses two compact columns on desktop and one scrollable column on mobile. It closes when the visitor clicks or taps outside, presses `Escape`, or follows a service link. Keep the native `details/summary` keyboard interaction.

## Blog Header

The blog index, articles and category archives use the shared `BlogHeader`. The index shows the services dropdown; articles and categories also keep a direct `Blog` link on desktop. The desktop audit CTA leads to the home audit section. On narrow mobile widths, show the logo and services dropdown; the article and category breadcrumb provides the return path to the blog.

## Mobile Floating Action

Existing fixed bottom audit bars on commercial landing pages now offer `Llamar`, linked to `tel:+34604990651`. The page's regular audit links and form remain available separately. Do not add a floating bar to pages that did not already have one without reviewing mobile overlap and form access.

The home passes an allowed list to show only principal services. Other pages should use default behavior unless there is a clear reason to restrict the list.

When adding a new principal service:

- Create the route first.
- Add the page to sitemap only if it is canonical and indexable.
- Add it to `LandingServicesMenu` only after verifying the route.
- Consider whether it belongs in the home principal-services list.

## Secondary Page Links

`PageLinksNav` is desktop-only and helps users move between main commercial pages. It is not a mobile header replacement.

Current main links:

- `/`
- `/agencia-marketing-digital`
- `/sobre-nosotros`
- `/blog`
- `/agencia-marketing-digital/google-ads`
- `/diseno-landing-pages`
- `/seo`
- `/seo-para-pymes`
- `/diseno-pagina-web-profesional`
- `/gestion-redes-sociales-empresas`
- `/soluciones-inteligencia-artificial-empresas`

## Accessibility And QA

Before closing navigation changes:

- Check that the logo remains reachable and visible.
- Check that dropdown links are keyboard reachable through native `details/summary` behavior or equivalent accessible controls.
- Check that the desktop-only CTA is hidden on mobile, while the shared mobile audit CTA appears only when a local form exists and points to it.
- Check mobile width around `375px` and narrow widths around `320px` when labels change.
- Check desktop around `1280px` and tablet around `768px`.
- Use Playwright screenshots for visual header changes when practical.
- Run `npm run lint`; run `npm run build` for shared navigation changes.
