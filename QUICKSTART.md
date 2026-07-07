# Deals Thai - Quickstart (15 นาที)

## 1. ติดตั้ง dependencies
```bash
npm install
```

## 2. สร้างโปรเจกต์ Supabase
1. ไปที่ https://supabase.com สร้างโปรเจกต์ใหม่
2. ไปที่ SQL Editor > New query
3. คัดลอกเนื้อหาจาก `supabase/schema.sql` ไปรันก่อน
4. คัดลอกเนื้อหาจาก `supabase/seed-data.sql` ไปรันเพื่อสร้างข้อมูลตัวอย่าง

## 3. ตั้งค่า environment variables
```bash
cp .env.example .env.local
```
เปิด `.env.local` แล้วกรอกค่าจาก Supabase Project Settings > API:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 4. สร้างบัญชีแอดมิน
1. ไปที่ Supabase > Authentication > Users > Add user
2. สร้างผู้ใช้ด้วยอีเมล/รหัสผ่านที่ต้องการ
3. คัดลอก User UID ที่ได้
4. ไปที่ Table Editor > `admin_users` > Insert row
   - `id` = User UID ที่คัดลอกมา
   - `email` = อีเมลเดียวกัน
   - `role` = `admin`

## 5. รันเซิร์ฟเวอร์
```bash
npm run dev
```
เปิด http://localhost:3000 สำหรับหน้าเว็บสาธารณะ
เปิด http://localhost:3000/admin/login สำหรับแดชบอร์ดแอดมิน

## ปัญหาที่พบบ่อย
- **หน้าเว็บไม่มีข้อมูล**: ตรวจสอบว่ารัน `supabase/seed-data.sql` แล้ว และ RLS policy อนุญาตให้อ่านข้อมูล (`is_active = true`)
- **เข้า /admin ไม่ได้**: ตรวจสอบว่าสร้างแถวใน `admin_users` ตรงกับ `id` ของผู้ใช้ใน Supabase Auth แล้ว
- **Build error เกี่ยวกับ types**: รัน `npm run type-check` เพื่อดูรายละเอียด

พร้อมแล้ว! ดู `DEPLOYMENT_GUIDE.md` เมื่อพร้อม deploy ขึ้น production
