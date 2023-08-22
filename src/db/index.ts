import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
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

// * associations
//user
Country.hasMany(User);
User.belongsTo(Country);

User_type.hasMany(User);
User.belongsTo(User_type);

//rating
User.hasMany(Rating);
Rating.belongsTo(User);

Provider.hasMany(Rating);
Rating.belongsTo(Provider);

//company
User.hasMany(Company);
Company.belongsTo(User);

//collaborator
User.hasMany(Collaborator);
Collaborator.belongsTo(User);

Gender.hasMany(Collaborator);
Collaborator.belongsTo(Gender);

Company.hasMany(Collaborator);
Collaborator.belongsTo(Company);

//provider
User.hasMany(Provider);
Provider.belongsTo(User);

Gender.hasMany(Provider);
Provider.belongsTo(Gender);

//purchase_membership
Company.hasMany(Purchase_membership);
Purchase_membership.belongsTo(Company);

Membership.hasMany(Purchase_membership);
Purchase_membership.belongsTo(Membership);

//membership_relationship
Purchase_membership.hasMany(Membership_relationship);
Membership_relationship.belongsTo(Purchase_membership);

Status.hasMany(Membership_relationship);
Membership_relationship.belongsTo(Status);

Service.hasMany(Membership_relationship);
Membership_relationship.belongsTo(Service);

Collaborator.hasMany(Membership_relationship);
Membership_relationship.belongsTo(Collaborator);

Provider.hasMany(Membership_relationship);
Membership_relationship.belongsTo(Provider);

//provider_service
Provider.belongsToMany(Service, { through: 'provider_service', timestamps: false });
Service.belongsToMany(Provider, { through: 'provider_service', timestamps: false });

export default sequelize;
