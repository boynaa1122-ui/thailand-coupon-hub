import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "accent" | "neutral";

const styles: Record<BadgeVariant, string> = {
  primary: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300",
  secondary: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300",
  success: "bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-500",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-500",
  accent: "bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-500",
  neutral: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
