import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test } from "node:test";

import { BlogMarkdown } from "../app/blog/_components/BlogMarkdown.tsx";
import {
  blogArticleJsonLd,
  blogCategoryJsonLd,
  blogHomeJsonLd,
} from "../app/lib/blog/schema.ts";

const samplePost = {
  slug: "auditoria-seo",
  title: "Cómo preparar una auditoría SEO",
  description: "Una guía práctica para priorizar una auditoría SEO.",
  publishedAt: "2026-10-01",
  category: "seo",
  draft: false,
  authorId: "equipo",
  coverImage: "/images/blog/auditoria-seo/cover.webp",
  coverImageAlt: "Panel con datos de una auditoría SEO",
  primaryKeyword: "auditoria seo",
  relatedService: "/seo",
  relatedSlugs: [],
  tags: ["seo", "auditoria"],
  body: "Contenido",
  readingTimeMinutes: 4,
};

test("blog home schema uses canonical entities and absolute post URLs", () => {
  const schema = blogHomeJsonLd([samplePost]);
  const types = schema["@graph"].map((entry) => entry["@type"]);
  const itemList = schema["@graph"].find((entry) => entry["@type"] === "ItemList");

  assert.deepEqual(types, ["CollectionPage", "Blog", "ItemList", "BreadcrumbList"]);
  assert.equal(
    itemList.itemListElement[0].url,
    "https://www.crecimientosincomplicaciones.com/blog/auditoria-seo",
  );
  assert.equal(schema["@graph"][1].publisher["@id"], "https://www.crecimientosincomplicaciones.com/#organization");
});

test("article schema omits an invented modified date and reuses the organization", () => {
  const schema = blogArticleJsonLd(samplePost);
  const article = schema["@graph"].find((entry) => entry["@type"] === "BlogPosting");

  assert.equal(article.mainEntityOfPage, "https://www.crecimientosincomplicaciones.com/blog/auditoria-seo");
  assert.equal(article.author["@id"], "https://www.crecimientosincomplicaciones.com/#organization");
  assert.equal(article.publisher["@id"], "https://www.crecimientosincomplicaciones.com/#organization");
  assert.equal("dateModified" in article, false);

  const updatedSchema = blogArticleJsonLd({ ...samplePost, updatedAt: "2026-10-03" });
  const updatedArticle = updatedSchema["@graph"].find((entry) => entry["@type"] === "BlogPosting");
  assert.equal(updatedArticle.dateModified, "2026-10-03");
});

test("category schema lists only its published articles with canonical breadcrumbs", () => {
  const schema = blogCategoryJsonLd("seo", [samplePost]);
  const page = schema["@graph"].find((entry) => entry["@type"] === "CollectionPage");
  const list = schema["@graph"].find((entry) => entry["@type"] === "ItemList");
  const breadcrumbs = schema["@graph"].find((entry) => entry["@type"] === "BreadcrumbList");

  assert.equal(page.url, "https://www.crecimientosincomplicaciones.com/blog/categoria/seo");
  assert.equal(list.numberOfItems, 1);
  assert.equal(list.itemListElement[0].url, "https://www.crecimientosincomplicaciones.com/blog/auditoria-seo");
  assert.equal(breadcrumbs.itemListElement.at(-1).item,
    "https://www.crecimientosincomplicaciones.com/blog/categoria/seo");
});

test("Markdown renderer supports GFM without executing raw HTML", () => {
  const html = renderToStaticMarkup(
    React.createElement(BlogMarkdown, {
      body: "## Tabla\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n<script>alert('x')</script>\n\n[SEO](/seo)",
    }),
  );

  assert.match(html, /<table>/);
  assert.match(html, /href="\/seo"/);
  assert.doesNotMatch(html, /<script>/);
});

test("blog routes share the publication gate and canonical policy", async () => {
  const hubSource = await readFile(path.join(process.cwd(), "app", "blog", "page.tsx"), "utf8");
  const articleSource = await readFile(
    path.join(process.cwd(), "app", "blog", "[slug]", "page.tsx"),
    "utf8",
  );
  const categorySource = await readFile(
    path.join(process.cwd(), "app", "blog", "categoria", "[slug]", "page.tsx"),
    "utf8",
  );

  assert.match(hubSource, /isBlogPublished\(posts\)/);
  assert.match(hubSource, /notFound\(\)/);
  assert.match(hubSource, /canonical:\s*BLOG_PATH/);
  assert.match(hubSource, /\/blog\/categoria\//);

  assert.match(articleSource, /export const dynamicParams = false/);
  assert.match(articleSource, /generateStaticParams/);
  assert.match(articleSource, /params:\s*Promise<\{ slug: string \}>/);
  assert.match(articleSource, /isBlogPublished\(posts\)/);
  assert.match(articleSource, /notFound\(\)/);
  assert.match(categorySource, /export const dynamicParams = false/);
  assert.match(categorySource, /generateStaticParams/);
  assert.match(categorySource, /isBlogPublished\(posts\)/);
  assert.match(categorySource, /notFound\(\)/);
  assert.match(categorySource, /alternates:\s*\{ canonical:/);
});
