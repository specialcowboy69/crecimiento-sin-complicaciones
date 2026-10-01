<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project SEO Rules

Before creating or modifying SEO pages, read `.agents/product-marketing.md`, `.agents/seo-context.md`, `.agents/seo-technical-principles.md`, and `docs/design.md`.

## Task Scope And Coordination

Before preparing or executing a plan, confirm that the project requested by the user, the plan's target repository and the intended checkout/worktree agree. State the repository path you will use. If the target is ambiguous or the plan belongs to another project, clarify the intended scope before editing; do not copy unrelated project work into this repository.

Before editing an existing checkout/worktree or delegating changes, check for known active chats or agents working on the same files, branch, shared Git state or build outputs. Assign non-overlapping ownership and use isolated worktrees when needed. Read-only work and independent tasks may continue safely. If overlapping work is already underway and ownership is unclear, ask the user how to coordinate before writing. Preserve existing tracked and untracked user changes, and stage only files belonging to the current task.

Before merging into `main`, read and follow **Git Merge Preflight** in `docs/deployment.md`. Report earlier unmerged work to the user, identify any decisions needed, and pause the merge until those decisions are resolved. When the review is clean, explicitly report that no earlier work is pending before merging. Do not merge, discard or overwrite earlier work without the user's direction.

## Project Operating Rules

Before changing routes, sitemap entries, redirects, canonicals, breadcrumbs, or internal links, read `docs/site-architecture.md` and `.agents/seo-context.md`.

Before changing headers, navigation, dropdowns, CTAs in the header, or mobile navigation behavior, read `docs/navigation.md` and `docs/design.md`.

Before changing forms, lead payloads, `formType`, `sourcePage`, validation, or admin lead display, read `docs/forms-and-leads.md`.

Before changing production domains, DNS, CDN, Cloudflare, Vercel hosting, canonical host, or deployment settings, read `docs/deployment.md`.

Treat the current site architecture as intentional:

- `/` is the commercial home page with services, cases, pricing, diagnostic section and `Auditoría gratuita` conversion. It is allowed to introduce the main service catalog.
- `/agencia-marketing-digital` is the commercial service hub and replaces the old `/servicios` hub.
- `/agencia-marketing-digital/*` contains the former service detail pages migrated from `/servicios/*`.
- `/seo` is the national SEO money page.
- `/seo-para-pymes` is the SEO for SMEs intermediate page.
- `/seo/{city}` pages are local SEO pages.
- `/diseno-pagina-web-profesional` is the web design money page.
- `/diseno-pagina-web-profesional/*` contains the web design cluster.

Do not invent internal links. Before adding or changing a link to an internal route, verify that the route exists in `app/`, `app/sitemap.ts`, or `next.config.ts` redirects. If the page is planned but not implemented, document it as future work instead of linking to it.

Canonicals and sitemap URLs should follow the project's current no-trailing-slash policy.

When code is changed, run `npm run lint`. Run `npm run build` when the change affects routes, metadata, sitemap, redirects, shared navigation, forms, or other app structure.
