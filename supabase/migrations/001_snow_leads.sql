-- Idaho Snow Co. Lead Capture & Quote Storage Migration
-- Creates public.snow_leads with strict Row Level Security (RLS) policies

create extension if not exists pgcrypto;

create table if not exists public.snow_leads (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  name text not null,
  phone text not null,
  email text not null,
  property_address text not null,
  preferred_timing text not null,
  location_slug text not null,
  location_name text not null,
  roof_size text not null,
  roof_material text not null,
  roof_pitch text not null,
  snow_depth text not null,
  addons jsonb not null default '[]'::jsonb,
  estimated_low integer not null,
  estimated_high integer not null,
  photo_name text,
  photo_data_url text,
  notes text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'completed', 'archived')),
  source text not null default 'website-quote-calculator',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_snow_leads_created_at on public.snow_leads (created_at desc);
create index if not exists idx_snow_leads_location_slug on public.snow_leads (location_slug);
create index if not exists idx_snow_leads_status on public.snow_leads (status);

create or replace function public.set_snow_leads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_snow_leads_updated_at on public.snow_leads;
create trigger trg_snow_leads_updated_at
  before update on public.snow_leads
  for each row
  execute function public.set_snow_leads_updated_at();

alter table public.snow_leads enable row level security;

-- Allow website visitors to submit quote leads anonymously
drop policy if exists "Allow anonymous quote submissions" on public.snow_leads;
create policy "Allow anonymous quote submissions"
  on public.snow_leads
  for insert
  to anon
  with check (true);

-- Allow authenticated dispatch staff to view and manage leads
drop policy if exists "Allow authenticated staff to read leads" on public.snow_leads;
create policy "Allow authenticated staff to read leads"
  on public.snow_leads
  for select
  to authenticated
  using (true);

drop policy if exists "Allow authenticated staff to update leads" on public.snow_leads;
create policy "Allow authenticated staff to update leads"
  on public.snow_leads
  for update
  to authenticated
  using (true)
  with check (true);

-- Allow server-side service role unrestricted access
drop policy if exists "Allow service role full access" on public.snow_leads;
create policy "Allow service role full access"
  on public.snow_leads
  for all
  to service_role
  using (true)
  with check (true);
