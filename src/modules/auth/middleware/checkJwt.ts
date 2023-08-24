import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

// export const checkJwt = passport.authenticate('jwt', { session: false, prompt:'ERROR' });

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: any, user: any, info: any) => {
      if (err) return res.status(401).json({ error: 'Internal Server Error' });

      if (!user) {
        const errorMessage = (info && info.message) || 'Unauthorized';
        const status = (info && info.status) || 401;
        return res.status(status).json({ error: errorMessage });
      }
      next();
    }
  )(req, res, next);
};
