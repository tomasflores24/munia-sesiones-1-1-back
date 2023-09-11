import { RequestHandler } from 'express';
import { validateAndCreate } from '../../../../common/validateInstance';
import { handleErrorResponse } from '../../../../common/errorResponse';
import { UpdateUserDTO } from '../../dto/user';
import { GetByIdProviderDTO, UpdateProviderDTO, deleteProviderDTO } from '../dto';

export const validateProviderId: RequestHandler = async (req, res, next) => {
  try {
    await validateAndCreate(req.params, GetByIdProviderDTO);
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const validateProviderUpdate: RequestHandler = async (req, res, next) => {
  try {
    const userData = JSON.parse(req.body.user);
    const providerData = JSON.parse(req.body.provider);
    const { id } = req.params;
    const file = req.file;

    await validateAndCreate({ ...providerData, id }, UpdateProviderDTO);
    await validateAndCreate({ ...userData, file }, UpdateUserDTO);

    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const validateProviderDelete: RequestHandler = async (req, res, next) => {
  try {
    const provider = req.params;
    await validateAndCreate(provider, deleteProviderDTO);
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
