import { isGoogleAdsSeoLocalLeadEligible, sendGoogleAdsSeoLocalLeadEvent } from "./cookieConsentCookies.mjs";

// Only a completed, already-consented lead may enter this memory-only wait.
// CookieConsent announces readiness after config; no Google API is initialized here.
export function deliverGoogleAdsSeoLocalLeadEvent(sourcePath) {
  const browserWindow = window;
  const browserDocument = document;
  const eligible = () => isGoogleAdsSeoLocalLeadEligible({
    cookieHeader: browserDocument.cookie,
    sourcePath,
    pathname: browserWindow.location.pathname,
  });

  if (!eligible()) return false;

  const expiresAt = Date.now() + 30_000;
  let finished = false;
  let retryTimer;
  let expiryTimer;

  function finish() {
    finished = true;
    browserWindow.clearTimeout(retryTimer);
    browserWindow.clearTimeout(expiryTimer);
    browserWindow.removeEventListener("google-measurement-ready", attempt);
    browserWindow.removeEventListener("cookie-consent-change", attempt);
    browserWindow.removeEventListener("google-measurement-disabled", finish);
    browserWindow.removeEventListener("pagehide", finish);
  }

  function attempt() {
    if (finished) return;
    browserWindow.clearTimeout(retryTimer);
    try {
      if (Date.now() >= expiresAt || !eligible() || browserWindow["ga-disable-G-VECVHEZ2DN"] === true) {
        finish();
        return;
      }

      if (browserWindow.googleAnalyticsReady === true && typeof browserWindow.gtag === "function") {
        // Stop before invoking the provider: a throw or another ready signal must not retry a lead.
        finish();
        sendGoogleAdsSeoLocalLeadEvent({
          cookieHeader: browserDocument.cookie,
          sourcePath,
          pathname: browserWindow.location.pathname,
          gtag: browserWindow.gtag,
        });
        return;
      }
      retryTimer = browserWindow.setTimeout(attempt, 100);
    } catch {
      // Analytics failure must never change the result of the saved lead.
      finish();
    }
  }

  browserWindow.addEventListener("google-measurement-ready", attempt);
  browserWindow.addEventListener("cookie-consent-change", attempt);
  browserWindow.addEventListener("google-measurement-disabled", finish);
  browserWindow.addEventListener("pagehide", finish);
  expiryTimer = browserWindow.setTimeout(finish, 30_000);
  attempt();
  return true;
}
