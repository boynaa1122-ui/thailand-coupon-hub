import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getBlogPostBySlug, getRelatedPosts } from "@/services/blogService";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { BlogCard } from "@/components/blog/BlogCard";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const post = await getBlogPostBySlug(supabase, slug);
  if (!post) return buildMetadata({ title: "ไม่พบบทความ", description: "ไม่พบบทความที่คุณค้นหา" });

  return buildMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || post.title,
    path: `/blog/${post.slug}`,
    image: post.featured_image,
    keywords: post.meta_keywords,
    type: "article",
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const post = await getBlogPostBySlug(supabase, slug);
  if (!post) notFound();

  try {
    await supabase.rpc("increment_blog_views", { post_id: post.id });
  } catch {
    // view-count tracking is non-critical; ignore failures
  }

  const related = await getRelatedPosts(supabase, post.category_id, post.id);

  const jsonLd = [
    articleJsonLd(post),
    breadcrumbJsonLd([
      { name: "หน้าแรก", path: "/" },
      { name: "บทความ", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <div className="container-page max-w-3xl py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <BlogDetail post={post} />

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-display text-xl font-bold text-neutral-900 dark:text-neutral-100">บทความที่เกี่ยวข้อง</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
