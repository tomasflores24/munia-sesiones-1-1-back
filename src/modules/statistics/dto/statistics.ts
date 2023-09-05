import { IsInt } from 'class-validator';
import { Available, User, User_type } from '../../../models';

export class SearchStatisticsDTO extends User {
  @IsInt()
  UserTypeId?: number;
  
  User_type?: User_type;

  createdAt?: undefined;
}

export class demographicsDTO extends Available {
  Appointment?: {
    Collaborator?: {
      Gender?: {
        name?: string;
      };
      age?: number;
    };
  };
}

