import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import {
  User,
  Country,
  Gender,
  Status,
  Collaborator,
  Company,
  Membership,
  Membership_relationship,
  Provider,
  Purchase_membership,
  Rating,
  Service,
  User_type,
} from '../models';

dotenv.config();
const { DB_PASSWORD, DB_NAME, DB_HOST, DB_USER } = process.env;
const DB_PORT: number = 5432;

const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: 'postgres',
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  models: [
    User,
    Country,
    Gender,
    Status,
    Collaborator,
    Company,
    Membership,
    Membership_relationship,
    Provider,
    Purchase_membership,
    Rating,
    Service,
    User_type,
  ],
  logging: false,
  native: false,
});

// associations
Provider.belongsToMany(Service, { through: 'provider_service', timestamps: false });
Service.belongsToMany(Provider, { through: 'provider_service', timestamps: false });

Country.hasMany(User);
User.belongsTo(Country);

User_type.hasMany(User);
User.belongsTo(User_type);

export default sequelize;
