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
      <div className="mb-6 flex items-center justify-between">
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
        <div className="card-surface overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 text-xs font-semibold text-neutral-500 dark:border-neutral-800">
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
                <tr key={p.id}>
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
      )}
    </div>
  );
}
