import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { validateAndCreate } from '../../common/validateInstance';
import { CreateServiceDTO, SearchIdServiceDTO, UpdateServiceDTO } from './dto/service';
import { createServiceInDB, getAllServiceFromDB, getServiceByIdFromDB, updateServiceByIdInDB } from './service.service';

export const getAllService: RequestHandler = async (_req, res) => {
  try {
    const allCategories = await getAllServiceFromDB();
    return res.status(200).json({ allCategories });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getIdService: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdServiceDTO);
    const category = await getServiceByIdFromDB(response.id);
    return res.status(200).json({ category });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createService: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreateServiceDTO);
    const newCategory = await createServiceInDB(response);
    return res.status(201).json({ newCategory });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateService: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, name, isActive, CategoryId } = await validateAndCreate(data, UpdateServiceDTO);

    const updatedCategory = await updateServiceByIdInDB(id, { name, isActive, CategoryId });

    return res.status(200).json({ updatedCategory });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};