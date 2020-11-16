import {IAuthContextVal} from '@client/contexts/AuthContext/index';
import {AuthState, validateAuthData} from '@client/interfaces/IAuthData';
import ErrorReporting from '@client/mechanisms/ErrorReporting';
import LocalStorage from '@client/mechanisms/LocalStorage';
import LSKey from '@utils/enums/LSKey';

export function determineInitialState(): Omit<IAuthContextVal, 'operations'> {
  if (!LocalStorage.isItemSet(LSKey.AUTH)) {
    return {data: null, state: AuthState.UNAUTHORIZED};
  }
  let data: unknown;
  try {
    data = LocalStorage.getJsonItem(LSKey.AUTH);
    validateAuthData(data);
  } catch (e: unknown) {
    ErrorReporting.emitWarn(
      `Found corrupted data in localstorage under key \`${LocalStorage.prefix + LSKey.AUTH}\`.` +
        'Data will be purged and populated again later.',
      e
    );
    return {data: null, state: AuthState.UNAUTHORIZED};
  }

  return {data, state: AuthState.AUTHORIZED};
}
