import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("the lead creation connector is admin-only so attribution cannot bypass the API", () => {
  const mutations = readFileSync(new URL("../dataconnect/leads/mutations.gql", import.meta.url), "utf8");
  const createLead = mutations.match(/mutation CreateLead\([\s\S]*?\)\s*@auth\(level:\s*([A-Z_]+)/);
  assert.equal(createLead?.[1], "NO_ACCESS");
  const route = readFileSync(new URL("../app/api/leads/route.ts", import.meta.url), "utf8");
  assert.doesNotMatch(route, /impersonate\s*:\s*\{\s*unauthenticated\s*:\s*true/);
});

test("export claims coordinate atomically with exclusion and deletion", () => {
  const mutations = readFileSync(new URL("../dataconnect/leads/mutations.gql", import.meta.url), "utf8");
  const block = mutations.match(/mutation BlockLeadAdsExport[\s\S]*?(?=\nmutation |$)/)?.[0];
  const claim = mutations.match(/mutation ClaimLeadAdsExport[\s\S]*?(?=\nmutation |$)/)?.[0];
  const remove = mutations.match(/mutation DeleteLeadIfNotExporting[\s\S]*?(?=\nmutation |$)/)?.[0];
  assert.match(block ?? "", /adsExportClaimedAt:\s*\{\s*isNull:\s*true\s*\}/);
  assert.match(claim ?? "", /adsExportBlockedAt:\s*\{\s*isNull:\s*true\s*\}/);
  assert.match(claim ?? "", /adsExportClaimedAt:\s*\{\s*isNull:\s*true\s*\}/);
  assert.match(remove ?? "", /lead_deleteMany\(where:[\s\S]*adsExportClaimedAt:\s*\{\s*isNull:\s*true\s*\}/);
});
