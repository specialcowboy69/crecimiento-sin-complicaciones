# Navigation Rules

**Last updated:** 2026-09-05

This document defines header, dropdown and mobile navigation behavior for `pagina-agencia`.

## Components

- `app/components/Logo.tsx`: shared logo.
- `app/components/LandingServicesMenu.tsx`: shared `Más servicios` dropdown.
- `app/components/PageLinksNav.tsx`: secondary desktop-only page links strip.
- `app/globals.css`: shared responsive behavior for headers, dropdowns and mobile quick links.

## Global Rules

- Keep the logo visible in mobile headers.
- Do not show the header CTA in mobile. Use `.mobile-hide-cta` or an equivalent rule.
- Mobile headers can show `Más servicios` plus only the most necessary direct links for that page.
- If mobile feels cramped, remove direct links and keep only logo plus `Más servicios`.
- Do not add links to planned routes. Verify the route exists first.
- Header dropdown labels should stay short.
- Desktop header should stay on one line and below 80px height.

## Home Header

The home is a diagnostic entry page, not the service catalog.

Desktop home header:

- Logo.
- Optional direct link: `Cómo funciona`.
- `Más servicios` dropdown.
- Optional CTA: `Solicitar diagnóstico inicial`.

Mobile home header:

- Logo.
- `Más servicios` only.
- No direct `Cómo funciona` link.
- No `Solicitar diagnóstico inicial` CTA in the header.

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
- Keep `Más servicios`.
- Keep at most two direct page anchors if they are truly useful and fit comfortably.
- Hide the header CTA.
- If in doubt, use logo plus `Más servicios` only.

The direct anchors should be page-specific, for example:

- SEO pages: `Servicio`, `Proceso`, `SEO local`, `FAQ`.
- SEO para pymes: `Incluye`, `Método`, `Comparativa`, `FAQ`.
- Local SEO pages: `Estrategia`, `Sectores`, `Método`, `FAQ`.
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
- Check that hidden mobile CTAs are not visually visible.
- Check mobile width around `375px` and narrow widths around `320px` when labels change.
- Check desktop around `1280px` and tablet around `768px`.
- Use Playwright screenshots for visual header changes when practical.
- Run `npm run lint`; run `npm run build` for shared navigation changes.
