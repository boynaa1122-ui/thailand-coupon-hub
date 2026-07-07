import { create } from "zustand";
import type { AdminUser } from "@/types";

interface AuthState {
  admin: AdminUser | null;
  isLoading: boolean;
  setAdmin: (admin: AdminUser | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  isLoading: true,
  setAdmin: (admin) => set({ admin, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
