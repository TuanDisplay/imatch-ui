import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';

import MainLayout from '~/layouts';
import { AuthModal } from '~/modals';

import { premiumRoutes, privateRoutes, publicRoutes } from '~/routes';
import PrivateRoute from '~/utils/PrivateRoute';
import {
  useAuthModal,
  usePayPremiumModal,
  usePremiumModal,
} from '~/hooks/useModalStore';
import NotFound from '~/pages/NotFound';
import PremiumModal from './modals/PremiumModal';
import PremiumRoutes from './utils/PremiumRoutes';
import PayPremiumModal from './modals/PayPremiumModal';

function App() {
  const { isAuthOpen } = useAuthModal();
  const { isPremiumOpen } = usePremiumModal();
  const { isPayPremiumOpen } = usePayPremiumModal();

  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      {isAuthOpen && <AuthModal />}
      {isPremiumOpen && <PremiumModal />}
      {isPayPremiumOpen && <PayPremiumModal />}
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            const Layout = MainLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;

            const Layout = MainLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRoute>
                }
              />
            );
          })}

          {premiumRoutes.map((route, index) => {
            const Page = route.component;

            const Layout = MainLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <PremiumRoutes>
                      <Layout>
                        <Page />
                      </Layout>
                    </PremiumRoutes>
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
