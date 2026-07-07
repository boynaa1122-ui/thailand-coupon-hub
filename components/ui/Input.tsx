import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  hint?: string;
}

const fieldBase =
  "w-full rounded-md3sm border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-neutral-700 dark:bg-surface-darkDim dark:text-neutral-100";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & FieldWrapperProps
>(({ label, error, hint, className, id, ...props }, ref) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
    )}
    <input ref={ref} id={id} className={cn(fieldBase, error && "border-accent-500", className)} {...props} />
    {hint && !error && <p className="text-xs text-neutral-500">{hint}</p>}
    {error && <p className="text-xs text-accent-600">{error}</p>}
  </div>
));
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & FieldWrapperProps
>(({ label, error, hint, className, id, ...props }, ref) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
    )}
    <textarea ref={ref} id={id} className={cn(fieldBase, "min-h-[120px] resize-y", error && "border-accent-500", className)} {...props} />
    {hint && !error && <p className="text-xs text-neutral-500">{hint}</p>}
    {error && <p className="text-xs text-accent-600">{error}</p>}
  </div>
));
Textarea.displayName = "Textarea";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & FieldWrapperProps
>(({ label, error, hint, className, id, children, ...props }, ref) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
    )}
    <select ref={ref} id={id} className={cn(fieldBase, error && "border-accent-500", className)} {...props}>
      {children}
    </select>
    {hint && !error && <p className="text-xs text-neutral-500">{hint}</p>}
    {error && <p className="text-xs text-accent-600">{error}</p>}
  </div>
));
Select.displayName = "Select";
