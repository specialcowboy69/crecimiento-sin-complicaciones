# Site Architecture

**Last updated:** 2026-10-08

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
│   │   └── /agencia-marketing-digital/google-ads/alicante
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
├── /blog
│   ├── /blog/como-ampliar-tematica-web-sin-perder-foco-seo
│   ├── /blog/como-lanzar-una-web-nueva-sin-comprometer-seo
│   └── /blog/domain-rating-como-evaluar-backlinks
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
/blog/feed.xml
/robots.txt
/sitemap.xml
```

## Public legal routes

`/politica-de-cookies` and `/politica-de-privacidad` are public information routes. Both use canonical URLs without trailing slashes and `noindex, follow` metadata. They are deliberately omitted from `app/sitemap.ts` because the sitemap is reserved for indexable commercial pages. The cookie banner and the lead-form privacy notice provide their inbound links. The operational behavior behind the consent interface is documented in `docs/analytics-and-consent.md`; keep the public policy pages aligned with that behavior.

## Public AI reference file

`public/llms.txt` is served at `/llms.txt` as a concise reference to the agency, its services and selected public pages. It supplements the public site; it does not replace `app/sitemap.ts` or `app/robots.ts` and does not guarantee indexing or search rankings.

When services or canonical routes change, review this file against the published page content. Keep its page links on the canonical `https://www.crecimientosincomplicaciones.com` host and omit trailing slashes for internal pages. Verify each referenced destination exists before adding it, exclude planned routes until implemented, and review Spanish accents and other characters in UTF-8.

## Sitemap Routes

`app/sitemap.ts` currently includes:

| URL | Priority | Type |
| --- | --- | --- |
| `/` | `1` | Commercial home |
| `/agencia-marketing-digital` | `0.9` | Marketing hub |
| `/sobre-nosotros` | `0.75` | Entity/trust page |
| `/agencia-marketing-digital/google-ads` | `0.85` | Google Ads service page |
| `/agencia-marketing-digital/google-ads/alicante` | `0.8` | Local Google Ads service page |
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

`/agencia-marketing-digital/google-ads` is indexable and included because it replaces the legacy SEM/Paid Growth page and owns the generic Google Ads and SEM intent. Its child `/agencia-marketing-digital/google-ads/alicante` is indexable with priority `0.8` and owns only the local Alicante intent. `/diseno-landing-pages` is indexable and included because it replaces the legacy CRO/Landing Systems page with a clearer landing-page design intent. Review intent, uniqueness and indexability before adding other detail pages from `/agencia-marketing-digital/*`.

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
  -> /agencia-marketing-digital/google-ads/alicante
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

### Google Ads cluster

```text
/agencia-marketing-digital/google-ads
  -> /agencia-marketing-digital/google-ads/alicante

/agencia-marketing-digital/google-ads/alicante
  -> /agencia-marketing-digital
  -> /agencia-marketing-digital/google-ads
  -> /seo/alicante
  -> /diseno-landing-pages
```

The national page owns generic `Google Ads` and `agencia SEM` intent. The Alicante child is a remote-service local page for Alicante city and province; it must not be presented as an office, local branch or global navigation item.

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

## Blog Publication

The blog launched on 2026-10-08 with three reviewed SEO articles, final cover images and related links. `/blog` and `/blog/{slug}` are public only while the repository contains at least three valid, non-draft articles whose publication date has arrived in the `Europe/Madrid` calendar. Unknown or unpublished article slugs still return 404.

The foundation delivered before the public launch included:

- The validated local Markdown repository under `content/blog/`.
- The gated `/blog` and `/blog/{slug}` routes.
- Canonical metadata and `CollectionPage`, `Blog`, `ItemList`, `BlogPosting`, and `BreadcrumbList` schema generated only after the publication gate opens.
- Safe Markdown rendering with GFM and without raw HTML execution.
- Removal of the two former links to nonexistent blog articles.

The public launch added `/blog` to the home navigation, desktop page links and shared footer. The sitemap lists the blog and its published article URLs, and `/blog/feed.xml` exposes an RSS feed. These discovery signals follow the same three-post publication gate. Category archives remain inactive until at least two categories each contain three published articles; no category URLs are linked or indexed yet.

### Article frontmatter

The slug comes only from the lowercase, hyphenated `.md` filename. Every document must use this frontmatter contract:

```yaml
title: string
description: string
publishedAt: YYYY-MM-DD
updatedAt: YYYY-MM-DD # optional
category: seo | google-ads | web-y-conversion | contenidos-y-redes | ia-y-automatizacion
draft: boolean
authorId: equipo
coverImage: /images/blog/{slug}/cover.webp
coverImageAlt: string
primaryKeyword: string
relatedService: approved canonical commercial route
relatedSlugs: string[]
tags: string[]
```

Markdown bodies cannot be empty. Dates must be real ISO dates, `updatedAt` cannot predate `publishedAt`, related slugs must exist and cannot contain the current slug or duplicates, and non-draft articles must have their cover file under `public/images/blog/{slug}/cover.webp`. Validation failures include the source filename and stop the build.

### Publishing another article

1. Add `content/blog/{slug}.md` with the frontmatter above and `draft: true`. Use an existing approved `relatedService` route; keep `relatedSlugs` limited to reviewed articles that should actually be shown.
2. Review the copy, internal links, alt text and final WebP cover. Verify every internal route before linking to it. Place the cover at `public/images/blog/{slug}/cover.webp`; explanatory diagrams may live alongside it.
3. Set `publishedAt` to the intended real publication date in the `Europe/Madrid` calendar and switch to `draft: false` only when the article and assets are approved. A future-dated article remains unpublished until that date. Use `updatedAt` only for an actual later content update.
4. Run `npm.cmd run test:blog`, `npm.cmd test`, `npm.cmd run lint` and `npm.cmd run build`. Review the article in desktop and mobile view before merging. After deployment, verify the article's HTTP response, `www` canonical, cover, `/blog`, sitemap and `/blog/feed.xml` on the production host; a local build alone does not prove publication.

Category archives remain inactive until at least two categories each contain three published articles. Until then, article categories are plain text rather than links.

## Link Audit Checklist

Public indexable service pages should include `BreadcrumbList` JSON-LD that matches the documented hierarchy. The root layout renders global `Organization` and `WebSite` schema, so page-level schema should reference the same entity instead of inventing separate local businesses or unsupported ratings.

Before closing a route or navigation change:

- Verify every internal href exists or is covered by a redirect.
- Verify canonicals match final URLs without trailing slash.
- Verify sitemap entries are only canonical 200 pages intended for indexing.
- Verify moved URL families still have redirects.
- Verify new pages have at least one inbound internal link and one outbound link to the relevant hub or money page.
- Run `npm run build` when route, metadata, sitemap or redirect behavior changes.
