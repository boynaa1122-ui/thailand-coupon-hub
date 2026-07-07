import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/blog/BlogForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: post }, { data: categories }] = await Promise.all([
    supabase.from("blog_posts").select("*").eq("id", id).single(),
    supabase.from("blog_categories").select("*").order("display_order"),
  ]);

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">แก้ไขบทความ</h1>
      <BlogForm categories={categories || []} initialData={post} />
    </div>
  );
}
