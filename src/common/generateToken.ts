import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtOptions } from '../config/jwt.config';

export const generateToken = (payload: any) => {
  const optionsGeneratorJwt: SignOptions = { expiresIn: '3d' };
  const token = jwt.sign(payload, jwtOptions.secretOrKey, optionsGeneratorJwt);
  return token;
};
