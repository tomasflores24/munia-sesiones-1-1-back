import { handleError } from '../../common/errorResponse';
import { Collaborator, Company, Provider, User, User_type } from '../../models';
import { hash } from 'argon2';
import { AuthInDBF, TypesAuth } from './interface';
import { checkEmailExists } from './utils/verify.utils';

export const authInDB: AuthInDBF = async (profileData, userData, type) => {
  try {
    await checkEmailExists(userData.email);

    userData.password = await hash(userData.password);
    const userCreated = await User.create(userData as any, {
      include: [User_type],
    });
    const data = { ...profileData, UserId: userCreated.id };

    if (type === TypesAuth.COLLABORATOR) {
      await Collaborator.create(data, { include: User });
    } else if (type === TypesAuth.PROVIDER) {
      await Provider.create(data, { include: User });
    } else {
      await Company.create(data, { include: User });
    }
    return { email: userCreated.email, UserId: userCreated.id };
  } catch (error) {
    return handleError(error, 'Error creating');
  }
};
