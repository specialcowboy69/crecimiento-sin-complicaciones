# Google Ads Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `/agencia-marketing-digital/google-ads` as the canonical Google Ads service page and retire the old SEM/Paid Growth URL without leaving sitemap, internal-link, noindex, or 404 regressions.

**Architecture:** Add a new App Router page under `app/agencia-marketing-digital/google-ads/page.tsx`, using the existing `landing-light` service-page language, `LandingServicesMenu`, `PageLinksNav`, and `LeadForm`. Update route ownership in `next.config.ts`, `app/sitemap.ts`, docs, and internal links so old SEM/Paid Growth paths redirect to the new canonical URL.

**Tech Stack:** Next.js App Router 16.2.4, React 19, TypeScript, Tailwind utilities, shared CSS in `app/globals.css`, lucide-react already installed by the project.

**Spec:** `C:/Users/USUARIO/.codex/attachments/b8d648d2-350d-4ab7-9cc7-9100c64b75c7/pasted-text.txt`

## Global Constraints

- The canonical page path is `/agencia-marketing-digital/google-ads`.
- The new page must be indexable and followable. Do not add `noindex`.
- The new page must export static `metadata` with `alternates.canonical`, Open Graph URL, title, description, and `robots.index: true`, `robots.follow: true`.
- Add `/agencia-marketing-digital/google-ads` to `app/sitemap.ts`.
- Remove any `/sem-paid-growth` or `/agencia-marketing-digital/sem-paid-growth` sitemap entry if present.
- Add 301 redirects from `/sem-paid-growth` and `/agencia-marketing-digital/sem-paid-growth` to `/agencia-marketing-digital/google-ads`.
- Update internal links that point to `/agencia-marketing-digital/sem-paid-growth` so they point to `/agencia-marketing-digital/google-ads`.
- Do not add internal links to routes that do not exist or are not covered by redirects.
- Use the existing clear service landing design, not a separate microsite design.
- Commercial pages use the CTA label `Solicitar auditoría gratuita`.
- Run `npm run lint` and `npm run build` because routes, metadata, sitemap, redirects, docs, and internal links are changing.

---

### Task 1: Google Ads Canonical Page And Redirects

**Files:**
- Create: `app/agencia-marketing-digital/google-ads/page.tsx`
- Modify: `app/agencia-marketing-digital/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `next.config.ts`
- Delete: `app/agencia-marketing-digital/sem-paid-growth/page.tsx`

**Interfaces:**
- Consumes: existing `LandingServicesMenu`, `Logo`, `PageLinksNav`, `LeadForm`, and `SITE_URL`.
- Produces: a public route at `/agencia-marketing-digital/google-ads`, a sitemap entry for the new canonical URL, and permanent redirects from both old SEM/Paid Growth URLs.

- [ ] **Step 1: Write the failing route migration check**

Run this PowerShell check before implementation:

```powershell
$ErrorActionPreference = "Stop"
$newPage = "app/agencia-marketing-digital/google-ads/page.tsx"
$oldPage = "app/agencia-marketing-digital/sem-paid-growth/page.tsx"
$sitemap = Get-Content -Raw "app/sitemap.ts"
$config = Get-Content -Raw "next.config.ts"
$links = rg -n "/agencia-marketing-digital/sem-paid-growth|href=`"/sem-paid-growth`"" app docs next.config.ts

if (-not (Test-Path $newPage)) { throw "Missing new Google Ads page" }
$page = Get-Content -Raw $newPage
if ($page -notmatch 'const pagePath = "/agencia-marketing-digital/google-ads"') { throw "Canonical path constant is wrong" }
if ($page -notmatch 'canonical:\s*pagePath') { throw "Missing self canonical" }
if ($page -notmatch 'robots:\s*\{[\s\S]*index:\s*true[\s\S]*follow:\s*true') { throw "Page is not explicitly index/follow" }
if ($page -notmatch 'FAQPage') { throw "Missing FAQ schema" }
if ($sitemap -notmatch '"/agencia-marketing-digital/google-ads"') { throw "Missing sitemap entry" }
if ($sitemap -match "sem-paid-growth") { throw "Old SEM URL still appears in sitemap" }
if ($config -notmatch 'source:\s*"/sem-paid-growth"[\s\S]*destination:\s*"/agencia-marketing-digital/google-ads"[\s\S]*statusCode:\s*301') { throw "Missing root old URL 301 redirect" }
if ($config -notmatch 'source:\s*"/agencia-marketing-digital/sem-paid-growth"[\s\S]*destination:\s*"/agencia-marketing-digital/google-ads"[\s\S]*statusCode:\s*301') { throw "Missing nested old URL 301 redirect" }
if (Test-Path $oldPage) { throw "Old nested SEM page still exists" }
if ($links) { throw "Old internal SEM links remain:`n$links" }
```

- [ ] **Step 2: Run check to verify it fails**

Expected: FAIL with `Missing new Google Ads page`.

- [ ] **Step 3: Implement minimal production changes**

Create the new page using the pasted Google Ads copy, visible FAQ, `Service`, `FAQPage`, and `BreadcrumbList` JSON-LD. Set `sourcePage="Agencia Google Ads"` and `interestedService="Google Ads"` on `LeadForm`. Add the sitemap route with priority `0.85`. Add 301 redirects in `next.config.ts`. Update the marketing hub cards and entry links to the new URL. Delete the old nested SEM page after redirects exist.

- [ ] **Step 4: Run route migration check to verify it passes**

Expected: PASS with no output.

### Task 2: Internal Link And Architecture Cleanup

**Files:**
- Modify: `docs/site-architecture.md`
- Modify: every `app/**/page.tsx` file that still links to `/agencia-marketing-digital/sem-paid-growth`
- Modify: `docs/forms-and-leads.md` only if the old page name needs to stop being the source-of-truth label

**Interfaces:**
- Consumes: the new route from Task 1.
- Produces: architecture docs and internal links that consistently refer to `/agencia-marketing-digital/google-ads`.

- [ ] **Step 1: Write the failing global old-link check**

Run:

```powershell
$remaining = rg -n "/agencia-marketing-digital/sem-paid-growth|/sem-paid-growth|SEM/Paid Growth|SEM y Paid Growth" app docs .agents next.config.ts
if ($remaining) {
  $allowed = $remaining | Select-String 'next\.config\.ts|docs[\\/]superpowers[\\/]plans[\\/]2026-09-05-google-ads-migration\.md|docs[\\/]forms-and-leads\.md|docs[\\/]site-architecture\.md'
  $unexpected = $remaining | Where-Object { $_ -notmatch 'next\.config\.ts|docs[\\/]superpowers[\\/]plans[\\/]2026-09-05-google-ads-migration\.md|docs[\\/]forms-and-leads\.md|docs[\\/]site-architecture\.md' }
  if ($unexpected) { throw "Unexpected old SEM references remain:`n$unexpected" }
}
```

- [ ] **Step 2: Run check to verify it fails**

Expected: FAIL if any internal pages or route docs still point at the old URL.

- [ ] **Step 3: Update links and docs**

Replace internal links to `/agencia-marketing-digital/sem-paid-growth` with `/agencia-marketing-digital/google-ads`. Update `docs/site-architecture.md` hierarchy, SEO cluster relationships, Marketing Digital Cluster list, and redirect table. Update `.agents/seo-context.md` only if it names SEM as a live detail page rather than a general service category.

- [ ] **Step 4: Run the old-link check, lint, build, and browser-level redirect/sitemap checks**

Commands:

```powershell
npm.cmd run lint
npm.cmd run build
```

Then run a local production server and verify:

```text
/agencia-marketing-digital/google-ads returns 200 and has canonical /agencia-marketing-digital/google-ads
/sem-paid-growth redirects to /agencia-marketing-digital/google-ads
/agencia-marketing-digital/sem-paid-growth redirects to /agencia-marketing-digital/google-ads
/sitemap.xml includes /agencia-marketing-digital/google-ads and excludes sem-paid-growth
```
