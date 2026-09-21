# Site Architecture

**Last updated:** 2026-09-21

This is the source of truth for public routes, clusters, redirects, sitemap inclusion and internal linking decisions in `pagina-agencia`.

## Core Principles

- Do not invent links. Verify the route exists before linking to it.
- Keep canonical URLs without trailing slash, matching the current sitemap policy.
- Use short, descriptive, lowercase URLs with hyphens.
- If a URL is replaced, add or keep a 301 redirect and update internal links, canonicals and sitemap entries.
- Do not add planned pages to visible navigation until the route exists.
- Public commercial pages, including the home, should convert toward `Auditoría gratuita` unless a page explicitly defines a different approved funnel.

## Current Public Hierarchy

```text
/  Home comercial: servicios, casos, precios y auditoría
├── /agencia-marketing-digital
│   ├── /agencia-marketing-digital/google-ads
│   └── /agencia-marketing-digital/seo-tecnico-arquitectura-entidades
├── /sobre-nosotros
├── /diseno-landing-pages
├── /seo
│   ├── /seo/local
│   ├── /seo/madrid
│   ├── /seo/barcelona
│   ├── /seo/valencia
│   ├── /seo/sevilla
│   ├── /seo/alicante
│   └── /seo/malaga
├── /seo-para-pymes
├── /diseno-pagina-web-profesional
│   ├── /diseno-pagina-web-profesional/empresas
│   └── /diseno-pagina-web-profesional/valencia
├── /gestion-redes-sociales-empresas
└── /soluciones-inteligencia-artificial-empresas
```

`/sobre-nosotros`: public entity and trust page with service area, services, proof boundaries and audit CTA.

Internal/admin routes:

```text
/admin/leads
/api/leads
/api/admin/leads
/robots.txt
/sitemap.xml
```

## Sitemap Routes

`app/sitemap.ts` currently includes:

| URL | Priority | Type |
| --- | --- | --- |
| `/` | `1` | Commercial home |
| `/agencia-marketing-digital` | `0.9` | Marketing hub |
| `/sobre-nosotros` | `0.75` | Entity/trust page |
| `/agencia-marketing-digital/google-ads` | `0.85` | Google Ads service page |
| `/diseno-landing-pages` | `0.85` | Landing pages service page |
| `/seo` | `0.9` | SEO money page |
| `/seo/local` | `0.85` | SEO local service page |
| `/seo/madrid` | `0.85` | Local SEO |
| `/seo/barcelona` | `0.85` | Local SEO |
| `/seo/valencia` | `0.85` | Local SEO |
| `/seo/sevilla` | `0.85` | Local SEO |
| `/seo/alicante` | `0.85` | Local SEO |
| `/seo/malaga` | `0.85` | Local SEO |
| `/seo-para-pymes` | `0.85` | SEO intermediate |
| `/diseno-pagina-web-profesional` | `0.9` | Web design money page |
| `/diseno-pagina-web-profesional/empresas` | `0.85` | Web design intermediate |
| `/diseno-pagina-web-profesional/valencia` | `0.85` | Web design local |
| `/gestion-redes-sociales-empresas` | `0.9` | Service money page |
| `/soluciones-inteligencia-artificial-empresas` | `0.9` | Service money page |

Sitemap entries intentionally omit `lastModified` until the project maintains real per-route modification dates. Do not restore `lastModified: new Date()` because it makes every page appear updated on every build.

`/agencia-marketing-digital/google-ads` is indexable and included because it replaces the legacy SEM/Paid Growth page with a distinct Google Ads intent. `/diseno-landing-pages` is indexable and included because it replaces the legacy CRO/Landing Systems page with a clearer landing-page design intent. Review intent, uniqueness and indexability before adding other detail pages from `/agencia-marketing-digital/*`.

## Redirects

`next.config.ts` currently preserves moved URL families:

| Old URL | New URL | Status |
| --- | --- | --- |
| `/servicios` | `/agencia-marketing-digital` | 301 |
| `/sem-paid-growth` | `/agencia-marketing-digital/google-ads` | 301 |
| `/agencia-marketing-digital/sem-paid-growth` | `/agencia-marketing-digital/google-ads` | 301 |
| `/servicios/sem-paid-growth` | `/agencia-marketing-digital/google-ads` | 301 |
| `/cro-landing-systems` | `/diseno-landing-pages` | 301 |
| `/cro-landing-system` | `/diseno-landing-pages` | 301 |
| `/agencia-marketing-digital/cro-landing-systems` | `/diseno-landing-pages` | 301 |
| `/agencia-marketing-digital/cro-landing-system` | `/diseno-landing-pages` | 301 |
| `/servicios/cro-landing-systems` | `/diseno-landing-pages` | 301 |
| `/servicios/cro-landing-system` | `/diseno-landing-pages` | 301 |
| `/servicios/:path*` | `/agencia-marketing-digital/:path*` | 301 |
| `/diseno-web` | `/diseno-pagina-web-profesional` | 301 |
| `/diseno-web/:path*` | `/diseno-pagina-web-profesional/:path*` | 301 |

Do not add new internal links to `/servicios` or `/diseno-web`. Use the final canonical destinations.

## SEO Cluster

Approved route relationships for SEO pages:

```text
/seo
  -> /seo/local
  -> /seo-para-pymes
  -> /seo/madrid
  -> /seo/barcelona
  -> /seo/valencia
  -> /seo/sevilla
  -> /seo/alicante
  -> /seo/malaga
  -> /agencia-marketing-digital/seo-tecnico-arquitectura-entidades

/seo/local
  -> /seo
  -> /diseno-pagina-web-profesional

/seo-para-pymes
  -> /seo
  -> /seo/local
  -> /seo/madrid
  -> /seo/barcelona
  -> /seo/valencia
  -> /seo/sevilla
  -> /seo/alicante
  -> /seo/malaga
  -> /agencia-marketing-digital/google-ads
  -> /diseno-pagina-web-profesional
```

Local SEO relationship pattern:

```text
/seo/madrid
  -> /seo
  -> /seo-para-pymes
  -> /agencia-marketing-digital/google-ads
  -> /diseno-pagina-web-profesional

/seo/barcelona
  -> /seo
  -> /seo-para-pymes
  -> /seo/madrid
  -> /agencia-marketing-digital/google-ads

/seo/valencia
  -> /seo
  -> /seo-para-pymes
  -> /seo/madrid
  -> /seo/barcelona
  -> /agencia-marketing-digital/google-ads

/seo/sevilla
  -> /seo
  -> /seo-para-pymes
  -> /seo/madrid
  -> /seo/barcelona
  -> /seo/valencia
  -> /agencia-marketing-digital/google-ads
  -> /diseno-pagina-web-profesional

/seo/alicante
  -> /seo
  -> /seo-para-pymes
  -> /seo/madrid
  -> /seo/barcelona
  -> /seo/valencia
  -> /seo/sevilla
  -> /agencia-marketing-digital/google-ads
  -> /diseno-pagina-web-profesional

/seo/malaga
  -> /seo
  -> /seo-para-pymes
  -> /seo/madrid
  -> /seo/barcelona
  -> /seo/valencia
  -> /seo/sevilla
  -> /seo/alicante
  -> /agencia-marketing-digital/google-ads
```

If any target route does not exist, stop and report it instead of inventing a replacement.

## Marketing Digital Cluster

`/agencia-marketing-digital` is the commercial hub replacing the old `/servicios` page. It can link to:

- `/seo`
- `/seo/local`
- `/diseno-pagina-web-profesional`
- `/gestion-redes-sociales-empresas`
- `/soluciones-inteligencia-artificial-empresas`
- `/agencia-marketing-digital/google-ads`
- `/diseno-landing-pages`
- `/agencia-marketing-digital/seo-tecnico-arquitectura-entidades`

The `/agencia-marketing-digital/*` pages should link back to the hub and to closely related services only when the route exists. Do not link to legacy CRO/Landing Systems URLs; use `/diseno-landing-pages`.

## Web Design Cluster

The web design cluster hangs from `/diseno-pagina-web-profesional`, not `/diseno-web`.

Current implemented routes:

```text
/diseno-pagina-web-profesional
  -> /diseno-pagina-web-profesional/empresas
  -> /diseno-pagina-web-profesional/valencia
```

Known planned route:

```text
/diseno-pagina-web-profesional/sevilla
```

Do not link to the Sevilla page until the route exists.

## Link Audit Checklist

Public indexable service pages should include `BreadcrumbList` JSON-LD that matches the documented hierarchy. The root layout renders global `Organization` and `WebSite` schema, so page-level schema should reference the same entity instead of inventing separate local businesses or unsupported ratings.

Before closing a route or navigation change:

- Verify every internal href exists or is covered by a redirect.
- Verify canonicals match final URLs without trailing slash.
- Verify sitemap entries are only canonical 200 pages intended for indexing.
- Verify moved URL families still have redirects.
- Verify new pages have at least one inbound internal link and one outbound link to the relevant hub or money page.
- Run `npm run build` when route, metadata, sitemap or redirect behavior changes.
