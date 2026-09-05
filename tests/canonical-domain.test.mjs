import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const appDir = path.join(process.cwd(), "app");
const forbiddenCanonicalOrigin = "https://crecimientosincomplicaciones.com";
const expectedCanonicalOrigin = "https://www.crecimientosincomplicaciones.com";
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);

async function collectSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectSourceFiles(fullPath);
      }

      if (entry.isFile() && sourceExtensions.has(path.extname(entry.name))) {
        return [fullPath];
      }

      return [];
    }),
  );

  return files.flat();
}

test("SEO source does not reference the non-www canonical origin", async () => {
  const sourceFiles = await collectSourceFiles(appDir);
  const matches = [];

  for (const filePath of sourceFiles) {
    const content = await readFile(filePath, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (
        line.includes(forbiddenCanonicalOrigin) &&
        !line.includes(expectedCanonicalOrigin)
      ) {
        matches.push(`${path.relative(process.cwd(), filePath)}:${index + 1}`);
      }
    });
  }

  assert.deepEqual(
    matches,
    [],
    `Found non-www canonical origin references:\n${matches.join("\n")}`,
  );
});
