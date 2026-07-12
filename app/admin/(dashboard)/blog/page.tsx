import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*, category:blog_categories(name_th)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">บทความ</h1>
          <p className="mt-1 text-neutral-500">จัดการบทความและเนื้อหาบล็อกทั้งหมด</p>
        </div>
        <LinkButton href="/admin/blog/new" icon={<Plus className="h-4 w-4" />}>
          เพิ่มบทความ
        </LinkButton>
      </div>

      {!posts?.length ? (
        <EmptyState title="ยังไม่มีบทความ" description="เริ่มต้นเขียนบทความแรกของคุณ" />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800 lg:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-300">
                <tr>
                  <th className="px-4 py-3">ชื่อบทความ</th>
                  <th className="px-4 py-3">หมวดหมู่</th>
                  <th className="px-4 py-3">ผู้เขียน</th>
                  <th className="px-4 py-3">วันที่สร้าง</th>
                  <th className="px-4 py-3">สถานะ</th>
                  <th className="px-4 py-3">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {posts.map((p: any) => (
                  <tr key={p.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/20">
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3 text-neutral-500">{p.category?.name_th || "-"}</td>
                    <td className="px-4 py-3 text-neutral-500">{p.author}</td>
                    <td className="px-4 py-3 text-neutral-500">{formatDate(p.created_at)}</td>
                    <td className="px-4 py-3">
                      {p.status === "published" ? (
                        <Badge variant="success">เผยแพร่</Badge>
                      ) : (
                        <Badge variant="neutral">ฉบับร่าง</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/blog/${p.id}/edit`} className="text-primary-600 hover:underline">
                          แก้ไข
                        </Link>
                        <DeleteButton endpoint={`/api/admin/blog/${p.id}`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-3 lg:hidden">
            {posts.map((p: any) => (
              <div key={p.id} className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-surface-darkDim">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">{p.title}</h3>
                    <p className="mt-1 text-xs text-neutral-500">{p.category?.name_th || "-"}</p>
                  </div>
                  {p.status === "published" ? (
                    <Badge variant="success">เผยแพร่</Badge>
                  ) : (
                    <Badge variant="neutral">ฉบับร่าง</Badge>
                  )}
                </div>
                <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-neutral-500">ผู้เขียน</p>
                    <p className="font-medium">{p.author}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">วันที่สร้าง</p>
                    <p className="font-medium">{formatDate(p.created_at)}</p>
                  </div>
                </div>
                <div className="flex gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                  <Link
                    href={`/admin/blog/${p.id}/edit`}
                    className="flex-1 rounded bg-primary-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-primary-700"
                  >
                    แก้ไข
                  </Link>
                  <DeleteButton endpoint={`/api/admin/blog/${p.id}`} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
