import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getFeaturedCoupons } from "@/services/couponService";

export async function GET(request: NextRequest) {
  const limit = Number(request.nextUrl.searchParams.get("limit") || "8");
  const supabase = await createClient();
  const coupons = await getFeaturedCoupons(supabase, limit);
  return NextResponse.json(coupons);
}
