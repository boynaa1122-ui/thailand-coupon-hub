"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Sun, Moon, Tag } from "lucide-react";
import { useUIStore } from "@/stores/uiStore";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/categories", label: "หมวดหมู่" },
  { href: "/trending", label: "กำลังฮิต" },
  { href: "/blog", label: "บทความ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
];

export function Header() {
  const pathname = usePathname();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-surface-dark/90">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary-600">
          <Tag className="h-6 w-6" />
          Deals Thai
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800",
                pathname === link.href ? "text-primary-600" : "text-neutral-700 dark:text-neutral-300"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="ค้นหา"
            className="rounded-full p-2.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <Search className="h-5 w-5" />
          </Link>
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="สลับธีม"
              className="rounded-full p-2.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <button
            onClick={toggleMobileMenu}
            aria-label="เมนู"
            className="rounded-full p-2.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="border-t border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-surface-dark md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="block rounded-md3sm px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
