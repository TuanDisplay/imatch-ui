import { ChildNode } from '~/common/types';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';

export default function MainLayout({ children }: ChildNode) {
  return (
    <div className="flex flex-col">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
