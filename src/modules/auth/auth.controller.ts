import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { authInDB } from './auth.service';
import { generateToken } from '../../common/generateToken';

export const authProfile: RequestHandler = async (req, res) => {
  try {
    const profileData = req.body.profile;
    const userData = req.body.user;
    const type = req.body.auth.type;

    const payload = await authInDB(profileData, userData, type);
    const token = generateToken(payload);

    return res.status(200).json({ token, type });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
