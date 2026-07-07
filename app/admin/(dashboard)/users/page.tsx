import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: users } = await supabase.from("admin_users").select("*").order("created_at");

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">ผู้ดูแลระบบ</h1>
      <p className="mb-6 text-neutral-500">
        รายชื่อผู้ดูแลระบบทั้งหมด — เพิ่มบัญชีใหม่โดยสมัครที่หน้า Supabase Auth แล้วเพิ่มแถวใหม่ในตาราง{" "}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">admin_users</code>
      </p>

      {!users?.length ? (
        <EmptyState title="ยังไม่มีผู้ดูแลระบบ" />
      ) : (
        <div className="card-surface overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 text-xs font-semibold text-neutral-500 dark:border-neutral-800">
              <tr>
                <th className="px-4 py-3">อีเมล</th>
                <th className="px-4 py-3">ชื่อ</th>
                <th className="px-4 py-3">บทบาท</th>
                <th className="px-4 py-3">เข้าร่วมเมื่อ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3 font-medium">{u.email}</td>
                  <td className="px-4 py-3 text-neutral-500">{u.full_name || "-"}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.role === "admin" ? "primary" : "neutral"}>
                      {u.role === "admin" ? "ผู้ดูแลระบบ" : "ผู้แก้ไข"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{formatDate(u.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
