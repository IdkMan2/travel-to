import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import {ObjectId} from 'bson';

type IJourneyCollection = Array<Omit<IJourneyResource, 'id' | 'images'> & Record<'_id', ObjectId>>;

export default IJourneyCollection;
