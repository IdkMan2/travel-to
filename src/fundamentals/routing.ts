import {RouteProps} from 'react-router-dom';

export interface IAppRoute extends Omit<RouteProps, 'component'> {
  protected?: boolean;
  component: RouteProps['component']
}

export const ROUTES: IAppRoute[] = [
  {
    path: '/',
    component: function () {return null;}
  }
];
