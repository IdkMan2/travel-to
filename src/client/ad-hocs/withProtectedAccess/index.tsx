import useAuth from '@client/hooks/useAuth';
import {AuthState} from '@client/interfaces/IAuthData';
import {getDisplayName} from 'next/dist/next-server/lib/utils';
import {useRouter} from 'next/router';
import React, {ComponentType, ForwardedRef, forwardRef, useEffect} from 'react';

export function withProtectedAccess<P extends object>(WrappedComponent: ComponentType<P>) {
  type Ref = ComponentType<P>;

  const forwardRefFunc = forwardRef<Ref, {}>((props: {}, ref: ForwardedRef<Ref>) => {
    const auth = useAuth();
    const state = auth.state;
    const loading = state === AuthState.LOADING;
    const router = useRouter();

    useEffect(() => {
      if (!loading && state === AuthState.UNAUTHORIZED) router.push('/login');
    }, [loading, state, router]);

    if (loading || state === AuthState.UNAUTHORIZED) return null;

    return <WrappedComponent ref={ref} {...(props as P)} />;
  });

  forwardRefFunc.displayName = `withProtectedAccess(${getDisplayName(WrappedComponent)})`;

  return forwardRefFunc;
}
