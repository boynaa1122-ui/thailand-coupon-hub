"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Tag,
  FileText,
  FolderTree,
  Building2,
  BarChart3,
  Settings,
  Users,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/services/authService";

const LINKS = [
  { href: "/admin/dashboard", label: "แดชบอร์ด", icon: LayoutDashboard },
  { href: "/admin/coupons", label: "คูปอง", icon: Tag },
  { href: "/admin/blog", label: "บทความ", icon: FileText },
  { href: "/admin/categories", label: "หมวดหมู่", icon: FolderTree },
  { href: "/admin/brands", label: "แบรนด์", icon: Building2 },
  { href: "/admin/analytics", label: "สถิติ", icon: BarChart3 },
  { href: "/admin/users", label: "ผู้ดูแลระบบ", icon: Users },
  { href: "/admin/settings", label: "ตั้งค่า", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-surface-darkDim">
      <div className="flex h-16 items-center gap-2 border-b border-neutral-200 px-6 font-display text-lg font-bold text-primary-600 dark:border-neutral-800">
        <Tag className="h-5 w-5" /> Deals Thai Admin
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {LINKS.map((link) => {
          const Icon = link.icon;
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md3sm px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              )}
            >
              <Icon className="h-4.5 w-4.5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="m-3 flex items-center gap-3 rounded-md3sm px-3 py-2.5 text-sm font-medium text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-500/10"
      >
        <LogOut className="h-4.5 w-4.5" /> ออกจากระบบ
      </button>
    </aside>
  );
}
