import { handleError } from './errorResponse';
import { UserType, GenderType } from '../assets/defaultTypes';
import { User_type, Gender} from '../models';

export const createDefaultTypesInDB = async () => {
  try {
    for (const element of UserType) {
      await User_type.findOrCreate({
        where: { name: element.name },
      });
    }
    for (const element of GenderType) {
      await Gender.findOrCreate({
        where: { name: element.name },
      });
    }
    return true;
  } catch (error) {
    handleError(error, 'Error creating user types');
  }
};
