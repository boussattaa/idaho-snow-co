/**
 * Configurable site-wide announcement / storm dispatch banner settings.
 * Override via NEXT_PUBLIC_STORM_BANNER_ENABLED ("true" | "false") and
 * NEXT_PUBLIC_STORM_BANNER_TEXT in Vercel environment variables without redeploying code.
 */
export const STORM_BANNER_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_STORM_BANNER_ENABLED !== "false",
  text:
    process.env.NEXT_PUBLIC_STORM_BANNER_TEXT ||
    "❄️ Winter Storm Dispatch Active: Booking McCall, Donnelly & Cascade Crews This Week — Lock In Your Slot",
  ctaLabel: "Lock In Slot",
  ctaHref: "/quote",
} as const;
