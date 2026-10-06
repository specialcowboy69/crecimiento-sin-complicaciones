import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const appDir = path.join(process.cwd(), "app");
const sourceExtensions = new Set([".css", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const restrictiveValues = /\b(?:none|pan-x|pan-left|pan-right)\b/i;
const verticalValues = /\b(?:pan-y|pan-up|pan-down)\b/i;

async function collectSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectSourceFiles(fullPath);
      }

      return entry.isFile() && sourceExtensions.has(path.extname(entry.name))
        ? [fullPath]
        : [];
    }),
  );

  return files.flat();
}

test("case carousel preserves vertical touch panning and horizontal snap", async () => {
  const css = await readFile(path.join(appDir, "components", "CaseCarousel.module.css"), "utf8");
  const trackRule = css.match(/\.track\s*\{([^}]*)\}/);

  assert.ok(trackRule, "The case carousel track rule must exist");
  assert.match(trackRule[1], /\boverflow-x\s*:\s*auto\s*;/);
  assert.match(trackRule[1], /\bscroll-snap-type\s*:\s*x\s+mandatory\s*;/);
  assert.doesNotMatch(
    trackRule[1],
    /\btouch-action\s*:/i,
    "The case carousel must leave touch-action to native browser handling",
  );
});

test("app sources do not exclude vertical touch panning", async () => {
  const violations = [];

  for (const filePath of await collectSourceFiles(appDir)) {
    const content = await readFile(filePath, "utf8");
    const declarations = content.matchAll(
      /\b(?:touch-action|touchAction)\s*:\s*["']?([^;"'\r\n}]+)/g,
    );
    const utilities = content.matchAll(
      /\btouch-(?:none|pan-x|pan-left|pan-right)\b|\btouch-\[([^\]]+)\]|\[touch-action:([^\]]+)\]/g,
    );

    for (const match of declarations) {
      if (restrictiveValues.test(match[1]) && !verticalValues.test(match[1])) {
        violations.push(`${path.relative(process.cwd(), filePath)}: ${match[0]}`);
      }
    }

    for (const match of utilities) {
      const value = (match[1] ?? match[2] ?? match[0]).replaceAll("_", " ");

      if (restrictiveValues.test(value) && !verticalValues.test(value)) {
        violations.push(`${path.relative(process.cwd(), filePath)}: ${match[0]}`);
      }
    }
  }

  assert.deepEqual(
    violations,
    [],
    `Found touch-action values that exclude vertical panning:\n${violations.join("\n")}`,
  );
});
