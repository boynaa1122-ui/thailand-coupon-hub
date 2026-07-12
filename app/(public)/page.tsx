import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getFeaturedCoupons, getTrendingCoupons } from "@/services/couponService";
import { listCategories } from "@/services/categoryService";
import { listSliders } from "@/services/sliderService";
import { getPromoGrid, getQuickLinks } from "@/services/settingsService";
import { HeroSection } from "@/components/sections/HeroSection";
import { MainSlider } from "@/components/sections/MainSlider";
import { PromoGrid } from "@/components/sections/PromoGrid";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { FeaturedCoupons } from "@/components/sections/FeaturedCoupons";
import { TrendingCoupons } from "@/components/sections/TrendingCoupons";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} - คูปองและดีลส่วนลดที่ดีที่สุดในไทย`,
  description: "รวมคูปอง โค้ดส่วนลด และโปรโมชั่นจากร้านค้าชั้นนำในไทย อัปเดตใหม่ทุกวัน",
  path: "/",
});

export const revalidate = 300;

export default async function HomePage() {
  const supabase = await createClient();
  const [featured, trending, categories, sliders, promoGrid, quickLinks] = await Promise.all([
    getFeaturedCoupons(supabase, 8).catch(() => []),
    getTrendingCoupons(supabase, 8).catch(() => []),
    listCategories(supabase).catch(() => []),
    listSliders(supabase).catch(() => []),
    getPromoGrid(supabase).catch(() => []),
    getQuickLinks(supabase).catch(() => []),
  ]);

  return (
    <>
      <HeroSection />
      <MainSlider sliders={sliders} />
      <PromoGrid items={promoGrid} />
      <QuickLinks items={quickLinks} />
      <FeaturedCoupons coupons={featured} />
      <TrendingCoupons coupons={trending} />
      <CategoryGrid categories={categories} />
    </>
  );
}
