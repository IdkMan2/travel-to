import {JwtTokenVerificationException} from '@server/exceptions/JwtTokenVerificationException';
import ITokensCollection from '@server/interfaces/collections/ITokensCollection';
import IJwtPayload from '@server/interfaces/IJwtPayload';
import {getMongoDb} from '@server/mechanisms/database';
import JwtTokenVerificationError from '@utils/enums/JwtTokenVerificationError';
import assert from 'assert';
import bcrypt from 'bcryptjs';
import jwt, {SignOptions, VerifyOptions} from 'jsonwebtoken';
import {Db} from 'mongodb';

export async function hashPassword(password: string): Promise<string | never> {
  return await bcrypt.hash(password, 5);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean | never> {
  return await bcrypt.compare(password, hash);
}

export async function issueJwtToken(userId: string): Promise<string> {
  assert.strictEqual(typeof process.env.AUTH_SECRET, 'string', 'Env `AUTH_SECRET` not defined.');
  const secret = process.env.AUTH_SECRET as string;
  const iat = Math.floor(Date.now() / 1000);
  const payload: IJwtPayload = {userId: userId, iat};
  const options: SignOptions = {
    issuer: 'travel-to',
  };

  const token = jwt.sign(payload, secret, options);

  const mongoDb: Db = await getMongoDb();
  const tokensCollection = mongoDb.collection<ITokensCollection[number]>('tokens');
  await tokensCollection.insertOne({userId, iat, token});

  return token;
}

export async function revokeJwtToken(token: string): Promise<void> {
  const mongoDb: Db = await getMongoDb();
  const tokensCollection = mongoDb.collection<ITokensCollection[number]>('tokens');
  await tokensCollection.deleteOne({token});
}

export async function verifyJwtToken(token: string): Promise<IJwtPayload> {
  assert.strictEqual(typeof process.env.AUTH_SECRET, 'string', 'Env `AUTH_SECRET` not defined.');
  const secret = process.env.AUTH_SECRET as string;
  const options: VerifyOptions = {
    issuer: 'travel-to',
  };

  let payload: string | object;
  try {
    payload = jwt.verify(token, secret, options);
  } catch (e: unknown) {
    throw new JwtTokenVerificationException(JwtTokenVerificationError.INVALID_TOKEN_ITSELF);
  }

  if (!isValidPayload(payload))
    throw new JwtTokenVerificationException(JwtTokenVerificationError.INVALID_TOKEN_PAYLOAD);

  const mongoDb: Db = await getMongoDb();
  const tokensCollection = mongoDb.collection<ITokensCollection[number]>('tokens');
  const tokenElement = await tokensCollection.findOne({token});

  if (tokenElement === null) throw new JwtTokenVerificationException(JwtTokenVerificationError.TOKEN_HAS_BEEN_REVOKED);

  return payload;
}

function isValidPayload(obj: any): obj is IJwtPayload {
  return typeof obj === 'object' && obj !== null && typeof obj.userId === 'string' && typeof obj.iat === 'number';
}
