// import { SidebarLayout } from '~/layouts';

import config from '~/config';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Posting from '~/pages/Posting';
import Exchange from '~/pages/Exchange';
import Problem from '~/pages/Problem';
import Expert from '~/pages/Expert';
import About from '~/pages/About';
import ExchangeDetail from '~/pages/ExchangeDetail';
import ProblemDetail from '~/pages/ProblemDetail';
import ExpertDetail from '~/pages/ExpertDetail';
import Favorate from '~/pages/Favorate';
import Message from '~/pages/Message';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.exchange, component: Exchange },
  { path: config.routes.problem, component: Problem },
  { path: config.routes.expert, component: Expert },
  { path: config.routes.about, component: About },
];

const privateRoutes = [
  { path: config.routes.profile, component: Profile },
  { path: config.routes.myFavorate, component: Favorate },
  { path: config.routes.myMessage, component: Message },
  { path: config.routes.expertDetail, component: ExpertDetail },
];

const premiumRoutes = [
  { path: config.routes.posting, component: Posting },
  { path: config.routes.exchangeDetail, component: ExchangeDetail },
  { path: config.routes.problemDetail, component: ProblemDetail },
];

export { publicRoutes, privateRoutes, premiumRoutes };
