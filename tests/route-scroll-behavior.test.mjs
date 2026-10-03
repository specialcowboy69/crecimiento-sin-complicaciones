import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const appDir = path.join(process.cwd(), "app");

test("root layout opts into Next.js route scroll override", async () => {
  const layout = await readFile(path.join(appDir, "layout.tsx"), "utf8");

  assert.match(
    layout,
    /<html\s+lang="es"\s+data-scroll-behavior="smooth"\s*>/,
  );
});

test("hash navigation keeps smooth scrolling and the fixed header offset", async () => {
  const css = await readFile(path.join(appDir, "globals.css"), "utf8");
  const rootRule = css.match(/^html\s*\{([^}]*)\}/m);

  assert.ok(rootRule, "The root html scroll rule must exist");
  assert.match(rootRule[1], /\bscroll-behavior\s*:\s*smooth\s*;/);
  assert.match(rootRule[1], /\bscroll-padding-top\s*:\s*92px\s*;/);
});

test("reduced motion disables smooth document scrolling", async () => {
  const css = await readFile(path.join(appDir, "globals.css"), "utf8");

  assert.match(
    css,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*html\s*\{[^}]*\bscroll-behavior\s*:\s*auto\s*;[^}]*\}\s*\}/m,
  );
});

test("case carousel keeps its independent smooth scrolling", async () => {
  const css = await readFile(path.join(appDir, "globals.css"), "utf8");
  const trackRule = css.match(/\.case-track\s*\{([^}]*)\}/);

  assert.ok(trackRule, "The case carousel track rule must exist");
  assert.match(trackRule[1], /\bscroll-behavior\s*:\s*smooth\s*;/);
});
