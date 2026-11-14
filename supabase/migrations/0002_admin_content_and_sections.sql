-- Migration 0002: Admin Content & Sections Support
-- Enables live dynamic content management across all website pages

-- 1. PAGE SECTIONS TABLE
create table if not exists page_sections (
  id text primary key default gen_random_uuid()::text,
  page_slug text not null,       -- e.g. 'home', 'about', 'process', 'material-library', 'press', 'lights', 'objects'
  section_key text not null,     -- e.g. 'hero', 'statement_1', 'marquetry', 'banner_living_room', 'feature_oak'
  title text,
  subtitle text,
  content text,
  image_url text,
  secondary_image_url text,
  button_text text,
  button_link text,
  metadata jsonb default '{}'::jsonb,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(page_slug, section_key)
);

-- 2. PROCESS STEPS TABLE
create table if not exists process_steps (
  id text primary key default gen_random_uuid()::text,
  step_number text not null,
  heading text not null,
  subheading text,
  paragraph text,
  image_url text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ENABLE RLS
alter table page_sections enable row level security;
alter table process_steps enable row level security;

-- 4. POLICIES
-- Anyone can view active sections & steps
create policy "Public can view active page sections" on page_sections
  for select using (is_active = true);

create policy "Public can view process steps" on process_steps
  for select using (true);

-- Authenticated users & Service role can do all CRUD operations
create policy "Allow all CRUD for authenticated users on page_sections" on page_sections
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

create policy "Allow all CRUD for authenticated users on process_steps" on process_steps
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

create policy "Allow all CRUD for authenticated users on products" on products
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

create policy "Allow all CRUD for authenticated users on stories" on stories
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

create policy "Allow all CRUD for authenticated users on materials" on materials
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- In case anonymous client is used in dev mode, grant write if service role isn't used
-- (User can restrict this once Supabase Auth users are registered)
