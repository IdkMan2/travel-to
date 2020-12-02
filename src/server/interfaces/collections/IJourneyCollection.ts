import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import {ObjectId} from 'bson';

type IJourneyCollection = Array<
  Omit<IJourneyResource, '_id' | 'userId' | 'images'> & Record<'_id' | 'userId', ObjectId>
>;

export default IJourneyCollection;
