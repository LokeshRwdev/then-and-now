-- Catalog categories and editable product detail pages.
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  thumbnail_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table categories enable row level security;
create policy "Public can view categories" on categories for select using (true);
create policy "Service role manages categories" on categories for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

insert into categories (name, slug, sort_order)
values ('Objects', 'object', 0), ('Lights', 'light', 1)
on conflict (slug) do nothing;

alter table products
  add column if not exists tag text,
  add column if not exists button_text text default 'REQUEST PRICE',
  add column if not exists page_data jsonb not null default '{}'::jsonb,
  add column if not exists category_id uuid references categories(id) on delete set null;

update products p set category_id = c.id
from categories c where p.category = c.slug and p.category_id is null;

create index if not exists products_category_id_idx on products(category_id);
