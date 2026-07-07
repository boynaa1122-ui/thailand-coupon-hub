import type { Metadata } from "next";
import { Search as SearchIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { listCoupons } from "@/services/couponService";
import { listBlogPosts } from "@/services/blogService";
import { CouponCard } from "@/components/coupon/CouponCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "ค้นหาคูปองและบทความ",
  description: "ค้นหาคูปอง โค้ดส่วนลด และบทความทั้งหมดบน Deals Thai",
  path: "/search",
});

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q || "").trim();
  const supabase = await createClient();

  const [couponsResult, postsResult] = query
    ? await Promise.all([
        listCoupons(supabase, { search: query, pageSize: 12 }),
        listBlogPosts(supabase, { search: query, pageSize: 6 }),
      ])
    : [null, null];

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-neutral-100">ค้นหา</h1>

      <form action="/search" className="mt-6 flex max-w-lg items-center gap-2 rounded-full border border-neutral-300 bg-white p-1.5 dark:border-neutral-700 dark:bg-surface-darkDim">
        <SearchIcon className="ml-3 h-5 w-5 text-neutral-400" />
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="ค้นหาคูปอง แบรนด์ หรือบทความ..."
          className="w-full flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none"
        />
        <button type="submit" className="rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
          ค้นหา
        </button>
      </form>

      {!query ? (
        <div className="mt-10">
          <EmptyState title="พิมพ์คำค้นหาเพื่อเริ่มต้น" icon={<SearchIcon className="h-10 w-10" />} />
        </div>
      ) : (
        <div className="mt-10 space-y-12">
          <section>
            <h2 className="mb-5 font-display text-xl font-bold">คูปอง ({couponsResult?.count || 0})</h2>
            {couponsResult?.data.length ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {couponsResult.data.map((c) => (
                  <CouponCard key={c.id} coupon={c} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">ไม่พบคูปองที่ตรงกับ &ldquo;{query}&rdquo;</p>
            )}
          </section>

          <section>
            <h2 className="mb-5 font-display text-xl font-bold">บทความ ({postsResult?.count || 0})</h2>
            {postsResult?.data.length ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {postsResult.data.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">ไม่พบบทความที่ตรงกับ &ldquo;{query}&rdquo;</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
