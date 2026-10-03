# Route Scroll Behavior Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make route transitions land immediately at the new page position while preserving smooth in-page hash navigation and honoring reduced-motion preferences.

**Architecture:** Use the Next.js 16 root-layout opt-in that temporarily overrides global smooth scrolling during managed route navigation. Keep native CSS smooth scrolling for hash links, add a reduced-motion override, and pin all three behaviors with a focused source-level regression test.

**Tech Stack:** Next.js 16.2.4 App Router, React 19.2.4, global CSS, Node built-in test runner, ESLint.

**Spec:** `docs/superpowers/specs/2026-10-03-route-scroll-behavior-design.md`

## Global Constraints

- Work only in `C:\Users\USUARIO\Downloads\pagina-agencia`.
- Preserve existing tracked and untracked user changes; do not edit `.agents/seo-context.md`, `README.md`, or `docs/navigation.md`.
- Keep `html { scroll-behavior: smooth; scroll-padding-top: 92px; }` for in-page links and the fixed-header offset.
- Do not change `.case-track { scroll-behavior: smooth; }` or any carousel behavior.
- Use the documented Next.js 16 `data-scroll-behavior="smooth"` mechanism; do not add custom navigation JavaScript.
- Do not change routes, internal links, metadata, sitemap, redirects, forms, dependencies, or deployment configuration.
- Do not commit, push, deploy, or merge without a separate user request.

## Review Focus

- Navigation from a deeply scrolled route must not visibly animate upward; browser verification in Task 1 owns this.
- A same-page hash link must retain smooth scrolling; the source test and browser verification in Task 1 own this.
- Hash targets must retain the `92px` fixed-header offset; the source test and browser verification in Task 1 own this.
- A visitor with `prefers-reduced-motion: reduce` must receive instant scrolling; the source test and browser verification in Task 1 own this.
- The case-study carousel must keep its independent horizontal smooth scrolling; the source test and existing `tests/mobile-scroll.test.mjs` own this.

---

### Task 1: Correct route and hash scroll behavior

**Files:**
- Create: `tests/route-scroll-behavior.test.mjs`
- Modify: `app/layout.tsx:47`
- Modify: `app/globals.css:29-32`

**Interfaces:**
- Consumes: Next.js 16 App Router navigation and the existing root `html` scroll declarations.
- Produces: `<html lang="es" data-scroll-behavior="smooth">`, smooth hash navigation, and an `auto` reduced-motion override.

- [ ] **Step 1: Write the failing source regression tests**

Create `tests/route-scroll-behavior.test.mjs` using `node:test`,
`node:assert/strict`, and `node:fs/promises`. Add tests with these exact names and
assertions:

- `root layout opts into Next.js route scroll override`: read
  `app/layout.tsx` and assert the root `<html>` carries
  `data-scroll-behavior="smooth"`.
- `hash navigation keeps smooth scrolling and the fixed header offset`: read
  `app/globals.css`, extract the root `html` rule, and assert
  `scroll-behavior: smooth` and `scroll-padding-top: 92px`.
- `reduced motion disables smooth document scrolling`: assert a
  `@media (prefers-reduced-motion: reduce)` block contains an `html` rule with
  `scroll-behavior: auto`.
- `case carousel keeps its independent smooth scrolling`: extract the
  `.case-track` rule and assert it still contains `scroll-behavior: smooth`.

- [ ] **Step 2: Run the focused test and confirm the red state**

Run: `node --test tests/route-scroll-behavior.test.mjs`

Expected: FAIL because `app/layout.tsx` lacks the data attribute and
`app/globals.css` lacks the reduced-motion override; the two preservation
checks should already pass.

- [ ] **Step 3: Add the Next.js 16 root-layout opt-in**

Change the root element in `app/layout.tsx` to
`<html lang="es" data-scroll-behavior="smooth">`. Do not modify metadata,
JSON-LD, analytics, consent, footer, or child rendering.

- [ ] **Step 4: Add the reduced-motion CSS override**

Immediately after the existing root `html` rule in `app/globals.css`, add
`@media (prefers-reduced-motion: reduce)` with an `html` rule whose only
declaration is `scroll-behavior: auto;`. Do not alter the original root rule or
the `.case-track` rule.

- [ ] **Step 5: Run the focused test and confirm the green state**

Run: `node --test tests/route-scroll-behavior.test.mjs`

Expected: PASS for all four tests.

- [ ] **Step 6: Run project verification**

Run: `npm.cmd test`

Expected: all Node tests pass, including `tests/mobile-scroll.test.mjs` and the
new route-scroll regression tests.

Run: `npm.cmd run lint`

Expected: exit code 0 with no ESLint errors.

Run: `npm.cmd run build`

Expected: Next.js production build completes successfully.

- [ ] **Step 7: Verify behavior in a browser**

Start the application locally and test at desktop and mobile viewport widths:

- Navigate from a deeply scrolled internal page to another route and confirm
  there is no visible animated climb to the top.
- Activate same-page hash links and confirm smooth movement with targets clear
  of the fixed header.
- Emulate `prefers-reduced-motion: reduce` and confirm hash movement is instant.
- Exercise the case-study carousel and confirm its horizontal scrolling still
  behaves as before.

- [ ] **Step 8: Review the scoped diff**

Run: `git -c safe.directory=C:/Users/USUARIO/Downloads/pagina-agencia diff -- app/layout.tsx app/globals.css tests/route-scroll-behavior.test.mjs docs/superpowers/specs/2026-10-03-route-scroll-behavior-design.md docs/superpowers/plans/2026-10-03-route-scroll-behavior.md`

Expected: only the approved root attribute, reduced-motion rule, regression
test, specification, and plan appear. Leave all unrelated user changes intact
and uncommitted.
