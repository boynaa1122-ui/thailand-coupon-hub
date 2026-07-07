import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listCoupons } from "@/services/couponService";
import { listBlogPosts } from "@/services/blogService";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";
  if (!q.trim()) return NextResponse.json({ coupons: [], posts: [] });

  const supabase = await createClient();
  const [coupons, posts] = await Promise.all([
    listCoupons(supabase, { search: q, pageSize: 12 }),
    listBlogPosts(supabase, { search: q, pageSize: 6 }),
  ]);

  await supabase.from("analytics").insert({ event_type: "search", metadata: { query: q } });

  return NextResponse.json({ coupons: coupons.data, posts: posts.data });
}
