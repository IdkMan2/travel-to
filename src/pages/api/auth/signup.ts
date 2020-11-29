import {validationSchema} from '@client/components/organisms/SignUpForm/utils';
import buildConfiguration from '@server/configuration/common';
import User from '@server/models/User';
import SignUpErrorCode from '@utils/enums/SignUpErrorCode';
import {getValidationErrorMessage} from '@utils/validation-utils';
import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect<NextApiRequest, NextApiResponse>()
  .use(buildConfiguration())
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, password} = req.body;

    try {
      await validationSchema.validate({email, password});
    } catch (e: unknown) {
      res.status(400).json({
        error: {
          code: SignUpErrorCode.INVALID_INPUT,
          message: 'Invalid sign-up input: ' + getValidationErrorMessage(e),
        },
      });
      return;
    }

    let user = await User.getByEmail(email);

    if (user !== null) {
      res.status(400).json({
        error: {
          code: SignUpErrorCode.EMAIL_ALREADY_TAKEN,
          message: 'Email address is already registered in system.',
        },
      });
      return;
    }

    user = await User.createNew({email, password});

    res.json({
      user: {
        id: user.id.toHexString(),
        email: user.email,
      },
      token: await user.issueNewToken(),
    });
  });

export default handler;
