import type { SupabaseClient } from "@supabase/supabase-js";
import type { Slider } from "@/types";

export async function listSliders(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("sliders")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as Slider[];
}

export async function listAllSliders(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("sliders")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as Slider[];
}

export async function createSlider(supabase: SupabaseClient, slider: Partial<Slider>) {
  const { data, error } = await supabase.from("sliders").insert(slider).select().single();
  if (error) throw error;
  return data as Slider;
}

export async function updateSlider(supabase: SupabaseClient, id: string, slider: Partial<Slider>) {
  const { data, error } = await supabase.from("sliders").update(slider).eq("id", id).select().single();
  if (error) throw error;
  return data as Slider;
}

export async function deleteSlider(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from("sliders").delete().eq("id", id);
  if (error) throw error;
}
