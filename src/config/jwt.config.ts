import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) throw new Error('Not found JWT secret key');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

const strategyValidation = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  done(null, jwt_payload);
  // const condition = jwt_payload.email && jwt_payload.UserId ? jwt_payload : false;
  // done(null, condition, { status: 401, message: 'Unauthorized' });
});

export { jwtOptions, strategyValidation };
