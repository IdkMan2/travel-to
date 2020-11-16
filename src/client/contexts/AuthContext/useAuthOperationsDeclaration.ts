import {IAuthContextVal} from '@client/contexts/AuthContext/index';
import {AuthorizationException} from '@client/exceptions/AuthorizationException';
import {AuthState} from '@client/interfaces/IAuthData';
import ISignUpResponse, {validateSignUpResponse} from '@client/interfaces/ISignUpResponse';
import DirectAPI from '@client/mechanisms/DirectAPI';
import ErrorReporting from '@client/mechanisms/ErrorReporting';
import {isDifferentAuthData} from '@utils/auth-data-utils';
import {useCallback, useMemo} from 'react';

export interface IAuthOperations {
  signIn: (credentials: {email: string; password: string}) => Promise<void | never>;
  signUp: (credentials: {email: string; password: string}) => Promise<void | never>;
  signOut: () => Promise<void | never>;
  validate: () => Promise<void | never>;
}

export default function useAuthOperationsDeclaration(
  auth: Pick<IAuthContextVal, 'data' | 'state'>,
  updateAuth: (newAuthData: Partial<Omit<IAuthContextVal, 'operations'>>) => void
): IAuthOperations {
  /*========================== SIGN OUT ==========================*/
  const signOut = useCallback(async () => {
    try {
      await DirectAPI.post('/auth/signout');
    } catch (e: unknown) {
      ErrorReporting.captureError(e);
    } finally {
      updateAuth({data: null, state: AuthState.UNAUTHORIZED});
    }
  }, [updateAuth]);

  /*========================== SIGN IN ==========================*/
  const signIn = useCallback(
    async (credentials: {email: string; password: string}) => {
      try {
        const {data} = await DirectAPI.post<ISignUpResponse>('/auth/signin', {data: credentials});
        validateSignUpResponse(data);
        updateAuth({data, state: AuthState.AUTHORIZED});
      } catch (e: unknown) {
        if (e instanceof AuthorizationException) {
          await signOut();
          ErrorReporting.captureError(e, 'Error found during sign-in process. Force-logout will be performed.');
          return;
        }

        throw e; // forward
      }
    },
    [updateAuth, signOut]
  );

  /*========================== SIGN UP ==========================*/
  const signUp = useCallback(
    async (credentials: {email: string; password: string}) => {
      try {
        const {data} = await DirectAPI.post<ISignUpResponse>('/auth/signup', {data: credentials});
        validateSignUpResponse(data);
        updateAuth({data, state: AuthState.AUTHORIZED});
      } catch (e: unknown) {
        if (e instanceof AuthorizationException) {
          await signOut();
          ErrorReporting.captureError(e, 'Error found during sign-up process. Force-logout will be performed.');
          return;
        }

        throw e; // forward
      }
    },
    [updateAuth, signOut]
  );

  /*========================== VALIDATE ==========================*/
  const validate = useCallback(async () => {
    try {
      const {data} = await DirectAPI.post<ISignUpResponse>('/auth/validate');
      validateSignUpResponse(data);
      if (isDifferentAuthData(auth.data, data)) {
        updateAuth({data, state: AuthState.AUTHORIZED, lastInvalidation: Math.floor(new Date().getTime() / 1000)});
      }
    } catch (e: unknown) {
      if (e instanceof AuthorizationException) {
        await signOut();
        ErrorReporting.captureError(e, 'Error found during auth-validation process. Force-logout will be performed.');
        return;
      }

      throw e; // forward
    }
  }, [auth, updateAuth, signOut]);

  return useMemo(() => {
    return {signOut, signIn, signUp, validate};
  }, [signOut, signIn, signUp, validate]);
}
