import { GoogleAuth } from "google-auth-library";

const ENDPOINT = "https://datamanager.googleapis.com/v1/events:ingest";
const SCOPE = "https://www.googleapis.com/auth/datamanager";

export type AdsClickType = "gclid" | "gbraid" | "wbraid";

export type QualifiedLeadEvent = {
  adIdentifiers: Partial<Record<AdsClickType, string>>;
  eventTimestamp: string;
  transactionId: string;
  eventSource: "WEB";
};

export class QualifiedLeadSendError extends Error {
  constructor(public readonly code: string, public readonly retryable: boolean) {
    super(code);
    this.name = "QualifiedLeadSendError";
  }
}

export function buildQualifiedLeadEvent(lead: {
  id: string;
  adsClickType: AdsClickType;
  adsClickId: string;
  qualifiedAt: string;
}): QualifiedLeadEvent {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lead.id)) {
    throw new QualifiedLeadSendError("INVALID_LEAD_ID", false);
  }
  if (!["gclid", "gbraid", "wbraid"].includes(lead.adsClickType) ||
      typeof lead.adsClickId !== "string" || lead.adsClickId.length === 0 || lead.adsClickId.length > 512 ||
      !/^[\x21-\x7e]+$/.test(lead.adsClickId)) {
    throw new QualifiedLeadSendError("INVALID_CLICK_ID", false);
  }
  if (typeof lead.qualifiedAt !== "string" || !Number.isFinite(Date.parse(lead.qualifiedAt))) {
    throw new QualifiedLeadSendError("INVALID_QUALIFIED_AT", false);
  }
  return {
    adIdentifiers: { [lead.adsClickType]: lead.adsClickId },
    eventTimestamp: lead.qualifiedAt,
    transactionId: `seo-local-qualified-${lead.id}`,
    eventSource: "WEB",
  };
}

type SendOptions = {
  validateOnly: boolean;
  env?: Record<string, string | undefined>;
  getAccessToken?: () => Promise<string | null>;
  fetchImpl?: (url: string, init: RequestInit) => Promise<Response>;
};

export async function sendQualifiedLeadEvent(event: QualifiedLeadEvent, options: SendOptions) {
  const env = options.env ?? process.env;
  const operatingId = env.GOOGLE_ADS_OPERATING_ACCOUNT_ID;
  const loginId = env.GOOGLE_ADS_LOGIN_ACCOUNT_ID || operatingId;
  const actionId = env.GOOGLE_ADS_QUALIFIED_ACTION_ID;
  const serviceAccount = env.GOOGLE_DATA_MANAGER_SERVICE_ACCOUNT_JSON;
  if (!/^\d{10}$/.test(operatingId ?? "") || !/^\d{10}$/.test(loginId ?? "") || !/^\d+$/.test(actionId ?? "") || !serviceAccount) {
    throw new QualifiedLeadSendError("CONFIG_MISSING", false);
  }

  let token: string | null;
  try {
    if (options.getAccessToken) {
      token = await options.getAccessToken();
    } else {
      const credentials = JSON.parse(serviceAccount);
      const auth = new GoogleAuth({ credentials, scopes: [SCOPE] });
      token = (await auth.getAccessToken()) ?? null;
    }
  } catch {
    throw new QualifiedLeadSendError("AUTH_FAILED", false);
  }
  if (!token) throw new QualifiedLeadSendError("AUTH_FAILED", false);

  const body = {
    destinations: [{
      operatingAccount: { accountType: "GOOGLE_ADS", accountId: operatingId },
      loginAccount: { accountType: "GOOGLE_ADS", accountId: loginId },
      productDestinationId: actionId,
    }],
    encoding: "HEX",
    consent: { adUserData: "CONSENT_GRANTED", adPersonalization: "CONSENT_DENIED" },
    events: [event],
    validateOnly: options.validateOnly,
  };

  let response: Response;
  try {
    response = await (options.fetchImpl ?? fetch)(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    throw new QualifiedLeadSendError("NETWORK_ERROR", true);
  }
  if (!response.ok) {
    const retryable = response.status === 408 || response.status === 429 || response.status >= 500;
    throw new QualifiedLeadSendError(`PROVIDER_HTTP_${response.status}`, retryable);
  }
  let requestId: unknown;
  try {
    requestId = (await response.json()).requestId;
  } catch {
    throw new QualifiedLeadSendError("PROVIDER_UNCONFIRMED", true);
  }
  if (typeof requestId !== "string" || requestId.length === 0) {
    throw new QualifiedLeadSendError("PROVIDER_UNCONFIRMED", true);
  }
  return { accepted: !options.validateOnly, validated: options.validateOnly, requestId };
}
