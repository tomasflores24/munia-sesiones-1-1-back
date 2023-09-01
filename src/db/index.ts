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
  Session_per_collaborators,
  Provider,
  Purchase_membership,
  Rating,
  Service,
  User_type,
  Available,
  Appointment,
  Provider_assign_service,
} from '../models';
import { Categories } from '../models/categories.model';


const { DB_PASSWORD, DB_NAME, DB_HOST, DB_USER } = process.env;
const DB_PORT = +(process.env.DB_PORT || 5432);

const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: 'postgres',
  // dialectOptions: {
  //   ssl: {
  //      rejectUnauthorized: false,
  //   }
  // },
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
    Session_per_collaborators,
    Provider,
    Purchase_membership,
    Rating,
    Service,
    User_type,
    Available,
    Appointment,
    Provider_assign_service,
    Categories
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

Status.hasMany(Purchase_membership);
Purchase_membership.belongsTo(Status);

//session_per_collaborators
Purchase_membership.hasMany(Session_per_collaborators);
Session_per_collaborators.belongsTo(Purchase_membership);

Collaborator.hasMany(Session_per_collaborators);
Session_per_collaborators.belongsTo(Collaborator);

Company.hasMany(Session_per_collaborators);
Session_per_collaborators.belongsTo(Company);

//provider_assign_service
Provider.hasMany(Provider_assign_service);
Provider_assign_service.belongsTo(Provider);

Service.hasMany(Provider_assign_service);
Provider_assign_service.belongsTo(Service);

//available
Provider.hasMany(Available);
Available.belongsTo(Provider);

Status.hasMany(Available);
Available.belongsTo(Status);

Available.belongsTo(Appointment, { foreignKey: 'AppointmentId', as: 'Appointment' });

//appointment
Appointment.belongsTo(Available, { foreignKey: 'AvailableId', as: 'Available' });

Provider.hasMany(Appointment);
Appointment.belongsTo(Provider);

Collaborator.hasMany(Appointment);
Appointment.belongsTo(Collaborator);

Service.hasMany(Appointment);
Appointment.belongsTo(Service);

//service
Categories.hasMany(Service);
Service.belongsTo(Categories);

export default sequelize;
