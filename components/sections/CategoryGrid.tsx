import Link from "next/link";
import { Tag } from "lucide-react";
import type { Category } from "@/types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="container-page py-12">
      <h2 className="mb-6 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">เลือกซื้อตามหมวดหมู่</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="card-surface flex flex-col items-center gap-2 p-5 text-center transition-transform hover:-translate-y-1"
          >
            <div className="rounded-full bg-primary-50 p-3 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
              <Tag className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{cat.name_th}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
