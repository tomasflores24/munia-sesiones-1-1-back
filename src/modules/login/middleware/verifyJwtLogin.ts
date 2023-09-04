import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { generateToken } from '../../../common/generateToken';

export const checkJwtLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },

    async (err: any, user: any) => {
      if (err) return res.status(401).json({ error: 'Internal Server Error' });

      if (!user) return next();

      const token = generateToken({ email: user.email, UserId: user.UserId });
      return res.json({ message: 'user login successful token', token });
    }
  )(req, res, next);
};
