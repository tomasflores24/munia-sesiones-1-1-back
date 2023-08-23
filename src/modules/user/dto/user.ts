import { IsNotEmpty, IsString, IsEmail, IsBoolean } from 'class-validator';

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

  // @IsNotEmpty()
  // @IsUUID('4')
  // CountryId!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsBoolean()
  isActive!: boolean;

  @IsBoolean()
  isDelete?: boolean;

  // @IsNotEmpty()
  // @IsUUID('4')
  // UserTypeId!: string;
}

export class CreateUserDTO extends BaseUserDTO {}
