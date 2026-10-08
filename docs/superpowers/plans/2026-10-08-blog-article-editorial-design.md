# Blog Article Editorial Design Implementation Plan

> **For agentic workers:** Execute the tasks below in the isolated blog foundation worktree. Keep the phase-1 publication gate intact.

**Goal:** Turn long-form blog articles into scannable, useful editorial guides without changing their canonical, publication, or frontmatter contracts.

**Architecture:** Improve the shared article template with a structured summary, navigable section index, calmer conversion placement, and responsive typography. Add one article-specific visual to the local launch-SEO preview as a pilot; other drafts remain untouched. Render Markdown through the existing safe renderer and derive section links from its actual heading structure.

**Tech Stack:** Next.js 16 App Router, React 19, CSS modules, react-markdown, remark-gfm, Playwright.

**Spec:** The accepted design direction in the 2026-10-08 conversation, plus `docs/design.md` and `docs/superpowers/plans/2026-10-07-blog-foundation-core.md`.

## Global Constraints

- Work only in `C:/Users/USUARIO/.codex/worktrees/blog-foundation-core/pagina-agencia`.
- Do not edit the editorial worktree, main checkout, global navigation, sitemap, canonical host, or publication gate.
- Keep current required frontmatter unchanged; any new editorial pattern must be optional and work with plain Markdown.
- Preview Markdown and cover assets are temporary untracked copies, not publication-ready articles.
- No generic stock visuals or fabricated facts. One meaningful pilot diagram is enough to establish the pattern.
- Preserve one article H1 and semantic H2/H3 order, keyboard focus, reduced-motion preference, and mobile readability.

## Review Focus

- Repeated or accented headings produce unique, working table-of-contents anchors.
- Missing headings or optional summary do not leave an empty index or broken layout.
- Mobile navigation does not overlap content or cause horizontal overflow.
- The visual has meaningful alternative text and remains legible on mobile.
- Closed blog remains closed when preview copies are absent.

### Task 1: Shared Article Template

**Files:** `app/blog/[slug]/page.tsx`, `app/blog/blog.module.css`, `app/blog/_components/BlogMarkdown.tsx`, new focused helper/component files as needed, and focused tests.

**Interface:** Produce an article page with one H1, a concise summary drawn from existing content or an optional Markdown convention, an accessible section index from H2/H3 headings, balanced text width, and a contextual CTA after the article. Make the index links target IDs rendered by the same heading algorithm.

- [x] Add failing tests for heading extraction, duplicate/Unicode IDs, and rendered anchors.
- [x] Implement the template and responsive CSS without adding required frontmatter.
- [x] Run focused tests, lint, and inspect desktop/mobile rendering.

### Task 2: Launch-SEO Visual Pilot

**Files:** the temporary preview copy `content/blog/como-lanzar-una-web-nueva-sin-comprometer-seo.md` and one asset under its `public/images/blog/...` directory.

**Interface:** Add a concise editorial summary and one genuinely explanatory launch timeline/checklist diagram at the relevant point in the article, using standard Markdown syntax supported by the shared renderer. Do not change the original draft or claim a final publication date.

- [x] Identify the natural insertion point in the existing copy.
- [x] Create the visual with accessible text/alt and add only the necessary Markdown.
- [x] Verify the preview copy still parses and internal links remain valid.

### Task 3: Integration and Review

**Files:** tests only if coverage gaps are discovered.

- [x] Review Task 1 and Task 2 changes for conflicts and unintended SEO/content changes.
- [x] Run `npm.cmd run test:blog`, `npm.cmd run lint`, and `npm.cmd run build`.
- [x] Test the blog and pilot at desktop/mobile sizes, including anchor navigation, images, overflow, and console errors.
- [x] Keep the local preview server available and report the URL, uncommitted state, and remaining editorial integration work.
