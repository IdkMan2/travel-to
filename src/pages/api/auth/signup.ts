import {validationSchema} from '@components/organisms/SignUpForm/utils';
import IUserCollectionEntity, {transformToPureEntity} from '@models/collections/IUserCollectionEntity';
import commonConfiguration from '@server/configuration/common';
import {getMongoDb} from '@server/db-client';
import {hashPassword} from '@server/password-hashing';
import SignupError from '@utils/enums/SignupError';
import {getValidationErrorMessage} from '@utils/validation-utils';
import {Db} from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect<NextApiRequest, NextApiResponse>()
  .use(commonConfiguration)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, password} = req.body;

    try {
      await validationSchema.validate({email, password});
    } catch (e: unknown) {
      res.status(400).json({
        error: {
          code: SignupError.INVALID_INPUT,
          message: 'Invalid sign-up input: ' + getValidationErrorMessage(e),
        },
      });
      return;
    }

    const mongoDb: Db = await getMongoDb();
    const usersCollection = mongoDb.collection<IUserCollectionEntity>('users');
    const dbData = await usersCollection.findOne({
      email,
    });

    if (dbData !== null) {
      res.status(400).json({
        error: {
          code: SignupError.EMAIL_ALREADY_TAKEN,
          message: 'Email address is already registered in system.',
        },
      });
      return;
    }

    const hash = await hashPassword(password);
    const data = await usersCollection.insertOne({email, hash});
    const user = transformToPureEntity(data.ops[0]);

    res.json({user});
  });

export default handler;
