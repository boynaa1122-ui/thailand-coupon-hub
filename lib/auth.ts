import { createClient } from "@/lib/supabase/server";
import type { AdminUser } from "@/types";
import { redirect } from "next/navigation";

/**
 * Returns the currently logged-in admin user (or null).
 * Use in Server Components / Route Handlers.
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .single();

  return adminUser as AdminUser | null;
}

/**
 * Redirects to /admin/login if there is no authenticated admin.
 * Call at the top of protected admin Server Components.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return admin as AdminUser;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
