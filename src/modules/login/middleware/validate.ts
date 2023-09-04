import { RequestHandler } from 'express';
import { validateAndCreate } from '../../../common/validateInstance';
import { LoginDTO } from '../dto';
import { handleErrorResponse } from '../../../common/errorResponse';

export const validateTypeCredentials: RequestHandler = async (req, res, next) => {
  try {
    await validateAndCreate(req.body.user, LoginDTO);
    next();
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
