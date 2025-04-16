import { useEffect, useState } from 'react';

import { useModalStore } from '~/hooks/useModalStore';
import Login from './LoginForm';
import Register from './RegisterForm';

export default function AuthModal() {
  const [isLogin, setLogin] = useState<boolean>(true);
  const { isModalOpen } = useModalStore();

  useEffect(() => {
    setLogin(true);
  }, [isModalOpen]);

  if (!isModalOpen) return;

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
