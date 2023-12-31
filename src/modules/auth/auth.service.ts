import { handleError } from '../../common/errorResponse';
import { Collaborator, Company, Provider, User } from '../../models';
import { AuthInDBF, TypesAuth } from './interface';
import { createUserInDB } from '../user/user.service';

export const authInDB: AuthInDBF = async (profileData, userData, type) => {
  try {
    const userCreated = await createUserInDB(userData);
    const data = { ...profileData, UserId: userCreated.id };

    if (type === TypesAuth.COLLABORATOR) {
      return await Collaborator.create(data, { include: User });
    } else if (type === TypesAuth.PROVIDER) {
      await Provider.create(data, { include: User });
      return {
        id: userCreated.id,
        email: userCreated.email,
        UserId: userCreated.id,
        UserTypeId: (userCreated as any).UserTypeId,
        CountryId: (userCreated as any).CountryId,
      };
    } else {
      return await Company.create(data, { include: User });
    }
  } catch (error) {
    return handleError(error, 'Error creating');
  }
};
