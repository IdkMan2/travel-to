import {validationSchema} from '@client/components/organisms/SignInForm/utils';
import buildConfiguration from '@server/configuration/common';
import User from '@server/models/User';
import SignInErrorCode from '@utils/enums/SignInErrorCode';
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
          code: SignInErrorCode.INVALID_INPUT,
          message: 'Invalid sign-in input: ' + getValidationErrorMessage(e),
        },
      });
      return;
    }

    const user = await User.getByEmail(email);

    if (user === null) {
      res.status(400).json({
        error: {
          code: SignInErrorCode.EMAIL_NOT_FOUND,
          message: 'No account exists with specified email address.',
        },
      });
      return;
    }

    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      res.status(400).json({
        error: {
          code: SignInErrorCode.INVALID_PASSWORD,
          message: 'Provided password is invalid.',
        },
      });
      return;
    }

    res.json({
      user: {
        id: user.id.toHexString(),
        email: user.email,
      },
      token: await user.issueNewToken(),
    });
  });

export default handler;
