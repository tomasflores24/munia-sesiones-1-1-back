import { RequestHandler } from 'express';
import { validateAndCreate } from '../../../common/validateInstance';
import { GetByIdCompanyDTO, UpdateCompanyDTO, deleteCompanyDTO } from '../dto';
import { handleErrorResponse } from '../../../common/errorResponse';
import { UpdateUserDTO } from '../../user/dto/user';

export const validateCompanyId: RequestHandler = async (req, res, next) => {
  try {
    await validateAndCreate(req.params, GetByIdCompanyDTO);
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const validateCompanyUpdate: RequestHandler = async (req, res, next) => {
  try {
    const userData = JSON.parse(req.body.user);
    const companyData = JSON.parse(req.body.company);
    const { id } = req.params;
    const file = req.file;

    await validateAndCreate({ ...companyData, id }, UpdateCompanyDTO);
    await validateAndCreate({ ...userData, file }, UpdateUserDTO);

    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const validateCompanyDelete: RequestHandler = async (req, res, next) => {
  try {
    const company = req.params;
    await validateAndCreate(company, deleteCompanyDTO);
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
