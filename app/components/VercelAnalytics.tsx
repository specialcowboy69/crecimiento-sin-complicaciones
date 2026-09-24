"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

function filterVercelAnalyticsEvent(event: BeforeSendEvent) {
  return event.url.includes("/admin") ? null : event;
}

export function VercelAnalytics() {
  return <Analytics beforeSend={filterVercelAnalyticsEvent} />;
}
