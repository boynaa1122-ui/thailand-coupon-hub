import type { SupabaseClient } from "@supabase/supabase-js";
import type { Coupon, PaginatedResult } from "@/types";

const SELECT_WITH_JOINS =
  "*, category:categories(*), brand:brands(*)";

export async function getFeaturedCoupons(
  supabase: SupabaseClient,
  limit = 8
): Promise<Coupon[]> {
  const { data, error } = await supabase
    .from("coupons")
    .select(SELECT_WITH_JOINS)
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as unknown as Coupon[];
}

export async function getTrendingCoupons(
  supabase: SupabaseClient,
  limit = 8
): Promise<Coupon[]> {
  const { data, error } = await supabase
    .from("coupons")
    .select(SELECT_WITH_JOINS)
    .eq("is_active", true)
    .order("clicks_count", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as unknown as Coupon[];
}

export async function getCouponById(
  supabase: SupabaseClient,
  id: string
): Promise<Coupon | null> {
  const { data, error } = await supabase
    .from("coupons")
    .select(SELECT_WITH_JOINS)
    .eq("id", id)
    .single();

  if (error) return null;
  return data as unknown as Coupon;
}

export async function getRelatedCoupons(
  supabase: SupabaseClient,
  categoryId: string | null,
  excludeId: string,
  limit = 4
): Promise<Coupon[]> {
  if (!categoryId) return [];
  const { data, error } = await supabase
    .from("coupons")
    .select(SELECT_WITH_JOINS)
    .eq("is_active", true)
    .eq("category_id", categoryId)
    .neq("id", excludeId)
    .limit(limit);

  if (error) return [];
  return data as unknown as Coupon[];
}

export async function listCoupons(
  supabase: SupabaseClient,
  opts: {
    page?: number;
    pageSize?: number;
    categorySlug?: string;
    brandSlug?: string;
    search?: string;
    onlyActive?: boolean;
  } = {}
): Promise<PaginatedResult<Coupon>> {
  const { page = 1, pageSize = 12, categorySlug, brandSlug, search, onlyActive = true } = opts;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("coupons")
    .select(SELECT_WITH_JOINS + ", category!inner(*), brand(*)", { count: "exact" });

  if (onlyActive) query = query.eq("is_active", true);
  if (categorySlug) query = query.eq("category.slug", categorySlug);
  if (brandSlug) query = query.eq("brand.slug", brandSlug);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: (data as unknown as Coupon[]) || [],
    count: count || 0,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil((count || 0) / pageSize)),
  };
}

export async function incrementCouponStat(
  supabase: SupabaseClient,
  id: string,
  field: "views_count" | "clicks_count" | "copies_count"
) {
  try {
    await supabase.rpc("increment_coupon_stat", { coupon_id: id, stat_field: field });
  } catch {
    // Fallback if RPC not defined - ignore silently, non-critical.
  }
}
