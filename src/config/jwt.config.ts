import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) throw new Error('Not found JWT secret key');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

const strategyValidation = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  console.log(jwt_payload);
  done(null, 'Successfully');
  // if (jwt_payload.email && jwt_payload.UserId) {
  //   done(null, 'Successfully');
  // } else {
  //   done(null, false);
  // }
});

export { jwtOptions, strategyValidation };
