-- ============================================================
-- Deals Thai - Comprehensive Sample Seed Data
-- ============================================================

-- 1. Categories
insert into categories (name_th, name_en, slug, description, icon, display_order) values
  ('แฟชั่น', 'Fashion', 'fashion', 'เสื้อผ้า รองเท้า กระเป๋า และเครื่องประดับจากแบรนด์ดัง', 'shirt', 1),
  ('อิเล็กทรอนิกส์', 'Electronics', 'electronics', 'มือถือ แล็ปท็อป กล้อง และอุปกรณ์ไอทีล่าสุด', 'smartphone', 2),
  ('อาหาร & เครื่องดื่ม', 'Food & Beverage', 'food-beverage', 'ส่วนลดร้านอาหาร บริการส่งอาหาร และคาเฟ่สุดชิค', 'utensils', 3),
  ('ท่องเที่ยว', 'Travel', 'travel', 'ดีลโรงแรม ตั๋วเครื่องบิน และแพ็กเกจท่องเที่ยวสุดคุ้ม', 'plane', 4),
  ('ความงาม & สุขภาพ', 'Beauty & Health', 'beauty-health', 'เครื่องสำอาง สกินแคร์ และบริการสปาเพื่อสุขภาพ', 'sparkles', 5),
  ('บ้าน & สวน', 'Home & Garden', 'home-garden', 'เฟอร์นิเจอร์ ของตกแต่งบ้าน และอุปกรณ์จัดสวน', 'home', 6),
  ('ซูเปอร์มาร์เก็ต', 'Supermarket', 'supermarket', 'ของใช้ในชีวิตประจำวันและของสดส่งตรงถึงบ้าน', 'shopping-cart', 7)
on conflict (slug) do update set 
  name_th = excluded.name_th,
  description = excluded.description;

-- 2. Brands
insert into brands (name, slug, website_url, description, display_order) values
  ('Shopee', 'shopee', 'https://shopee.co.th', 'แพลตฟอร์มช้อปปิ้งออนไลน์ที่ใหญ่ที่สุดในไทย', 1),
  ('Lazada', 'lazada', 'https://lazada.co.th', 'แหล่งรวมสินค้าออนไลน์ครบวงจรพร้อมโปรโมชั่นจัดเต็ม', 2),
  ('Grab', 'grab', 'https://grab.com/th', 'บริการสั่งอาหารและเรียกรถอันดับหนึ่งในใจคนไทย', 3),
  ('Foodpanda', 'foodpanda', 'https://foodpanda.co.th', 'สั่งอาหารออนไลน์จากร้านโปรดส่งตรงถึงหน้าบ้าน', 4),
  ('Agoda', 'agoda', 'https://agoda.com', 'จองโรงแรมและที่พักทั่วโลกในราคาพิเศษ', 5),
  ('Klook', 'klook', 'https://klook.com', 'กิจกรรมท่องเที่ยวและบัตรเข้าชมสถานที่ต่างๆ ทั่วโลก', 6),
  ('Central Online', 'central', 'https://central.co.th', 'ช้อปสินค้าแบรนด์เนมคุณภาพจากห้างเซ็นทรัล', 7),
  ('Power Buy', 'powerbuy', 'https://powerbuy.co.th', 'ศูนย์รวมเครื่องใช้ไฟฟ้าและอุปกรณ์ไอทีชั้นนำ', 8)
on conflict (slug) do update set 
  name = excluded.name,
  description = excluded.description;

-- 3. Coupons
-- Clear old samples
delete from coupons;

-- Fashion
insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, is_active, starts_at, expires_at)
select 'Shopee Fashion Sale ลด 50%', 'ลดสูงสุด 200 บาท เมื่อช้อปสินค้าแฟชั่นครั้งแรก', 'FASHION50', 'percentage', 50, 'https://shopee.co.th', c.id, b.id, true, true, now(), now() + interval '90 days'
from categories c, brands b where c.slug = 'fashion' and b.slug = 'shopee';

insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, is_active, starts_at, expires_at)
select 'Central Online Brand Sale', 'ลดเพิ่ม 10% สำหรับเสื้อผ้าแบรนด์เนมที่ร่วมรายการ', 'CENTRAL10', 'percentage', 10, 'https://central.co.th', c.id, b.id, false, true, now(), now() + interval '30 days'
from categories c, brands b where c.slug = 'fashion' and b.slug = 'central';

-- Electronics
insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, is_active, starts_at, expires_at)
select 'Power Buy IT Expo ลด 1000', 'ส่วนลดทันที 1,000 บาท เมื่อซื้อแล็ปท็อปหรือมือถือที่ร่วมรายการ', 'POWER1000', 'fixed', 1000, 'https://powerbuy.co.th', c.id, b.id, true, true, now(), now() + interval '14 days'
from categories c, brands b where c.slug = 'electronics' and b.slug = 'powerbuy';

insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, is_active, starts_at, expires_at)
select 'Lazada Electronics Voucher', 'เก็บโค้ดลดเพิ่ม 15% สำหรับอุปกรณ์ไอทีและแกดเจ็ต', 'LAZEL15', 'percentage', 15, 'https://lazada.co.th', c.id, b.id, false, true, now(), now() + interval '7 days'
from categories c, brands b where c.slug = 'electronics' and b.slug = 'lazada';

-- Food & Beverage
insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, is_active, starts_at, expires_at)
select 'GrabFood มื้อพิเศษลด 100', 'สั่งอาหารขั้นต่ำ 300 บาท รับส่วนลดทันที 100 บาท', 'GRAB100', 'fixed', 100, 'https://grab.com/th', c.id, b.id, true, true, now(), now() + interval '14 days'
from categories c, brands b where c.slug = 'food-beverage' and b.slug = 'grab';

insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, is_active, starts_at, expires_at)
select 'Foodpanda ลด 30% ทุกร้าน', 'ส่วนลดสูงสุด 80 บาท ไม่มีขั้นต่ำ สำหรับลูกค้าใหม่', 'PANDA30', 'percentage', 30, 'https://foodpanda.co.th', c.id, b.id, false, true, now(), now() + interval '30 days'
from categories c, brands b where c.slug = 'food-beverage' and b.slug = 'foodpanda';

-- Travel
insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, is_active, starts_at, expires_at)
select 'Agoda จองโรงแรมลด 10%', 'ลดเพิ่มทันทีเมื่อจองที่พักในประเทศไทยผ่านแอป Agoda', 'AGODATH', 'percentage', 10, 'https://agoda.com', c.id, b.id, true, true, now(), now() + interval '60 days'
from categories c, brands b where c.slug = 'travel' and b.slug = 'agoda';

insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, is_active, starts_at, expires_at)
select 'Klook เที่ยวคุ้มลด 150', 'ส่วนลดกิจกรรมท่องเที่ยวทั่วไทย เมื่อซื้อครบ 1,500 บาท', 'KLOOK150', 'fixed', 150, 'https://klook.com', c.id, b.id, false, true, now(), now() + interval '45 days'
from categories c, brands b where c.slug = 'travel' and b.slug = 'klook';

-- Beauty & Health
insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, is_active, starts_at, expires_at)
select 'Lazada Beauty Sale ลด 20%', 'คูปองลดเพิ่มสำหรับสินค้าความงามและเครื่องสำอางแบรนด์ดัง', 'BEAUTY20', 'percentage', 20, 'https://lazada.co.th', c.id, b.id, true, true, now(), now() + interval '30 days'
from categories c, brands b where c.slug = 'beauty-health' and b.slug = 'lazada';

-- Supermarket
insert into coupons (title, description, code, discount_type, discount_value, merchant_url, category_id, brand_id, is_featured, is_active, starts_at, expires_at)
select 'Shopee Mart ส่งฟรี', 'คูปองส่งฟรีเมื่อซื้อสินค้าใน Shopee Mart ครบ 200 บาท', 'MARTFREE', 'freebie', 0, 'https://shopee.co.th', c.id, b.id, true, true, now(), now() + interval '30 days'
from categories c, brands b where c.slug = 'supermarket' and b.slug = 'shopee';

-- 4. Blog Categories
insert into blog_categories (name_th, name_en, slug, display_order) values
  ('เคล็ดลับการช้อป', 'Shopping Tips', 'shopping-tips', 1),
  ('รวมดีลเด็ด', 'Best Deals', 'best-deals', 2),
  ('ไลฟ์สไตล์', 'Lifestyle', 'lifestyle', 3)
on conflict (slug) do nothing;

-- 5. Blog Posts
insert into blog_posts (title, slug, excerpt, content, category_id, status, reading_time_minutes, published_at)
select
  '5 วิธีช้อปออนไลน์ให้ประหยัดเงินในกระเป๋า',
  '5-ways-to-save-money-online',
  'รวมเทคนิคการเลือกซื้อของออนไลน์ให้ได้ราคาถูกที่สุด พร้อมวิธีใช้คูปองให้คุ้มค่า',
  '## 1. เช็คคูปองก่อนช้อปทุกครั้ง\n\nการตรวจสอบคูปองส่วนลดจากเว็บ Deals Thai จะช่วยให้คุณประหยัดได้ตั้งแต่ 10-50%...\n\n## 2. เปรียบเทียบราคา\n\nใช้เครื่องมือเปรียบเทียบราคาเพื่อให้มั่นใจว่าคุณได้ดีลที่ดีที่สุด...',
  bc.id, 'published', 5, now()
from blog_categories bc where bc.slug = 'shopping-tips'
on conflict (slug) do nothing;
