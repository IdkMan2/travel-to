import assert from 'assert';
import MongoClient, {Db, MongoClient as IMongoClient} from 'mongodb';

let client: IMongoClient | undefined;

async function initializeClient(): Promise<IMongoClient | never> {
  assert.strictEqual(typeof process.env.MONGODB_URI, 'string');
  const dbURI = process.env.MONGODB_URI as string;
  return await MongoClient.connect(dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

export async function getMongoClient(): Promise<IMongoClient | never> {
  if (client === undefined) client = await initializeClient();
  return client;
}

export async function getMongoDb(): Promise<Db | never> {
  assert.strictEqual(typeof process.env.DB_NAME, 'string');
  const dbName = process.env.DB_NAME as string;
  const client = await getMongoClient();
  return client.db(dbName);
}
