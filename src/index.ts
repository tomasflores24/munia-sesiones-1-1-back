import express from 'express';
import db from './db';

const app = express();
const PORT = 3000;

db.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Aplicacion escuchando en el puerto ${PORT}`);
  });
});
// db.conn.sync({ force: true }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Aplicacion escuchando en el puerto ${PORT}`);
//   });
// });
