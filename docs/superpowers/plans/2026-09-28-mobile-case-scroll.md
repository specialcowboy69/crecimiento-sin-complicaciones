# Mobile Case Carousel Scroll Implementation Plan

> **Status:** Implemented.
> **Historical record:** The checklist below is preserved as the original implementation plan; unchecked items do not represent pending work.
> **Git history:** Implemented in commit [`db83838a3e176b9f83cca8e5ee54361e413fe344`](https://github.com/specialcowboy69/crecimiento-sin-complicaciones/commit/db83838a3e176b9f83cca8e5ee54361e413fe344), merged into `main` through [PR #5](https://github.com/specialcowboy69/crecimiento-sin-complicaciones/pull/5) as merge commit [`93b4e5ff566ead592e79d533b9620c13c6d2f105`](https://github.com/specialcowboy69/crecimiento-sin-complicaciones/commit/93b4e5ff566ead592e79d533b9620c13c6d2f105) on 2026-09-28.

> **Historical instruction (superseded):** The original plan required agentic workers to use `superpowers:subagent-driven-development` or `superpowers:executing-plans` task by task. That instruction is preserved for context and must not be followed for completed work.

**Goal:** Restore vertical page scrolling for touch gestures that begin over the home-page case-study carousel while retaining native horizontal carousel scrolling.

**Architecture:** The investigation isolated a single restrictive CSS declaration on `.case-track`; no gesture JavaScript or overlay is involved. Remove only that declaration, leaving native `overflow-x` and scroll snap unchanged. A source-level Node test prevents reintroducing a touch-action value that excludes vertical scrolling, and browser verification exercises both axes on mobile.

**Tech Stack:** Next.js 16 App Router, React 19, global CSS, Node built-in test runner.

**Spec:** User request in this conversation (2026-09-28); no separate written specification.

## Global Constraints

- Change only the confirmed root cause in `app/globals.css`; do not alter routes, carousel content, or unrelated scroll containers.
- Preserve `.case-track` horizontal scrolling and `scroll-snap-type: x mandatory`.
- Do not add browser-test dependencies; use the existing Node test runner for the regression guard.
- Validate the complete test suite, lint, production build, and mobile browser behavior before reporting completion.
- Do not push, create a PR, merge, or deploy unless the user asks.

## Review Focus

- A vertical swipe beginning over every part of a case card must move the document; browser mobile verification owns this.
- A horizontal swipe over a case card must still move the case track; browser mobile verification owns this.
- The dot and previous/next controls must remain operable; browser mobile verification owns this.
- The track must retain native horizontal overflow and mandatory snap; the source regression test owns this.
- No other component may retain a `touch-action` value that excludes vertical panning; the source regression test owns this.

### Task 1: Restore native touch scrolling for the case carousel

**Files:**
- Create: `tests/mobile-scroll.test.mjs`
- Modify: `app/globals.css:746-756`

**Interfaces:**
- Consumes: `.case-track` rendered by `CaseCarousel` in `app/components/CaseCarousel.tsx`.
- Produces: Native browser touch handling for vertical document scroll and horizontal track scroll.

- [ ] **Step 1: Write the failing regression test**

Create `tests/mobile-scroll.test.mjs` with a test named `case carousel preserves vertical touch panning and horizontal snap`. It must read `app/globals.css`, extract the `.case-track` rule, assert `overflow-x: auto` and `scroll-snap-type: x mandatory` remain, and assert the rule has no `touch-action` declaration. Add a second test named `app sources do not exclude vertical touch panning` that scans source files under `app/` and rejects `touch-action` values `none`, `pan-x`, `pan-left`, or `pan-right`, including corresponding Tailwind utility classes.

- [ ] **Step 2: Run the regression test to verify it fails**

Run: `node --test tests/mobile-scroll.test.mjs`

Expected: FAIL because `.case-track` currently contains `touch-action: pan-x`.

- [ ] **Step 3: Remove the restrictive `.case-track` touch-action declaration**

Delete only `touch-action: pan-x;` from `app/globals.css`. Do not replace it with another touch-action value and do not change `overflow-x`, `overflow-y`, spacing, or snap declarations.

- [ ] **Step 4: Run the regression test to verify it passes**

Run: `node --test tests/mobile-scroll.test.mjs`

Expected: PASS for both regression checks.

- [ ] **Step 5: Verify the application and commit**

Run: `npm.cmd test`, `npm.cmd run lint`, and `npm.cmd run build`. Start the production build locally and at a mobile viewport verify vertical, horizontal, diagonal, controls, local-review carousel, and comparison-table interactions. Commit only `app/globals.css` and `tests/mobile-scroll.test.mjs` with message `fix: restore mobile scroll in case carousel`.
