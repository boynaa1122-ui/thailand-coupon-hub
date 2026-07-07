import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { blogPostSchema } from "@/lib/validators";
import { readingTime } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = blogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = {
    ...parsed.data,
    category_id: parsed.data.category_id || null,
    reading_time_minutes: readingTime(parsed.data.content),
    published_at: parsed.data.status === "published" ? new Date().toISOString() : null,
  };

  const { data, error } = await supabase.from("blog_posts").insert(payload).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
