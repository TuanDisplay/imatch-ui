import { Link } from 'react-router-dom';
import { Menu } from '~/components/Popup';
import {
  CircleFadingArrowUp,
  ShoppingCart,
  HandCoins,
  Bell,
  LogOut,
} from 'lucide-react';

import Button from '~/components/Button';
import { useAuthModal } from '~/hooks/useModalStore';
import { useHasScrolledBeyond } from '~/hooks/useHasScrolledBeyond';
import clsx from 'clsx';

const links = [
  {
    href: '/posting',
    label: 'Đăng ý tưởng',
    icon: <CircleFadingArrowUp className="h-5" />,
  },
  {
    href: '/exchange',
    label: 'Mua ý tưởng',
    icon: <ShoppingCart className="h-5" />,
  },
  {
    href: '/problem',
    label: 'Đưa giải pháp',
    icon: <HandCoins className="h-5" />,
  },
];

export default function Header() {
  const { openAuthModal, isAuthenticated, setIsAuthenticated } = useAuthModal();
  const hasPassedBanner = useHasScrolledBeyond(300);

  return (
    <header
      className={clsx(
        'fixed top-0 right-0 left-0 z-50 bg-[rgba(10,18,26,.1)] text-[#FFFFFF] duration-300',
        {
          'text-skyBlue-700 bg-white': hasPassedBanner,
        },
      )}
    >
      <div className="flex items-center justify-between px-10 py-2">
        <Link to="/">
          <img src="/logo_rm.png" alt="logo" className="h-10" />
        </Link>
        <nav className="flex h-fit gap-15 font-bold uppercase">
          <Menu links={links}>
            <div className="uppercase"> Sàn ý tưởng</div>
          </Menu>
          <Link to="/expert" className="hover:text-primary duration-300">
            Tư vấn
          </Link>
          <Link to="/about" className="hover:text-primary duration-300">
            Về chúng tôi
          </Link>
        </nav>

        {!isAuthenticated ? (
          <div className="flex gap-5">
            <Button
              primary
              className="px-3 py-2 font-semibold"
              onClick={openAuthModal}
            >
              Đăng nhập
            </Button>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-amber-300">
              <Link to="/profile">
                <img src="/no-user.png" alt="no-user" className="bg-cover" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex gap-5">
            <div className="cursor-pointer rounded-full bg-amber-200 p-2 duration-300 hover:bg-amber-100">
              <Bell className="text-black" />
            </div>

            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-amber-300">
              <Link to="/profile">
                <img src="/AvtTuan.jpg" alt="avatar" className="bg-cover" />
              </Link>
            </div>
            <div className="border-l-[1px] py-2 pl-5">
              <LogOut
                className="hover:text-primary cursor-pointer duration-300"
                onClick={() => setIsAuthenticated(false)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
