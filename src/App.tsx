import { BrowserRouter, Routes, Route } from 'react-router';

import MainLayout from '~/layouts';
import { privateRoutes, publicRoutes } from '~/routes';
import AuthModal from './modals';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthModal />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;

          const Layout = MainLayout;

          // if (route.layout) {
          //   Layout = route.layout;
          // }

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
  );
}

export default App;
