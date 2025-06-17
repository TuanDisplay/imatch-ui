import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavMenu, NotiMenu } from '~/components/Popup/Menu';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { Menu as Wrapper, MenuButton } from '@headlessui/react';

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
import { useAuthModal, usePremiumModal } from '~/hooks/useModalStore';
import { useHasScrolledBeyond } from '~/hooks/useHasScrolledBeyond';
import * as authService from '~/services/auth.service';
import { useUProfile } from '~/hooks/ApiQuery/useUserQuery';
import { useEffect } from 'react';

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
  const { isGoPremium, setIsPremiumModal, setGoPremium } = usePremiumModal();

  const location = useLocation();
  const navigate = useNavigate();
  const hasPassedBanner = useHasScrolledBeyond(300);

  const { data, isLoading } = useUProfile();

  const logoutHandle = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('accessToken');
      setGoPremium(false);
      setIsAuthenticated(false);
      navigate('/');
      toast.success('Đăng xuất thành công! 🎉');
    } catch (err) {
      const error = err as AxiosError<{ message: string; codeStatus: number }>;
      toast.error(error.response?.data.message || 'Có lỗi xảy ra');
    }
  };

  useEffect(() => {
    if (data && data.start_day && data.end_day) {
      setGoPremium(true);
    }
  }, [data, setGoPremium]);

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
      <div className="flex items-center justify-between px-10 py-2">
        <div className="ml-8 flex items-center gap-2">
          <Link to="/">
            <img src="/logo_rm.png" alt="logo" className="h-10" />
          </Link>
          {isAuthenticated &&
            (isGoPremium ? (
              <div className="text-primary h-fit rounded-sm bg-amber-200 px-1 py-0.5 text-[10px] font-bold">
                Premium👑
              </div>
            ) : (
              <Button
                className="h-fit rounded-sm px-1 py-0.5 text-[10px]"
                premium
                onClick={() => setIsPremiumModal(true)}
              >
                Free
              </Button>
            ))}
        </div>
        <nav className="flex h-fit gap-15 font-bold uppercase">
          <NavMenu links={links}>
            <div className="uppercase"> Sàn ý tưởng</div>
          </NavMenu>
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
                <img
                  src="/no-user.png"
                  alt="no-user"
                  className="h-full w-full object-cover"
                />
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
              <NotiMenu />
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
                  className="h-full w-full object-cover hover:opacity-50"
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
