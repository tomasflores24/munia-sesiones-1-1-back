import express from 'express';
import db from './db/index';
import cors from 'cors';
import morgan from 'morgan';
import { configCors } from './config/cors.config';
import router from './routes/router';
import bodyParser from 'body-parser';
import { createDefaultTypesInDB } from '../src/common/defaultTypes';
import passport from 'passport';
import { strategyValidation } from './config/jwt.config';

const app = express();

app.use(cors(configCors));
app.use(morgan('dev'));
app.use(bodyParser.json());
passport.use(strategyValidation);
app.use('/', router);

const PORT = 3000;
db.sync({ force: true }).then(async () => {
  await createDefaultTypesInDB();
  app.listen(PORT, () => console.log(`%s listening at ${PORT}`));
});
