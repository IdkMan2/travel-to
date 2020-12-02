import IJourneyCollection from '@server/interfaces/collections/IJourneyCollection';
import IImageResource from '@server/interfaces/resources/IImageResource';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import {getMongoDb} from '@server/mechanisms/database';
import User from '@server/models/User';
import {ObjectId} from 'bson';
import {Db} from 'mongodb';

export default class Journey {
  public readonly id: ObjectId;
  public userId: ObjectId;
  public startDate: number;
  public endDate: number;
  public startPoint: string;
  public endPoint: string;
  public kilometersTraveled: number;
  public images: IImageResource[];

  constructor(data: IJourneyCollection[number], images: IImageResource[] = []) {
    this.id = data._id;
    this.userId = data.userId;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.startPoint = data.startPoint;
    this.endPoint = data.endPoint;
    this.kilometersTraveled = data.kilometersTraveled;
    this.images = images;
  }

  /*==================== STATIC SIDE ====================*/
  public static async createNew(
    journeyResource: Omit<IJourneyResource, '_id' | 'userId'>,
    createFor: User
  ): Promise<Journey> {
    const mongoDb: Db = await getMongoDb();
    const journeysCollection = mongoDb.collection<IJourneyCollection[number]>('journeys');
    const results = await journeysCollection.insertOne({...journeyResource, userId: createFor.id});
    return new Journey(results.ops[0], []);
  }

  /*==================== INSTANCE SIDE ====================*/
  public serialize(): IJourneyResource {
    const {id, userId, startPoint, endPoint, startDate, endDate, kilometersTraveled, images} = this;
    return {
      _id: id.toHexString(),
      userId: userId.toHexString(),
      startPoint,
      endPoint,
      startDate,
      endDate,
      kilometersTraveled,
      images,
    };
  }
}
