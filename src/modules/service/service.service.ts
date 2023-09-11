import { handleError } from '../../common/errorResponse';
import { Service } from '../../models';
import { CreateServiceDTO, UpdateServiceDTO } from './dto/service';

export const getAllServiceFromDB = async () => {
  const dataService = await Service.findAll();
  if (dataService.length === 0) throw new Error('No services found');
  return dataService;
};

export const getServiceByIdFromDB = async (id: string) => {
  const dataService = await Service.findByPk(id);
  if (!dataService) throw new Error(`Service not found for id :${id}`);
  return dataService;
};

export const createServiceInDB = async (body: Partial<CreateServiceDTO>) => {
  try {
    const newService = await Service.create(body);
    return newService;
  } catch (error) {
    handleError(error, 'Error creating Service');
  }
};

export const updateServiceByIdInDB = async (
  id: string,
  data: Partial<UpdateServiceDTO>
) => {
  try {
    const serviceToUpdate = await Service.findByPk(id);
    if (!serviceToUpdate) throw new Error('Category not found');
    const updatedService = await serviceToUpdate.update(data);
    return updatedService;
  } catch (error) {
    handleError(error, 'Error updating Service');
  }
};