import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) throw new Error('Not found JWT secret key');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

const strategyValidation = new JwtStrategy(jwtOptions, (_jwt_payload, done) => {
  // const hasUser = jwt_payload.email && jwt_payload.UserId ? jwt_payload : false;
  // done(null, hasUser, { status: 401, message: 'Unauthorized' });
  done(null, true);
});

export { jwtOptions, strategyValidation };
