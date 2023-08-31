import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsInt } from 'class-validator';

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
