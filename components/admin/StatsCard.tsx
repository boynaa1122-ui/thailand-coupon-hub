import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  accent?: "primary" | "secondary" | "success" | "warning";
}

const accentStyles = {
  primary: "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300",
  secondary: "bg-secondary-50 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-300",
  success: "bg-success-50 text-success-600 dark:bg-success-500/10",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/10",
};

export function StatsCard({ label, value, icon: Icon, trend, accent = "primary" }: StatsCardProps) {
  return (
    <div className="card-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-500">{label}</span>
        <div className={cn("rounded-full p-2", accentStyles[accent])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-neutral-900 dark:text-neutral-100">{value}</p>
      {trend && <p className="mt-1 text-xs text-neutral-500">{trend}</p>}
    </div>
  );
}
