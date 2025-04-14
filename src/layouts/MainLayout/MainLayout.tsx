import { ChildNode } from '~/common/type';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';

export default function MainLayout({ children }: ChildNode) {
  return (
      <div className="flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
  );
}
