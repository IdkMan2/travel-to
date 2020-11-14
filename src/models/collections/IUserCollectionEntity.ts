import IUser from '@models/entities/IUser';
import {ObjectId} from 'bson';

export default interface IUserCollectionEntity extends Omit<IUser, 'id'> {
  _id: ObjectId;
  hash: string;
}

export function transformToPureEntity(collectionEntity: IUserCollectionEntity): IUser {
  return {
    id: collectionEntity._id.toHexString(),
    email: collectionEntity.email,
  };
}
