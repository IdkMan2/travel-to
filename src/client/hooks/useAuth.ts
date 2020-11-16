import {AuthContext, IAuthContextVal} from '@client/contexts/AuthContext';
import {useContext} from 'react';

export default function useAuth(): IAuthContextVal {
  return useContext(AuthContext);
}
