-- Migration 003: Flexible Route-Day Discount & Roof-Clearing Liability Waiver Consent
ALTER TABLE public.snow_leads
  ADD COLUMN IF NOT EXISTS flexible_route_day BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS waiver_accepted BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS waiver_accepted_at TIMESTAMPTZ;
