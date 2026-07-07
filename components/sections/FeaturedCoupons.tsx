import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CouponCard } from "@/components/coupon/CouponCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Coupon } from "@/types";

export function FeaturedCoupons({ coupons }: { coupons: Coupon[] }) {
  return (
    <section className="container-page py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">คูปองแนะนำ</h2>
        <Link href="/categories" className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline">
          ดูทั้งหมด <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {coupons.length === 0 ? (
        <EmptyState title="ยังไม่มีคูปองแนะนำ" description="กลับมาดูใหม่อีกครั้งเร็ว ๆ นี้" />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      )}
    </section>
  );
}
