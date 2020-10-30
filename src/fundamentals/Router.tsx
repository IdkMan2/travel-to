import React, {useCallback} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {IAppRoute, ROUTES} from './routes';

function Router() {

  const renderRoute = useCallback((route: IAppRoute, index: number) => {
    switch(route.protection) {
      case 'AUTHORIZED_ONLY':
      case 'UNAUTHORIZED_ONLY':
      default:
        return <Route key={index} {...route} />
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {ROUTES.map(renderRoute)}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
