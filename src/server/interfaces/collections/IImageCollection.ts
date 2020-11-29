import IJourneyCollection from '@server/interfaces/collections/IJourneyCollection';
import IImageResource from '@server/interfaces/resources/IImageResource';

type IImageCollection = Array<IImageResource & Record<'journeyId', IJourneyCollection[number]['_id']>>;

export default IImageCollection;
