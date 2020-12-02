import IImageResource from '@server/interfaces/resources/IImageResource';

export default interface IJourneyResource {
  _id: string;
  userId: string;
  startDate: number;
  endDate: number;
  startPoint: string;
  endPoint: string;
  kilometersTraveled: number;
  images: IImageResource[];
}
