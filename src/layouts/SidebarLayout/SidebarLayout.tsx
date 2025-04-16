import { ChildNode } from '~/common/types';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';

export default function SidebarLayout({ children }: ChildNode) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
