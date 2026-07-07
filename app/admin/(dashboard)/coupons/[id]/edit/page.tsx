import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CouponForm } from "@/components/coupon/CouponForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCouponPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: coupon }, { data: categories }, { data: brands }] = await Promise.all([
    supabase.from("coupons").select("*").eq("id", id).single(),
    supabase.from("categories").select("*").order("display_order"),
    supabase.from("brands").select("*").order("display_order"),
  ]);

  if (!coupon) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">แก้ไขคูปอง</h1>
      <CouponForm categories={categories || []} brands={brands || []} initialData={coupon} />
    </div>
  );
}
