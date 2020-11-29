import IUserResource from '@server/interfaces/resources/IUserResource';
import {ObjectId} from 'bson';

type IUserCollection = Array<Omit<IUserResource, 'id'> & Record<'_id', ObjectId>>;

export default IUserCollection;
