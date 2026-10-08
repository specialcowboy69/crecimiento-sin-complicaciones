# SEO Context - pagina-agencia

**Last updated:** 2026-10-06

## Strategic Context

Central strategy folder:

`C:/Users/USUARIO/Downloads/seo-skills/companies/pagina-agencia`

## Local Repo

`C:/Users/USUARIO/Downloads/pagina-agencia`

## Operational Files

- `app/layout.tsx`: global metadata plus shared `Organization` and `WebSite` JSON-LD.
- `app/sitemap.ts`: sitemap route generation.
- `app/page.tsx`: commercial home for the complete marketing system. Its hero uses the keyword signal `Agencia de crecimiento y marketing digital`, the promise `Convertimos tráfico en oportunidades comerciales` and a direct path to the free audit and case studies.
- `app/sobre-nosotros/page.tsx`: public entity and trust page.
- `app/lib/structuredData.ts`: shared `Organization`, `WebSite` and `BreadcrumbList` JSON-LD helpers and stable entity IDs.
- `app/agencia-marketing-digital/page.tsx`: commercial marketing hub replacing the old `/servicios` hub.
- `app/agencia-marketing-digital/*`: migrated service detail pages.
- `app/agencia-marketing-digital/google-ads/page.tsx`: national page owning generic Google Ads and SEM intent.
- `app/agencia-marketing-digital/google-ads/alicante/page.tsx`: local child page owning only Google Ads and SEM intent for Alicante city and province; service is remote and does not imply a local office.
- `app/diseno-landing-pages/page.tsx`: landing-page design service page replacing the legacy CRO/Landing Systems URL.
- `app/seo/page.tsx`: national SEO money page.
- `app/seo/local/page.tsx`: specialist local SEO service page for diagnosis, Google Business Profile, website SEO, authentic reviews and references, and measurement. Its method is `Analizar → priorizar → ejecutar → medir`; web creation and social content remain optional complements.
- `app/seo-para-pymes/page.tsx`: SEO for SMEs intermediate page.
- `app/seo/*/page.tsx`: local SEO pages.
- `app/diseno-pagina-web-profesional/page.tsx`: money page for web design.
- `app/diseno-pagina-web-profesional/*`: web design cluster pages.
- `app/gestion-redes-sociales-empresas/page.tsx`: money page for social media management.
- `app/soluciones-inteligencia-artificial-empresas/page.tsx`: money page for AI automation.
- `app/components/LandingServicesMenu.tsx`: shared `Más servicios` dropdown.
- `app/components/PageLinksNav.tsx`: desktop-only cross-page navigation strip.
- `app/components/SiteFooter.tsx`: shared public footer with the entity page, legal routes and cookie-preference control; hidden on `/admin`.
- `app/politica-de-cookies/page.tsx` and `app/politica-de-privacidad/page.tsx`: public legal-information routes with `noindex, follow`, intentionally omitted from the sitemap.
- `public/llms.txt`: concise public reference for AI systems; supplementary to the sitemap and robots rules.
- `.agents/product-marketing.md`: commercial source of truth for the offer, target audience, customer language and approved copy guardrails.
- `docs/decisions/2026-10-06-commercial-pages-redesign.md`: dated rationale for the home, SEO local and Google Ads design and copy renewal delivered in PRs #11 and #12.
- `docs/site-architecture.md`: route, cluster, sitemap and redirect source of truth.
- `docs/navigation.md`: header and mobile navigation rules.
- `docs/forms-and-leads.md`: lead form and payload conventions.
- `docs/analytics-and-consent.md`: analytics, consent and public cookie-behavior source of truth.
- `docs/deployment.md`: production host, domain routing, merge preflight and production analytics checks.

## Rules

- Do not reuse URL to Video keywords here.
- Prioritize lead intent over generic traffic.
- Keep service pages aligned with real offers.
- Add keyword decisions to `C:/Users/USUARIO/Downloads/seo-skills/companies/pagina-agencia/seo-keyword-map.json`.
- Do not create new internal links to `/servicios` or `/diseno-web`; use the redirected canonical destinations.
- Canonicals and sitemap URLs should use no trailing slash.
- Sitemap entries intentionally omit `lastModified` until real per-route modification dates are maintained; never publish `new Date()` as a fictitious update date.
- Before creating batches, review whether new pages belong in `app/sitemap.ts` and `LandingServicesMenu`.
- Do not invent internal links. Verify the route exists in `app/`, sitemap or redirects before linking.
- Keep page-level `BreadcrumbList` schema aligned with the shared entity IDs and global `Organization` and `WebSite` schema in `app/lib/structuredData.ts`.
- For architecture decisions, read `docs/site-architecture.md` first.
- Do not reintroduce decorative performance metrics, unsupported case-study figures or office claims as SEO copy. Route intent does not override commercial evidence requirements.

## Current Pillars

- Commercial home on `/` with services, cases, pricing and `Auditoría gratuita`.
- Agencia de marketing digital on `/agencia-marketing-digital`.
- Public entity and trust page on `/sobre-nosotros`.
- Diseño web profesional on `/diseno-pagina-web-profesional`.
- SEO nacional on `/seo`.
- SEO local service on `/seo/local`.
- SEO para pymes on `/seo-para-pymes`.
- Local SEO pages under `/seo/{city}`.
- Gestión de redes sociales.
- IA y automatización para empresas.
- Google Ads and SEO técnico under `/agencia-marketing-digital/*`; the national Google Ads page owns generic Google Ads and SEM searches, while its Alicante child owns only the corresponding local intent.
- Diseño de landing pages on `/diseno-landing-pages`; legacy CRO/Landing Systems URLs redirect there.
