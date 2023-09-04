import { handleError } from '../../common/errorResponse';
import { User } from '../../models';
import { comparePassword } from './utils';

export const verifyUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email, isDelete: false } });
    if (!user) throw new Error('No such user');

    await comparePassword(user.password, password);

    return { email, UserId: user.id };
  } catch (error) {
    handleError(error, 'Error verifying user');
  }
};
