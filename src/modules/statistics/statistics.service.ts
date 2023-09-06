import {
  Appointment,
  Available,
  Categories,
  Collaborator,
  Gender,
  Rating,
  Service,
  User,
  User_type,
} from '../../models';
import { Op, Sequelize } from 'sequelize';
import {
  demographicsDTO,
  generalDTO,
  SearchStatisticsDTO,
  serviceDTO,
} from './dto/statistics';
import { TypesAuth } from '../auth/interface';

export const getAllUserInDB = async () => {
  const whereClause: Record<string, any> = {
    isDelete: false,
  };

  const users: SearchStatisticsDTO[] = await User.findAll({
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
      const userTypeName = user.User_type.name as
        | TypesAuth.COLLABORATOR
        | TypesAuth.COMPANY
        | TypesAuth.PROVIDER;
      userCounts[userTypeName].Count++;
      if (user.createdAt) {
        userCounts[userTypeName].CreatedAt.push(user.createdAt);
      }
    }
  }

  return { data: userCounts };
};

export const getGendersInDB = async (
  startDate?: string,
  endDate?: string,
  CategoryId?: string,
  ServiceId?: string,
  CompanyId?: string
) => {
  const whereClause: Record<string, any> = {
    [Op.or]: [{ StatusId: 2 }, { StatusId: 5 }],
  };

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
    Sequelize.where(
      Sequelize.col('Appointment.Collaborator.CompanyId'),
      '=',
      CompanyId
    ),
    Sequelize.where(
      Sequelize.col('Appointment.Service.CategoryId'),
      '=',
      CategoryId
    ),
  ];

  if (ServiceId) {
    whereConditions.push(
      Sequelize.where(Sequelize.col('Appointment.Service.id'), '=', ServiceId)
    );
  }

  const demographics: demographicsDTO[] = await Available.findAll({
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

  for (const demographic of demographics) {
    if (
      demographic.Appointment &&
      demographic.Appointment.Collaborator &&
      demographic.Appointment.Collaborator.Gender &&
      demographic.Appointment.Collaborator.Gender.name
    ) {
      const gender = demographic.Appointment.Collaborator.Gender.name.toLowerCase();
      genders[gender]++;
    }
  }

  return {
    data: {
      genders,
    },
  };
};

export const getAgesInDB = async (
  startDate?: string,
  endDate?: string,
  CategoryId?: string,
  ServiceId?: string,
  CompanyId?: string
) => {
  const whereClause: Record<string, any> = {
    [Op.or]: [{ StatusId: 2 }, { StatusId: 5 }],
  };

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
    Sequelize.where(
      Sequelize.col('Appointment.Collaborator.CompanyId'),
      '=',
      CompanyId
    ),
    Sequelize.where(
      Sequelize.col('Appointment.Service.CategoryId'),
      '=',
      CategoryId
    ),
  ];

  if (ServiceId) {
    whereConditions.push(
      Sequelize.where(Sequelize.col('Appointment.Service.id'), '=', ServiceId)
    );
  }

  const demographics: demographicsDTO[] = await Available.findAll({
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

  let ages: number[] = [];

  for (const demographic of demographics) {
    if (
      demographic.Appointment &&
      demographic.Appointment.Collaborator &&
      demographic.Appointment.Collaborator.age !== undefined
    ) {
      ages.push(demographic.Appointment.Collaborator.age);
    }
  }

  return {
    data: {
      ages,
    },
  };
};

export const getServicesInDB = async (
  startDate?: string,
  endDate?: string,
  CategoryId?: string,
  CompanyId?: string
) => {
  const whereClause: Record<string, any> = {
    [Op.or]: [{ StatusId: 2 }, { StatusId: 5 }],
  };

  if (startDate || endDate) {
    let formattedStartDate: Date | undefined;
    let formattedEndDate: Date | undefined;

    formattedStartDate = new Date(`${startDate} 00:00:00`);
    formattedEndDate = new Date(`${endDate} 23:59:59`);

    whereClause.startTime = {
      [Op.between]: [formattedStartDate, formattedEndDate],
    };
  }

  const whereConditions: any[] = [whereClause];

  if (CompanyId) {
    whereConditions.push(
      Sequelize.where(
        Sequelize.col('Appointment.Collaborator.CompanyId'),
        '=',
        CompanyId
      )
    );
  }

  if (CategoryId) {
    whereConditions.push(
      Sequelize.where(
        Sequelize.col('Appointment.Service.CategoryId'),
        '=',
        CategoryId
      )
    );
  }

  const services: serviceDTO[] = await Available.findAll({
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
          include: [
            {
              model: Categories,
              attributes: ['name'],
            },
          ],
        },
        {
          model: Collaborator,
          attributes: ['CompanyId'],
        },
      ],
    },
  });

  const categorizedData: Record<string, any> = {};

  for (const service of services) {
    const appointment = service.Appointment;

    if (appointment) {
      const serviceData = appointment.Service;
      const categoryName = serviceData?.Category?.name;
      const serviceName = serviceData?.name;

      if (categoryName && serviceName) {
        if (!categorizedData[categoryName]) {
          categorizedData[categoryName] = {
            count: 1,
            serviceCount: {
              [serviceName]: 1,
            },
          };
        } else {
          categorizedData[categoryName].count++;
          if (!categorizedData[categoryName].serviceCount[serviceName]) {
            categorizedData[categoryName].serviceCount[serviceName] = 1;
          } else {
            categorizedData[categoryName].serviceCount[serviceName]++;
          }
        }
      }
    }
  }

  return { data: categorizedData };
};

export const getGeneralInDB = async (
  startDate?: string,
  endDate?: string,
  CompanyId?: string
) => {
  const whereClause: Record<string, any> = {
    isDelete: false,
    UserTypeId: 2,
  };
  const whereConditions: any[] = [whereClause];

  if (CompanyId) {
    whereConditions.push(
      Sequelize.where(Sequelize.col('Collaborators.CompanyId'), '=', CompanyId)
    );
  }

  const usersData: generalDTO[] = await User.findAll({
    where: {
      [Op.and]: whereConditions,
    },
    include: [
      {
        model: Collaborator,
        as: 'Collaborators',
        attributes: ['CompanyId'],
      },
      {
        model: Rating,
        as: 'Ratings',
        attributes: ['rating'],
      },
    ],
  });

  const users = usersData.length;

  let totalRatings = 0;
  let amountRatings = 0;

  for (const user of usersData) {
    if (user.Ratings && user.Ratings.length > 0) {
      for (const rating of user.Ratings) {
        totalRatings += rating.rating;
        amountRatings++;
      }
    }
  }

  const averageRating = amountRatings > 0 ? totalRatings / amountRatings : 0;

  // Service
  const whereClauseService: Record<string, any> = {
    [Op.or]: [{ StatusId: 2 }, { StatusId: 5 }],
  };

  if (startDate || endDate) {
    let formattedStartDate: Date | undefined;
    let formattedEndDate: Date | undefined;

    formattedStartDate = new Date(`${startDate} 00:00:00`);
    formattedEndDate = new Date(`${endDate} 23:59:59`);

    whereClauseService.startTime = {
      [Op.between]: [formattedStartDate, formattedEndDate],
    };
  }

  const whereConditionsService: any[] = [whereClauseService];

  if (CompanyId) {
    whereConditionsService.push(
      Sequelize.where(
        Sequelize.col('Appointment.Collaborator.CompanyId'),
        '=',
        CompanyId
      )
    );
  }

  const servicesData: serviceDTO[] = await Available.findAll({
    where: {
      [Op.and]: whereConditionsService,
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
          attributes: ['CompanyId'],
        },
      ],
    },
  });

  const appointment = servicesData.length;

  const serviceCounts: Record<string, number> = {};

  for (const service of servicesData) {
    if (
      service &&
      service.Appointment &&
      service.Appointment.Service &&
      service.Appointment.Service.name
    ) {
      const serviceName = service.Appointment.Service.name;

      if (!serviceCounts[serviceName]) {
        serviceCounts[serviceName] = 1;
      } else {
        serviceCounts[serviceName]++;
      }
    }
  }

  let mostUsedService = '';
  let maxCount = 0;

  for (const serviceName in serviceCounts) {
    if (serviceCounts[serviceName] > maxCount) {
      mostUsedService = serviceName;
      maxCount = serviceCounts[serviceName];
    }
  }

  return {
    data: {
      users: users,
      appointments: appointment,
      service: mostUsedService,
      rating: averageRating,
    },
  };
};
