import { RequestHandler } from 'express';
import { getAllUserTypeInDB } from './userType.service';
import { handleErrorResponse } from '../../common/errorResponse';

export const getAllUserTypes: RequestHandler = async (_req, res) => {
  try {
    const allUserTypes = await getAllUserTypeInDB();
    return res.status(200).json({ allUserTypes });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};


