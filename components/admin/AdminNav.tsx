"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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
  Menu,
  X,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/services/authService";

const LINKS = [
  { href: "/admin/dashboard", label: "แดชบอร์ด", icon: LayoutDashboard },
  { href: "/admin/coupons", label: "คูปอง", icon: Tag },
  { href: "/admin/blog", label: "บทความ", icon: FileText },
  { href: "/admin/sliders", label: "Slider", icon: Image },
  { href: "/admin/categories", label: "หมวดหมู่", icon: FolderTree },
  { href: "/admin/brands", label: "แบรนด์", icon: Building2 },
  { href: "/admin/analytics", label: "สถิติ", icon: BarChart3 },
  { href: "/admin/users", label: "ผู้ดูแลระบบ", icon: Users },
  { href: "/admin/settings", label: "ตั้งค่า", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await logout();
    router.push("/admin/login");
    router.refresh();
  }

  const NavLinks = () => (
    <nav className="flex-1 space-y-1 p-3">
      {LINKS.map((link) => {
        const Icon = link.icon;
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            )}
          >
            <Icon className="h-4.5 w-4.5 flex-shrink-0" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-64 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-surface-darkDim md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-neutral-200 px-6 font-display text-lg font-bold text-primary-600 dark:border-neutral-800">
          <Tag className="h-5 w-5" /> Deals Thai Admin
        </div>
        <NavLinks />
        <button
          onClick={handleLogout}
          className="m-3 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-500/10"
        >
          <LogOut className="h-4.5 w-4.5 flex-shrink-0" /> ออกจากระบบ
        </button>
      </aside>

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-surface-darkDim md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        <div className="flex items-center gap-2 font-display text-lg font-bold text-primary-600">
          <Tag className="h-5 w-5" /> Deals Thai
        </div>
        <div className="w-10" />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />
      )}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-surface-darkDim md:hidden",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavLinks />
        <button
          onClick={handleLogout}
          className="m-3 flex w-[calc(100%-1.5rem)] items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-500/10"
        >
          <LogOut className="h-4.5 w-4.5 flex-shrink-0" /> ออกจากระบบ
        </button>
      </aside>
    </>
  );
}
