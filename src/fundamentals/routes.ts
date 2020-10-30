import {RouteProps} from 'react-router-dom';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import Home from '../components/pages/Home';
import Intro from '../components/pages/Intro';

export interface IAppRoute extends Omit<RouteProps, 'component'> {
  component: RouteProps['component'],
  protection?: 'AUTHORIZED_ONLY' | 'UNAUTHORIZED_ONLY',
}

export const ROUTES: IAppRoute[] = [
  {
    path: '/login',
    exact: true,
    component: Login,
    protection: 'UNAUTHORIZED_ONLY',
  },
  {
    path: '/register',
    exact: true,
    component: Register,
    protection: 'UNAUTHORIZED_ONLY',
  },
  {
    path: '/home',
    component: Home,
    protection: 'AUTHORIZED_ONLY',
  },
  {
    path: '/',
    component: Intro,
  }
];
