import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-elevation1",
  secondary: "bg-secondary-500 text-white hover:bg-secondary-600 shadow-elevation1",
  outline: "border border-neutral-300 text-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800",
  ghost: "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
  danger: "bg-accent-500 text-white hover:bg-accent-600",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkButtonProps = BaseProps & {
  href: string;
  target?: string;
  onClick?: () => void;
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn("btn-base", variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  href,
  target,
  onClick,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      onClick={onClick}
      className={cn("btn-base", variantStyles[variant], sizeStyles[size], className)}
    >
      {icon}
      {children}
    </Link>
  );
}
