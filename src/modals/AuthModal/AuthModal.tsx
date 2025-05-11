import { useState } from 'react';

import Login from './LoginForm';
import Register from './RegisterForm';

export default function AuthModal() {
  const [isLogin, setLogin] = useState<boolean>(true);

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
