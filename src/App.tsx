import { BrowserRouter, Routes, Route } from 'react-router';

import MainLayout from '~/layouts';
import { publicRoutes } from '~/routes';
import AuthModal from './modals';

function App() {
  return (
    <BrowserRouter>
      <AuthModal />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;

          let Layout = MainLayout;

          if (route.layout) {
            Layout = route.layout;
          }

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
