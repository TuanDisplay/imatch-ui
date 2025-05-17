import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';

import MainLayout from '~/layouts';
import { AuthModal } from '~/modals';

import { privateRoutes, publicRoutes } from '~/routes';
import PrivateRoute from '~/utils/PrivateRoute';
import { useAuthModal } from '~/hooks/useModalStore';
import NotFound from '~/pages/NotFound';

function App() {
  const { isAuthOpen } = useAuthModal();

  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      {isAuthOpen && <AuthModal />}
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
