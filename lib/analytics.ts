import type { EventType } from "@/types";

/**
 * Fire-and-forget analytics event tracker. Safe to call from
 * client components; posts to /api/analytics which writes to
 * the `analytics` table server-side.
 */
export function trackEvent(
  eventType: EventType,
  entityType?: string,
  entityId?: string,
  metadata: Record<string, unknown> = {}
) {
  try {
    const body = JSON.stringify({
      event_type: eventType,
      entity_type: entityType,
      entity_id: entityId,
      metadata,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
    });

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/analytics", blob);
    } else {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Analytics should never break the UI.
  }
}

export function trackPageView(path: string) {
  trackEvent("page_view", "page", undefined, { path });
}
