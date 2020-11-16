import IAuthData, {AuthState} from '@client/interfaces/IAuthData';
import DirectAPI from '@client/mechanisms/DirectAPI';
import ErrorReporting from '@client/mechanisms/ErrorReporting';
import LocalStorage from '@client/mechanisms/LocalStorage';
import LSKey from '@utils/enums/LSKey';
import React, {createContext, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';

import useAuthOperationsDeclaration, {IAuthOperations} from './useAuthOperationsDeclaration';
import {determineInitialState} from './utils';

export interface IAuthContextVal {
  data: IAuthData | null;
  state: AuthState;
  lastInvalidation?: number; // unix timestamp (seconds)
  operations: IAuthOperations;
}

async function authContextNotInitializedWarn(..._data: unknown[]) {
  ErrorReporting.emitWarn('AuthContext is not ready yet! Rejected to perform operation.');
}

export const AuthContext = createContext<IAuthContextVal>({
  data: null,
  state: AuthState.LOADING,
  lastInvalidation: undefined,
  operations: {
    signUp: authContextNotInitializedWarn,
    signIn: authContextNotInitializedWarn,
    signOut: authContextNotInitializedWarn,
    validate: authContextNotInitializedWarn,
  },
});

export const AuthProvider = function (props: {children: ReactNode}) {
  const {children} = props;
  const [auth, setAuth] = useState<Omit<IAuthContextVal, 'operations'>>({data: null, state: AuthState.LOADING});

  const updateAuth = useCallback(
    (newAuth: Partial<Omit<IAuthContextVal, 'operations'>>) => {
      const finalFormAuth = {...auth, ...newAuth};
      if (finalFormAuth.data) {
        LocalStorage.setJsonItem(LSKey.AUTH, finalFormAuth.data);
        DirectAPI.attachAuthorizationToken(finalFormAuth.data.token);
      } else {
        LocalStorage.unsetItem(LSKey.AUTH);
        DirectAPI.detachAuthorizationToken();
      }

      setAuth(finalFormAuth);
    },
    [auth, setAuth]
  );

  const authOperations = useAuthOperationsDeclaration(auth, updateAuth);

  const contextVal: IAuthContextVal = useMemo(() => {
    return {...auth, operations: authOperations};
  }, [auth, authOperations]);

  useEffect(() => {
    if (auth.state !== AuthState.LOADING) return;

    const newAuth: Omit<IAuthContextVal, 'operations'> = determineInitialState();
    updateAuth(newAuth);

    if (newAuth.state === AuthState.AUTHORIZED) authOperations.validate();
  }, [auth, updateAuth, authOperations]);

  return <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>;
};
