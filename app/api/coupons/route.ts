import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listCoupons } from "@/services/couponService";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const supabase = await createClient();

  try {
    const result = await listCoupons(supabase, {
      page: Number(searchParams.get("page") || "1"),
      pageSize: Number(searchParams.get("pageSize") || "12"),
      categorySlug: searchParams.get("category") || undefined,
      brandSlug: searchParams.get("brand") || undefined,
      search: searchParams.get("q") || undefined,
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
