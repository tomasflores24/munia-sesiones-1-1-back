import { handleError } from './errorResponse';
import { UserType, GenderType, StatusType } from '../assets/defaultTypes';
import { User_type, Gender, Status} from '../models';

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
    for (const element of StatusType) {
      await Status.findOrCreate({
        where: { status: element.status },
      });
    }
    return true;
  } catch (error) {
    handleError(error, 'Error creating user types');
  }
};
