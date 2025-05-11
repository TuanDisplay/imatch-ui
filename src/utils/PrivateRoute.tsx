import { ReactNode, useEffect } from 'react';
import { useAuthModal } from '~/hooks/useModalStore';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { openAuthModal } = useAuthModal();

  const isAuthenticated = useAuthModal((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal();
    }
  }, [isAuthenticated, openAuthModal]);

  if (!isAuthenticated) return <Navigate to="/" />;

  return <>{children}</>;
};

export default PrivateRoute;
