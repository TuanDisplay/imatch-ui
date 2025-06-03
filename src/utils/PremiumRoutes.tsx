import { ReactNode, useEffect } from 'react';
import { usePremiumModal } from '~/hooks/useModalStore';
import { Navigate } from 'react-router-dom';

const PremiumRoutes = ({ children }: { children: ReactNode }) => {
  const { setIsPremiumModal, isGoPremium } = usePremiumModal();

  useEffect(() => {
    if (!isGoPremium) {
      setIsPremiumModal(true);
    }
  }, [isGoPremium, setIsPremiumModal]);

  if (!isGoPremium) return <Navigate to="/" />;

  return <>{children}</>;
};

export default PremiumRoutes;
