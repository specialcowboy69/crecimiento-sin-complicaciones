# Diseno Landing Pages Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `/diseno-landing-pages` as the canonical design-of-landing-pages service page and retire the old CRO landing URLs without sitemap, internal-link, noindex, 200, or 404 regressions.

**Architecture:** Add a top-level App Router page at `app/diseno-landing-pages/page.tsx`, based on the existing `landing-light` service page language and useful CRO/landing content. Move all public/internal references from `/agencia-marketing-digital/cro-landing-systems` and related old slugs to `/diseno-landing-pages`, then leave only 301 redirects for the old URLs.

**Tech Stack:** Next.js App Router 16.2.4, React Server Components, TypeScript, Tailwind v4 utilities, existing `LandingServicesMenu`, `PageLinksNav`, `LeadForm`, `Logo`, `SITE_URL`, and `lucide-react`.

**Spec:** `C:/Users/USUARIO/.codex/attachments/b3b7d3ad-7d1e-4448-aab2-c95d5b36dd0b/pasted-text.txt`

## Global Constraints

- New canonical URL: `/diseno-landing-pages`.
- Keyword principal: `diseño de landing pages`.
- Title: `Diseño de landing pages para captar leads`.
- Meta description: `Diseñamos landing pages para campañas, servicios y negocios que necesitan convertir visitas en leads. Mensaje claro, diseño, medición y formularios listos.`
- H1: `Diseño de landing pages para convertir visitas en leads`.
- Primary CTA: `Solicitar auditoría gratuita`.
- Secondary CTA: `Ver servicios de marketing digital`.
- Canonical must be self-referencing on `/diseno-landing-pages`.
- Add only `/diseno-landing-pages` to sitemap for this migration.
- Remove app/internal links to `/cro-landing-system` or `/cro-landing-systems`.
- Redirect old URLs with HTTP 301.
- Do not leave the old page as `200`; do not add `noindex`; do not leave old URLs as `404`.
- Follow existing web design: light `landing-light` family, brand blue CTA, teal/green growth accent, rounded cards around 8px, clear Spanish copy, mobile without overflow.
- Do not invent internal links to routes that do not exist.
- Lead form should use `formType="Auditoría gratuita"` via `LeadForm`, with stable commercial source naming.

---

### Task 1: Canonical Page, Sitemap, And Redirects

**Files:**
- Create: `app/diseno-landing-pages/page.tsx`
- Delete: `app/agencia-marketing-digital/cro-landing-systems/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `next.config.ts`
- Test: `tests/diseno-landing-pages-migration.test.mjs`

**Interfaces:**
- Consumes: `LandingServicesMenu`, `PageLinksNav`, `LeadForm`, `Logo`, `SITE_URL`.
- Produces: public canonical route `/diseno-landing-pages`, sitemap entry, and 301 redirects from old CRO landing URLs.

- [ ] **Step 1: Write the failing migration test**

Create `tests/diseno-landing-pages-migration.test.mjs` with node:test assertions for route file existence, old route deletion, metadata/indexability markers, sitemap membership, redirect configuration, and absence of old app hrefs.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/diseno-landing-pages-migration.test.mjs`
Expected: FAIL because `app/diseno-landing-pages/page.tsx` does not exist and the old CRO route still exists.

- [ ] **Step 3: Write minimal implementation**

Create `app/diseno-landing-pages/page.tsx` using the pasted copy, visible FAQ, `BreadcrumbList`, `Service`, `FAQPage`, and `LeadForm id="auditoria-landing-pages" sourcePage="Diseño de landing pages" interestedService="Landing pages"`. Set `pagePath = "/diseno-landing-pages"`, `alternates.canonical = pagePath`, `robots.index = true`, `robots.follow = true`, and `openGraph.url = pagePath`.

Update `app/sitemap.ts` by adding `{ path: "/diseno-landing-pages", priority: 0.85 }` and ensuring old CRO slugs are absent.

Update `next.config.ts` with `statusCode: 301` redirects from `/cro-landing-systems`, `/cro-landing-system`, `/agencia-marketing-digital/cro-landing-systems`, `/agencia-marketing-digital/cro-landing-system`, `/servicios/cro-landing-systems`, and `/servicios/cro-landing-system` to `/diseno-landing-pages`.

Delete `app/agencia-marketing-digital/cro-landing-systems/page.tsx`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/diseno-landing-pages-migration.test.mjs`
Expected: PASS.

### Task 2: Internal Links, Navigation, Docs, And Keyword Map

**Files:**
- Modify: `app/agencia-marketing-digital/page.tsx`
- Modify: `app/agencia-marketing-digital/google-ads/page.tsx`
- Modify: `app/components/LandingServicesMenu.tsx`
- Modify: `app/components/PageLinksNav.tsx`
- Modify: `app/page.tsx`
- Modify: `docs/site-architecture.md`
- Modify: `docs/navigation.md`
- Modify: `docs/forms-and-leads.md`
- Modify: `.agents/seo-context.md`
- Modify: `C:/Users/USUARIO/Downloads/seo-skills/companies/pagina-agencia/seo-keyword-map.json`
- Test: `tests/diseno-landing-pages-migration.test.mjs`

**Interfaces:**
- Consumes: the route produced by Task 1.
- Produces: discoverable internal navigation and updated route documentation with no old CRO internal hrefs.

- [ ] **Step 1: Extend the failing migration test**

Add assertions that the marketing hub, shared service dropdown, home allowed list, and `PageLinksNav` include `/diseno-landing-pages`, and that no `app/**` file contains internal hrefs to old CRO slugs.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/diseno-landing-pages-migration.test.mjs`
Expected: FAIL while internal links and navigation still point to `/agencia-marketing-digital/cro-landing-systems`.

- [ ] **Step 3: Update links and docs**

Replace internal links pointing to old CRO landing slugs with `/diseno-landing-pages`. Update navigation labels to `Landing pages` or `Diseño de landing pages`. Update site architecture, navigation docs, forms docs, SEO context, and the keyword map entry for `diseño de landing pages` to the new canonical URL and `used` status.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/diseno-landing-pages-migration.test.mjs`
Expected: PASS.

### Final Verification

- [ ] Run `npm.cmd run lint`.
- [ ] Run `npm.cmd run build`.
- [ ] Start production server with `PORT=3014 npm.cmd run start`.
- [ ] Verify `GET /diseno-landing-pages` returns `200`, has self canonical, and contains no `noindex`.
- [ ] Verify `GET /sitemap.xml` includes `/diseno-landing-pages` and excludes old CRO slugs.
- [ ] Verify old CRO URLs return `301` to `/diseno-landing-pages`.
- [ ] Capture desktop and mobile screenshots with Playwright using local Chrome and inspect for no overflow/overlap.
