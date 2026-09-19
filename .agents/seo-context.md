# SEO Context - pagina-agencia

**Last updated:** 2026-09-16

## Strategic Context

Central strategy folder:

`C:/Users/USUARIO/Downloads/seo-skills/companies/pagina-agencia`

## Local Repo

`C:/Users/USUARIO/Downloads/pagina-agencia`

## Operational Files

- `app/layout.tsx`: global metadata.
- `app/sitemap.ts`: sitemap route generation.
- `app/page.tsx`: home.
- `app/agencia-marketing-digital/page.tsx`: commercial marketing hub replacing the old `/servicios` hub.
- `app/agencia-marketing-digital/*`: migrated service detail pages.
- `app/diseno-landing-pages/page.tsx`: landing-page design service page replacing the legacy CRO/Landing Systems URL.
- `app/seo/page.tsx`: national SEO money page.
- `app/seo/local/page.tsx`: local SEO service page for Google Business Profile, reviews, website SEO and connected local content.
- `app/seo-para-pymes/page.tsx`: SEO for SMEs intermediate page.
- `app/seo/*/page.tsx`: local SEO pages.
- `app/diseno-pagina-web-profesional/page.tsx`: money page for web design.
- `app/diseno-pagina-web-profesional/*`: web design cluster pages.
- `app/gestion-redes-sociales-empresas/page.tsx`: money page for social media management.
- `app/soluciones-inteligencia-artificial-empresas/page.tsx`: money page for AI automation.
- `app/components/LandingServicesMenu.tsx`: shared `Más servicios` dropdown.
- `app/components/PageLinksNav.tsx`: desktop-only cross-page navigation strip.
- `docs/site-architecture.md`: route, cluster, sitemap and redirect source of truth.
- `docs/navigation.md`: header and mobile navigation rules.
- `docs/forms-and-leads.md`: lead form and payload conventions.

## Rules

- Do not reuse URL to Video keywords here.
- Prioritize lead intent over generic traffic.
- Keep service pages aligned with real offers.
- Add keyword decisions to `C:/Users/USUARIO/Downloads/seo-skills/companies/pagina-agencia/seo-keyword-map.json`.
- Do not create new internal links to `/servicios` or `/diseno-web`; use the redirected canonical destinations.
- Canonicals and sitemap URLs should use no trailing slash.
- Before creating batches, review whether new pages belong in `app/sitemap.ts` and `LandingServicesMenu`.
- Do not invent internal links. Verify the route exists in `app/`, sitemap or redirects before linking.
- For architecture decisions, read `docs/site-architecture.md` first.

## Current Pillars

- Commercial home on `/` with services, cases, pricing and `Auditoría gratuita`.
- Agencia de marketing digital on `/agencia-marketing-digital`.
- Diseño web profesional on `/diseno-pagina-web-profesional`.
- SEO nacional on `/seo`.
- SEO local service on `/seo/local`.
- SEO para pymes on `/seo-para-pymes`.
- Local SEO pages under `/seo/{city}`.
- Gestión de redes sociales.
- IA y automatización para empresas.
- Google Ads and SEO técnico under `/agencia-marketing-digital/*`.
- Diseño de landing pages on `/diseno-landing-pages`; legacy CRO/Landing Systems URLs redirect there.
