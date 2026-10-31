-- Babbi's Dry Fish Mart: database setup.
-- Run this ONCE in Supabase: SQL Editor -> New query -> paste everything -> Run.
-- It is safe to run again; it will not delete your products.

-- ---------------------------------------------------------------- tables
create table if not exists public.products (
  id              text primary key,                       -- e.g. 'dried-mackerel'
  name_en         text not null,
  name_kn         text,
  category        text not null default 'fish' check (category in ('fish', 'prawn', 'special')),
  price_per_kg    integer not null check (price_per_kg > 0),
  stock_kg        numeric(8, 2) not null default 0 check (stock_kg >= 0),
  badge           text check (badge in ('best', 'new', 'premium')),
  image_url       text,
  description_en  text,
  description_kn  text,
  tip_en          text,
  tip_kn          text,
  shelf_life_en   text,
  shelf_life_kn   text,
  alt_names       text[] not null default '{}',           -- other names people search for
  is_active       boolean not null default true,          -- false = hidden from the website
  sort_order      integer not null default 100,
  created_at      timestamptz not null default now()
);

-- People allowed to use the admin page.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

-- ---------------------------------------------------------------- who is an admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------- security (Row Level Security)
-- Without these rules anyone could change your prices using the public key.
alter table public.products enable row level security;
alter table public.admins   enable row level security;

drop policy if exists "Anyone can view active products" on public.products;
create policy "Anyone can view active products"
  on public.products for select
  using (is_active = true);

drop policy if exists "Admins can view all products" on public.products;
create policy "Admins can view all products"
  on public.products for select to authenticated
  using (public.is_admin());

drop policy if exists "Admins can add products" on public.products;
create policy "Admins can add products"
  on public.products for insert to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can edit products" on public.products;
create policy "Admins can edit products"
  on public.products for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
  on public.products for delete to authenticated
  using (public.is_admin());

drop policy if exists "Users can see their own admin row" on public.admins;
create policy "Users can see their own admin row"
  on public.admins for select to authenticated
  using (user_id = auth.uid());
