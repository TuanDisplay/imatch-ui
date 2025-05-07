import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TAuthModal = {
  isAuthOpen: boolean;
  isAuthenticated: boolean;

  setIsAuthenticated: (value: boolean) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

type TDropdownModal = {
  isDropdownOpen: boolean;
  openDropdownModal: () => void;
  closeDropdownModal: () => void;
};

export const useAuthModal = create<TAuthModal>()(
  persist(
    (set) => ({
      isAuthOpen: false,
      isAuthenticated: false,

      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      openAuthModal: () => set({ isAuthOpen: true }),
      closeAuthModal: () => set({ isAuthOpen: false }),

      // logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // 👈 key trong localStorage
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }), // chỉ lưu cái cần
    },
  ),
);

export const useDropdownModal = create<TDropdownModal>((set) => ({
  isDropdownOpen: false,
  openDropdownModal: () => set({ isDropdownOpen: true }),
  closeDropdownModal: () => set({ isDropdownOpen: false }),
}));
