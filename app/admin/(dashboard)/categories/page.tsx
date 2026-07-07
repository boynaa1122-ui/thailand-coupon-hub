import { createClient } from "@/lib/supabase/server";
import { CategoryManager } from "@/components/admin/CategoryManager";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*").order("display_order");

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">หมวดหมู่</h1>
      <p className="mb-6 text-neutral-500">จัดการหมวดหมู่คูปองทั้งหมด</p>
      <CategoryManager initialCategories={categories || []} />
    </div>
  );
}
