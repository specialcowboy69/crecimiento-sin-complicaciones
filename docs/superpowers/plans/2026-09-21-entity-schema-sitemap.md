# Entity Schema Sitemap Implementation Plan

> **Status:** Archived — implemented in repository `main`. This is not proof of production deployment or indexation.
> **Do not execute this plan.** It is retained only as the historical implementation sequence; unchecked boxes and code snippets may differ from the current code.
> **Current sources of truth:** `app/`, `.agents/seo-context.md` and `docs/site-architecture.md`.
> **Implementation history:** Commits `5c8fb6e`, `ae6daf3`, `63fab77`, `876118c`, `4a3911a`, `5302a01`, `f7f22cf` and `6dce5ff` are contained in the current `main` history.
> **Original external brief:** The path recorded below was local to the planning workspace and is not versioned in this repository.
> **Historical instruction (superseded):** The original plan required agentic workers to use `superpowers:subagent-driven-development` or `superpowers:executing-plans` task by task. That instruction is preserved for context and must not be followed for completed work.

**Goal:** Strengthen public entity signals, schema consistency and sitemap freshness policy by adding `/sobre-nosotros`, shared JSON-LD helpers, consistent breadcrumbs and a sitemap without fake `lastModified` dates.

**Architecture:** Keep the implementation inside the existing Next.js App Router structure. Add a small `app/lib/structuredData.ts` helper for reusable `Organization`, `WebSite` and `BreadcrumbList` JSON-LD, render global entity schema from `app/layout.tsx`, create a public `/sobre-nosotros` page, and update only the service pages that currently lack `BreadcrumbList`.

**Tech Stack:** Next.js App Router 16.2.4, React 19, TypeScript, Node test runner, existing Tailwind utility classes and CSS in `app/globals.css`.

**Spec:** `C:/Users/USUARIO/Downloads/seo-skills/companies/pagina-agencia/entity-schema-sitemap-improvements-2026-09-21.md`

## Global Constraints

- Read `AGENTS.md`, `.agents/product-marketing.md`, `.agents/seo-context.md`, `.agents/seo-technical-principles.md`, `docs/site-architecture.md` and `docs/design.md` before changing code.
- Do not invent phone, email, address, office locations, customer results, reviews or testimonials.
- Use canonical host `https://www.crecimientosincomplicaciones.com`.
- Keep canonical URLs without trailing slash.
- Use `/sobre-nosotros` as the public entity page.
- Keep `/sobre-nosotros` indexable with `robots.index: true` and `robots.follow: true`.
- Do not add every Spanish province to schema, sitemap or copy.
- Use `España` or `Spain` as the service area, with priority markets limited to Madrid, Barcelona, Valencia, Sevilla, Alicante and Málaga when useful.
- Do not add `Review` or `AggregateRating` schema for unverified/demo proof.
- Remove dynamic `lastModified: new Date()` from the sitemap. Omit `lastModified` until real per-route dates are maintained.
- Run `npm run lint` and `npm run build` because routes, metadata, sitemap and schema are changing.

## Review Focus

- Entity page must not be orphaned: it needs at least one visible internal link from the home page or shared page navigation.
- Entity page must not invent unsupported contact details: no phone, email, postal address or local office claim unless already public and approved.
- Sitemap must not publish fake dates: `app/sitemap.ts` must not call `new Date()` and should omit `lastModified`.
- Breadcrumb schema must use canonical, absolute, www URLs and match the page hierarchy in `docs/site-architecture.md`.
- Global organization schema must not conflict with visible public content or claim ratings/reviews that are not marked up on the page.

---

### Task 1: Add SEO Regression Tests For Entity, Sitemap And Breadcrumbs

**Files:**
- Create: `tests/entity-schema-sitemap.test.mjs`

**Interfaces:**
- Consumes: existing source files under `app/`.
- Produces: regression tests used by later tasks to prove `/sobre-nosotros`, sitemap freshness policy and breadcrumb schema are correct.

- [ ] **Step 1: Create the failing test file**

Create `tests/entity-schema-sitemap.test.mjs` with this exact content:

```js
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

async function read(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

const pagesThatNeedBreadcrumbs = [
  {
    file: "app/diseno-pagina-web-profesional/page.tsx",
    route: "/diseno-pagina-web-profesional",
  },
  {
    file: "app/gestion-redes-sociales-empresas/page.tsx",
    route: "/gestion-redes-sociales-empresas",
  },
  {
    file: "app/soluciones-inteligencia-artificial-empresas/page.tsx",
    route: "/soluciones-inteligencia-artificial-empresas",
  },
  {
    file: "app/agencia-marketing-digital/seo-tecnico-arquitectura-entidades/page.tsx",
    route: "/agencia-marketing-digital/seo-tecnico-arquitectura-entidades",
  },
];

test("sobre nosotros page exists and exposes supported entity facts", async () => {
  const pagePath = path.join(repoRoot, "app", "sobre-nosotros", "page.tsx");
  assert.equal(existsSync(pagePath), true, "expected app/sobre-nosotros/page.tsx to exist");

  const page = await read("app/sobre-nosotros/page.tsx");
  assert.match(page, /const pagePath = "\/sobre-nosotros"/);
  assert.match(page, /title: "Sobre Crecimiento sin complicaciones"/);
  assert.match(page, /canonical: pagePath/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /Crecimiento sin complicaciones/);
  assert.match(page, /Agencia de marketing digital/);
  assert.match(page, /España/);
  assert.match(page, /Madrid, Barcelona, Valencia, Sevilla, Alicante y Málaga/);
  assert.match(page, /Auditoría gratuita/);
  assert.match(page, /"@type": "AboutPage"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type": "LocalBusiness"/);
  assert.doesNotMatch(page, /"@type": "PostalAddress"/);
  assert.doesNotMatch(page, /"@type": "Review"/);
  assert.doesNotMatch(page, /aggregateRating/);
  assert.doesNotMatch(page, /tel:/);
  assert.doesNotMatch(page, /mailto:/);
});

test("sobre nosotros is discoverable from public navigation and sitemap", async () => {
  const home = await read("app/page.tsx");
  const pageLinksNav = await read("app/components/PageLinksNav.tsx");
  const sitemap = await read("app/sitemap.ts");
  const siteArchitecture = await read("docs/site-architecture.md");

  assert.equal(home.includes("/sobre-nosotros"), true, "home should link to /sobre-nosotros");
  assert.equal(pageLinksNav.includes("/sobre-nosotros"), true, "PageLinksNav should include /sobre-nosotros");
  assert.match(sitemap, /path:\s*"\/sobre-nosotros"/);
  assert.match(siteArchitecture, /\/sobre-nosotros/);
});

test("sitemap does not use dynamic build dates", async () => {
  const sitemap = await read("app/sitemap.ts");

  assert.doesNotMatch(sitemap, /lastModified:\s*new Date\(\)/);
  assert.doesNotMatch(sitemap, /lastModified/);
});

test("shared structured data helpers define stable organization and breadcrumb ids", async () => {
  const helper = await read("app/lib/structuredData.ts");
  const layout = await read("app/layout.tsx");

  assert.match(helper, /export const ORGANIZATION_ID/);
  assert.match(helper, /export const WEBSITE_ID/);
  assert.match(helper, /export function organizationJsonLd/);
  assert.match(helper, /export function webSiteJsonLd/);
  assert.match(helper, /export function breadcrumbJsonLd/);
  assert.match(helper, /"@id": ORGANIZATION_ID/);
  assert.match(helper, /"@id": WEBSITE_ID/);
  assert.match(helper, /https:\/\/schema\.org/);
  assert.match(helper, /Crecimiento sin complicaciones/);
  assert.match(helper, /areaServed/);
  assert.match(layout, /organizationJsonLd/);
  assert.match(layout, /webSiteJsonLd/);
  assert.match(layout, /application\/ld\+json/);
});

test("selected service pages include BreadcrumbList schema", async () => {
  for (const pageInfo of pagesThatNeedBreadcrumbs) {
    const page = await read(pageInfo.file);

    assert.match(page, /"@type": "BreadcrumbList"/, `${pageInfo.file} should include BreadcrumbList schema`);
    assert.match(page, new RegExp(pageInfo.route.replaceAll("/", "\\/")), `${pageInfo.file} should include its canonical route in breadcrumb schema`);
  }
});
```

- [ ] **Step 2: Run the new tests to verify they fail**

Run:

```powershell
node --test tests/entity-schema-sitemap.test.mjs
```

Expected: FAIL because `/sobre-nosotros` and `app/lib/structuredData.ts` do not exist yet, and `app/sitemap.ts` still uses `lastModified: new Date()`.

- [ ] **Step 3: Commit the failing tests**

```powershell
git add tests/entity-schema-sitemap.test.mjs
git commit -m "test: cover entity schema and sitemap policy"
```

### Task 2: Add Shared Structured Data Helpers And Global Entity Schema

**Files:**
- Create: `app/lib/structuredData.ts`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `ORGANIZATION_ID: string`, `WEBSITE_ID: string`, `organizationJsonLd(): object`, `webSiteJsonLd(): object`, `breadcrumbJsonLd(items): object`.
- Consumes: `absoluteUrl` and `SITE_URL` from `app/lib/site.ts`.

- [ ] **Step 1: Create `app/lib/structuredData.ts`**

Add this file:

```ts
import { SITE_URL, absoluteUrl } from "./site";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Crecimiento sin complicaciones",
    url: SITE_URL,
    description:
      "Agencia de marketing digital para startups, pymes y negocios que combina SEO, diseño web, Google Ads, landing pages, redes sociales, analítica y automatizaciones con IA.",
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    knowsAbout: [
      "SEO",
      "SEO local",
      "Diseño web profesional",
      "Google Ads",
      "Landing pages",
      "Redes sociales",
      "Automatizaciones con IA",
      "Analítica digital",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO local" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño web profesional" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño de landing pages" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestión de redes sociales" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatizaciones e IA para empresas" } },
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Crecimiento sin complicaciones",
    url: SITE_URL,
    inLanguage: "es-ES",
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
```

- [ ] **Step 2: Update `app/layout.tsx` to render global JSON-LD**

Modify the imports:

```ts
import { SITE_URL } from "./lib/site";
import { organizationJsonLd, webSiteJsonLd } from "./lib/structuredData";
```

Add this constant above `RootLayout`:

```ts
const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd(), webSiteJsonLd()],
};
```

Change the `<body>` block to render the JSON-LD before `{children}`:

```tsx
<body>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(globalJsonLd).replace(/</g, "\\u003c"),
    }}
  />
  {children}
</body>
```

- [ ] **Step 3: Run tests for helper and layout**

Run:

```powershell
node --test tests/entity-schema-sitemap.test.mjs
```

Expected: still FAIL because `/sobre-nosotros`, sitemap policy and some breadcrumbs are not complete, but the helper/layout assertions should now pass.

- [ ] **Step 4: Run lint**

Run:

```powershell
npm run lint
```

Expected: PASS.

- [ ] **Step 5: Commit structured data helpers**

```powershell
git add app/lib/structuredData.ts app/layout.tsx
git commit -m "feat: add shared organization structured data"
```

### Task 3: Create `/sobre-nosotros` Entity And Trust Page

**Files:**
- Create: `app/sobre-nosotros/page.tsx`
- Modify: `app/page.tsx`
- Modify: `app/components/PageLinksNav.tsx`

**Interfaces:**
- Consumes: `Logo`, `LandingServicesMenu`, `LeadForm`, `absoluteUrl`, `breadcrumbJsonLd`, `ORGANIZATION_ID`, `WEBSITE_ID`.
- Produces: a public indexable route at `/sobre-nosotros`, visible entity/trust content, AboutPage JSON-LD and an internal discovery link.

- [ ] **Step 1: Create `app/sobre-nosotros/page.tsx`**

Add the page with these implementation requirements:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { LeadForm } from "../components/LeadForm";
import { Logo } from "../components/Logo";
import { absoluteUrl } from "../lib/site";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbJsonLd } from "../lib/structuredData";

const pagePath = "/sobre-nosotros";
const pageUrl = absoluteUrl(pagePath);

const serviceLinks = [
  { href: "/seo", label: "SEO" },
  { href: "/seo/local", label: "SEO local" },
  { href: "/diseno-pagina-web-profesional", label: "Diseño web profesional" },
  { href: "/agencia-marketing-digital/google-ads", label: "Google Ads" },
  { href: "/diseno-landing-pages", label: "Landing pages" },
  { href: "/gestion-redes-sociales-empresas", label: "Redes sociales" },
  { href: "/soluciones-inteligencia-artificial-empresas", label: "Automatizaciones e IA" },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${pageUrl}#about`,
      url: pageUrl,
      name: "Sobre Crecimiento sin complicaciones",
      description:
        "Información sobre Crecimiento sin complicaciones, agencia de marketing digital para empresas en España.",
      inLanguage: "es-ES",
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": ORGANIZATION_ID,
      },
    },
    breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Sobre nosotros", path: pagePath },
    ]),
  ],
};

export const metadata: Metadata = {
  title: "Sobre Crecimiento sin complicaciones",
  description:
    "Conoce a Crecimiento sin complicaciones: agencia de marketing digital en España especializada en SEO, diseño web, Google Ads, landing pages, redes sociales y automatizaciones.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Sobre Crecimiento sin complicaciones",
    description:
      "Agencia de marketing digital para empresas que quieren ordenar captación, conversión y automatización.",
    url: pagePath,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

Build the JSX with the existing `landing-light` style used by service pages. Include these visible sections with the exact phrases required by the tests:

```tsx
<h1>Sobre Crecimiento sin complicaciones</h1>
```

```tsx
<p>
  Crecimiento sin complicaciones es una Agencia de marketing digital para empresas en España que
  necesitan ordenar su captación, mejorar su web y convertir visitas en conversaciones comerciales.
</p>
```

```tsx
<p>
  Trabajamos con empresas de toda España. Nuestros mercados locales prioritarios actuales son
  Madrid, Barcelona, Valencia, Sevilla, Alicante y Málaga.
</p>
```

Render service links from `serviceLinks`, and include a contact/conversion section headed `Auditoría gratuita` with `<LeadForm sourcePage="Sobre nosotros" interestedService="Auditoría gratuita" />`.

Do not include `tel:`, `mailto:`, `PostalAddress`, `LocalBusiness`, `Review` or `aggregateRating`.

- [ ] **Step 2: Link `/sobre-nosotros` from the home footer**

In `app/page.tsx`, change the footer from a single back-to-top link to include a visible link to the new page:

```tsx
<footer className="footer">
  <p>© 2026 Crecimiento sin complicaciones. Agencia SEO, Google Ads, diseño web y automatizaciones.</p>
  <div className="flex flex-wrap gap-4">
    <a href="/sobre-nosotros">Sobre nosotros</a>
    <a href="#inicio">Volver arriba</a>
  </div>
</footer>
```

- [ ] **Step 3: Add `/sobre-nosotros` to `PageLinksNav`**

In `app/components/PageLinksNav.tsx`, add this entry to `pages`:

```ts
{ href: "/sobre-nosotros", label: "Sobre nosotros" },
```

Do not add `/sobre-nosotros` to `LandingServicesMenu`; that component lists services, and this route is an entity/trust page.

- [ ] **Step 4: Run the entity tests**

Run:

```powershell
node --test tests/entity-schema-sitemap.test.mjs
```

Expected: sitemap and breadcrumb tests may still fail, but `/sobre-nosotros` existence, content and discovery assertions should pass.

- [ ] **Step 5: Run lint**

Run:

```powershell
npm run lint
```

Expected: PASS.

- [ ] **Step 6: Commit the entity page**

```powershell
git add app/sobre-nosotros/page.tsx app/page.tsx app/components/PageLinksNav.tsx
git commit -m "feat: add public about page"
```

### Task 4: Remove Fake Sitemap Dates And Add `/sobre-nosotros`

**Files:**
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `absoluteUrl(path)`.
- Produces: a sitemap route list that includes `/sobre-nosotros` and omits dynamic `lastModified`.

- [ ] **Step 1: Update `app/sitemap.ts` route list**

Add this route object before the service detail pages or after `/agencia-marketing-digital`:

```ts
{ path: "/sobre-nosotros", priority: 0.75 },
```

- [ ] **Step 2: Remove dynamic `lastModified`**

Change the mapper from:

```ts
return routes.map((route) => ({
  url: absoluteUrl(route.path),
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: route.priority,
}));
```

to:

```ts
return routes.map((route) => ({
  url: absoluteUrl(route.path),
  changeFrequency: "monthly",
  priority: route.priority,
}));
```

- [ ] **Step 3: Run sitemap tests**

Run:

```powershell
node --test tests/entity-schema-sitemap.test.mjs
```

Expected: sitemap assertions should pass. Breadcrumb assertions may still fail until Task 5 is complete.

- [ ] **Step 4: Run existing sitemap-related tests**

Run:

```powershell
node --test tests/seo-local-page.test.mjs tests/diseno-landing-pages-migration.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit sitemap policy**

```powershell
git add app/sitemap.ts
git commit -m "fix: remove dynamic sitemap dates"
```

### Task 5: Add Missing BreadcrumbList Schema To Service Pages

**Files:**
- Modify: `app/diseno-pagina-web-profesional/page.tsx`
- Modify: `app/gestion-redes-sociales-empresas/page.tsx`
- Modify: `app/soluciones-inteligencia-artificial-empresas/page.tsx`
- Modify: `app/agencia-marketing-digital/seo-tecnico-arquitectura-entidades/page.tsx`

**Interfaces:**
- Consumes: `breadcrumbJsonLd(items)` from `app/lib/structuredData.ts`.
- Produces: consistent `BreadcrumbList` JSON-LD on public service pages that had service/FAQ schema but no breadcrumb schema.

- [ ] **Step 1: Add helper imports**

In each target page, import:

```ts
import { breadcrumbJsonLd } from "../lib/structuredData";
```

Use the correct relative path:

- `app/diseno-pagina-web-profesional/page.tsx`: `../lib/structuredData`
- `app/gestion-redes-sociales-empresas/page.tsx`: `../lib/structuredData`
- `app/soluciones-inteligencia-artificial-empresas/page.tsx`: `../lib/structuredData`
- `app/agencia-marketing-digital/seo-tecnico-arquitectura-entidades/page.tsx`: `../../lib/structuredData`

- [ ] **Step 2: Add breadcrumb schema to `/diseno-pagina-web-profesional`**

Append this object to the existing `jsonLd` array:

```ts
breadcrumbJsonLd([
  { name: "Inicio", path: "/" },
  { name: "Diseño web profesional", path: "/diseno-pagina-web-profesional" },
])
```

- [ ] **Step 3: Add breadcrumb schema to `/gestion-redes-sociales-empresas`**

Append this object to the existing `jsonLd` array:

```ts
breadcrumbJsonLd([
  { name: "Inicio", path: "/" },
  { name: "Redes sociales para empresas", path: "/gestion-redes-sociales-empresas" },
])
```

- [ ] **Step 4: Add breadcrumb schema to `/soluciones-inteligencia-artificial-empresas`**

Append this object to the existing `jsonLd` array:

```ts
breadcrumbJsonLd([
  { name: "Inicio", path: "/" },
  { name: "Soluciones de inteligencia artificial para empresas", path: "/soluciones-inteligencia-artificial-empresas" },
])
```

- [ ] **Step 5: Add breadcrumb schema to `/agencia-marketing-digital/seo-tecnico-arquitectura-entidades`**

Append this object to the existing `jsonLd` array:

```ts
breadcrumbJsonLd([
  { name: "Inicio", path: "/" },
  { name: "Agencia de marketing digital", path: "/agencia-marketing-digital" },
  {
    name: "SEO técnico y arquitectura de entidades",
    path: "/agencia-marketing-digital/seo-tecnico-arquitectura-entidades",
  },
])
```

- [ ] **Step 6: Run breadcrumb tests**

Run:

```powershell
node --test tests/entity-schema-sitemap.test.mjs
```

Expected: PASS.

- [ ] **Step 7: Run lint**

Run:

```powershell
npm run lint
```

Expected: PASS.

- [ ] **Step 8: Commit breadcrumb schema consistency**

```powershell
git add app/diseno-pagina-web-profesional/page.tsx app/gestion-redes-sociales-empresas/page.tsx app/soluciones-inteligencia-artificial-empresas/page.tsx app/agencia-marketing-digital/seo-tecnico-arquitectura-entidades/page.tsx
git commit -m "fix: add missing breadcrumb schema"
```

### Task 6: Update Architecture Documentation And Verify Build

**Files:**
- Modify: `docs/site-architecture.md`

**Interfaces:**
- Consumes: implemented route `/sobre-nosotros`, updated `app/sitemap.ts`, updated schema.
- Produces: documentation that tells future agents `/sobre-nosotros` is public, sitemap `lastModified` is intentionally omitted, and breadcrumbs should stay consistent.

- [ ] **Step 1: Update current public hierarchy**

In `docs/site-architecture.md`, add `/sobre-nosotros` under the home-level route list:

```text
├── /sobre-nosotros
```

Describe it as:

```text
/sobre-nosotros: public entity and trust page with service area, services, proof boundaries and audit CTA.
```

- [ ] **Step 2: Update sitemap route table**

Add this row:

```markdown
| `/sobre-nosotros` | `0.75` | Entity/trust page |
```

Add this note below the table:

```markdown
Sitemap entries intentionally omit `lastModified` until the project maintains real per-route modification dates. Do not restore `lastModified: new Date()` because it makes every page appear updated on every build.
```

- [ ] **Step 3: Add schema consistency note**

Add this note near the link audit checklist:

```markdown
Public indexable service pages should include `BreadcrumbList` JSON-LD that matches the documented hierarchy. The root layout renders global `Organization` and `WebSite` schema, so page-level schema should reference the same entity instead of inventing separate local businesses or unsupported ratings.
```

- [ ] **Step 4: Run all local tests**

Run:

```powershell
node --test tests/*.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Run lint and build**

Run:

```powershell
npm run lint
npm run build
```

Expected: both PASS.

- [ ] **Step 6: Optional local smoke check if a dev server is already running**

If the user already has the dev server open, visit:

```text
http://localhost:3000/sobre-nosotros
http://localhost:3000/sitemap.xml
```

Expected:

- `/sobre-nosotros` returns the new page with one visible H1.
- `/sitemap.xml` includes `/sobre-nosotros`.
- `/sitemap.xml` does not include a build-time modified date for every route.

Do not start, stop or restart the user's dev server unless they explicitly ask.

- [ ] **Step 7: Commit documentation and final verification**

```powershell
git add docs/site-architecture.md
git commit -m "docs: document entity page and sitemap policy"
```

## Self-Review Checklist

- Spec coverage: `/sobre-nosotros`, contact/conversion section, schema consistency and sitemap date policy are each covered by a task.
- Placeholder scan: the plan avoids unsupported contact data and gives exact code snippets for tests, helpers, sitemap edits and breadcrumb additions.
- Type consistency: `breadcrumbJsonLd`, `organizationJsonLd`, `webSiteJsonLd`, `ORGANIZATION_ID` and `WEBSITE_ID` are defined in Task 2 and consumed in later tasks with matching names.
- Review Focus: each listed risk has a test or explicit implementation step in Tasks 1-6.
