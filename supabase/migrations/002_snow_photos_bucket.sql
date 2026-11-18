-- Migration 002: Roof Photo Storage Bucket & Lead Photo URL Column
-- Stores uploaded roof/ice dam photos in Supabase Storage and records the public photo_url on snow_leads.

ALTER TABLE public.snow_leads
  ADD COLUMN IF NOT EXISTS photo_url TEXT;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'snow-lead-photos',
  'snow-lead-photos',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access so CRM dispatchers & email alerts can render thumbnails
DROP POLICY IF EXISTS "Public read access for snow lead photos" ON storage.objects;
CREATE POLICY "Public read access for snow lead photos"
  on storage.objects
  for select
  to public
  using (bucket_id = 'snow-lead-photos');

-- Allow website quote API (anon/service_role) to upload roof inspection photos
DROP POLICY IF EXISTS "Allow uploads to snow-lead-photos" ON storage.objects;
CREATE POLICY "Allow uploads to snow-lead-photos"
  on storage.objects
  for insert
  to anon, authenticated, service_role
  with check (bucket_id = 'snow-lead-photos');
