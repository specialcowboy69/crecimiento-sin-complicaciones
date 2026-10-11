import assert from "node:assert/strict";
import test from "node:test";
import { qualifyLead, blockLeadAdsExport } from "../app/lib/qualifiedLeadState.ts";
import { PATCH } from "../app/api/admin/leads/route.ts";

function store(initial = {}) {
  const lead = { id: "00000000-0000-4000-8000-000000000001", status: "new", qualifiedAt: null, adsExportBlockedAt: null, adsExportClaimedAt: null, adsExportSubmittedAt: null, ...initial };
  let tick = 0;
  return {
    lead,
    async executeMutation(name, variables) {
      if (name === "MarkLeadQualified") {
        if (lead.qualifiedAt) return { data: { updated: 0 } };
        lead.qualifiedAt = `2026-10-11T12:00:0${++tick}Z`;
        lead.status = "qualified";
        return { data: { updated: 1 } };
      }
      if (name === "BlockLeadAdsExport") {
        if (lead.adsExportSubmittedAt || lead.adsExportBlockedAt || lead.adsExportClaimedAt) return { data: { updated: 0 } };
        lead.adsExportBlockedAt = `2026-10-11T12:00:0${++tick}Z`;
        return { data: { updated: 1 } };
      }
      if (name === "UpdateLeadStatus") {
        lead.status = variables.status;
        return { data: {} };
      }
      throw Error(`unexpected ${name}`);
    },
    async executeQuery() { return { data: { leads: [{ ...lead }] } }; },
  };
}

test("first qualification fixes the event time; a repeated action preserves it", async () => {
  const db = store();
  const first = await qualifyLead(db, db.lead.id);
  const second = await qualifyLead(db, db.lead.id);
  assert.equal(first.qualifiedAt, "2026-10-11T12:00:01Z");
  assert.equal(second.qualifiedAt, first.qualifiedAt);
  assert.equal(second.status, "qualified");
  await db.executeMutation("UpdateLeadStatus", { id: db.lead.id, status: "closed" });
  assert.equal(db.lead.status, "closed");
  const reopened = await qualifyLead(db, db.lead.id);
  assert.equal(reopened.qualifiedAt, first.qualifiedAt);
  assert.equal(reopened.status, "qualified");
});

test("a pending lead can be blocked but a submitted lead cannot", async () => {
  const db = store();
  assert.equal((await blockLeadAdsExport(db, db.lead.id)).adsExportBlockedAt, "2026-10-11T12:00:01Z");
  const sent = store({ adsExportSubmittedAt: "2026-10-11T12:00:00Z" });
  assert.equal((await blockLeadAdsExport(sent, sent.lead.id)).adsExportBlockedAt, null);
});

test("an in-progress export cannot report a successful exclusion", async () => {
  const db = store({ adsExportClaimedAt: "2026-10-11T12:00:00Z" });
  const result = await blockLeadAdsExport(db, db.lead.id);
  assert.equal(result.adsExportBlockedAt, null);
  assert.equal(result.adsExportClaimedAt, "2026-10-11T12:00:00Z");
});

test("unauthorized status changes are rejected before database access", async () => {
  const response = await PATCH(new Request("https://example.test/api/admin/leads", { method: "PATCH", body: JSON.stringify({ id: "x", status: "qualified" }) }));
  assert.equal(response.status, 401);
});
