import React from 'react';
import {Redirect, Route, RouteProps } from 'react-router-dom';
import isRedirectionState from '../../../utils/guards/isRedirectionState';
import IRedirectionState from '../../../models/IRedirectionState';

export interface IAuthorizedOnlyRouteProps extends RouteProps {
  isUserAuthorized: boolean;
}

function AuthorizedOnlyRoute(props: IAuthorizedOnlyRouteProps) {
  const {isUserAuthorized, ...routeProps} = props;

  const redirectionState: IRedirectionState | unknown = routeProps.location?.state;

  if(isUserAuthorized) {
    if(isRedirectionState(redirectionState))
      return <Redirect to={{pathname: redirectionState.from}} />
    else
      return <Route {...routeProps} />
  } else {
    return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
  }
}

export default AuthorizedOnlyRoute;
