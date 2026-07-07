import type { SupabaseClient } from "@supabase/supabase-js";
import type { BlogPost, PaginatedResult } from "@/types";

const SELECT_WITH_JOINS = "*, category:blog_categories(*)";

export async function listBlogPosts(
  supabase: SupabaseClient,
  opts: { page?: number; pageSize?: number; categorySlug?: string; search?: string } = {}
): Promise<PaginatedResult<BlogPost>> {
  const { page = 1, pageSize = 9, categorySlug, search } = opts;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("blog_posts")
    .select(categorySlug ? SELECT_WITH_JOINS + ", category!inner(*)" : SELECT_WITH_JOINS, {
      count: "exact",
    })
    .eq("status", "published");

  if (categorySlug) query = query.eq("category.slug", categorySlug);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data, count, error } = await query
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: (data as unknown as BlogPost[]) || [],
    count: count || 0,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil((count || 0) / pageSize)),
  };
}

export async function getBlogPostBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SELECT_WITH_JOINS)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data as unknown as BlogPost;
}

export async function getRelatedPosts(
  supabase: SupabaseClient,
  categoryId: string | null,
  excludeId: string,
  limit = 3
): Promise<BlogPost[]> {
  if (!categoryId) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SELECT_WITH_JOINS)
    .eq("status", "published")
    .eq("category_id", categoryId)
    .neq("id", excludeId)
    .limit(limit);

  if (error) return [];
  return data as unknown as BlogPost[];
}

export async function getTrendingPosts(
  supabase: SupabaseClient,
  limit = 5
): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(SELECT_WITH_JOINS)
    .eq("status", "published")
    .order("views_count", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data as unknown as BlogPost[];
}
