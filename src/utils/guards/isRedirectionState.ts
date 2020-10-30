import IRedirectionState from '../../models/IRedirectionState';

export default function isRedirectionState(obj: any): obj is IRedirectionState {
  return (
    typeof(obj) === 'object'
    && obj !== null
    && typeof(obj.from) === 'string'
  );
}
