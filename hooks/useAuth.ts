"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import type { AdminUser } from "@/types";

export function useAuth() {
  const { admin, isLoading, setAdmin, setLoading } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();

    async function loadAdmin() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAdmin(null);
        return;
      }

      const { data } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", user.id)
        .single();

      setAdmin((data as AdminUser) || null);
    }

    loadAdmin();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadAdmin();
    });

    return () => listener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { admin, isLoading, isAuthenticated: !!admin };
}
