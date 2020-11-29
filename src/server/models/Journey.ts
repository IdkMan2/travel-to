import IJourneyCollection from '@server/interfaces/collections/IJourneyCollection';
import IImageResource from '@server/interfaces/resources/IImageResource';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import {getMongoDb} from '@server/mechanisms/database';
import {ObjectId} from 'bson';
import {Db} from 'mongodb';

export default class Journey {
  public readonly id: ObjectId;
  public startDate: number;
  public endDate: number;
  public startPoint: string;
  public endPoint: string;
  public kilometersTraveled: number;
  public images: IImageResource[];

  constructor(data: IJourneyCollection[number], images: IImageResource[] = []) {
    this.id = data._id;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.startPoint = data.startPoint;
    this.endPoint = data.endPoint;
    this.kilometersTraveled = data.kilometersTraveled;
    this.images = images;
  }

  /*==================== STATIC SIDE ====================*/
  public static async createNew(journeyResource: Omit<IJourneyResource, 'id'>): Promise<Journey> {
    const mongoDb: Db = await getMongoDb();
    const journeysCollection = mongoDb.collection<IJourneyCollection[number]>('journeys');
    const results = await journeysCollection.insertOne(journeyResource);
    return new Journey(results.ops[0], []);
  }

  /*==================== INSTANCE SIDE ====================*/
  public serialize(): IJourneyResource {
    const {id, startPoint, endPoint, startDate, endDate, kilometersTraveled, images} = this;
    return {
      id: id.toHexString(),
      startPoint,
      endPoint,
      startDate,
      endDate,
      kilometersTraveled,
      images,
    };
  }
}
