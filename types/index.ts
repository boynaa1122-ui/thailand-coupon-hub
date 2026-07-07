export type DiscountType = "percentage" | "fixed" | "freebie";
export type BlogStatus = "draft" | "published";
export type AdminRole = "admin" | "editor";
export type EventType =
  | "page_view"
  | "coupon_view"
  | "coupon_click"
  | "coupon_copy"
  | "blog_view"
  | "search";

export interface Category {
  id: string;
  name_th: string;
  name_en: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  title: string;
  description: string | null;
  code: string | null;
  discount_type: DiscountType;
  discount_value: number;
  merchant_url: string | null;
  image_url: string | null;
  category_id: string | null;
  brand_id: string | null;
  is_featured: boolean;
  is_active: boolean;
  starts_at: string;
  expires_at: string | null;
  views_count: number;
  clicks_count: number;
  copies_count: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  created_at: string;
  updated_at: string;
  // joined
  category?: Category | null;
  brand?: Brand | null;
}

export interface BlogCategory {
  id: string;
  name_th: string;
  name_en: string;
  slug: string;
  display_order: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  category_id: string | null;
  author: string;
  status: BlogStatus;
  views_count: number;
  reading_time_minutes: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // joined
  category?: BlogCategory | null;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: AdminRole;
  avatar_url: string | null;
  created_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: EventType;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  site_name: string;
  site_description: string;
  contact_email: string;
  social_links: { facebook: string; instagram: string; line: string };
  google_analytics_id: string;
}

export interface PaginatedResult<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SearchResult {
  coupons: Coupon[];
  posts: BlogPost[];
}
