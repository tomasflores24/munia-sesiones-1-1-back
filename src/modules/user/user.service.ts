import { hash } from 'argon2';
import { Country, User, User_type } from '../../models';
import { checkEmailExists } from '../auth/utils/verify.utils';
import { CreateUserDTO, UpdateUserDTO } from './dto/user';
import { handleError } from '../../common/errorResponse';

const createUserInDB = async (userData: CreateUserDTO) => {
  try {
    await checkEmailExists(userData.email);
    userData.password = await hash(userData.password);
    const userCreated = await User.create(userData as any, {
      include: [User_type, Country],
    });
    return userCreated;
  } catch (error) {
    return handleError(error, 'Error creating');
  }
};

const updateUserInDB = async (userId: string, userData: UpdateUserDTO) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) throw new Error('User not found');
    if (userData.email && userData.email !== user.email)
      await checkEmailExists(userData.email);

    await user.update(userData);
  } catch (error) {
    return handleError(error, 'Error updating');
  }
};

const deleteUserInDB = async (userId: string) => {
  try {
    const deleteUser = { isDelete: true };
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    await user.update(deleteUser);
  } catch (error) {
    return handleError(error, 'Error updating');
  }
};

const activeUserInDB = async (userId: string) => {
  try {
    const activeUser = { isActive: true };
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    await user.update(activeUser);
  } catch (error) {
    return handleError(error, 'Error updating');
  }
};

export { createUserInDB, updateUserInDB, deleteUserInDB, activeUserInDB };
