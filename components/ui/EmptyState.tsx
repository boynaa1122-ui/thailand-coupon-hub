import { PackageSearch } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md3lg border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700">
      <div className="text-neutral-400">{icon || <PackageSearch className="h-10 w-10" />}</div>
      <h3 className="text-base font-semibold text-neutral-700 dark:text-neutral-200">{title}</h3>
      {description && <p className="max-w-sm text-sm text-neutral-500">{description}</p>}
      {action}
    </div>
  );
}
