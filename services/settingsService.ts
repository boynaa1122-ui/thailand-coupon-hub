import type { SupabaseClient } from "@supabase/supabase-js";
import type { PromoGridItem, QuickLinkItem } from "@/types";

export async function getSetting<T>(supabase: SupabaseClient, key: string): Promise<T | null> {
  const { data, error } = await supabase.from("settings").select("value").eq("key", key).single();
  if (error) return null;
  return data.value as T;
}

export async function getPromoGrid(supabase: SupabaseClient): Promise<PromoGridItem[]> {
  const data = await getSetting<PromoGridItem[]>(supabase, "promo_grid");
  return data || [];
}

export async function getQuickLinks(supabase: SupabaseClient): Promise<QuickLinkItem[]> {
  const data = await getSetting<QuickLinkItem[]>(supabase, "quick_links");
  return data || [];
}
