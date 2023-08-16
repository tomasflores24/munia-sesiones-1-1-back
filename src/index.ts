import express from 'express';
import db from './db/index';
const app = express();
const PORT = 3000;

db.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`);
  });
});
