import { RequestHandler } from 'express';
import { generateToken } from '../../common/generateToken';
import { verifyUser } from './login.service';
import { handleErrorResponse } from '../../common/errorResponse';

const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body.user;

    const result = await verifyUser(email, password);

    const token = generateToken(result);

    return res.json({ message: 'user login successful', token });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export { loginUser };
