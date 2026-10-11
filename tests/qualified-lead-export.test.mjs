import assert from "node:assert/strict";
import test from "node:test";
import { exportPendingQualifiedLeads } from "../app/lib/qualifiedLeadExport.ts";
import { GET } from "../app/api/cron/export-qualified-leads/route.ts";
import { QualifiedLeadSendError } from "../app/lib/googleAdsQualifiedLead.ts";

const base = {
  id: "00000000-0000-4000-8000-000000000001",
  sourcePath: "/seo/local",
  status: "qualified",
  adsClickType: "gclid",
  adsClickId: "AbC_123",
  adsMeasurementConsentAtSubmit: true,
  qualifiedAt: "2026-10-11T12:00:00Z",
  adsExportBlockedAt: null,
  adsExportSubmittedAt: null,
  adsExportAttemptedAt: null,
  adsExportTerminalAt: null,
  adsExportLastErrorCode: null,
};

function store(leads) {
  return {
    leads,
    async listPending() { return leads; },
    async markSubmitted(id) {
      const lead = leads.find((item) => item.id === id);
      lead.adsExportSubmittedAt = "2026-10-11T13:00:00Z";
    },
    async recordFailure(id, code, terminal) {
      const lead = leads.find((item) => item.id === id);
      lead.adsExportLastErrorCode = code;
      lead.adsExportAttemptedAt = "2026-10-11T13:00:00Z";
      if (terminal) lead.adsExportTerminalAt = "2026-10-11T13:00:00Z";
    },
  };
}

test("only future consented, qualified, unblocked SEO-local clicks are sent", async () => {
  const valid = { ...base };
  const skipped = [
    { ...base, id: "00000000-0000-4000-8000-000000000002", adsMeasurementConsentAtSubmit: null },
    { ...base, id: "00000000-0000-4000-8000-000000000003", adsClickId: null },
    { ...base, id: "00000000-0000-4000-8000-000000000004", sourcePath: "/seo" },
    { ...base, id: "00000000-0000-4000-8000-000000000005", adsExportBlockedAt: "2026-10-11T12:01:00Z" },
    { ...base, id: "00000000-0000-4000-8000-000000000006", adsExportSubmittedAt: "2026-10-11T12:01:00Z" },
    { ...base, id: "00000000-0000-4000-8000-000000000007", adsExportTerminalAt: "2026-10-11T12:01:00Z" },
    { ...base, id: "00000000-0000-4000-8000-000000000008", status: "new" },
  ];
  const db = store([valid, ...skipped]);
  const seen = [];
  assert.deepEqual(await exportPendingQualifiedLeads({ store: db, enabled: true, sender: async (event) => { seen.push(event); return { accepted: true }; } }), { attempted: 1, submitted: 1, failed: 0 });
  assert.deepEqual(seen.map((event) => event.transactionId), [`seo-local-qualified-${valid.id}`]);
  assert.equal(skipped.every((lead) => lead.adsExportSubmittedAt === null || lead.id.endsWith("0006")), true);
});

test("two leads fail independently; permanent errors stay terminal and transient errors can retry", async () => {
  const first = { ...base };
  const second = { ...base, id: "00000000-0000-4000-8000-000000000002" };
  const db = store([first, second]);
  const outcome = await exportPendingQualifiedLeads({ store: db, enabled: true, sender: async (event) => {
    throw new QualifiedLeadSendError(event.transactionId.endsWith("0001") ? "PROVIDER_HTTP_503" : "PROVIDER_HTTP_403", event.transactionId.endsWith("0001"));
  } });
  assert.deepEqual(outcome, { attempted: 2, submitted: 0, failed: 2 });
  assert.equal(first.adsExportTerminalAt, null);
  assert.ok(second.adsExportTerminalAt);
  const retried = [];
  await exportPendingQualifiedLeads({ store: db, enabled: true, sender: async (event) => { retried.push(event.transactionId); return { accepted: true }; } });
  assert.deepEqual(retried, [`seo-local-qualified-${first.id}`]);
});

test("retry after acknowledgement marker failure reuses the same transaction ID", async () => {
  const lead = { ...base };
  const db = store([lead]);
  const mark = db.markSubmitted;
  let first = true;
  db.markSubmitted = async (id) => {
    if (first) { first = false; throw Error("database temporarily unavailable"); }
    return mark(id);
  };
  const ids = [];
  const sender = async (event) => { ids.push(event.transactionId); return { accepted: true }; };
  assert.deepEqual(await exportPendingQualifiedLeads({ store: db, enabled: true, sender }), { attempted: 1, submitted: 0, failed: 1 });
  assert.deepEqual(await exportPendingQualifiedLeads({ store: db, enabled: true, sender }), { attempted: 1, submitted: 1, failed: 0 });
  assert.deepEqual(ids, [`seo-local-qualified-${lead.id}`, `seo-local-qualified-${lead.id}`]);
});

test("disabled export does not query storage or send events", async () => {
  assert.deepEqual(await exportPendingQualifiedLeads({ enabled: false, store: { listPending() { throw Error("queried"); } }, sender() { throw Error("sent"); } }), { attempted: 0, submitted: 0, failed: 0 });
});

test("cron rejects missing secret and wrong bearer token", async () => {
  const previous = process.env.CRON_SECRET;
  try {
    delete process.env.CRON_SECRET;
    assert.equal((await GET(new Request("https://example.test/api/cron/export-qualified-leads"))).status, 401);
    process.env.CRON_SECRET = "private-test-secret";
    assert.equal((await GET(new Request("https://example.test/api/cron/export-qualified-leads", { headers: { Authorization: "Bearer wrong" } }))).status, 401);
  } finally {
    if (previous === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = previous;
  }
});
