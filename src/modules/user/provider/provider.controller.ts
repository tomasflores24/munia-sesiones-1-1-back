import { RequestHandler } from 'express';
import {
  deleteProviderInDB,
  getAllProviderInDB,
  getProviderByIdInDB,
  updateProviderInDB,
} from './provider.service';
import { handleErrorResponse } from '../../../common/errorResponse';
import { deleteImage } from '../../../common/deleteImage';

const getAllProvider: RequestHandler = async (_req, res) => {
  try {
    const allProvider = await getAllProviderInDB();
    return res.json({ allProvider });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getProviderById: RequestHandler = async (req, res) => {
  try {
    const provider = await getProviderByIdInDB(req.params.id);
    return res.json({ provider });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const updateProvider: RequestHandler = async (req, res) => {
  try {
    const userData = JSON.parse(req.body.user);
    const providerData = JSON.parse(req.body.provider);
    const { id } = req.params;
    const file = req.file;

    const updateProvider = await updateProviderInDB(
      { ...providerData, id },
      { ...userData, file }
    );

    return res.json({ updateProvider });
  } catch (error) {
    handleErrorResponse(res, error);
  } finally {
    deleteImage(req.file);
  }
};

const deleteProvider: RequestHandler = async (req, res) => {
  try {
    const deletedProvider = await deleteProviderInDB(req.params.id);

    return res.json({ deletedProvider });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export { getAllProvider, getProviderById, updateProvider, deleteProvider };
