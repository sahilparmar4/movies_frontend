import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  currentUser: any; // Replace `any` with a proper user type if you have one
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
