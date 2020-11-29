import useAuth from '@client/hooks/useAuth';
import {AuthState} from '@client/interfaces/IAuthData';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {getDisplayName} from 'next/dist/next-server/lib/utils';
import {useRouter} from 'next/router';
import React, {ComponentType, ForwardedRef, forwardRef, useEffect} from 'react';

export function withUnprotectedAccess<P extends object>(WrappedComponent: ComponentType<P>) {
  type Ref = ComponentType<P>;

  const forwardRefFunc = forwardRef<Ref, {}>((props: {}, ref: ForwardedRef<Ref>) => {
    const auth = useAuth();
    const state = auth.state;
    const loading = state === AuthState.LOADING;
    const router = useRouter();

    useEffect(() => {
      if (!loading && state === AuthState.AUTHORIZED) router.push('/home');
    }, [loading, state, router]);

    if (loading || state === AuthState.AUTHORIZED) return null;

    return <WrappedComponent ref={ref} {...(props as P)} />;
  });

  forwardRefFunc.displayName = `withUnprotectedAccess(${getDisplayName(WrappedComponent)})`;

  hoistNonReactStatic(forwardRefFunc, WrappedComponent);

  return forwardRefFunc;
}
