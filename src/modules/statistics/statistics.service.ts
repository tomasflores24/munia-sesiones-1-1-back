import { User, User_type } from '../../models';
import { Op } from 'sequelize';
import { SearchStatisticsDTO } from './dto/statistics';
import { TypesAuth } from '../auth/interface';

export const getStatisticsInDB = async (startDate?: string, endDate?: string) => {
  const whereClause: Record<string, any> = {
    isDelete: false,
  };

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
    [TypesAuth.COLLABORATOR]: 0,
    [TypesAuth.COMPANY]: 0,
    [TypesAuth.PROVIDER]: 0,
  };

  for (const user of users) {    
    if (user.User_type) {
      const userTypeName = user.User_type.name as TypesAuth.COLLABORATOR | TypesAuth.COMPANY | TypesAuth.PROVIDER;
      userCounts[userTypeName]++;
    }
  }

  return { usuarios: userCounts };
};

