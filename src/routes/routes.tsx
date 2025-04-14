import { SidebarLayout } from '~/layouts';

import config from '~/config';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Posting from '~/pages/Posting';
import Exchange from '~/pages/Exchange';
import Solving from '~/pages/Solving';
import Expert from '~/pages/Expert';
import About from '~/pages/About';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.posting, component: Posting },
  { path: config.routes.exchange, component: Exchange, layout: SidebarLayout },
  { path: config.routes.solving, component: Solving, layout: SidebarLayout },
  { path: config.routes.expert, component: Expert },
  { path: config.routes.about, component: About },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
