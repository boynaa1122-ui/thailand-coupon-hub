import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationLinkProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function PaginationLink({ currentPage, totalPages, basePath }: PaginationLinkProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  const hrefFor = (p: number) => `${basePath}?page=${p}`;

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="เปลี่ยนหน้า">
      {currentPage > 1 ? (
        <Link href={hrefFor(currentPage - 1)} className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800" aria-label="ก่อนหน้า">
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className="rounded-full p-2 text-neutral-300"><ChevronLeft className="h-4 w-4" /></span>
      )}

      {pages.map((p, i) => (
        <span key={p} className="flex items-center">
          {i > 0 && pages[i - 1] !== p - 1 && <span className="px-1 text-neutral-400">…</span>}
          <Link
            href={hrefFor(p)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
              p === currentPage
                ? "bg-primary-500 text-white"
                : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            )}
          >
            {p}
          </Link>
        </span>
      ))}

      {currentPage < totalPages ? (
        <Link href={hrefFor(currentPage + 1)} className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800" aria-label="ถัดไป">
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="rounded-full p-2 text-neutral-300"><ChevronRight className="h-4 w-4" /></span>
      )}
    </nav>
  );
}
