import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { listCategories } from "@/services/categoryService";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "หมวดหมู่คูปองทั้งหมด",
  description: "เลือกดูคูปองและส่วนลดตามหมวดหมู่ที่คุณสนใจ",
  path: "/categories",
});

export const revalidate = 300;

export default async function CategoriesPage() {
  const supabase = await createClient();
  const categories = await listCategories(supabase).catch(() => []);

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-neutral-100">หมวดหมู่ทั้งหมด</h1>
      <p className="mt-2 text-neutral-500">เลือกหมวดหมู่ที่คุณสนใจเพื่อดูคูปองและส่วนลดล่าสุด</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="card-surface flex flex-col items-center gap-3 p-6 text-center transition-transform hover:-translate-y-1"
          >
            <div className="rounded-full bg-primary-50 p-4 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
              <Tag className="h-6 w-6" />
            </div>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{cat.name_th}</span>
            {cat.description && <p className="line-clamp-2 text-xs text-neutral-500">{cat.description}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
