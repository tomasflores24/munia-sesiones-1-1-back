import { IsInt, IsNotEmpty, IsString, IsIn } from 'class-validator';
import { TypesAuth } from '../interface';

export class AuthCompanyDTO {
  @IsNotEmpty()
  @IsInt()
  phone!: number;

  @IsNotEmpty()
  @IsString()
  register_id!: string;
}

export class AuthProviderDTO {
  @IsNotEmpty()
  @IsString()
  last_name!: string;

  // @IsNotEmpty()
  // @IsInt()
  // GenderId!: number;

  // @IsInt()
  // UserId!: number;
}

export class AuthCollaboratorDTO extends AuthProviderDTO {
  // @IsNotEmpty()
  // @IsUUID('4')
  // CompanyId!: string;
}

export class AuthTypeDTO {
  @IsNotEmpty()
  @IsString()
  @IsIn([TypesAuth.COMPANY, TypesAuth.PROVIDER, TypesAuth.COLLABORATOR])
  type!: TypesAuth.COMPANY | TypesAuth.PROVIDER | TypesAuth.COLLABORATOR;
}
