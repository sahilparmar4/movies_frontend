import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  currentUser: any;
  setCurrentUser: (user: any) => void;
};


export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      currentUser: null,
      setCurrentUser: (currentUser) => set({ currentUser }),
    }),
    {
      name: "user",
    }
  )
);
