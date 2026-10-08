import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, test } from "node:test";

import {
  getActiveCategories,
  getAllBlogPosts,
  getPostBySlug,
  getPostsByCategory,
  getPublishedPosts,
  getRelatedPosts,
  isBlogPublished,
  isCategoryActive,
  parseBlogDocument,
} from "../app/lib/blog/index.ts";

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { force: true, recursive: true }),
    ),
  );
});

function documentSource(slug, overrides = {}, body = "Contenido editorial valido para la prueba.") {
  const data = {
    title: `Titulo ${slug}`,
    description: `Descripcion editorial de ${slug}`,
    publishedAt: "2026-10-01",
    category: "seo",
    draft: false,
    authorId: "equipo",
    coverImage: `/images/blog/${slug}/cover.webp`,
    coverImageAlt: `Imagen de ${slug}`,
    primaryKeyword: `keyword ${slug}`,
    relatedService: "/seo",
    relatedSlugs: [],
    tags: ["seo", "estrategia"],
    ...overrides,
  };

  const yamlValue = (value) => {
    if (Array.isArray(value)) {
      return `[${value.map((item) => JSON.stringify(item)).join(", ")}]`;
    }

    return typeof value === "string" ? JSON.stringify(value) : String(value);
  };

  return `---\n${Object.entries(data)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${yamlValue(value)}`)
    .join("\n")}\n---\n\n${body}\n`;
}

async function createFixture(documents, imageSlugs = []) {
  const root = await mkdtemp(path.join(os.tmpdir(), "pagina-agencia-blog-"));
  temporaryDirectories.push(root);

  const contentDirectory = path.join(root, "content", "blog");
  const publicDirectory = path.join(root, "public");
  await mkdir(contentDirectory, { recursive: true });

  await Promise.all(
    Object.entries(documents).map(([slug, source]) =>
      writeFile(path.join(contentDirectory, `${slug}.md`), source, "utf8"),
    ),
  );

  await Promise.all(
    imageSlugs.map(async (slug) => {
      const imageDirectory = path.join(publicDirectory, "images", "blog", slug);
      await mkdir(imageDirectory, { recursive: true });
      await writeFile(path.join(imageDirectory, "cover.webp"), "fixture", "utf8");
    }),
  );

  return { contentDirectory, publicDirectory };
}

test("parseBlogDocument derives the slug and reading time from a strict document", () => {
  const post = parseBlogDocument({
    fileName: "auditoria-seo.md",
    source: documentSource("auditoria-seo", { updatedAt: "2026-10-02" }, "uno dos tres"),
  });

  assert.equal(post.slug, "auditoria-seo");
  assert.equal(post.updatedAt, "2026-10-02");
  assert.equal(post.readingTimeMinutes, 1);
});

test("parseBlogDocument preserves YAML block lists and Markdown separators", () => {
  const source = documentSource("lista-bloque", {}, "Inicio.\n\n---\n\nFinal.")
    .replace('tags: ["seo", "estrategia"]', "tags:\n  - seo\n  - estrategia");
  const post = parseBlogDocument({ fileName: "lista-bloque.md", source });

  assert.deepEqual(post.tags, ["seo", "estrategia"]);
  assert.equal(post.body, "Inicio.\n\n---\n\nFinal.");
});

test("parseBlogDocument reports the filename for invalid documents", () => {
  const cases = [
    ["Mayusculas.md", documentSource("Mayusculas")],
    ["sin-titulo.md", documentSource("sin-titulo", { title: undefined })],
    ["fecha-invalida.md", documentSource("fecha-invalida", { publishedAt: "2026-02-30" })],
    [
      "fecha-invertida.md",
      documentSource("fecha-invertida", { publishedAt: "2026-10-02", updatedAt: "2026-10-01" }),
    ],
    ["categoria.md", documentSource("categoria", { category: "otra" })],
    ["servicio.md", documentSource("servicio", { relatedService: "/ruta-inventada" })],
    ["imagen.md", documentSource("imagen", { coverImage: "/images/otra/cover.webp" })],
    ["vacio.md", documentSource("vacio", {}, "  ")],
    ["auto.md", documentSource("auto", { relatedSlugs: ["auto"] })],
    ["duplicados.md", documentSource("duplicados", { relatedSlugs: ["otro", "otro"] })],
  ];

  for (const [fileName, source] of cases) {
    assert.throws(
      () => parseBlogDocument({ fileName, source }),
      (error) => error instanceof Error && error.message.includes(fileName),
    );
  }
});

test("repository rejects unknown related slugs and missing covers for non-drafts", async () => {
  const unknownRelation = await createFixture({
    principal: documentSource("principal", { relatedSlugs: ["inexistente"] }),
  }, ["principal"]);

  assert.throws(
    () => getAllBlogPosts(unknownRelation),
    /principal\.md.*inexistente/s,
  );

  const missingCover = await createFixture({
    publicado: documentSource("publicado"),
    borrador: documentSource("borrador", { draft: true }),
  });

  assert.throws(() => getAllBlogPosts(missingCover), /publicado\.md.*cover/s);

  const draftOnly = await createFixture({
    borrador: documentSource("borrador", { draft: true }),
  });
  assert.equal(getAllBlogPosts(draftOnly).length, 1);
});

test("repository exposes only non-draft, non-future posts in descending date order", async () => {
  const fixture = await createFixture(
    {
      antiguo: documentSource("antiguo", { publishedAt: "2026-09-30" }),
      reciente: documentSource("reciente", { publishedAt: "2026-10-07" }),
      futuro: documentSource("futuro", { publishedAt: "2026-10-08" }),
      borrador: documentSource("borrador", { publishedAt: "2026-10-06", draft: true }),
    },
    ["antiguo", "reciente", "futuro"],
  );
  const options = { ...fixture, now: new Date("2026-10-07T12:00:00.000Z") };

  assert.deepEqual(
    getPublishedPosts(options).map((post) => post.slug),
    ["reciente", "antiguo"],
  );
  assert.equal(getPostBySlug("futuro", options)?.draft, false);
  assert.equal(getPostBySlug("desconocido", options), null);
  assert.deepEqual(
    getPostsByCategory("seo", options).map((post) => post.slug),
    ["reciente", "antiguo"],
  );
});

test("related posts preserve editorial order and omit unavailable entries", async () => {
  const fixture = await createFixture(
    {
      principal: documentSource("principal", {
        relatedSlugs: ["publicado", "borrador", "futuro"],
      }),
      publicado: documentSource("publicado", { publishedAt: "2026-10-02" }),
      borrador: documentSource("borrador", { draft: true }),
      futuro: documentSource("futuro", { publishedAt: "2026-10-08" }),
    },
    ["principal", "publicado", "futuro"],
  );
  const options = { ...fixture, now: new Date("2026-10-07T12:00:00.000Z") };
  const principal = getPostBySlug("principal", options);

  assert.ok(principal);
  assert.deepEqual(
    getRelatedPosts(principal, options).map((post) => post.slug),
    ["publicado"],
  );
});

test("publication and category gates require three posts and two qualifying categories", () => {
  const posts = [
    parseBlogDocument({ fileName: "uno.md", source: documentSource("uno") }),
    parseBlogDocument({ fileName: "dos.md", source: documentSource("dos") }),
    parseBlogDocument({ fileName: "tres.md", source: documentSource("tres") }),
    parseBlogDocument({
      fileName: "cuatro.md",
      source: documentSource("cuatro", { category: "google-ads", relatedService: "/agencia-marketing-digital/google-ads" }),
    }),
    parseBlogDocument({
      fileName: "cinco.md",
      source: documentSource("cinco", { category: "google-ads", relatedService: "/agencia-marketing-digital/google-ads" }),
    }),
    parseBlogDocument({
      fileName: "seis.md",
      source: documentSource("seis", { category: "google-ads", relatedService: "/agencia-marketing-digital/google-ads" }),
    }),
  ];

  assert.equal(isBlogPublished(posts.slice(0, 2)), false);
  assert.equal(isBlogPublished(posts.slice(0, 3)), true);
  assert.equal(isCategoryActive("seo", posts.slice(0, 4)), false);
  assert.equal(isCategoryActive("seo", posts), true);
  assert.equal(isCategoryActive("google-ads", posts), true);
  assert.deepEqual(getActiveCategories(posts), ["seo", "google-ads"]);
});

test("publication gates never count drafts or future posts passed by a caller", () => {
  const posts = [
    parseBlogDocument({ fileName: "uno.md", source: documentSource("uno") }),
    parseBlogDocument({ fileName: "dos.md", source: documentSource("dos") }),
    parseBlogDocument({
      fileName: "borrador.md",
      source: documentSource("borrador", { draft: true }),
    }),
    parseBlogDocument({
      fileName: "futuro.md",
      source: documentSource("futuro", { publishedAt: "2099-01-01" }),
    }),
  ];

  assert.equal(isBlogPublished(posts), false);
  assert.deepEqual(getActiveCategories(posts), []);
});
