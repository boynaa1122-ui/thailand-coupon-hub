import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCategoryBySlug } from "@/services/categoryService";
import { listCoupons } from "@/services/couponService";
import { CouponCard } from "@/components/coupon/CouponCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PaginationLink } from "@/components/ui/PaginationLink";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const category = await getCategoryBySlug(supabase, slug);
  if (!category) return buildMetadata({ title: "ไม่พบหมวดหมู่", description: "ไม่พบหมวดหมู่ที่คุณค้นหา" });

  return buildMetadata({
    title: `คูปอง${category.name_th}ล่าสุด`,
    description: category.description || `รวมคูปองและส่วนลดหมวด${category.name_th}ล่าสุด`,
    path: `/categories/${category.slug}`,
  });
}

export const revalidate = 180;

export default async function CategoryDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const supabase = await createClient();
  const category = await getCategoryBySlug(supabase, slug);
  if (!category) notFound();

  const result = await listCoupons(supabase, {
    categorySlug: slug,
    page: Number(page || "1"),
    pageSize: 12,
  });

  const jsonLd = breadcrumbJsonLd([
    { name: "หน้าแรก", path: "/" },
    { name: "หมวดหมู่", path: "/categories" },
    { name: category.name_th, path: `/categories/${category.slug}` },
  ]);

  return (
    <div className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        คูปอง{category.name_th}
      </h1>
      {category.description && <p className="mt-2 text-neutral-500">{category.description}</p>}

      {result.data.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="ยังไม่มีคูปองในหมวดนี้" description="ลองดูหมวดหมู่อื่น หรือกลับมาใหม่ภายหลัง" />
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {result.data.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
          <div className="mt-10">
            <PaginationLink currentPage={result.page} totalPages={result.totalPages} basePath={`/categories/${slug}`} />
          </div>
        </>
      )}
    </div>
  );
}
