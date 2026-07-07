-- ============================================================
-- Deals Thai - Sample Seed Data
-- Run AFTER database-schema.sql
-- ============================================================

insert into categories (name_th, name_en, slug, description, icon, display_order) values
  ('แฟชั่น', 'Fashion', 'fashion', 'เสื้อผ้า รองเท้า กระเป๋า และเครื่องประดับ', 'shirt', 1),
  ('อิเล็กทรอนิกส์', 'Electronics', 'electronics', 'มือถือ แล็ปท็อป และอุปกรณ์ไอที', 'smartphone', 2),
  ('อาหาร & เครื่องดื่ม', 'Food & Beverage', 'food-beverage', 'ร้านอาหาร เดลิเวอรี่ และคาเฟ่', 'utensils', 3),
  ('ท่องเที่ยว', 'Travel', 'travel', 'ตั๋วเครื่องบิน โรงแรม และแพ็กเกจทัวร์', 'plane', 4),
  ('ความงาม', 'Beauty', 'beauty', 'เครื่องสำอางและผลิตภัณฑ์ดูแลผิว', 'sparkles', 5),
  ('ซูเปอร์มาร์เก็ต', 'Supermarket', 'supermarket', 'ของใช้ในบ้านและซูเปอร์มาร์เก็ตออนไลน์', 'shopping-cart', 6)
on conflict (slug) do nothing;

insert into brands (name, slug, website_url, description, display_order) values
  ('Shopee', 'shopee', 'https://shopee.co.th', 'แพลตฟอร์มช้อปปิ้งออนไลน์อันดับ 1', 1),
  ('Lazada', 'lazada', 'https://lazada.co.th', 'ช้อปปิ้งออนไลน์ครบวงจร', 2),
  ('Grab', 'grab', 'https://grab.com/th', 'บริการเรียกรถและส่งอาหาร', 3),
  ('Central', 'central', 'https://central.co.th', 'ห้างสรรพสินค้าชั้นนำ', 4),
  ('AirAsia', 'airasia', 'https://airasia.com', 'สายการบินราคาประหยัด', 5)
on conflict (slug) do nothing;

-- Sample coupons (category/brand looked up by slug)
insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, expires_at)
select
  'ลด 50% ทุกออเดอร์แรก',
  'ใช้โค้ดนี้เพื่อรับส่วนลด 50% สำหรับการสั่งซื้อครั้งแรก สูงสุด 200 บาท',
  'WELCOME50',
  'percentage', 50,
  'https://shopee.co.th',
  c.id, b.id, true, now() + interval '30 days'
from categories c, brands b
where c.slug = 'fashion' and b.slug = 'shopee'
on conflict do nothing;

insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, expires_at)
select
  'ส่งฟรีไม่มีขั้นต่ำ',
  'รับสิทธิ์ส่งฟรีทั่วประเทศไทย ไม่มีขั้นต่ำในการสั่งซื้อ',
  'FREESHIP',
  'freebie', 0,
  'https://lazada.co.th',
  c.id, b.id, true, now() + interval '15 days'
from categories c, brands b
where c.slug = 'electronics' and b.slug = 'lazada'
on conflict do nothing;

insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, expires_at)
select
  'ลดทันที 100 บาท ค่าส่งอาหาร',
  'สั่งอาหารผ่านแอปวันนี้ รับส่วนลดทันที 100 บาท',
  'FOOD100',
  'fixed', 100,
  'https://grab.com/th',
  c.id, b.id, false, now() + interval '7 days'
from categories c, brands b
where c.slug = 'food-beverage' and b.slug = 'grab'
on conflict do nothing;

insert into blog_categories (name_th, name_en, slug, display_order) values
  ('เคล็ดลับช้อปปิ้ง', 'Shopping Tips', 'shopping-tips', 1),
  ('รีวิวดีล', 'Deal Reviews', 'deal-reviews', 2),
  ('ข่าวสาร', 'News', 'news', 3)
on conflict (slug) do nothing;

insert into blog_posts (title, slug, excerpt, content, category_id, status, reading_time_minutes, published_at)
select
  '10 เคล็ดลับหาคูปองส่วนลดให้คุ้มที่สุด',
  '10-tips-find-best-coupons',
  'รวมเทคนิคการหาคูปองและโค้ดส่วนลดที่จะช่วยให้คุณประหยัดเงินได้มากขึ้นในทุกการช้อปปิ้ง',
  '## เริ่มต้นด้วยการวางแผน\n\nก่อนช้อปปิ้งทุกครั้ง ควรเช็คคูปองที่มีอยู่ก่อนเสมอ...\n\n## เปรียบเทียบราคา\n\nอย่าลืมเปรียบเทียบราคาจากหลายร้านก่อนตัดสินใจซื้อ...',
  bc.id, 'published', 4, now()
from blog_categories bc where bc.slug = 'shopping-tips'
on conflict (slug) do nothing;
