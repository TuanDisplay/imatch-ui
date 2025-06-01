import { Link, useLocation } from 'react-router-dom';
import { Menu } from '~/components/Popup';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import {
  Menu as Wrapper,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';

import {
  CircleFadingArrowUp,
  ShoppingCart,
  HandCoins,
  Bell,
  LogOut,
  Heart,
  Mail,
} from 'lucide-react';
import clsx from 'clsx';

import Button from '~/components/Button';
import { useAuthModal } from '~/hooks/useModalStore';
import { useHasScrolledBeyond } from '~/hooks/useHasScrolledBeyond';
import * as authService from '~/services/auth.service';
import { useUProfile } from '~/hooks/ApiQuery/useUserQuery';

const links = [
  {
    to: '/posting',
    label: 'Đăng ý tưởng',
    icon: <CircleFadingArrowUp className="h-5" />,
  },
  {
    to: '/exchange',
    label: 'Mua ý tưởng',
    icon: <ShoppingCart className="h-5" />,
  },
  {
    to: '/problem',
    label: 'Giải quyết vấn đề',
    icon: <HandCoins className="h-5" />,
  },
];

export default function Header() {
  const { openAuthModal, isAuthenticated, setIsAuthenticated } = useAuthModal();
  const location = useLocation();
  const hasPassedBanner = useHasScrolledBeyond(300);

  

  const { data, isLoading } = useUProfile();

  const logoutHandle = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
      toast.success('Đăng xuất thành công! 🎉');
    } catch (err) {
      const error = err as AxiosError<{ message: string; codeStatus: number }>;
      toast.error(error.response?.data.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <header
      className={clsx(
        'fixed top-0 right-0 left-0 z-50 bg-[rgba(10,18,26,.1)] text-[#FFFFFF] duration-300',
        {
          'text-skyBlue-700 bg-white':
            location.pathname.includes('/exchange/') ||
            location.pathname.includes('/problem/') ||
            hasPassedBanner,
        },
      )}
    >
      <div className="ml-20 flex items-center justify-between px-10 py-2">
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
          <div className="flex gap-4">
            <Link to="/my-favorate" title="Danh sách yêu thích">
              <div className="cursor-pointer rounded-full bg-amber-200 p-2 duration-300 hover:bg-amber-100">
                <Heart className="text-black" />
              </div>
            </Link>
            <Link to="/my-message" title="Tin nhắn">
              <div className="cursor-pointer rounded-full bg-amber-200 p-2 duration-300 hover:bg-amber-100">
                <Mail className="text-black" />
              </div>
            </Link>
            <Wrapper>
              <MenuButton
                className="cursor-pointer rounded-full bg-amber-200 p-2 duration-300 hover:bg-amber-100"
                title="Thông báo"
              >
                <Bell className="text-black" />
              </MenuButton>

              <MenuItems
                anchor="bottom"
                className="absolute right-0 z-50 mt-2 w-75 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black/10 focus:outline-none"
              >
                <div className="px-4 py-3">
                  <p className="text-primary text-sm font-semibold uppercase">
                    Thông báo
                  </p>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {[
                    'Bạn có một tin nhắn mới.',
                    'Ý tưởng của bạn vừa được phê duyệt!',
                    'Bạn nhận được 3 lượt thích mới.',
                    'Hệ thống sẽ bảo trì lúc 12:00 đêm nay.',
                  ].map((message, idx) => (
                    <MenuItem key={idx}>
                      {({ active }) => (
                        <div
                          className={`cursor-pointer px-4 py-2 text-sm ${
                            active
                              ? 'text-primary bg-gray-100'
                              : 'text-gray-700'
                          }`}
                        >
                          {message}
                        </div>
                      )}
                    </MenuItem>
                  ))}
                </div>

                <div className="cursor-pointer px-4 py-3 text-center text-sm text-blue-600 hover:underline">
                  Xem tất cả
                </div>
              </MenuItems>
            </Wrapper>

            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-amber-300">
              <Link to="/profile">
                <img
                  src={
                    isLoading
                      ? '/no-user.png'
                      : (data?.avatar !== '' && data?.avatar) || '/no-user.png'
                  }
                  alt="avatar"
                  className="object-cover hover:opacity-50"
                />
              </Link>
            </div>
            <div className="border-l-[1px] py-2 pl-5" title="Đăng xuất">
              <LogOut
                className="hover:text-primary cursor-pointer duration-300"
                onClick={logoutHandle}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
