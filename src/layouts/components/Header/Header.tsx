import { Link } from 'react-router-dom';
import { Menu } from '~/components/Popup';
import { CircleFadingArrowUp, ShoppingCart, HandCoins } from 'lucide-react';

import Button from '~/components/Button';
import { useAuthModal } from '~/hooks/useModalStore';

const links = [
  { href: '/posting', label: 'Đăng ý tưởng', icon: <CircleFadingArrowUp /> },
  { href: '/exchange', label: 'Mua ý tưởng', icon: <ShoppingCart /> },
  { href: '/solving', label: 'Đưa giải pháp', icon: <HandCoins /> },
];

export default function Header() {
  const { openAuthModal } = useAuthModal();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-[#F5F5F5]">
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/">
          <img src="logo_rm.png" alt="logo" className="h-10 w-[200xp]" />
        </Link>
        <nav className="text-skyBlue-700 flex h-fit gap-10 font-bold">
          <Menu links={links}>Sàn ý tưởng</Menu>
          <Link to="/expert">Tư vấn</Link>
          <Link to="/about">Về chúng tôi</Link>
        </nav>

        <Button
          className="primary px-3 py-2 font-semibold"
          onClick={openAuthModal}
        >
          Đăng nhập
        </Button>
      </div>
    </header>
  );
}
