import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getTrendingCoupons } from "@/services/couponService";
import { CouponCard } from "@/components/coupon/CouponCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "คูปองกำลังฮิต",
  description: "รวมคูปองและส่วนลดที่มีผู้ใช้งานมากที่สุดในตอนนี้",
  path: "/trending",
});

export const revalidate = 120;

export default async function TrendingPage() {
  const supabase = await createClient();
  const coupons = await getTrendingCoupons(supabase, 24).catch(() => []);

  return (
    <div className="container-page py-10">
      <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        <TrendingUp className="h-7 w-7 text-accent-500" /> กำลังฮิตตอนนี้
      </h1>
      <p className="mt-2 text-neutral-500">คูปองที่มีคนกดใช้งานมากที่สุดในช่วงนี้</p>

      {coupons.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="ยังไม่มีข้อมูลความนิยม" />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {coupons.map((c) => (
            <CouponCard key={c.id} coupon={c} />
          ))}
        </div>
      )}
    </div>
  );
}
