# Route Scroll Behavior Design

**Status:** Approved in chat on 2026-10-03

## Objective

Make client-side navigation between Next.js routes arrive at the new page
without animating the document from its previous scroll position, while
preserving smooth scrolling for in-page hash links such as `#precios`, `#faq`,
and `#auditoria`.

## Confirmed Cause

The application applies `scroll-behavior: smooth` to the root `html` element.
Next.js 16 no longer overrides that CSS property during SPA route transitions
unless the root element opts into the compatibility behavior with
`data-scroll-behavior="smooth"`.

## Approved Implementation

- Add `data-scroll-behavior="smooth"` to the root `<html>` element in
  `app/layout.tsx`.
- Keep the existing global `scroll-behavior: smooth` and
  `scroll-padding-top: 92px` declarations so same-page hash navigation remains
  smooth and clears the fixed header.
- Add a `prefers-reduced-motion: reduce` override that sets the root scroll
  behavior to `auto` for visitors who request reduced motion.
- Do not alter the independent `.case-track` horizontal carousel scrolling.

## Verification

- A source-level regression test must pin the root data attribute, the existing
  smooth hash behavior, the header offset, and the reduced-motion override.
- Run the focused regression test, the full Node test suite, lint, and the
  production build.
- In a browser, verify that route changes reach the new page without a visible
  upward animation and that same-page hash links still scroll smoothly.

## Out Of Scope

- Replacing Next.js `Link` components or disabling their default scroll logic.
- Adding custom router events, `scrollTo`, or `scrollIntoView` JavaScript.
- Changing routes, navigation labels, section IDs, carousel behavior, SEO
  metadata, deployment settings, or unrelated local documentation changes.
- Committing, pushing, deploying, or merging without a separate user request.
