import { createClient } from "@/lib/supabase/server";
import { CouponForm } from "@/components/coupon/CouponForm";

export default async function NewCouponPage() {
  const supabase = await createClient();
  const [{ data: categories }, { data: brands }] = await Promise.all([
    supabase.from("categories").select("*").order("display_order"),
    supabase.from("brands").select("*").order("display_order"),
  ]);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">เพิ่มคูปองใหม่</h1>
      <CouponForm categories={categories || []} brands={brands || []} />
    </div>
  );
}
