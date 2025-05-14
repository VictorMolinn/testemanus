import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Session } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      loading: true,
      setSession: (session) => set({ session, loading: false }),
      setLoading: (loading) => set({ loading }),
      clearSession: () => set({ session: null, loading: false }),
    }),
    {
      name: "auth-storage", // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

