import passport from 'passport';

export const checkJwt = passport.authenticate('jwt', { session: false });
