import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listCategories } from "@/services/categoryService";

export async function GET() {
  const supabase = await createClient();
  const categories = await listCategories(supabase);
  return NextResponse.json(categories);
}
