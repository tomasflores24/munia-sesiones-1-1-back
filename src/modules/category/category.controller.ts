import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { validateAndCreate } from '../../common/validateInstance';
import {
  createCategoryInDB,
  getAllCategoryFromDB,
  getCategoryByIdFromDB,
  updateCategoryByIdInDB,
} from './category.service';
import {
  CreateCategoryDTO,
  SearchIdCategoryDTO,
  UpdateCategoryDTO,
} from './dto/category';

export const getAllCategory: RequestHandler = async (_req, res) => {
  try {
    const allCategories = await getAllCategoryFromDB();
    return res.status(200).json({ allCategories });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getIdCategory: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdCategoryDTO);
    const category = await getCategoryByIdFromDB(response.id);
    return res.status(200).json({ category });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreateCategoryDTO);
    const newCategory = await createCategoryInDB(response);
    return res.status(201).json({ newCategory });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateCategory: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, name } = await validateAndCreate(data, UpdateCategoryDTO);

    const updatedCategory = await updateCategoryByIdInDB(id, { name });

    return res.status(200).json({ updatedCategory });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
