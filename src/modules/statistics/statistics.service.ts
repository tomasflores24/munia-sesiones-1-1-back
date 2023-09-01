import { User, User_type } from '../../models';
import { Op } from 'sequelize';
import { SearchStatisticsDTO } from './dto/statistics';
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

export const getDemographicInDB = async (startDate?: string, endDate?: string, CategoryId?: string, ServiceId?: string) => {
  const whereClause: Record<string, any> = {
    isDelete: false,
  };

  console.log(CategoryId);
  console.log(ServiceId);

  if (startDate || endDate) {
    let formattedStartDate: Date | undefined;
    let formattedEndDate: Date | undefined;

    formattedStartDate = new Date(`${startDate} 00:00:00`);
    formattedEndDate = new Date(`${endDate} 23:59:59`);

    whereClause.createdAt = {
      [Op.between]: [formattedStartDate, formattedEndDate],
    };
  }

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

  return { usuarios: userCounts };
};

