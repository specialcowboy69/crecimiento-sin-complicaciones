# Blog Foundation Core Implementation Plan

> Execution scope: phase 1 of the approved two-phase launch. The editorial drafts remain isolated in `codex/blog-content-drafts` and are not copied into this worktree.

**Goal:** Build a validated Markdown blog core without publishing an empty blog or exposing navigation, sitemap, category, or RSS signals before the first three articles are approved.

**Source documents:**

- `C:/Users/USUARIO/Downloads/seo-skills/companies/pagina-agencia/blog-foundation-spec-2026-10-04.md`
- `C:/Users/USUARIO/Downloads/seo-skills/docs/superpowers/plans/2026-10-04-pagina-agencia-blog-foundation.md`

**Repository:** `C:/Users/USUARIO/.codex/worktrees/blog-foundation-core/pagina-agencia`

## Scope Decisions

- Keep `content/blog/` empty in this worktree except for `.gitkeep`.
- A blog is public only when at least three valid, non-draft, non-future articles exist.
- Date-only publication checks use the `Europe/Madrid` calendar date.
- Implement `/blog` and `/blog/[slug]`, but make them return 404 while the publication gate is closed.
- Defer `/blog/categoria/[categoria]`, `/blog/feed.xml`, sitemap entries, and global navigation/footer links to phase 2.
- Do not modify the editorial worktree or its three draft articles.

### Task 1: Remove broken editorial links

**Files:**

- Modify: `app/agencia-marketing-digital/seo-tecnico-arquitectura-entidades/page.tsx`
- Test: `tests/blog-foundation-links.test.mjs`

1. Add a failing source test for the two nonexistent `/blog/...` links.
2. Remove the links without replacing them with invented routes.
3. Run the focused test.

### Task 2: Implement the validated Markdown repository

**Files:**

- Modify: `package.json`, `package-lock.json`
- Create: `content/blog/.gitkeep`
- Create: `app/lib/blog/types.ts`
- Create: `app/lib/blog/categories.ts`
- Create: `app/lib/blog/frontmatter.ts`
- Create: `app/lib/blog/repository.ts`
- Create: `app/lib/blog/publication.ts`
- Create: `app/lib/blog/index.ts`
- Test: `tests/blog-content.test.mjs`

1. Write failing tests for required frontmatter, filename-derived slugs, malformed dates, duplicate/unknown related slugs, publication dates, cover assets, ordering, and the three-post gate.
2. Install `gray-matter`, `zod`, and `tsx`.
3. Implement strict parsing and repository helpers.
4. Run the focused tests.

### Task 3: Build the gated blog routes and schemas

**Files:**

- Modify: `package.json`, `package-lock.json`
- Create: `app/lib/blog/schema.ts`
- Create: `app/blog/page.tsx`
- Create: `app/blog/layout.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/blog/blog.module.css`
- Create: `app/blog/_components/BlogPostCard.tsx`
- Create: `app/blog/_components/BlogMarkdown.tsx`
- Test: `tests/blog-routes.test.mjs`

1. Write failing tests for the shared publication gate, route metadata, static params, canonical URLs, Article schema, breadcrumbs, and safe Markdown rendering.
2. Install `react-markdown` and `remark-gfm`.
3. Implement the server-rendered hub and article routes.
4. Keep category labels as text until phase 2 creates category archives.
5. Run the focused tests.

### Task 4: Document and verify the closed launch state

**Files:**

- Modify: `docs/site-architecture.md`
- Create: `app/not-found.tsx`
- Test: `tests/blog-foundation.spec.ts`

1. Document the two-phase activation boundary and frontmatter contract.
2. Verify `/blog` and arbitrary article URLs return 404 with an empty repository.
3. Verify the removed links no longer render.
4. Run `npm run test`, `npm run lint`, `npm run build`, and the focused Playwright test.
5. Review the complete diff and confirm phase-2 surfaces remain unchanged.

## Phase 2 Boundary

Phase 2 starts only after the three editorial drafts are reviewed and intentionally promoted. It will merge or recreate approved content in the implementation branch, switch `draft` to `false`, replace provisional dates, add verified cover assets and related slugs, then activate navigation, category archives, RSS, sitemap entries, and their HTTP/E2E coverage through the same publication gate.
