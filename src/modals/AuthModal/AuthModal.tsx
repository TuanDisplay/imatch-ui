import { useEffect, useState } from 'react';

import { useAuthModal } from '~/hooks/useModalStore';
import Login from './LoginForm';
import Register from './RegisterForm';

export default function AuthModal() {
  const [isLogin, setLogin] = useState<boolean>(true);
  const { isAuthOpen } = useAuthModal();

  useEffect(() => {
    setLogin(true);
  }, [isAuthOpen]);

  if (!isAuthOpen) return;

  return (
    <div>
      {isLogin ? (
        <Login setState={setLogin} />
      ) : (
        <Register setState={setLogin} />
      )}
    </div>
  );
}
