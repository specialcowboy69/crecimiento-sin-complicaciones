import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

async function read(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

test("national Google Ads page visibly owns Google Ads and SEM intent", async () => {
  const page = await read("app/agencia-marketing-digital/google-ads/page.tsx");
  const hub = await read("app/agencia-marketing-digital/page.tsx");
  const sitemap = await read("app/sitemap.ts");
  const redirects = await read("next.config.ts");

  assert.match(page, /const pagePath = "\/agencia-marketing-digital\/google-ads"/);
  assert.match(page, /title: "Agencia Google Ads y SEM para empresas"/);
  assert.match(page, /canonical: pagePath/);
  assert.match(page, /Agencia Google Ads y SEM/);
  assert.match(page, /Somos una agencia SEM especializada en Google Ads/);
  assert.match(page, /Agencia SEM y Google Ads: una intención de búsqueda, una plataforma concreta/);
  assert.match(page, /¿Es lo mismo una agencia SEM que una agencia Google Ads\?/);
  assert.match(hub, /Google Ads y SEM/);
  assert.equal(existsSync(path.join(repoRoot, "app", "agencia-marketing-digital", "sem", "page.tsx")), false);
  assert.doesNotMatch(sitemap, /path: "\/agencia-marketing-digital\/sem"/);
  for (const legacy of [
    "/sem-paid-growth",
    "/agencia-marketing-digital/sem-paid-growth",
    "/servicios/sem-paid-growth",
  ]) {
    assert.equal(redirects.includes(legacy), true, `expected legacy redirect for ${legacy}`);
  }
});
