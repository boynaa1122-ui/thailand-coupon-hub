import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md3sm bg-neutral-200 dark:bg-neutral-800",
        className
      )}
    />
  );
}

export function CouponCardSkeleton() {
  return (
    <div className="card-surface p-4">
      <Skeleton className="mb-3 h-36 w-full" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="mb-4 h-3 w-1/2" />
      <Skeleton className="h-9 w-full rounded-full" />
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="card-surface p-4">
      <Skeleton className="mb-3 h-44 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}
