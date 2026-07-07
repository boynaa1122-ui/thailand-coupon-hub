import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCouponById, getRelatedCoupons, incrementCouponStat } from "@/services/couponService";
import { CouponDetail } from "@/components/coupon/CouponDetail";
import { CouponCard } from "@/components/coupon/CouponCard";
import { buildMetadata, couponJsonLd, breadcrumbJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const coupon = await getCouponById(supabase, id);
  if (!coupon) return buildMetadata({ title: "ไม่พบคูปอง", description: "ไม่พบคูปองที่คุณค้นหา" });

  return buildMetadata({
    title: coupon.meta_title || coupon.title,
    description: coupon.meta_description || coupon.description || coupon.title,
    path: `/coupon/${coupon.id}`,
    image: coupon.image_url,
    keywords: coupon.meta_keywords,
  });
}

export default async function CouponDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const coupon = await getCouponById(supabase, id);
  if (!coupon) notFound();

  incrementCouponStat(supabase, id, "views_count").catch(() => {});

  const related = await getRelatedCoupons(supabase, coupon.category_id, id);

  const jsonLd = [
    couponJsonLd(coupon),
    breadcrumbJsonLd([
      { name: "หน้าแรก", path: "/" },
      ...(coupon.category ? [{ name: coupon.category.name_th, path: `/categories/${coupon.category.slug}` }] : []),
      { name: coupon.title, path: `/coupon/${coupon.id}` },
    ]),
  ];

  return (
    <div className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <CouponDetail coupon={coupon} />

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-display text-xl font-bold text-neutral-900 dark:text-neutral-100">คูปองที่เกี่ยวข้อง</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((c) => (
              <CouponCard key={c.id} coupon={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
