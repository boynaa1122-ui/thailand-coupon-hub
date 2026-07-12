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
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
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
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800 lg:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-300">
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
                  <tr key={c.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/20">
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

          {/* Mobile Card View */}
          <div className="space-y-3 lg:hidden">
            {coupons.map((c: any) => (
              <div key={c.id} className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-surface-darkDim">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">{c.title}</h3>
                    <p className="mt-1 text-xs text-neutral-500">{c.category?.name_th || "-"}</p>
                  </div>
                  {isExpired(c.expires_at) ? (
                    <Badge variant="accent">หมดอายุ</Badge>
                  ) : c.is_active ? (
                    <Badge variant="success">เปิดใช้งาน</Badge>
                  ) : (
                    <Badge variant="neutral">ปิดใช้งาน</Badge>
                  )}
                </div>
                <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-neutral-500">ส่วนลด</p>
                    <p className="font-medium">{formatDiscount(c.discount_type, c.discount_value)}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">หมดอายุ</p>
                    <p className="font-medium">{c.expires_at ? formatDate(c.expires_at) : "ไม่มีกำหนด"}</p>
                  </div>
                </div>
                <div className="flex gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  <Link
                    href={`/admin/coupons/${c.id}/edit`}
                    className="flex-1 rounded bg-primary-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-primary-700"
                  >
                    แก้ไข
                  </Link>
                  <DeleteButton endpoint={`/api/admin/coupons/${c.id}`} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
