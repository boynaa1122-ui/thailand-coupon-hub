import { createClient } from "@/lib/supabase/server";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();

  const { data: topCoupons } = await supabase
    .from("coupons")
    .select("title, views_count, clicks_count, copies_count")
    .order("clicks_count", { ascending: false })
    .limit(8);

  const { data: recentEvents } = await supabase
    .from("analytics")
    .select("event_type, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">สถิติ</h1>
      <p className="mb-6 text-neutral-500">ภาพรวมพฤติกรรมผู้ใช้งานและคูปองที่ได้รับความนิยม</p>
      <AnalyticsCharts topCoupons={topCoupons || []} recentEvents={recentEvents || []} />
    </div>
  );
}
