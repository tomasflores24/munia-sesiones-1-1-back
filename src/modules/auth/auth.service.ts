import { handleError } from '../../common/errorResponse';
import { Collaborator, Company, Provider, User } from '../../models';
import { hash } from 'argon2';
import { AuthInDBF } from './interface';

export const authInDB: AuthInDBF = async (profileData, userData, type) => {
  try {
    userData.password = await hash(userData.password);
    const userCreated = await User.create(userData as any);
    const data = { ...profileData, UserId: userCreated.id };
    // * Falta el GenderId en provide & collaborator
    // * Falta el CompanyId en Collaborator
    // * Falta el CountryId & User_type en "User"

    if (type === 'collaborator') {
      const registeredCollaborator = await Collaborator.create(data, {
        include: User,
      });
      return registeredCollaborator;
    } else if (type === 'provider') {
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
// * Validar que se haya creado el usuario correctamente;
// const userCreated = await User.create(userData, { include: [Country, User_type] });
// created = await Collaborator.create(data, { include: User, Company,Gender });
// created = await Provider.create(data, { include: User, Gender });
