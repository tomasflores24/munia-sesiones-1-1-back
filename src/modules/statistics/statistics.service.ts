import { Appointment, Available, Collaborator, Gender, Service, User, User_type } from '../../models';
import { Op, Sequelize } from 'sequelize';
import { demographicsDTO, SearchStatisticsDTO } from './dto/statistics';
import { TypesAuth } from '../auth/interface';

export const getAllUserInDB = async () => {
  const whereClause: Record<string, any> = {
    isDelete: false,
  };

  const users:SearchStatisticsDTO[] = await User.findAll({
    where: whereClause,
    include: User_type,
  });

  const userCounts = {
    [TypesAuth.COLLABORATOR]: {
      Count: 0,
      CreatedAt: [],
    },
    [TypesAuth.COMPANY]: {
      Count: 0,
      CreatedAt: [],
    },
    [TypesAuth.PROVIDER]: {
      Count: 0,
      CreatedAt: [],
    },
  };

  for (const user of users) {    
    if (user.User_type) {
      const userTypeName = user.User_type.name as TypesAuth.COLLABORATOR | TypesAuth.COMPANY | TypesAuth.PROVIDER;
      userCounts[userTypeName].Count++;
      if (user.createdAt) {
        userCounts[userTypeName].CreatedAt.push(user.createdAt);
      }
    }
  }

  return { users: userCounts };
};

export const getDemographicInDB = async (
  startDate?: string, 
  endDate?: string,
  CategoryId?: string, 
  ServiceId?: string,
  CompanyId?: string) => {
  const whereClause: Record<string, any> = {
    [Op.or]: [
      { StatusId: 4 },
      { StatusId: 5 }
    ]
  };

  console.log(ServiceId);
  console.log(CompanyId);
  console.log(CategoryId);
  
  
  
  if (startDate || endDate) {
    let formattedStartDate: Date | undefined;
    let formattedEndDate: Date | undefined;

    formattedStartDate = new Date(`${startDate} 00:00:00`);
    formattedEndDate = new Date(`${endDate} 23:59:59`);

    whereClause.startTime = {
      [Op.between]: [formattedStartDate, formattedEndDate],
    };
  }

  const whereConditions: any[] = [
    whereClause,
    Sequelize.where(Sequelize.col('Appointment.Collaborator.CompanyId'), '=', CompanyId),
    Sequelize.where(Sequelize.col('Appointment.Service.CategoryId'), '=', CategoryId),
  ];

  if (ServiceId) {
    whereConditions.push(Sequelize.where(Sequelize.col('Appointment.Service.id'), '=', ServiceId));
  }

  const demographics:demographicsDTO[] = await Available.findAll({
    where: {
      [Op.and]: whereConditions,
    },
    include: { 
      model: Appointment, 
      as: 'Appointment',
      include: [
        {
          model: Service,
          attributes: ['name'],
        },
        {
          model: Collaborator,
          include: [
            {
              model: Gender,
              attributes: ['name'], 
            },
          ], 
        },
      ],
    },
  });

  const genders: Record<string, number> = {
    masculino: 0,
    femenino: 0,
    otro: 0,
  };

  let ages: number[] = []

  for (const demographic of demographics) {
    if (demographic.Appointment && demographic.Appointment.Collaborator && demographic.Appointment.Collaborator.Gender && demographic.Appointment.Collaborator.Gender.name) {
      const gender = demographic.Appointment.Collaborator.Gender.name.toLowerCase();
      genders[gender]++;
    }
  
    if (demographic.Appointment && demographic.Appointment.Collaborator && demographic.Appointment.Collaborator.age !== undefined) {
      ages.push(demographic.Appointment.Collaborator.age);
    }
  }
  
  return {
    demographics: {
      genders,
      ages,
    },
  };

};

