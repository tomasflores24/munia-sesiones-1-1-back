import { IsInt } from 'class-validator';
import { Available, Rating, User, User_type } from '../../../models';

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

export class serviceDTO extends Available {
  Appointment?: {
    Service?: {
      name?: string;
      Category?: {
        name?: string;
      };
    };
    Collaborator?: {
      Gender?: {
        name?: string;
      };
      age?: number;
    };
  };
}

export class generalDTO extends User {
  Ratings?: Rating[];
}

