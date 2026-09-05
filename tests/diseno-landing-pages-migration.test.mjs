import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();
const newRoute = "/diseno-landing-pages";
const oldRoutes = [
  "/cro-landing-systems",
  "/cro-landing-system",
  "/agencia-marketing-digital/cro-landing-systems",
  "/agencia-marketing-digital/cro-landing-system",
  "/servicios/cro-landing-systems",
  "/servicios/cro-landing-system",
];

async function read(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

async function collectSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectSourceFiles(fullPath);
      }

      if (entry.isFile() && [".ts", ".tsx", ".js", ".jsx"].includes(path.extname(entry.name))) {
        return [fullPath];
      }

      return [];
    }),
  );

  return files.flat();
}

test("diseno landing pages is the canonical routed page", async () => {
  const pagePath = path.join(repoRoot, "app", "diseno-landing-pages", "page.tsx");
  assert.equal(existsSync(pagePath), true, "expected app/diseno-landing-pages/page.tsx to exist");
  assert.equal(
    existsSync(path.join(repoRoot, "app", "agencia-marketing-digital", "cro-landing-systems", "page.tsx")),
    false,
    "old CRO landing page file should not remain routable",
  );

  const page = await read("app/diseno-landing-pages/page.tsx");
  assert.match(page, /const pagePath = "\/diseno-landing-pages"/);
  assert.match(page, /title: "Diseño de landing pages para captar leads"/);
  assert.match(page, /canonical: pagePath/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /Diseño de landing pages para convertir visitas en leads/);
  assert.match(page, /sourcePage="Diseño de landing pages"/);
  assert.match(page, /interestedService="Landing pages"/);
  assert.doesNotMatch(page, /noindex/);
});

test("sitemap includes only the new canonical landing pages route", async () => {
  const sitemap = await read("app/sitemap.ts");
  assert.match(sitemap, /path: "\/diseno-landing-pages"/);

  for (const oldRoute of oldRoutes) {
    assert.equal(sitemap.includes(oldRoute), false, `sitemap should not include ${oldRoute}`);
  }
});

test("old CRO landing URLs redirect permanently to the new route", async () => {
  const config = await read("next.config.ts");

  for (const oldRoute of oldRoutes) {
    assert.match(config, new RegExp(`source:\\s*"${oldRoute.replaceAll("/", "\\/")}"[\\s\\S]*?destination:\\s*"\\/diseno-landing-pages"[\\s\\S]*?statusCode:\\s*301`));
  }
});

test("app internal navigation points to the new route and not old CRO slugs", async () => {
  const requiredFiles = [
    "app/agencia-marketing-digital/page.tsx",
    "app/agencia-marketing-digital/google-ads/page.tsx",
    "app/components/LandingServicesMenu.tsx",
    "app/components/PageLinksNav.tsx",
    "app/page.tsx",
  ];

  for (const file of requiredFiles) {
    const content = await read(file);
    assert.equal(content.includes(newRoute), true, `${file} should link to ${newRoute}`);
  }

  const appFiles = await collectSourceFiles(path.join(repoRoot, "app"));
  const offenders = [];

  for (const file of appFiles) {
    const content = await readFile(file, "utf8");
    for (const oldRoute of oldRoutes) {
      if (content.includes(`href="${oldRoute}"`) || content.includes(`href='${oldRoute}'`) || content.includes(`href: "${oldRoute}"`)) {
        offenders.push(`${path.relative(repoRoot, file)} -> ${oldRoute}`);
      }
    }
  }

  assert.deepEqual(offenders, [], `old app hrefs remain:\n${offenders.join("\n")}`);
});
