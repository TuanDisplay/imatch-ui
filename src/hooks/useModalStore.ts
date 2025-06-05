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

type TSolutionModal = {
  isSolutionOpen: boolean;
  setIsSolutionModal: (value: boolean) => void;
};

type TPremiumModal = {
  isPremiumOpen: boolean;
  isGoPremium: boolean;

  setIsPremiumModal: (value: boolean) => void;
  setGoPremium: (value: boolean) => void;
};

type TPayPremiumModal = {
  isPayPremiumOpen: boolean;
  setIsPayPremiumModal: (value: boolean) => void;
};

type TPayProductModal = {
  isPayProductOpen: boolean;
  setIsPayProductModal: (value: boolean) => void;
};

type TAuthModal = {
  isAuthOpen: boolean;
  isAuthenticated: boolean;

  setIsAuthenticated: (value: boolean) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

type TLoadingScreen = {
  isLoadingScreen: boolean;
  setLoadingSreen: (value: boolean) => void;
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

export const useSolutionModal = create<TSolutionModal>((set) => ({
  isSolutionOpen: false,
  setIsSolutionModal(value) {
    set({ isSolutionOpen: value });
  },
}));

export const usePayPremiumModal = create<TPayPremiumModal>((set) => ({
  isPayPremiumOpen: false,
  setIsPayPremiumModal(value) {
    set({ isPayPremiumOpen: value });
  },
}));

export const usePayProductModal = create<TPayProductModal>((set) => ({
  isPayProductOpen: false,
  setIsPayProductModal(value) {
    set({ isPayProductOpen: value });
  },
}));

export const usePremiumModal = create<TPremiumModal>()(
  persist(
    (set) => ({
      isPremiumOpen: false,
      isGoPremium: false,

      setIsPremiumModal(value) {
        set({ isPremiumOpen: value });
      },
      setGoPremium(value) {
        set({ isGoPremium: value });
      },
    }),
    {
      name: 'premium-storage',
      partialize: (state) => ({ isGoPremium: state.isGoPremium }),
    },
  ),
);

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
      name: 'auth-storage',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  ),
);

export const useLoadingSreen = create<TLoadingScreen>((set) => ({
  isLoadingScreen: false,
  setLoadingSreen: (value) => set({ isLoadingScreen: value }),
}));
