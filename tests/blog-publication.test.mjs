import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

import { getAllBlogPosts, getPublishedPosts, isBlogPublished } from "../app/lib/blog/index.ts";
import { escapeXml } from "../app/lib/blog/xml.ts";
import sitemapModule from "../app/sitemap.ts";

const publicationDate = "2026-10-08";
const now = new Date("2026-10-08T19:30:00.000Z");
const canonicalOrigin = "https://www.crecimientosincomplicaciones.com";
const launchSlugs = [
  "como-ampliar-tematica-web-sin-perder-foco-seo",
  "como-lanzar-una-web-nueva-sin-comprometer-seo",
  "domain-rating-como-evaluar-backlinks",
];

test("the three editorial articles are publishable today with real WebP covers", async () => {
  const posts = getAllBlogPosts();
  const published = getPublishedPosts({ now });

  assert.ok(posts.length >= launchSlugs.length);
  assert.equal(isBlogPublished(published), true);

  for (const slug of launchSlugs) {
    const post = published.find((candidate) => candidate.slug === slug);
    assert.ok(post, `${slug} should be published`);
    assert.equal(post.publishedAt, publicationDate);
    assert.equal(post.draft, false);
    assert.ok(post.relatedSlugs.length > 0);
    const cover = await readFile(path.join(process.cwd(), "public", post.coverImage));
    assert.equal(cover.toString("ascii", 0, 4), "RIFF");
    assert.equal(cover.toString("ascii", 8, 12), "WEBP");
  }
});

test("sitemap lists the blog, active SEO category and its three canonical articles", () => {
  const urls = sitemapModule.default().map((entry) => entry.url);
  const blogUrls = urls.filter((url) => url.startsWith(`${canonicalOrigin}/blog`));

  assert.ok(blogUrls.includes(`${canonicalOrigin}/blog`));
  assert.ok(blogUrls.includes(`${canonicalOrigin}/blog/categoria/seo`));
  assert.ok(!blogUrls.some((url) => url.includes("/blog/categoria/google-ads")));
  for (const slug of launchSlugs) {
    assert.ok(blogUrls.includes(`${canonicalOrigin}/blog/${slug}`));
  }
  assert.ok(blogUrls.every((url) => !url.endsWith("/")));
});

test("RSS contains only published canonical articles and escapes XML", async () => {
  const routeModule = await import("../app/blog/feed.xml/route.ts");
  const GET = routeModule.GET ?? routeModule.default?.GET;
  const response = await GET();
  const xml = await response.text();

  assert.equal(
    escapeXml('A & B <C> "D" \'E\''),
    "A &amp; B &lt;C&gt; &quot;D&quot; &apos;E&apos;",
  );
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/rss\+xml/);
  assert.match(xml, /<rss version="2\.0">/);
  assert.ok((xml.match(/<item>/g) ?? []).length >= launchSlugs.length);
  assert.match(xml, /https:\/\/www\.crecimientosincomplicaciones\.com\/blog\/domain-rating-como-evaluar-backlinks/);
  assert.doesNotMatch(xml, /<script|&(?!(?:amp|lt|gt|quot|apos);)/);
});

test("global blog links share the publication gate", async () => {
  const files = await Promise.all(
    ["app/layout.tsx", "app/page.tsx", "app/components/PageLinksNav.tsx", "app/components/SiteFooter.tsx"]
      .map((file) => readFile(path.join(process.cwd(), file), "utf8")),
  );

  assert.match(files[0], /<SiteFooter showBlog=\{isBlogPublished\(\)\}/);
  assert.match(files[1], /isBlogPublished\(\) \? <Link href="\/blog">/);
  assert.match(files[2], /page\.href !== "\/blog" \|\| showBlog/);
  assert.match(files[3], /showBlog \? <Link href="\/blog">/);
});
