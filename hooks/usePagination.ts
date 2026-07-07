"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export function usePagination(totalPages: number) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return {
    currentPage: Math.min(Math.max(1, currentPage), Math.max(1, totalPages)),
    totalPages,
    goToPage,
    canGoPrev: currentPage > 1,
    canGoNext: currentPage < totalPages,
  };
}
