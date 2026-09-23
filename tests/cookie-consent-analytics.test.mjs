import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

async function read(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

test("Vercel analytics mounts globally but excludes admin routes", async () => {
  const packageJson = await read("package.json");
  const layout = await read("app/layout.tsx");
  const analyticsPath = path.join(repoRoot, "app/components/VercelAnalytics.tsx");
  const analytics = existsSync(analyticsPath) ? await read("app/components/VercelAnalytics.tsx") : "";

  assert.match(packageJson, /"@vercel\/analytics"/);
  assert.match(layout, /import \{ VercelAnalytics \} from "\.\/components\/VercelAnalytics"/);
  assert.match(layout, /<VercelAnalytics \/>/);
  assert.match(analytics, /"use client"/);
  assert.match(analytics, /import \{ Analytics, type BeforeSendEvent \} from "@vercel\/analytics\/next"/);
  assert.match(analytics, /function filterVercelAnalyticsEvent\(event: BeforeSendEvent\)/);
  assert.match(analytics, /event\.url\.includes\("\/admin"\) \? null : event/);
  assert.match(analytics, /<Analytics beforeSend=\{filterVercelAnalyticsEvent\} \/>/);
});

test("successful lead analytics uses a non-PII allowlist", async () => {
  const submitLead = await read("app/components/submitLead.ts");

  assert.match(submitLead, /track\("lead_form_submitted", \{/);
  assert.match(submitLead, /source_page: payload\.sourcePage/);
  assert.match(submitLead, /source_path: payload\.sourcePath/);
  assert.match(submitLead, /form_type: payload\.formType/);
  assert.match(submitLead, /interested_service: payload\.interestedService/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.name/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.contact/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.company/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.message/);
});
