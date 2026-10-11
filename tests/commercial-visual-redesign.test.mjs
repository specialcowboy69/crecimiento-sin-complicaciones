import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const source = (file) => readFileSync(path.join(root, file), "utf8");
const asset = (file) => statSync(path.join(root, "public", "images", file));

test("Google Ads has a photographic hero and no duplicate navigation", () => {
  const page = source("app/agencia-marketing-digital/google-ads/page.tsx");

  assert.doesNotMatch(page, /PageLinksNav|journeyPanel/);
  assert.match(page, /google-ads-hero-editorial\.webp/);
  assert.match(page, /href: "\/diseno-landing-pages"/);
  assert.match(page, /href="#auditoria-google-ads"/);
  assert.ok(asset("google-ads-hero-editorial.webp").size > 10_000);
});
