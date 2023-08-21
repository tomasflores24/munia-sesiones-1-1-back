import { User_type } from '../../models';
import { CreateUserTypeDTO } from '../userType/dto/userType';
import { handleError } from '../../common/errorResponse';
import { UserType } from '../../assets/userType';
import { validateAndCreate } from '../../common/validateInstance';

export const getAllUserTypeInDB = async () => {
  const memberships = await User_type.findAll();
  if (memberships.length === 0) throw new Error('No user types found');
  return memberships;
};

export const createUserTypeInDB = async () => {
  try {
    for (const element of UserType) {
      let response = await validateAndCreate(element, CreateUserTypeDTO);

      await User_type.findOrCreate({
        where: { name: response.name },
      });
    }
    return true;
  } catch (error) {
    handleError(error, 'Error creating user types');
  }
};
