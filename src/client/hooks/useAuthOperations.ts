import {AuthContext} from '@client/contexts/AuthContext';
import {IAuthOperations} from '@client/contexts/AuthContext/useAuthOperationsDeclaration';
import {useContext, useMemo} from 'react';

export default function useAuthState(): IAuthOperations {
  const auth = useContext(AuthContext);
  return useMemo(() => auth.operations, [auth]);
}
