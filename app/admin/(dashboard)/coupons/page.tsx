import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDiscount, formatDate, isExpired } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminCouponsPage() {
  const supabase = await createClient();
  const { data: coupons } = await supabase
    .from("coupons")
    .select("*, category:categories(name_th), brand:brands(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">คูปอง</h1>
          <p className="mt-1 text-neutral-500">จัดการคูปองและโค้ดส่วนลดทั้งหมด</p>
        </div>
        <LinkButton href="/admin/coupons/new" icon={<Plus className="h-4 w-4" />}>
          เพิ่มคูปอง
        </LinkButton>
      </div>

      {!coupons?.length ? (
        <EmptyState title="ยังไม่มีคูปอง" description="เริ่มต้นสร้างคูปองแรกของคุณ" />
      ) : (
        <div className="card-surface overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 text-xs font-semibold text-neutral-500 dark:border-neutral-800">
              <tr>
                <th className="px-4 py-3">ชื่อคูปอง</th>
                <th className="px-4 py-3">หมวดหมู่</th>
                <th className="px-4 py-3">ส่วนลด</th>
                <th className="px-4 py-3">หมดอายุ</th>
                <th className="px-4 py-3">สถานะ</th>
                <th className="px-4 py-3">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {coupons.map((c: any) => (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium">{c.title}</td>
                  <td className="px-4 py-3 text-neutral-500">{c.category?.name_th || "-"}</td>
                  <td className="px-4 py-3">{formatDiscount(c.discount_type, c.discount_value)}</td>
                  <td className="px-4 py-3 text-neutral-500">
                    {c.expires_at ? formatDate(c.expires_at) : "ไม่มีกำหนด"}
                  </td>
                  <td className="px-4 py-3">
                    {isExpired(c.expires_at) ? (
                      <Badge variant="accent">หมดอายุ</Badge>
                    ) : c.is_active ? (
                      <Badge variant="success">เปิดใช้งาน</Badge>
                    ) : (
                      <Badge variant="neutral">ปิดใช้งาน</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/coupons/${c.id}/edit`} className="text-primary-600 hover:underline">
                        แก้ไข
                      </Link>
                      <DeleteButton endpoint={`/api/admin/coupons/${c.id}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
