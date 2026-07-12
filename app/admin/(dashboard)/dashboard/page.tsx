import { Tag, FileText, MousePointerClick, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/admin/StatsCard";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: couponCount }, { count: postCount }, { data: statsAgg }] = await Promise.all([
    supabase.from("coupons").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("coupons").select("views_count, clicks_count, copies_count"),
  ]);

  const totalViews = (statsAgg || []).reduce((sum, c) => sum + (c.views_count || 0), 0);
  const totalClicks = (statsAgg || []).reduce((sum, c) => sum + (c.clicks_count || 0), 0);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-neutral-100">แดชบอร์ด</h1>
        <p className="mt-2 text-neutral-500">ภาพรวมของเว็บไซต์ Deals Thai</p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="คูปองทั้งหมด" value={couponCount || 0} icon={Tag} accent="primary" />
        <StatsCard label="บทความทั้งหมด" value={postCount || 0} icon={FileText} accent="secondary" />
        <StatsCard label="จำนวนการเข้าชม" value={totalViews.toLocaleString()} icon={Eye} accent="success" />
        <StatsCard label="จำนวนการคลิก" value={totalClicks.toLocaleString()} icon={MousePointerClick} accent="warning" />
      </div>

      <div className="mt-8 w-full rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-surface-darkDim">
        <h2 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">เริ่มต้นใช้งาน</h2>
        <p className="text-sm text-neutral-500">
          ใช้เมนูด้านซ้ายเพื่อจัดการคูปอง บทความ หมวดหมู่ และแบรนด์ของคุณ ข้อมูลจะแสดงบนหน้าเว็บสาธารณะโดยอัตโนมัติ
        </p>
      </div>
    </div>
  );
}
