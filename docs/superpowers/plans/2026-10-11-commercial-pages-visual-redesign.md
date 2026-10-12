# Commercial Pages Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Google Ads, national SEO and Landing Pages commercial pages with distinct photographic heroes and clearer editorial sections, while preserving their conversion and SEO behavior.

**Architecture:** Keep each page server-rendered and route-owned. Use three optimized local WebP assets and page-scoped CSS modules; preserve existing shared navigation, form and metadata contracts. Replace repeated card grids with semantic HTML sections and diagrams that remain readable without images.

**Tech Stack:** Next.js 16.4 App Router, React 19, Tailwind 4, CSS Modules, `next/image`, lucide-react, Node test runner and Playwright Chromium.

**Spec:** `docs/superpowers/specs/2026-10-11-commercial-pages-visual-redesign-design.md`

## Global Constraints

- Work only in `C:/Users/USUARIO/.codex/worktrees/commercial-visual-redesign/pagina-agencia` on `codex/commercial-visual-redesign`; preserve the dirty primary checkout.
- Do not edit `app/globals.css` while the separate mobile-navigation task owns it. Recheck Git and agent state before integration.
- Keep the routes, canonicals, sitemap, schema, breadcrumbs, section anchors, CTA destinations, lead payloads and form success behavior unchanged.
- No invented metrics, testimonials, offices, Google interfaces or time promises. Remove the Landing Pages `24h` claim and the SEO hero `24-48h` badge.
- Hero images live under `public/images/`, are local WebP files with clear usage rights, at least 1600px wide and preferably under 500KB each. Render them with `next/image`, `fill`, `sizes="100vw"` and `fetchPriority="high"`; do not use deprecated `priority`.
- Test viewport compositions at `1440x900`, `390x844` and a medium width. Next-section content must peek below the hero without clipping the H1 or CTA.
- Before code edits, consult the installed `node_modules/next/dist/docs/01-app/` guides for CSS and Image. Run `npm.cmd run lint` after code changes and `npm.cmd run build` for this app-structure change.

## Review Focus

- A `320px` viewport with the long SEO H1 and contact email must have no horizontal overflow; Task 3 adds a browser assertion.
- A hero WebP that fails to load or crops over the text must not pass merely because its file exists; Tasks 1, 2 and 4 add image-load and desktop/mobile screenshot checks.
- Sticky headers can hide `#auditoria-google-ads`, `#auditoria-seo` or `#auditoria-landing-pages-form`; Task 6 clicks and checks those destinations.
- Existing `.landing-light` rules can override new hero/contact colors; Tasks 2 and 6 measure computed foreground/background contrast in the browser.
- Changing the shared SEO form's contact variant could wash out local SEO pages; Task 2 checks `/seo/local` and one city page as controls.

---

### Task 1: Google Ads Hero and Navigation

**Files:**
- Modify: `app/agencia-marketing-digital/google-ads/page.tsx:328-447`
- Modify: `app/agencia-marketing-digital/google-ads/google-ads.module.css`
- Create: `public/images/google-ads-hero-editorial.webp`
- Create: `tests/commercial-visual-redesign.test.mjs`
- Test: `tests/e2e/commercial-redesign.spec.ts`

**Interfaces:** Consumes the existing `pagePath`, `LandingServicesMenu` and `#auditoria-google-ads` anchor. Produces no shared API; Task 6 relies on a hero `<Image>` with source `/images/google-ads-hero-editorial.webp` and an accessible H1/CTA.

- [ ] **Step 1: Write failing tests.** In `tests/commercial-visual-redesign.test.mjs`, assert that the Google Ads source no longer renders `PageLinksNav` or `journeyPanel`, retains its existing `/diseno-landing-pages` related-service route, names the new hero asset, and has a nonempty WebP file. In `tests/e2e/commercial-redesign.spec.ts`, assert hero image `naturalWidth > 0`, H1 and audit CTA visibility at desktop and mobile widths.
- [ ] **Step 2: Confirm red.** Run `node --import tsx --test tests/commercial-visual-redesign.test.mjs`; expect the new source assertions to fail on the old hero.
- [ ] **Step 3: Implement.** Generate an editorial campaign-analysis image with no legible fake dashboard data; optimize to WebP using the installed `sharp`. Replace the two-column hero and panel with one full-bleed section, scoped overlay and responsive focal position. Remove only this page's `PageLinksNav`; retain breadcrumb, primary and secondary CTA, related-services link and the useful search → lead explanation in the existing process copy.
- [ ] **Step 4: Verify and commit.** Run the focused Node test, `npm.cmd run lint`, then build and run the focused Playwright test against this worktree's own server/port. Inspect `1440x900` and `390x844` screenshots before committing only Task 1 paths with `feat: redesign Google Ads hero`.

### Task 2: SEO Hero and Contact Contrast

**Files:**
- Modify: `app/seo/page.tsx:244-334` and `:533-555`
- Create: `app/seo/seo.module.css`
- Modify: `app/components/SeoAuditForm.tsx:22-25,54,210`
- Create: `public/images/seo-hero-editorial.webp`
- Modify: `tests/commercial-visual-redesign.test.mjs`
- Modify: `tests/e2e/commercial-redesign.spec.ts`

**Interfaces:** Extend `SeoAuditFormProps` with `contactDark?: boolean`, default `true`; `/seo` passes `false`, all existing local and SME callers retain their current default. Task 3 extends the route-owned `seo.module.css` and keeps `#servicio`, `#proceso`, `#seo-local`, `#faq` and `#auditoria-seo`.

- [ ] **Step 1: Write failing tests.** Assert the national SEO page lacks `seo-audit-panel` and the three hero `<dl>` cards, uses `/images/seo-hero-editorial.webp`, passes `contactDark={false}`, and no other `SeoAuditForm` caller changes. Browser tests assert image load, CTA/H1 visibility and phone/email computed contrast on `/seo`, plus unchanged contact display on `/seo/local` and `/seo/madrid`.
- [ ] **Step 2: Confirm red.** Run the focused Node test; expect the new hero and contact assertions to fail.
- [ ] **Step 3: Implement.** Create a photographic SEO-work hero and page-scoped overlay; remove the panel, badge and mini-cards. Keep breadcrumb, H1, description and CTA. Wire the explicit form color variant through `SeoAuditForm` to `ContactOptions`, without changing validation or payload behavior. Scope colors so `.landing-light` cannot wash out hero text.
- [ ] **Step 4: Verify and commit.** Run focused Node tests, lint, build and the relevant Playwright tests; inspect desktop/mobile crops and contact contrast. Commit only Task 2 paths with `feat: redesign SEO hero and fix contact contrast`.

### Task 3: SEO Editorial Body

**Files:**
- Modify: `app/seo/page.tsx:19-85,336-514`
- Modify: `app/seo/seo.module.css`
- Modify: `tests/commercial-visual-redesign.test.mjs`
- Modify: `tests/e2e/commercial-redesign.spec.ts`

**Interfaces:** Uses the SEO hero styles from Task 2, preserves `relatedSeoLinks` and the SEO technical destination `/agencia-marketing-digital/seo-tecnico-arquitectura-entidades`. Produces the existing section IDs and no new shared component.

- [ ] **Step 1: Write failing tests.** Assert the four `systemBlocks` cards, separate `difference-title` section, repeated audience cards and five generic process cards are replaced by semantic diagnosis/system/timeline/situations structures. Browser tests assert the SEO technical link works, headings remain in order, and the page has no horizontal overflow at `320`, `390` or `768` pixels.
- [ ] **Step 2: Confirm red.** Run the focused Node test and record expected failures for the old card structures.
- [ ] **Step 3: Implement.** Merge problem and differentiation into one unframed diagnostic journey; show the four pillars as a connected, accessible system; render process as a vertical sequence with a concrete output per stage; turn audience into distinct starting situations. Keep `/seo-para-pymes` as a related route rather than making the national page own SME intent. Preserve service checklist, related links, local links, FAQ and audit form.
- [ ] **Step 4: Verify and commit.** Run focused Node tests, lint, build and SEO Playwright checks; inspect complete page screenshots for repetitive rhythm and mobile legibility. Commit Task 3 paths with `feat: rebuild SEO editorial sections`.

### Task 4: Landing Pages Hero and Navigation

**Files:**
- Modify: `app/diseno-landing-pages/page.tsx:328-401`
- Create: `app/diseno-landing-pages/landing-pages.module.css`
- Create: `public/images/landing-pages-hero-editorial.webp`
- Modify: `tests/commercial-visual-redesign.test.mjs`
- Modify: `tests/e2e/commercial-redesign.spec.ts`

**Interfaces:** Retains `#auditoria-landing-pages-form` and canonical `pagePath`; Task 5 reuses the route-owned CSS module and may place the existing `/images/landing-pages-conversion-hero.png` illustration below the hero.

- [ ] **Step 1: Write failing tests.** Assert this page no longer renders `PageLinksNav`, `hero-visual-frame`, `landingChecks` hero cards or the `Sin permanencia...24h` claim; assert the new hero source. Browser tests verify H1/CTA and loaded image at desktop/mobile widths.
- [ ] **Step 2: Confirm red.** Run the focused Node test; expect old-hero assertions to fail.
- [ ] **Step 3: Implement.** Generate a distinct editorial image showing a landing in context without fake performance figures. Render a full-bleed hero with accessible HTML copy and responsive crop, remove the second navigation strip and 24h sentence, and move the three short hero messages into existing later sections rather than creating another card band.
- [ ] **Step 4: Verify and commit.** Run focused tests, lint, build and Landing Pages Playwright checks; inspect desktop/mobile hero. Commit Task 4 paths with `feat: redesign landing pages hero`.

### Task 5: Landing Pages Problem and Solution

**Files:**
- Modify: `app/diseno-landing-pages/page.tsx:403-505`
- Modify: `app/diseno-landing-pages/landing-pages.module.css`
- Modify: `tests/commercial-visual-redesign.test.mjs`
- Modify: `tests/e2e/commercial-redesign.spec.ts`

**Interfaces:** Consumes the CSS module and existing illustration from Task 4; keeps `#problema`, `#solucion`, `#para-quien` and `#incluye` so header navigation and deep links survive.

- [ ] **Step 1: Write failing tests.** Assert the four `problemPoints` cards and six `solutionBlocks` cards are absent, the landing anatomy and three moments are present as real text, and all four section IDs survive. Browser tests verify headings and the explanatory diagram at desktop/mobile widths without overflow or unreadable labels.
- [ ] **Step 2: Confirm red.** Run the focused Node test and record expected failures.
- [ ] **Step 3: Implement.** Build a page-anatomy explanation with four annotated friction points, then answer it with message/action/learning as three visually distinct bands or columns. Fold the former hero checks into audience, includes and solution copy. Deduplicate `Qué trabajamos` so it adds scope instead of repeating the solution; reuse the existing illustration only if its placement improves explanation.
- [ ] **Step 4: Verify and commit.** Run focused tests, lint, build and Landing Pages Playwright checks; inspect full-page rhythm and mobile text. Commit Task 5 paths with `feat: rebuild landing page narrative`.

### Task 6: Cross-Page Quality and Handoff

**Files:**
- Modify: `tests/e2e/commercial-redesign.spec.ts`
- Modify: `docs/design.md` only for durable hero/section rules that the implementation establishes
- Modify: `docs/navigation.md` only if its secondary-bar guidance needs aligning

**Interfaces:** Consumes all five previous tasks. Produces no runtime API or route changes.

- [ ] **Step 1: Add integration checks.** In Playwright, click each hero CTA and assert its target heading/form is visible below the sticky header; verify phone/mail links, tab focus and escape behavior, image load, computed text contrast, no horizontal overflow and reduced-motion behavior at `320`, `390`, `768` and `1440` widths.
- [ ] **Step 2: Run the checks and fix any failures.** Use a production build on an unused port with `PLAYWRIGHT_BASE_URL`; keep fixes in owned route files/CSS modules and preserve the other chat's `app/globals.css` work. If the checks already pass, record that rather than forcing a failure.
- [ ] **Step 3: Run complete verification.** `npm.cmd test`, `npm.cmd run lint`, `npm.cmd run build`, then the full Playwright Chromium suite. Capture and inspect desktop/mobile screenshots and verify the three canonical routes, breadcrumbs and SEO technical link; do not submit a live lead.
- [ ] **Step 4: Reconcile and document.** Fetch `origin/main`, inspect newer commits/PRs/worktrees and integrate without overwriting the other chat. Update only the relevant design/navigation docs, run `git diff --check`, and commit the final scoped fixes/docs with `test: verify commercial visual redesign`.
