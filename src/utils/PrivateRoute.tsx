import { ReactNode, useEffect } from 'react';
import { useAuthModal } from '~/hooks/useModalStore';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthModal((state) => state.isAuthenticated);
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal();
    }
  }, [isAuthenticated, openAuthModal]);

  if (!isAuthenticated) return <Navigate to="/" />;

  return <>{children}</>;
};

export default PrivateRoute;
