import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';

class BaseUserDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsInt()
  CountryId!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsBoolean()
  isActive!: boolean;

  @IsBoolean()
  isDelete?: boolean;

  @IsNotEmpty()
  @IsInt()
  UserTypeId!: number;
}

export class CreateUserDTO extends BaseUserDTO {}

export class UpdateUserDTO {
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsInt()
  CountryId?: number;

  @IsOptional()
  @IsString()
  city?: string;

  // @IsBoolean()
  // isActive!: boolean;

  // @IsBoolean()
  // isDelete?: boolean;

  // @IsNotEmpty()
  // @IsInt()
  // UserTypeId!: number;

  @IsOptional()
  file?: any;
}
