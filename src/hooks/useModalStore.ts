import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TBookingModal = {
  isBookingOpen: boolean;
  setIsBookingModal: (value: boolean) => void;
};

type TMessageModal = {
  isMessageOpen: boolean;
  setIsMessageModal: (value: boolean) => void;
};

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

export const useBookingModal = create<TBookingModal>((set) => ({
  isBookingOpen: false,
  setIsBookingModal(value) {
    set({ isBookingOpen: value });
  },
}));

export const useMessageModal = create<TMessageModal>((set) => ({
  isMessageOpen: false,
  setIsMessageModal(value) {
    set({ isMessageOpen: value });
  },
}));

export const useAuthModal = create<TAuthModal>()(
  persist(
    (set) => ({
      isAuthOpen: false,
      isAuthenticated: false,

      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      openAuthModal: () => set({ isAuthOpen: true }),
      closeAuthModal: () => set({ isAuthOpen: false }),
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
