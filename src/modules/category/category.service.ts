import { handleError } from '../../common/errorResponse';
import { Categories } from '../../models';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto/category';

export const getAllCategoryFromDB = async () => {
  const dataCategory = await Categories.findAll();
  if (dataCategory.length === 0) throw new Error('No categories found');
  return dataCategory;
};

export const getCategoryByIdFromDB = async (id: string) => {
  const dataCategory = await Categories.findByPk(id);
  if (!dataCategory) throw new Error(`Categories not found for id :${id}`);
  return dataCategory;
};

export const createCategoryInDB = async (body: Partial<CreateCategoryDTO>) => {
  try {
    const newCategory = await Categories.create(body);
    return newCategory;
  } catch (error) {
    handleError(error, 'Error creating Category');
  }
};

export const updateCategoryByIdInDB = async (
  id: string,
  data: Partial<UpdateCategoryDTO>
) => {
  try {
    const categoryToUpdate = await Categories.findByPk(id);
    if (!categoryToUpdate) throw new Error('Category not found');
    const updatedCategory = await categoryToUpdate.update(data);
    return updatedCategory;
  } catch (error) {
    handleError(error, 'Error updating Category');
  }
};
