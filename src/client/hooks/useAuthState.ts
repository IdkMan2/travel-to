import {AuthContext} from '@client/contexts/AuthContext';
import {AuthState} from '@client/interfaces/IAuthData';
import {useContext, useMemo} from 'react';

export default function useAuthState(): AuthState {
  const auth = useContext(AuthContext);
  return useMemo(() => auth.state, [auth]);
}
