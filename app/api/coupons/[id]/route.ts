import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCouponById, incrementCouponStat } from "@/services/couponService";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const coupon = await getCouponById(supabase, id);

  if (!coupon) {
    return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
  }

  const track = request.nextUrl.searchParams.get("track");
  if (track === "click") await incrementCouponStat(supabase, id, "clicks_count");
  if (track === "copy") await incrementCouponStat(supabase, id, "copies_count");

  return NextResponse.json(coupon);
}
