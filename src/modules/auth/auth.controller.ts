import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { authInDB } from './auth.service';

export const authProfile: RequestHandler = async (req, res) => {
  try {
    const profileData = req.body.profile;
    const userData = req.body.user;
    const type = req.body.auth.type;

    const registered = await authInDB(profileData, userData, type);

    return res.status(200).json({ registered, type: type });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
