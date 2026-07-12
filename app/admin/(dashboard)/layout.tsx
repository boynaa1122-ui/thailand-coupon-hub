import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-surface-dark">
      <AdminNav />
      <main className="w-full flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 md:px-8">
        {children}
      </main>
    </div>
  );
}
