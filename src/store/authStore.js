// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) => set({
        accessToken: token,
        user,
        isAuthenticated: !!token,
      }),

      setAccessToken: (token) => set({
        accessToken: token,
        isAuthenticated: !!token,
      }),

      setUser: (user) => set({ user }),

      logout: () => set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: "auth-storage", // localStorage key name
      partialize: (state) => ({
        // Choose what to persist
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // Don't persist accessToken here (use httpOnly cookie instead)
      }),
    }
  )
);
