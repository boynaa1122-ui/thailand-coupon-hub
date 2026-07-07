import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("*");

  const settingsMap: Record<string, any> = {};
  (data || []).forEach((row) => (settingsMap[row.key] = row.value));

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">ตั้งค่า</h1>
      <p className="mb-6 text-neutral-500">การตั้งค่าทั่วไปของเว็บไซต์</p>
      <SettingsForm initialSettings={settingsMap} />
    </div>
  );
}
