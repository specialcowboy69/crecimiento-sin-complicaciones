import assert from "node:assert/strict";
import test from "node:test";
import { buildQualifiedLeadEvent, sendQualifiedLeadEvent, QualifiedLeadSendError } from "../app/lib/googleAdsQualifiedLead.ts";

const id = "00000000-0000-4000-8000-000000000001";
const env = {
  GOOGLE_DATA_MANAGER_SERVICE_ACCOUNT_JSON: '{"type":"service_account","client_email":"test@example.invalid","private_key":"fake"}',
  GOOGLE_ADS_OPERATING_ACCOUNT_ID: "1234567890",
  GOOGLE_ADS_QUALIFIED_ACTION_ID: "987654321",
};

for (const type of ["gclid", "gbraid", "wbraid"]) {
  test(`${type} maps only its click identifier into a stable qualified event`, () => {
    const event = buildQualifiedLeadEvent({ id, adsClickType: type, adsClickId: "AbC_123", qualifiedAt: "2026-10-11T12:00:00Z", name: "Private", contact: "private@example.invalid" });
    assert.deepEqual(event, {
      adIdentifiers: { [type]: "AbC_123" },
      eventTimestamp: "2026-10-11T12:00:00Z",
      transactionId: `seo-local-qualified-${id}`,
      eventSource: "WEB",
    });
    assert.equal(JSON.stringify(event).includes("Private"), false);
    assert.equal(JSON.stringify(event).includes("private@example.invalid"), false);
  });
}

test("validateOnly request has the Ads destination and nonpersonal consent, and never requests live ingestion", async () => {
  const event = buildQualifiedLeadEvent({ id, adsClickType: "gclid", adsClickId: "AbC_123", qualifiedAt: "2026-10-11T12:00:00Z" });
  let request;
  const result = await sendQualifiedLeadEvent(event, {
    validateOnly: true, env,
    getAccessToken: async () => "test-token",
    fetchImpl: async (url, options) => {
      request = { url, options, body: JSON.parse(options.body) };
      return new Response(JSON.stringify({ requestId: "validation-1" }), { status: 200 });
    },
  });
  assert.equal(request.url, "https://datamanager.googleapis.com/v1/events:ingest");
  assert.equal(request.body.validateOnly, true);
  assert.deepEqual(request.body.destinations[0], {
    operatingAccount: { accountType: "GOOGLE_ADS", accountId: "1234567890" },
    loginAccount: { accountType: "GOOGLE_ADS", accountId: "1234567890" },
    productDestinationId: "987654321",
  });
  assert.deepEqual(request.body.consent, { adUserData: "CONSENT_GRANTED", adPersonalization: "CONSENT_DENIED" });
  assert.equal(request.body.events.length, 1);
  assert.equal(request.body.events[0].transactionId, `seo-local-qualified-${id}`);
  assert.equal(result.accepted, false);
  assert.equal(result.validated, true);
});

test("an empty optional login account uses the operating account", async () => {
  let body;
  await sendQualifiedLeadEvent(buildQualifiedLeadEvent({ id, adsClickType: "gclid", adsClickId: "AbC_123", qualifiedAt: "2026-10-11T12:00:00Z" }), {
    validateOnly: true, env: { ...env, GOOGLE_ADS_LOGIN_ACCOUNT_ID: "" }, getAccessToken: async () => "token",
    fetchImpl: async (_, options) => {
      body = JSON.parse(options.body);
      return new Response('{"requestId":"test"}', { status: 200 });
    },
  });
  assert.equal(body.destinations[0].loginAccount.accountId, "1234567890");
});

test("missing account configuration stops before an HTTP request", async () => {
  let called = false;
  await assert.rejects(
    sendQualifiedLeadEvent(buildQualifiedLeadEvent({ id, adsClickType: "gclid", adsClickId: "AbC_123", qualifiedAt: "2026-10-11T12:00:00Z" }), {
      validateOnly: false, env: {}, getAccessToken: async () => "token", fetchImpl: async () => { called = true; },
    }),
    (error) => error instanceof QualifiedLeadSendError && error.code === "CONFIG_MISSING" && error.retryable,
  );
  assert.equal(called, false);
});

test("provider errors expose a safe code and retryability without lead content", async () => {
  const event = buildQualifiedLeadEvent({ id, adsClickType: "gclid", adsClickId: "AbC_123", qualifiedAt: "2026-10-11T12:00:00Z" });
  for (const [status, retryable] of [[400, false], [403, true], [503, true]]) {
    await assert.rejects(
      sendQualifiedLeadEvent(event, {
        validateOnly: false, env, getAccessToken: async () => "token",
        fetchImpl: async () => new Response('{"error":"AbC_123 private@example.invalid"}', { status }),
      }),
      (error) => error instanceof QualifiedLeadSendError && error.retryable === retryable && !JSON.stringify(error).includes("AbC_123"),
    );
  }
});

test("a successful validateOnly response may have no request ID", async () => {
  const event = buildQualifiedLeadEvent({ id, adsClickType: "gclid", adsClickId: "AbC_123", qualifiedAt: "2026-10-11T12:00:00Z" });
  const result = await sendQualifiedLeadEvent(event, {
    validateOnly: true, env, getAccessToken: async () => "token",
    fetchImpl: async () => new Response("{}", { status: 200 }),
  });
  assert.equal(result.validated, true);
  assert.equal(result.accepted, false);
});

test("token acquisition failure remains retryable after credentials are fixed", async () => {
  const event = buildQualifiedLeadEvent({ id, adsClickType: "gclid", adsClickId: "AbC_123", qualifiedAt: "2026-10-11T12:00:00Z" });
  await assert.rejects(sendQualifiedLeadEvent(event, {
    validateOnly: false, env, getAccessToken: async () => { throw Error("temporary auth failure"); },
  }), (error) => error instanceof QualifiedLeadSendError && error.code === "AUTH_FAILED" && error.retryable);
});
