import {Session, useSession} from 'next-auth/client';
import {getDisplayName} from 'next/dist/next-server/lib/utils';
import {useRouter} from 'next/router';
import React, {ComponentType, ForwardedRef, forwardRef, useEffect} from 'react';

export interface IWithUnprotectedAccessProps {
  session: Session | null | undefined;
  sessionLoading: boolean;
}

export function withUnprotectedAccess<P extends IWithUnprotectedAccessProps>(WrappedComponent: ComponentType<P>) {
  type Ref = ComponentType<P>;
  type ForwardRefProps = Omit<P, keyof IWithUnprotectedAccessProps>;

  const forwardRefFunc = forwardRef<Ref, ForwardRefProps>((props: ForwardRefProps, ref: ForwardedRef<Ref>) => {
    const [session, sessionLoading] = useSession();
    const router = useRouter();
    const propsPassThrough: P = {session, sessionLoading, ...props} as P;

    useEffect(() => {
      if (!sessionLoading && session) router.push('/home');
    }, [sessionLoading, session, router]);

    if (sessionLoading || session) return null;

    return <WrappedComponent ref={ref} {...propsPassThrough} />;
  });

  forwardRefFunc.displayName = `withUnprotectedAccess(${getDisplayName(WrappedComponent)})`;

  return forwardRefFunc;
}
