import { IsInt } from 'class-validator';
import { User, User_type } from '../../../models';

export class SearchStatisticsDTO extends User {
  @IsInt()
  UserTypeId?: number;
  
  User_type?: User_type;

  createdAt?: undefined;
}
