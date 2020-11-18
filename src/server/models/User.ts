import IUserCollection from '@server/interfaces/collections/IUserCollection';
import {hashPassword, issueJwtToken, revokeJwtToken, verifyPassword} from '@server/mechanisms/authentication';
import {getMongoDb} from '@server/mechanisms/database';
import {ObjectId} from 'bson';
import {Db} from 'mongodb';

export default class User {
  public readonly id: ObjectId;
  public email: string;
  public hash: string;

  constructor(data: IUserCollection[number]) {
    this.id = data._id;
    this.email = data.email;
    this.hash = data.hash;
  }

  /*==================== STATIC SIDE ====================*/
  public static async createNew({email, password}: {email: string; password: string}): Promise<User> {
    const mongoDb: Db = await getMongoDb();
    const usersCollection = mongoDb.collection<IUserCollection[number]>('users');
    const hash = await hashPassword(password);
    const results = await usersCollection.insertOne({email, hash});
    return new User(results.ops[0]);
  }

  public static async getById(id: string): Promise<User | null> {
    return User.getBySpecifiedField('_id', new ObjectId(id));
  }

  public static async getByEmail(email: string): Promise<User | null> {
    return User.getBySpecifiedField('email', email);
  }

  private static async getBySpecifiedField(fieldName: string, fieldValue: unknown): Promise<User | null> {
    const mongoDb: Db = await getMongoDb();
    const usersCollection = mongoDb.collection<IUserCollection[number]>('users');
    const dbData = await usersCollection.findOne({
      [fieldName]: fieldValue,
    });
    return dbData ? new User(dbData) : null;
  }

  /*==================== INSTANCE SIDE ====================*/
  public async issueNewToken(): Promise<string> {
    return await issueJwtToken(this.id.toHexString());
  }
  public async revokeToken(token: string) {
    await revokeJwtToken(token);
  }
  public async verifyPassword(password: string): Promise<boolean> {
    return await verifyPassword(password, this.hash);
  }
}
