import { z } from "zod";

export const couponSchema = z.object({
  title: z.string().min(3, "กรุณากรอกชื่อคูปองอย่างน้อย 3 ตัวอักษร"),
  description: z.string().optional(),
  code: z.string().optional(),
  discount_type: z.enum(["percentage", "fixed", "freebie"]),
  discount_value: z.coerce.number().min(0),
  merchant_url: z.string().url("กรุณากรอก URL ที่ถูกต้อง").optional().or(z.literal("")),
  image_url: z.string().optional(),
  category_id: z.string().uuid().optional().or(z.literal("")),
  brand_id: z.string().uuid().optional().or(z.literal("")),
  is_featured: z.boolean().optional(),
  is_active: z.boolean().optional(),
  expires_at: z.string().optional().or(z.literal("")),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
});

export type CouponFormValues = z.infer<typeof couponSchema>;

export const blogPostSchema = z.object({
  title: z.string().min(3, "กรุณากรอกชื่อบทความอย่างน้อย 3 ตัวอักษร"),
  slug: z.string().min(3, "กรุณากรอก slug"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "กรุณากรอกเนื้อหาบทความ"),
  featured_image: z.string().optional(),
  category_id: z.string().uuid().optional().or(z.literal("")),
  author: z.string().optional(),
  status: z.enum(["draft", "published"]),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;

export const categorySchema = z.object({
  name_th: z.string().min(1, "กรุณากรอกชื่อภาษาไทย"),
  name_en: z.string().min(1, "กรุณากรอกชื่อภาษาอังกฤษ"),
  slug: z.string().min(1, "กรุณากรอก slug"),
  description: z.string().optional(),
  icon: z.string().optional(),
  display_order: z.coerce.number().default(0),
  is_active: z.boolean().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export const brandSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อแบรนด์"),
  slug: z.string().min(1, "กรุณากรอก slug"),
  website_url: z.string().url().optional().or(z.literal("")),
  logo_url: z.string().optional(),
  description: z.string().optional(),
  display_order: z.coerce.number().default(0),
  is_active: z.boolean().optional(),
});

export type BrandFormValues = z.infer<typeof brandSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "กรุณากรอกชื่อ"),
  email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
  subject: z.string().optional(),
  message: z.string().min(10, "กรุณากรอกข้อความอย่างน้อย 10 ตัวอักษร"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านอย่างน้อย 6 ตัวอักษร"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
