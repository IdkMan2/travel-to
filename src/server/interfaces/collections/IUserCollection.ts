import IUser from '@server/interfaces/entities/IUser';
import {ObjectId} from 'bson';

type IUserCollection = Array<
  Omit<IUser, 'id'> & {
    _id: ObjectId;
    hash: string;
  }
>;

export default IUserCollection;
