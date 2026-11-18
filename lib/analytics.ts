"use client";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      eventName: string | Date,
      params?: Record<string, unknown>
    ) => void;
    fbq?: (
      command: "track" | "trackCustom" | "init",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export type AnalyticsEventName =
  | "quote_calculated"
  | "quote_submitted"
  | "psf_calculated"
  | "phone_click";

export function trackEvent(
  eventName: AnalyticsEventName,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, params);
    }
  } catch {
    // Non-fatal: never interrupt user flows if analytics trackers are blocked
  }
}

export function trackQuoteCalculated(params: {
  locationSlug: string;
  roofSize: string;
  roofMaterial: string;
  roofPitch: string;
  snowDepth: string;
  estimatedLow: number;
  estimatedHigh: number;
}) {
  trackEvent("quote_calculated", params);
}

export function trackQuoteSubmitted(params: {
  referenceId: string;
  locationSlug: string;
  estimatedLow: number;
  estimatedHigh: number;
  urgency?: string;
  hasPhoto: boolean;
}) {
  trackEvent("quote_submitted", {
    ...params,
    currency: "USD",
    value: Math.round((params.estimatedLow + params.estimatedHigh) / 2),
  });
}

export function trackPsfCalculated(params: {
  depthInches: number;
  snowType: string;
  psf: number;
  riskLevel: string;
}) {
  trackEvent("psf_calculated", params);
}

export function trackPhoneClick(sourceLocation: string) {
  trackEvent("phone_click", {
    source_location: sourceLocation,
    phone: "(208) 965-4285",
  });
}
