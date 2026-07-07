import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { listBlogPosts } from "@/services/blogService";
import { BlogCard } from "@/components/blog/BlogCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PaginationLink } from "@/components/ui/PaginationLink";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "บทความและเคล็ดลับช้อปปิ้ง",
  description: "รวมบทความ เคล็ดลับ และรีวิวดีลที่ช่วยให้คุณช้อปคุ้มกว่าเดิม",
  path: "/blog",
});

export const revalidate = 300;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogListPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const supabase = await createClient();
  const result = await listBlogPosts(supabase, { page: Number(page || "1") });

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-bold text-neutral-900 dark:text-neutral-100">บทความ</h1>
      <p className="mt-2 text-neutral-500">เคล็ดลับ รีวิว และข่าวสารเกี่ยวกับการช้อปปิ้งอย่างคุ้มค่า</p>

      {result.data.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="ยังไม่มีบทความ" description="กลับมาดูใหม่อีกครั้งเร็ว ๆ นี้" />
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {result.data.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-10">
            <PaginationLink currentPage={result.page} totalPages={result.totalPages} basePath="/blog" />
          </div>
        </>
      )}
    </div>
  );
}
