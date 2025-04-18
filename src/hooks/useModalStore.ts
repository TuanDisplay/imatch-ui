import { create } from 'zustand';

type TAuthModal = {
  isAuthOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

type TDropdownModal = {
  isDropdownOpen: boolean;
  openDropdownModal: () => void;
  closeDropdownModal: () => void;
};

export const useAuthModal = create<TAuthModal>((set) => ({
  isAuthOpen: false,
  openAuthModal: () => set({ isAuthOpen: true }),
  closeAuthModal: () => set({ isAuthOpen: false }),
}));

export const useDropdownModal = create<TDropdownModal>((set) => ({
  isDropdownOpen: false,
  openDropdownModal: () => set({ isDropdownOpen: true }),
  closeDropdownModal: () => set({ isDropdownOpen: false }),
}));
