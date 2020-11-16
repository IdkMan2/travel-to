import User from '@server/models/User';
import {NextApiRequest} from 'next';

export interface IRequestAuthorizationExtension {
  user: User;
  token: string;
}

type NextAuthorizedApiRequest = NextApiRequest & {auth: IRequestAuthorizationExtension};

export default NextAuthorizedApiRequest;
