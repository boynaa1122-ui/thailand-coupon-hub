import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { CouponCard } from "@/components/coupon/CouponCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Coupon } from "@/types";

export function TrendingCoupons({ coupons }: { coupons: Coupon[] }) {
  return (
    <section className="bg-white py-12 dark:bg-surface-darkDim/40">
      <div className="container-page">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            <TrendingUp className="h-6 w-6 text-accent-500" /> กำลังฮิตตอนนี้
          </h2>
          <Link href="/trending" className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline">
            ดูทั้งหมด <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {coupons.length === 0 ? (
          <EmptyState title="ยังไม่มีข้อมูลความนิยม" />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
