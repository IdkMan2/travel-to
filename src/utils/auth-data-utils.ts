import IAuthData from '@client/interfaces/IAuthData';

export function isDifferentAuthData(original: IAuthData | null, next: IAuthData | null) {
  if (
    (original === null && next !== null) ||
    (original !== null && next === null) ||
    (original !== null &&
      next !== null &&
      (original.user.id !== next.user.id || original.user.email !== next.user.email || original.token !== next.token))
  )
    return true;
}
