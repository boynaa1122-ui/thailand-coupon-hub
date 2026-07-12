import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Handle common typos and redirect to correct admin path
  const adminRedirects: Record<string, string> = {
    "/admn": "/admin",
    "/admin-login": "/admin/login",
    "/dashboard": "/admin/dashboard",
    "/admin-dashboard": "/admin/dashboard",
  };

  if (adminRedirects[path]) {
    const url = request.nextUrl.clone();
    url.pathname = adminRedirects[path];
    return NextResponse.redirect(url);
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = path.startsWith("/admin") && path !== "/admin/login";

  if (isAdminRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return response;
}
