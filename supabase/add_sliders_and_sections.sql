-- ------------------------------------------------------------
-- SLIDERS
-- ------------------------------------------------------------
create table if not exists sliders (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  image_url text not null,
  link_url text,
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table sliders enable row level security;
create policy "public read sliders" on sliders for select using (is_active = true);
create policy "admin all sliders" on sliders for all using (is_admin()) with check (is_admin());

drop trigger if exists trg_sliders_updated on sliders;
create trigger trg_sliders_updated before update on sliders
  for each row execute function set_updated_at();

-- ------------------------------------------------------------
-- SEED DATA FOR NEW SECTIONS (in settings)
-- ------------------------------------------------------------
insert into settings (key, value) values
  ('promo_grid', '[
    {"title": "Lazada", "subtitle": "คูปองลดแรง ส่งฟรีทั่วไทย", "badge": "ลดสูงสุด 80%", "image": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800", "link": "/categories/shopping", "color": "bg-blue-600"},
    {"title": "TikTok Shop", "subtitle": "โค้ดลดสุดคุ้ม ช้อปมันส์ทุกไลฟ์", "badge": "โค้ดลดเพิ่ม 100.-", "image": "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=800", "link": "/categories/shopping", "color": "bg-black"},
    {"title": "LINE MAN", "subtitle": "โค้ดลดค่าอาหาร ค่าส่งสุดคุ้ม", "badge": "ร้านเด็ด ส่งไว", "image": "https://images.unsplash.com/photo-1526367790999-0150786486a9?q=80&w=800", "link": "/categories/food", "color": "bg-green-600"},
    {"title": "Grab", "subtitle": "โค้ดส่วนลด Grab มีให้ทุกวัน", "badge": "ลดจัดเต็ม", "image": "https://images.unsplash.com/photo-1590674852885-ce8245d98863?q=80&w=800", "link": "/categories/food", "color": "bg-green-700"}
  ]'),
  ('quick_links', '[
    {"title": "คูปองยอดนิยม", "subtitle": "อัปเดตทุกวัน", "icon": "Flame", "color": "text-orange-500", "link": "/trending"},
    {"title": "โค้ดส่งฟรี", "subtitle": "ใช้ได้ทุกแพลตฟอร์ม", "icon": "Truck", "color": "text-green-500", "link": "/search?q=ส่งฟรี"},
    {"title": "โค้ดลดเพิ่ม", "subtitle": "ลดสูงสุดกว่า 90%", "icon": "Percent", "color": "text-red-500", "link": "/search?q=ลดเพิ่ม"},
    {"title": "คูปองร้านค้า", "subtitle": "ส่วนลดพิเศษ", "icon": "Store", "color": "text-blue-500", "link": "/categories"},
    {"title": "โปรประจำวัน", "subtitle": "ห้ามพลาด", "icon": "Calendar", "color": "text-indigo-500", "link": "/trending"},
    {"title": "ดีลเด็ด", "subtitle": "ราคาพิเศษ", "icon": "Crown", "color": "text-yellow-500", "link": "/trending"}
  ]')
on conflict (key) do update set value = excluded.value;

-- SEED SLIDERS
insert into sliders (title, image_url, link_url, display_order) values
  ('Shopee 10.10', 'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2000', '/search?q=shopee', 1),
  ('Lazada Payday', 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2000', '/search?q=lazada', 2)
on conflict do nothing;
