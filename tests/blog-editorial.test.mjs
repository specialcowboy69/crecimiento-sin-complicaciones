import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test } from "node:test";

import { BlogMarkdown } from "../app/blog/_components/BlogMarkdown.tsx";

test("Markdown headings render stable, unique anchors for accents and repeats", () => {
  const body = [
    "## Qué medir",
    "### [SEO técnico](/seo) y `datos`",
    "## Qué medir",
    "## Que medir-2",
    "## Qué medir",
  ].join("\n\n");
  const html = renderToStaticMarkup(React.createElement(BlogMarkdown, { body }));

  assert.match(html, /<h2 id="articulo-que-medir">Qué medir<\/h2>/);
  assert.match(html, /<h3 id="articulo-seo-tecnico-y-datos">/);
  assert.match(html, /<h2 id="articulo-que-medir-2">Qué medir<\/h2>/);
  assert.match(html, /<h2 id="articulo-que-medir-2-2">Que medir-2<\/h2>/);
  assert.match(html, /<h2 id="articulo-que-medir-3">Qué medir<\/h2>/);
});

test("outline links mirror body H2/H3 anchors, including a Markdown H1 downgrade", async () => {
  const { getBlogArticleOutline } = await import("../app/lib/blog/articleStructure.ts");
  const { ArticleContents } = await import("../app/blog/_components/ArticleContents.tsx");
  const body = "# Intro\n\n## Qué medir\n\n### 1. Datos\n\n## Qué medir";
  const headings = getBlogArticleOutline(body);
  const articleHtml = renderToStaticMarkup(React.createElement(BlogMarkdown, { body }));
  const contentsHtml = ["desktop", "mobile"]
    .map((mode) => renderToStaticMarkup(React.createElement(ArticleContents, { headings, mode })))
    .join("");

  assert.deepEqual(headings, [
    { depth: 2, text: "Intro", id: "articulo-intro" },
    { depth: 2, text: "Qué medir", id: "articulo-que-medir" },
    { depth: 3, text: "1. Datos", id: "articulo-1-datos" },
    { depth: 2, text: "Qué medir", id: "articulo-que-medir-2" },
  ]);
  assert.equal((articleHtml.match(/<h1\b/g) ?? []).length, 0);
  for (const heading of headings) {
    assert.match(articleHtml, new RegExp(`id="${heading.id}"`));
    assert.match(contentsHtml, new RegExp(`href="#${heading.id}"`));
  }
  assert.equal((contentsHtml.match(/href="#articulo-/g) ?? []).length, headings.length * 2);
});

test("nested Markdown headings share document-order IDs and never render an H1", async () => {
  const { getBlogArticleOutline } = await import("../app/lib/blog/articleStructure.ts");
  const body = [
    "## Qué medir",
    "> # Nota útil",
    "> ## Qué medir",
    "> ### 1. Señal",
    "## Qué medir",
    "- Elemento",
    "  ### Dentro de lista",
  ].join("\n\n");
  const headings = getBlogArticleOutline(body);
  const articleHtml = renderToStaticMarkup(React.createElement(BlogMarkdown, { body }));

  assert.deepEqual(headings, [
    { depth: 2, text: "Qué medir", id: "articulo-que-medir" },
    { depth: 2, text: "Nota útil", id: "articulo-nota-util" },
    { depth: 2, text: "Qué medir", id: "articulo-que-medir-2" },
    { depth: 3, text: "1. Señal", id: "articulo-1-senal" },
    { depth: 2, text: "Qué medir", id: "articulo-que-medir-3" },
    { depth: 3, text: "Dentro de lista", id: "articulo-dentro-de-lista" },
  ]);
  assert.equal((articleHtml.match(/<h1\b/g) ?? []).length, 0);
  assert.deepEqual(
    [...articleHtml.matchAll(/<h[23] id="([^"]+)"/g)].map((match) => match[1]),
    headings.map((heading) => heading.id),
  );
});

test("contents nest H3 links under their H2 and retain a leading H3", async () => {
  const { ArticleContents } = await import("../app/blog/_components/ArticleContents.tsx");
  const headings = [
    { depth: 3, text: "Antes", id: "articulo-antes" },
    { depth: 2, text: "Primera parte", id: "articulo-primera-parte" },
    { depth: 3, text: "Uno", id: "articulo-uno" },
    { depth: 3, text: "Dos", id: "articulo-dos" },
    { depth: 2, text: "Segunda parte", id: "articulo-segunda-parte" },
  ];

  for (const mode of ["desktop", "mobile"]) {
    const html = renderToStaticMarkup(React.createElement(ArticleContents, { headings, mode }));
    assert.match(
      html,
      /<ol><li><a href="#articulo-antes">Antes<\/a><\/li><li><a href="#articulo-primera-parte">Primera parte<\/a><ol><li><a href="#articulo-uno">Uno<\/a><\/li><li><a href="#articulo-dos">Dos<\/a><\/li><\/ol><\/li><li><a href="#articulo-segunda-parte">Segunda parte<\/a><\/li><\/ol>/,
    );
  }
});

test("empty articles do not render a section index", async () => {
  const { ArticleContents } = await import("../app/blog/_components/ArticleContents.tsx");
  const html = renderToStaticMarkup(React.createElement(ArticleContents, { headings: [] }));
  assert.equal(html, "");
});

test("only the first En resumen convention gets summary styling", () => {
  const body = "> **En resumen**\n> - Primera idea\n\n> Cita normal\n\n> **En resumen**\n> - Otra idea";
  const html = renderToStaticMarkup(React.createElement(BlogMarkdown, { body }));

  assert.equal((html.match(/blog-summary/g) ?? []).length, 1);
  assert.equal((html.match(/<blockquote/g) ?? []).length, 3);
  assert.equal((html.match(/Primera idea/g) ?? []).length, 1);
  const ordinary = renderToStaticMarkup(React.createElement(BlogMarkdown, { body: "> Una cita normal" }));
  assert.doesNotMatch(ordinary, /blog-summary/);
});

test("standalone Markdown SVG renders once as a figure with its alt text", () => {
  const body = '![Secuencia de lanzamiento](/images/blog/secuencia.svg "Fases del lanzamiento")';
  const html = renderToStaticMarkup(React.createElement(BlogMarkdown, { body }));

  assert.match(html, /<figure><img[^>]*alt="Secuencia de lanzamiento"[^>]*><figcaption>Fases del lanzamiento<\/figcaption><\/figure>/);
});

test("a closing service invitation suppresses the repeated template CTA", async () => {
  const { hasClosingServiceInvitation } = await import("../app/lib/blog/articleStructure.ts");
  assert.equal(
    hasClosingServiceInvitation(
      "## Conclusión\n\nNuestro [servicio de SEO](/seo) comienza con una auditoría gratuita.",
      "/seo",
    ),
    true,
  );
  assert.equal(hasClosingServiceInvitation("## Datos\n\nLa respuesta depende del proyecto.", "/seo"), false);
  assert.equal(
    hasClosingServiceInvitation("## Próximos pasos\n\n- Revisar el sitio\n- Pedir la [auditoría gratuita](/#auditoria)", "/seo"),
    true,
  );
});
