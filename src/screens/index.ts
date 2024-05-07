import {routes} from '../constant';
import {BottomTab} from './bottom-tab';
import {History} from './history';
import {Home} from './home';
import {Login} from './login';
import {Profile} from './profile';
import {Register} from './register';

interface Route {
  path: string;
  component: any;
}

export const Routes: Route[] = [
  {
    path: routes.LOGIN,
    component: Login,
  },
  {
    path: routes.REGISTER,
    component: Register,
  },
  {
    path: routes.PROFILE,
    component: Profile,
  },
  {
    path: routes.BOTTOM_TAB,
    component: BottomTab,
  },
  {
    path: routes.HISTORY,
    component: History,
  },
];
