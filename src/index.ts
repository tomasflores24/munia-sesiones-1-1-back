import express from 'express';
import db from './db/index';
import cors from 'cors';
import morgan from 'morgan';
import { configCors } from './config/cors.config';

const app = express();

app.use(cors(configCors));
app.use(morgan('dev'));

const PORT = 3000;
db.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`%s listening at ${PORT}`));
});
