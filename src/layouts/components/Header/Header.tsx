import { Link } from 'react-router-dom';
import { Menu } from '~/components/Popup';
import { ChevronUp } from 'lucide-react';
import Button from '~/components/Button';
import { useModalStore } from '~/hooks/useModalStore';

const links = [
  { href: '/posting', label: 'Đăng ý tưởng' },
  { href: '/exchange', label: 'Mua ý tưởng' },
  { href: '/solving', label: 'Đưa giải pháp' },
];

export default function Header() {
  const { openModal } = useModalStore();

  return (
    <header className="wrapper">
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/">
          <img src="logo_rm.png" alt="logo" className="h-10 w-[200xp]" />
        </Link>
        <nav className="text-skyBlue-700 flex h-fit gap-10 font-bold">
          <Menu links={links}>
            <div className="flex items-center gap-2">
              <h4>Sàn ý tưởng</h4>
              <ChevronUp className="h-4 w-4" />
            </div>
          </Menu>
          <Link to="/expert">Tư vấn</Link>
          <Link to="/about">Về chúng tôi</Link>
        </nav>

        <Button className="primary px-3 py-2 font-semibold" onClick={openModal}>
          Đăng nhập
        </Button>
      </div>
    </header>
  );
}
