import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { authInDB } from './auth.service';
import { generateToken } from '../../common/generateToken';
import { TypesAuth } from './interface';

export const authProfile: RequestHandler = async (req, res) => {
  try {
    const profileData = req.body.profile;
    const userData = req.body.user;
    const type = req.body.auth.type;

    const profile = await authInDB(profileData, userData, type);

    if (type === TypesAuth.PROVIDER) {
      const token = generateToken(profile);
      return res.status(200).json({ token, type });
    }

    return res.status(200).json({ profile, type });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
