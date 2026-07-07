import { createClient } from "@/lib/supabase/server";
import { BrandManager } from "@/components/admin/BrandManager";

export default async function AdminBrandsPage() {
  const supabase = await createClient();
  const { data: brands } = await supabase.from("brands").select("*").order("display_order");

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">แบรนด์</h1>
      <p className="mb-6 text-neutral-500">จัดการแบรนด์และร้านค้าทั้งหมด</p>
      <BrandManager initialBrands={brands || []} />
    </div>
  );
}
