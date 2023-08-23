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
      const registeredCollaborator = await Collaborator.create(data, {
        include: User,
      });
      return registeredCollaborator;
    } else if (type === TypesAuth.PROVIDER) {
      const registeredProvider = await Provider.create(data, { include: User });
      return registeredProvider;
    } else {
      const registeredCompany = await Company.create(data, { include: User });
      return registeredCompany;
    }
  } catch (error) {
    handleError(error, 'Error creating company');
  }
};

