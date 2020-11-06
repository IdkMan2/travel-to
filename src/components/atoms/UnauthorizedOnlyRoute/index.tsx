import React from 'react';
import {Redirect, Route, RouteProps } from 'react-router-dom';

export interface IUnauthorizedOnlyRouteProps extends RouteProps {
  isUserAuthorized: boolean;
}

function UnauthorizedOnlyRoute(props: IUnauthorizedOnlyRouteProps) {
  const {isUserAuthorized, ...routeProps} = props;

  if(!isUserAuthorized)
    return <Route {...routeProps} />
  else
    return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
}

export default UnauthorizedOnlyRoute;
