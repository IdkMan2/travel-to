import IUserCollectionEntity from '@models/collections/IUserCollectionEntity';
import {getMongoDb} from '@server/db-client';
import {checkPassword} from '@server/password-hashing';
import {Db} from 'mongodb';

export async function authorize(credentials: Record<string, string>) {
  const {email, password} = credentials;

  if (!email) throw new Error('Invalid input, missing `email` fields.');
  if (!password) throw new Error('Invalid input, missing `password` fields.');

  const mongoDb: Db = await getMongoDb();
  const usersCollection = mongoDb.collection<IUserCollectionEntity>('users');
  const user: IUserCollectionEntity | null = await usersCollection.findOne({
    email,
  });

  if (!user) return Promise.reject(new Error(`There is no registered user with email address: \`${email}\`.`));

  if (!(await checkPassword(password, user.hash))) return Promise.reject(new Error('Invalid password.'));

  return Promise.resolve(user);
}
