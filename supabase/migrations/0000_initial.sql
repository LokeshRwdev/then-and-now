-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PRODUCTS
create table products (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  short_description text,
  long_description text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PRODUCT IMAGES
create table product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer default 0,
  is_hero boolean default false
);

-- 3. PRODUCT SPECIFICATIONS
create table product_specifications (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  name text not null,
  value text not null,
  unit text,
  sort_order integer default 0
);

-- 4. PRODUCT SECTIONS (For Description / Support / Manufacturing)
create table product_sections (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  type text not null, -- 'manufacturing', 'support', 'gallery', 'text'
  heading text,
  subheading text,
  rich_text text,
  image_url text,
  image_position text default 'left', -- 'left', 'right', 'top', 'bottom'
  sort_order integer default 0
);

-- 5. PROJECTS
create table projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. STORIES
create table stories (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. MATERIALS
create table materials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  image_url text,
  properties_json jsonb
);

-- 8. RECOMMENDATIONS
create table recommendations (
  id uuid primary key default uuid_generate_v4(),
  source_id uuid not null, -- product_id
  target_type text not null, -- 'product', 'project', 'story', 'material'
  target_id uuid not null,
  sort_order integer default 0,
  foreign key (source_id) references products(id) on delete cascade
);

-- 9. REQUESTS (Contact form submissions)
create table requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  company text,
  requirement text,
  message text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. SITE SETTINGS
create table site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique,
  value text not null
);

-- Row Level Security (RLS)
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_specifications enable row level security;
alter table product_sections enable row level security;
alter table projects enable row level security;
alter table stories enable row level security;
alter table materials enable row level security;
alter table recommendations enable row level security;
alter table requests enable row level security;
alter table site_settings enable row level security;

-- Policies for public reading
create policy "Public can view published products" on products for select using (is_published = true);
create policy "Public can view product images" on product_images for select using (true);
create policy "Public can view product specifications" on product_specifications for select using (true);
create policy "Public can view product sections" on product_sections for select using (true);
create policy "Public can view projects" on projects for select using (true);
create policy "Public can view stories" on stories for select using (true);
create policy "Public can view materials" on materials for select using (true);
create policy "Public can view recommendations" on recommendations for select using (true);
create policy "Public can view site settings" on site_settings for select using (true);

-- Contact form: Public can insert requests
create policy "Public can insert requests" on requests for insert with check (true);

-- Admin writes can be managed using the Supabase Service Role key securely on the backend, 
-- or we can add Auth Policies if we intend to allow Client-side authenticated edits.
-- Assuming backend Server Actions will handle write operations with Service Role or authenticated Client token.
