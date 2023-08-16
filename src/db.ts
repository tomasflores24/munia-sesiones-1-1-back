import { Sequelize, ModelCtor } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from './models/user.model';
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;
const DB_PORT: number = 5432;

const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: 'postgres',
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  models: [User as ModelCtor<User>],
  logging: false,
  native: false,
});

// sequelize.models.User.findOne().then();
// sequelize.models.User.findOne().then(resp => resp?.cualquierCosa);

// interface Database {
//   conn: Sequelize;
//   User: ModelStatic<UserModel>;
// }
// const db: Database = {
//   conn: sequelize,
//   User: User(sequelize) as ModelCtor<UserModel>,
// };
// const hola = User(sequelize);

// hola.findOne().then((resp) => resp?.cualquierCosa);
export default sequelize;
