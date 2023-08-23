import { User } from '../../../models';

export const checkEmailExists = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) throw new Error('The email is already registered.');
    return true;
  } catch (error) {
    throw error;
  }
};
