-- ============================================================
-- Deals Thai - Database Schema
-- Run this in the Supabase SQL editor (Project > SQL Editor)
-- ============================================================

create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- CATEGORIES
-- ------------------------------------------------------------
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name_th text not null,
  name_en text not null,
  slug text unique not null,
  description text,
  icon text,
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ------------------------------------------------------------
-- BRANDS
-- ------------------------------------------------------------
create table if not exists brands (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  logo_url text,
  website_url text,
  description text,
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ------------------------------------------------------------
-- COUPONS
-- ------------------------------------------------------------
create table if not exists coupons (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  code text,
  discount_type text check (discount_type in ('percentage', 'fixed', 'freebie')) default 'percentage',
  discount_value numeric default 0,
  merchant_url text,
  image_url text,
  category_id uuid references categories(id) on delete set null,
  brand_id uuid references brands(id) on delete set null,
  is_featured boolean default false,
  is_active boolean default true,
  starts_at timestamptz default now(),
  expires_at timestamptz,
  views_count int default 0,
  clicks_count int default 0,
  copies_count int default 0,
  meta_title text,
  meta_description text,
  meta_keywords text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_coupons_category on coupons(category_id);
create index if not exists idx_coupons_brand on coupons(brand_id);
create index if not exists idx_coupons_active on coupons(is_active);
create index if not exists idx_coupons_expires on coupons(expires_at);

-- ------------------------------------------------------------
-- RELATED COUPONS (self relation)
-- ------------------------------------------------------------
create table if not exists related_coupons (
  coupon_id uuid references coupons(id) on delete cascade,
  related_coupon_id uuid references coupons(id) on delete cascade,
  primary key (coupon_id, related_coupon_id)
);

-- ------------------------------------------------------------
-- BLOG CATEGORIES
-- ------------------------------------------------------------
create table if not exists blog_categories (
  id uuid primary key default uuid_generate_v4(),
  name_th text not null,
  name_en text not null,
  slug text unique not null,
  display_order int default 0,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- BLOG POSTS
-- ------------------------------------------------------------
create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  featured_image text,
  category_id uuid references blog_categories(id) on delete set null,
  author text default 'Deals Thai Team',
  status text check (status in ('draft', 'published')) default 'draft',
  views_count int default 0,
  reading_time_minutes int default 1,
  meta_title text,
  meta_description text,
  meta_keywords text,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_blog_status on blog_posts(status);
create index if not exists idx_blog_category on blog_posts(category_id);

-- ------------------------------------------------------------
-- RELATED ARTICLES (self relation)
-- ------------------------------------------------------------
create table if not exists related_articles (
  post_id uuid references blog_posts(id) on delete cascade,
  related_post_id uuid references blog_posts(id) on delete cascade,
  primary key (post_id, related_post_id)
);

-- ------------------------------------------------------------
-- ADMIN USERS (linked to Supabase auth.users)
-- ------------------------------------------------------------
create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text check (role in ('admin', 'editor')) default 'editor',
  avatar_url text,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- ANALYTICS (event tracking)
-- ------------------------------------------------------------
create table if not exists analytics (
  id uuid primary key default uuid_generate_v4(),
  event_type text check (event_type in ('page_view', 'coupon_view', 'coupon_click', 'coupon_copy', 'blog_view', 'search')) not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb default '{}',
  referrer text,
  user_agent text,
  created_at timestamptz default now()
);

create index if not exists idx_analytics_type on analytics(event_type);
create index if not exists idx_analytics_entity on analytics(entity_type, entity_id);
create index if not exists idx_analytics_created on analytics(created_at);

-- ------------------------------------------------------------
-- CONTACT SUBMISSIONS
-- ------------------------------------------------------------
create table if not exists contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- SETTINGS (site-wide, single row key/value table)
-- ------------------------------------------------------------
create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

insert into settings (key, value) values
  ('site_name', '"Deals Thai"'),
  ('site_description', '"เว็บไซต์รวมคูปองและดีลส่วนลดที่ดีที่สุดในไทย"'),
  ('contact_email', '"contact@dealsthai.com"'),
  ('social_links', '{"facebook":"","instagram":"","line":""}'),
  ('google_analytics_id', '""')
on conflict (key) do nothing;

-- ============================================================
-- updated_at triggers
-- ============================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_categories_updated on categories;
create trigger trg_categories_updated before update on categories
  for each row execute function set_updated_at();

drop trigger if exists trg_brands_updated on brands;
create trigger trg_brands_updated before update on brands
  for each row execute function set_updated_at();

drop trigger if exists trg_coupons_updated on coupons;
create trigger trg_coupons_updated before update on coupons
  for each row execute function set_updated_at();

drop trigger if exists trg_blog_posts_updated on blog_posts;
create trigger trg_blog_posts_updated before update on blog_posts
  for each row execute function set_updated_at();

-- ============================================================
-- Atomic counter increment (views/clicks/copies)
-- ============================================================
create or replace function increment_coupon_stat(coupon_id uuid, stat_field text)
returns void as $$
begin
  if stat_field = 'views_count' then
    update coupons set views_count = views_count + 1 where id = coupon_id;
  elsif stat_field = 'clicks_count' then
    update coupons set clicks_count = clicks_count + 1 where id = coupon_id;
  elsif stat_field = 'copies_count' then
    update coupons set copies_count = copies_count + 1 where id = coupon_id;
  end if;
end;
$$ language plpgsql security definer;

create or replace function increment_blog_views(post_id uuid)
returns void as $$
begin
  update blog_posts set views_count = views_count + 1 where id = post_id;
end;
$$ language plpgsql security definer;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table categories enable row level security;
alter table brands enable row level security;
alter table coupons enable row level security;
alter table related_coupons enable row level security;
alter table blog_categories enable row level security;
alter table blog_posts enable row level security;
alter table related_articles enable row level security;
alter table admin_users enable row level security;
alter table analytics enable row level security;
alter table contact_submissions enable row level security;
alter table settings enable row level security;

-- Helper: is the current user an admin?
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from admin_users where id = auth.uid()
  );
$$ language sql security definer stable;

-- Public read access for published/active content
create policy "public read categories" on categories for select using (is_active = true);
create policy "public read brands" on brands for select using (is_active = true);
create policy "public read coupons" on coupons for select using (is_active = true);
create policy "public read related_coupons" on related_coupons for select using (true);
create policy "public read blog_categories" on blog_categories for select using (true);
create policy "public read blog_posts" on blog_posts for select using (status = 'published');
create policy "public read related_articles" on related_articles for select using (true);
create policy "public read settings" on settings for select using (true);

-- Public insert for analytics + contact form
create policy "public insert analytics" on analytics for insert with check (true);
create policy "public insert contact" on contact_submissions for insert with check (true);

-- Admin full access (all tables)
create policy "admin all categories" on categories for all using (is_admin()) with check (is_admin());
create policy "admin all brands" on brands for all using (is_admin()) with check (is_admin());
create policy "admin all coupons" on coupons for all using (is_admin()) with check (is_admin());
create policy "admin all related_coupons" on related_coupons for all using (is_admin()) with check (is_admin());
create policy "admin all blog_categories" on blog_categories for all using (is_admin()) with check (is_admin());
create policy "admin all blog_posts" on blog_posts for all using (is_admin()) with check (is_admin());
create policy "admin all related_articles" on related_articles for all using (is_admin()) with check (is_admin());
create policy "admin read admin_users" on admin_users for select using (is_admin());
create policy "admin manage admin_users" on admin_users for all using (is_admin()) with check (is_admin());
create policy "admin read analytics" on analytics for select using (is_admin());
create policy "admin read contact" on contact_submissions for select using (is_admin());
create policy "admin update contact" on contact_submissions for update using (is_admin());
create policy "admin manage settings" on settings for all using (is_admin()) with check (is_admin());

-- ============================================================
-- Storage buckets (run once) - product/blog images
-- ============================================================
insert into storage.buckets (id, name, public)
values ('deals-thai-media', 'deals-thai-media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects
  for select using (bucket_id = 'deals-thai-media');

create policy "admin upload media" on storage.objects
  for insert with check (bucket_id = 'deals-thai-media' and is_admin());

create policy "admin update media" on storage.objects
  for update using (bucket_id = 'deals-thai-media' and is_admin());

create policy "admin delete media" on storage.objects
  for delete using (bucket_id = 'deals-thai-media' and is_admin());
