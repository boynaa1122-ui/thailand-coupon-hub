import { PackageSearch } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  showHomeLink?: boolean;
}

export function EmptyState({ title, description, icon, action, showHomeLink = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-20 text-center dark:border-neutral-700 dark:bg-neutral-900/30">
      <div className="rounded-full bg-neutral-100 p-3 text-neutral-400 dark:bg-neutral-800">
        {icon || <PackageSearch className="h-8 w-8" />}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
        {description && <p className="mt-1 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">{description}</p>}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {action}
        {showHomeLink && (
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            กลับไปหน้าแรก
          </Link>
        )}
      </div>
    </div>
  );
}
