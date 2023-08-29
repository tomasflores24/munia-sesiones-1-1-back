import { handleError } from './errorResponse';
import { UserType, GenderType, StatusType, CategoriesType, ServiceType } from '../assets/defaultTypes';
import { User_type, Gender, Status, Categories, Service } from '../models';

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
    for (const element of CategoriesType) {
      await Categories.findOrCreate({
        where: { name: element.name },
      });
    }
    for (const element of ServiceType) {
      const category = await Categories.findOne({
        where: { name: element.category },
      });
    
      if (category) {
        await Service.findOrCreate({
          where: { name: element.name },
          defaults: {
            CategoryId: category.id,
          },
        });
      }
    }
    
    return true;
  } catch (error) {
    handleError(error, 'Error creating user types');
  }
};
