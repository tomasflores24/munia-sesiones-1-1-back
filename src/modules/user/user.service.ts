import { hash } from 'argon2';
import { User, User_type } from '../../models';
import { checkEmailExists } from '../auth/utils/verify.utils';
import { CreateUserDTO } from './dto/user';
import { handleError } from '../../common/errorResponse';

const createUserInDB = async (userData: CreateUserDTO) => {
  try {
    await checkEmailExists(userData.email);
    userData.password = await hash(userData.password);
    const userCreated = await User.create(userData as any, { include: [User_type] });
    return userCreated;
  } catch (error) {
    return handleError(error, 'Error creating');
  }
};

const updateUserInDB = async (userId: string, userData: CreateUserDTO) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    await user.update(userData);
  } catch (error) {
    return handleError(error, 'Error updating');
  }
};

export { createUserInDB, updateUserInDB };
