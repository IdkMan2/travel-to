import IUserResource from '@server/interfaces/resources/IUserResource';
import {ObjectId} from 'bson';

type IUserCollection = Array<Omit<IUserResource, '_id'> & Record<'_id', ObjectId>>;

export default IUserCollection;
