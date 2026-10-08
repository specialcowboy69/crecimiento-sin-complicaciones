import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const technicalSeoPage = path.join(
  process.cwd(),
  "app",
  "agencia-marketing-digital",
  "seo-tecnico-arquitectura-entidades",
  "page.tsx",
);

test("technical SEO page does not link to unpublished blog articles", async () => {
  const source = await readFile(technicalSeoPage, "utf8");

  assert.doesNotMatch(source, /\/blog\/que-es-core-web-vital/);
  assert.doesNotMatch(source, /\/blog\/que-es-topic-cluster/);
});
