import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/blog/BlogForm";

export default async function NewBlogPostPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("blog_categories").select("*").order("display_order");

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-neutral-900 dark:text-neutral-100">เพิ่มบทความใหม่</h1>
      <BlogForm categories={categories || []} />
    </div>
  );
}
